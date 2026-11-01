import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../dist/modules/consultation-admin/password.js";

if (!process.stdin.isTTY)
  throw new Error(
    "Chạy trực tiếp trong terminal tương tác; không truyền mật khẩu qua dòng lệnh.",
  );
if (!process.env.DATABASE_URL) throw new Error("Thiếu DATABASE_URL.");
let muted = false;
const output = new Writable({
  write(chunk, encoding, callback) {
    if (!muted) process.stdout.write(chunk, encoding);
    callback();
  },
});
const rl = createInterface({ input: process.stdin, output, terminal: true });
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
try {
  const email = (await rl.question("Email cán bộ: ")).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190)
    throw new Error("Email không hợp lệ.");
  const existing = await db.consultationStaff.findUnique({ where: { email } });
  const action = (
    await rl.question(
      "Thao tác: [1] tạo/đặt lại mật khẩu, [2] khóa tài khoản: ",
    )
  ).trim();
  if (action === "2") {
    if (!existing) throw new Error("Tài khoản không tồn tại.");
    await db.$transaction([
      db.consultationStaff.update({
        where: { email },
        data: { disabled: true },
      }),
      db.consultationSession.deleteMany({ where: { staffId: existing.id } }),
    ]);
    console.log("Đã khóa tài khoản và thu hồi phiên đăng nhập.");
  } else if (action === "1") {
    const fullName = (await rl.question("Họ tên: ")).trim();
    if (!fullName || fullName.length > 120)
      throw new Error("Họ tên không hợp lệ.");
    const role = (
      await rl.question("Quyền: [1] xem và cập nhật, [2] chỉ xem: ")
    ).trim();
    if (!["1", "2"].includes(role)) throw new Error("Quyền không hợp lệ.");
    const canManageContent = (await rl.question("Cấp quyền quản lý tin tức/tài nguyên? Gõ YES để cấp (mặc định không): ")).trim() === "YES";
    process.stdout.write("Mật khẩu mới (12–256 ký tự, không hiển thị): ");
    muted = true;
    const password = await rl.question("");
    muted = false;
    process.stdout.write("\n");
    process.stdout.write("Nhập lại mật khẩu: ");
    muted = true;
    const confirm = await rl.question("");
    muted = false;
    process.stdout.write("\n");
    if (password.length < 12 || password.length > 256 || password !== confirm)
      throw new Error("Mật khẩu không khớp hoặc không đủ độ dài.");
    if (
      existing &&
      (await rl.question(
        "Thay mật khẩu/quyền và thu hồi mọi phiên của tài khoản này? Gõ YES: ",
      )) !== "YES"
    )
      throw new Error("Đã hủy.");
    const passwordHash = await hashPassword(password);
    await db.$transaction(async (tx) => {
      const staff = await tx.consultationStaff.upsert({
        where: { email },
        create: { email, fullName, passwordHash, canManageContent, canUpdate: role === "1" },
        update: {
          fullName,
          passwordHash,
          canManageContent,
          canUpdate: role === "1",
          disabled: false,
        },
      });
      await tx.consultationSession.deleteMany({ where: { staffId: staff.id } });
    });
    console.log(
      "Đã lưu tài khoản. Bàn giao mật khẩu qua kênh riêng, không đưa vào repository.",
    );
  } else throw new Error("Thao tác không hợp lệ.");
} finally {
  muted = false;
  rl.close();
  await db.$disconnect();
}
