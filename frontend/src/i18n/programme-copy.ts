import type { CopyDictionary } from "./website-copy";

export async function loadProgrammeCopy(id: string): Promise<CopyDictionary | undefined> {
  const load = Object.hasOwn(programmeDictionaries, id) ? programmeDictionaries[id] : undefined;
  return load ? (await load()).default : undefined;
}

const programmeDictionaries: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  "cong-nghe-sinh-hoc": () => import("./workbook/cong-nghe-sinh-hoc.json"),
  "cong-nghe-thong-tin": () => import("./workbook/cong-nghe-thong-tin.json"),
  "ke-toan": () => import("./workbook/ke-toan.json"),
  "khoa-hoc-moi-truong": () => import("./workbook/khoa-hoc-moi-truong.json"),
  "kien-truc": () => import("./workbook/kien-truc.json"),
  "kinh-doanh-thuong-mai": () => import("./workbook/kinh-doanh-thuong-mai.json"),
  "ky-thuat-moi-truong": () => import("./workbook/ky-thuat-moi-truong.json"),
  "ky-thuat-o-to": () => import("./workbook/ky-thuat-o-to.json"),
  "ky-thuat-xay-dung": () => import("./workbook/ky-thuat-xay-dung.json"),
  "logistics": () => import("./workbook/logistics.json"),
  "luat-kinh-te": () => import("./workbook/luat-kinh-te.json"),
  "ly-luan-lich-su-my-thuat": () => import("./workbook/ly-luan-lich-su-my-thuat.json"),
  "marketing": () => import("./workbook/marketing.json"),
  "my-thuat-ung-dung": () => import("./workbook/my-thuat-ung-dung.json"),
  "ngon-ngu-anh": () => import("./workbook/ngon-ngu-anh.json"),
  "quan-he-cong-chung": () => import("./workbook/quan-he-cong-chung.json"),
  "quan-ly-tai-nguyen-moi-truong": () => import("./workbook/quan-ly-tai-nguyen-moi-truong.json"),
  "quan-tri-du-lich": () => import("./workbook/quan-tri-du-lich.json"),
  "quan-tri-khach-san": () => import("./workbook/quan-tri-khach-san.json"),
  "quan-tri-kinh-doanh": () => import("./workbook/quan-tri-kinh-doanh.json"),
  "tai-chinh-ngan-hang": () => import("./workbook/tai-chinh-ngan-hang.json"),
};
