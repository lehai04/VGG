import ExcelJS from "exceljs";
import { inflateRawSync } from "node:zlib";
const columns = ["Họ tên", "Số điện thoại", "Email", "Chương trình", "Ghi chú"];
export function validateXlsxArchive(buffer: Buffer) {
  if (buffer.length > 5 * 1024 * 1024) throw Error("File tối đa 5 MB.");
  let end = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 65557); i--)
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      end = i;
      break;
    }
  if (end < 0) throw Error("File XLSX không hợp lệ.");
  const count = buffer.readUInt16LE(end + 10);
  let cursor = buffer.readUInt32LE(end + 16);
  let total = 0;
  let actualTotal = 0,
    cells = 0;
  if (count > 300 || count === 0)
    throw Error("File chứa quá nhiều thành phần.");
  for (let i = 0; i < count; i++) {
    if (
      cursor + 46 > buffer.length ||
      buffer.readUInt32LE(cursor) !== 0x02014b50
    )
      throw Error("Cấu trúc XLSX bị hỏng.");
    if (buffer.readUInt16LE(cursor + 8) & 1)
      throw Error("Không hỗ trợ file mã hóa.");
    total += buffer.readUInt32LE(cursor + 24);
    if (total > 50 * 1024 * 1024)
      throw Error("Dung lượng giải nén vượt giới hạn.");
    const length = buffer.readUInt16LE(cursor + 28),
      extra = buffer.readUInt16LE(cursor + 30),
      comment = buffer.readUInt16LE(cursor + 32);
    const name = buffer
      .subarray(cursor + 46, cursor + 46 + length)
      .toString("utf8");
    if (/vba|externalLinks|\.\.\//i.test(name))
      throw Error("Không hỗ trợ macro hoặc liên kết dữ liệu ngoài.");
    const local = buffer.readUInt32LE(cursor + 42),
      method = buffer.readUInt16LE(cursor + 10),
      compressed = buffer.readUInt32LE(cursor + 20);
    if (local + 30 > buffer.length || buffer.readUInt32LE(local) !== 0x04034b50)
      throw Error("Thành phần XLSX bị hỏng.");
    const start =
      local +
      30 +
      buffer.readUInt16LE(local + 26) +
      buffer.readUInt16LE(local + 28);
    if (start + compressed > buffer.length || ![0, 8].includes(method))
      throw Error("Kiểu nén XLSX không hỗ trợ.");
    const packed = buffer.subarray(start, start + compressed);
    const unpacked =
      method === 8
        ? inflateRawSync(packed, {
            maxOutputLength: Math.min(
              20 * 1024 * 1024,
              50 * 1024 * 1024 - actualTotal,
            ),
          })
        : packed;
    actualTotal += unpacked.length;
    if (
      actualTotal > 50 * 1024 * 1024 ||
      unpacked.length !== buffer.readUInt32LE(cursor + 24)
    )
      throw Error("Dung lượng XLSX không hợp lệ.");
    if (name.endsWith(".xml")) {
      const xml = unpacked.toString("utf8");
      if (/<!DOCTYPE|<!ENTITY/i.test(xml))
        throw Error("Nội dung XML không hợp lệ.");
      if (name.startsWith("xl/worksheets/")) {
        cells += (xml.match(/<(?:\w+:)?c(?:\s|>)/g) ?? []).length;
        if (cells > 10000) throw Error("File chứa quá nhiều ô dữ liệu.");
      }
    }
    cursor += 46 + length + extra + comment;
  }
}
export async function consultationTemplate() {
  const book = new ExcelJS.Workbook();
  const sheet = book.addWorksheet("Danh sách tư vấn");
  sheet.addRow(columns);
  sheet.getRow(1).font = { bold: true };
  sheet.columns.forEach((column) => {
    column.width = 28;
    column.numFmt = "@";
  });
  sheet.addRow([
    "Nguyễn Văn An",
    "0901234567",
    "ungvien@example.com",
    "Marketing",
    "Cần tư vấn chương trình",
  ]);
  return book.xlsx.writeBuffer();
}
export async function parseConsultations(buffer: Buffer) {
  validateXlsxArchive(buffer);
  const book = new ExcelJS.Workbook();
  await book.xlsx.load(
    buffer as unknown as Parameters<typeof book.xlsx.load>[0],
  );
  const sheet = book.worksheets[0];
  if (!sheet) throw Error("Không tìm thấy sheet dữ liệu.");
  if (sheet.rowCount > 501) throw Error("Tối đa 500 dòng mỗi lần nhập.");
  if (
    columns.some(
      (name, index) =>
        sheet
          .getRow(1)
          .getCell(index + 1)
          .text.trim() !== name,
    )
  )
    throw Error("Tên cột chưa đúng. Vui lòng dùng file mẫu.");
  const rows: Array<{
    fullName: string;
    phone: string;
    email: string;
    programme: string;
    message: string;
  }> = [];
  const errors: string[] = [];
  for (let index = 2; index <= sheet.rowCount; index++) {
    const row = sheet.getRow(index);
    const cells = columns.map((_, i) => row.getCell(i + 1));
    if (cells.every((cell) => !cell.text.trim())) continue;
    if (cells.some((cell) => cell.type === ExcelJS.ValueType.Formula)) {
      errors.push(`Dòng ${index}: không chấp nhận công thức.`);
      continue;
    }
    const [fullName, phone, email, programme, message] = cells.map((cell) =>
      cell.text.trim(),
    );
    if (
      fullName.length < 2 ||
      fullName.length > 120 ||
      !/^\+?[\d\s().-]{9,30}$/.test(phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 190 ||
      programme.length > 190 ||
      message.length > 3000
    ) {
      errors.push(
        `Dòng ${index}: kiểm tra họ tên, điện thoại, email hoặc độ dài nội dung.`,
      );
      continue;
    }
    rows.push({ fullName, phone, email, programme, message });
  }
  return { rows, errors };
}
