import { getKhoaHocMoiTruongCurricula } from "./programmes/khoa-hoc-moi-truong";
import { getQuanTriKinhDoanhCurricula } from "./programmes/quan-tri-kinh-doanh";
import { getKinhDoanhThuongMaiCurricula } from "./programmes/kinh-doanh-thuong-mai";
import { getTaiChinhNganHangCurricula } from "./programmes/tai-chinh-ngan-hang";
import { getKeToanCurricula } from "./programmes/ke-toan";
import { getQuanTriDuLichCurricula } from "./programmes/quan-tri-du-lich";
import { getQuanTriKhachSanCurricula } from "./programmes/quan-tri-khach-san";
import { getLuatKinhTeCurricula } from "./programmes/luat-kinh-te";
import { getNgonNguAnhCurricula } from "./programmes/ngon-ngu-anh";
import { getQuanHeCongChungCurricula } from "./programmes/quan-he-cong-chung";
import { getLogisticsCurricula } from "./programmes/logistics";
import { getKyThuatOToCurricula } from "./programmes/ky-thuat-o-to";
import { getKyThuatXayDungCurricula } from "./programmes/ky-thuat-xay-dung";
import { getKienTrucCurricula } from "./programmes/kien-truc";
import { getMyThuatUngDungCurricula } from "./programmes/my-thuat-ung-dung";
import { getLyLuanLichSuMyThuatCurricula } from "./programmes/ly-luan-lich-su-my-thuat";
import { getCongNgheSinhHocCurricula } from "./programmes/cong-nghe-sinh-hoc";
import { getQuanLyTaiNguyenMoiTruongCurricula } from "./programmes/quan-ly-tai-nguyen-moi-truong";
import { getKyThuatMoiTruongCurricula } from "./programmes/ky-thuat-moi-truong";
import { getCongNgheThongTinCurricula } from "./programmes/cong-nghe-thong-tin";
import { getMarketingCurricula } from "./programmes/marketing";
import type { Programme, ProgrammePageContent } from "./programmes";

export type CurriculumCourse = {
  code?: string;
  name: string;
  englishName?: string;
  credits?: number;
  elective?: boolean;
};

export type CurriculumGroup = {
  title: string;
  englishTitle?: string;
  totalCreditsLabel?: string;
  description?: readonly string[];
  courses: CurriculumCourse[];
  subgroups?: CurriculumGroup[];
};

export type CurriculumTrack = {
  number: string;
  title: string;
  subtitle?: string;
  orientation?: "Ứng dụng" | "Nghiên cứu";
  graduationProject?: string;
  intro?: string;
  generalFacts?: ProgrammePageContent["section05"]["generalFacts"];
  notes?: readonly string[];
  semesters?: ProgrammePageContent["section05"]["semesters"];
  completion?: ProgrammePageContent["section05"]["completion"];
  groups: CurriculumGroup[];
};

/** Chọn nội dung theo định hướng thật, không mặc định tab đầu tiên là ứng dụng. */
export function getCurriculumOrientation(programme: Programme, track: CurriculumTrack | undefined) {
  if (track?.orientation) return track.orientation;
  if (/nghiên cứu/i.test(track?.title ?? "")) return "Nghiên cứu";
  if (/ứng dụng/i.test(track?.title ?? "")) return "Ứng dụng";
  return programme.orientation;
}

export function getCurriculumGraduationProject(track: CurriculumTrack | undefined) {
  return (
    track?.graduationProject ??
    (track ? getCurriculumCourses(track.groups) : []).find((course) =>
      /luận văn|luận án|đề án tốt nghiệp|đề án thạc sĩ/i.test(course.name),
    )?.name
  );
}

export function getCurriculumCourses(groups: readonly CurriculumGroup[]): CurriculumCourse[] {
  return groups.flatMap((group) => [
    ...group.courses,
    ...getCurriculumCourses(group.subgroups ?? []),
  ]);
}

export function getProgrammeCurricula(programme: Programme): CurriculumTrack[] {
  if (programme.cmsCurriculum) {
    return (["Ứng dụng", "Nghiên cứu"] as const).flatMap((orientation, index) => {
      const rows = programme.cmsCurriculum!.filter((row) => row.track === orientation);
      if (!rows.length) return [];
      const groups: CurriculumGroup[] = [];
      for (const row of rows) {
        let group = groups.find((item) => item.title === row.group);
        if (!group) { group = { title: row.group, courses: [] }; groups.push(group); }
        group.courses.push({ name: row.name, credits: Number(row.credits) });
        if (row.note) group.description = [...(group.description ?? []), `${row.name}: ${row.note}`];
      }
      return [{ number: String(index + 1).padStart(2, "0"), title: `Định hướng ${orientation.toLocaleLowerCase("vi")}`, orientation, groups }];
    });
  }
  if(programme.curriculaPending)return [];
  if (programme.id === "marketing") return getMarketingCurricula();
  if (programme.id === "cong-nghe-thong-tin") return getCongNgheThongTinCurricula();
  if (programme.id === "khoa-hoc-moi-truong") return getKhoaHocMoiTruongCurricula();
  if (programme.id === "quan-tri-kinh-doanh") return getQuanTriKinhDoanhCurricula();
  if (programme.id === "kinh-doanh-thuong-mai") return getKinhDoanhThuongMaiCurricula();
  if (programme.id === "tai-chinh-ngan-hang") return getTaiChinhNganHangCurricula();
  if (programme.id === "ke-toan") return getKeToanCurricula();
  if (programme.id === "quan-tri-du-lich") return getQuanTriDuLichCurricula();
  if (programme.id === "quan-tri-khach-san") return getQuanTriKhachSanCurricula();
  if (programme.id === "luat-kinh-te") return getLuatKinhTeCurricula();
  if (programme.id === "ngon-ngu-anh") return getNgonNguAnhCurricula();
  if (programme.id === "quan-he-cong-chung") return getQuanHeCongChungCurricula();
  if (programme.id === "logistics") return getLogisticsCurricula();
  if (programme.id === "ky-thuat-o-to") return getKyThuatOToCurricula();
  if (programme.id === "ky-thuat-xay-dung") return getKyThuatXayDungCurricula();
  if (programme.id === "kien-truc") return getKienTrucCurricula();
  if (programme.id === "my-thuat-ung-dung") return getMyThuatUngDungCurricula();
  if (programme.id === "ly-luan-lich-su-my-thuat") return getLyLuanLichSuMyThuatCurricula();
  if (programme.id === "cong-nghe-sinh-hoc") return getCongNgheSinhHocCurricula();
  if (programme.id === "quan-ly-tai-nguyen-moi-truong")
    return getQuanLyTaiNguyenMoiTruongCurricula();
  if (programme.id === "ky-thuat-moi-truong") return getKyThuatMoiTruongCurricula();

  const graduationCourses: CurriculumCourse[] =
    programme.degree === "Tiến sĩ"
      ? [
          { name: "Chuyên đề tiến sĩ", credits: 12 },
          { name: "Luận án tiến sĩ", credits: 60 },
        ]
      : programme.orientation === "Nghiên cứu"
        ? [
            { name: "Chuyên đề nghiên cứu", credits: 15 },
            { name: "Luận văn tốt nghiệp", credits: 15 },
          ]
        : [
            { name: "Thực tập chuyên ngành", credits: 6 },
            { name: "Đề án tốt nghiệp", credits: 9 },
          ];

  return [
    {
      number: "05",
      title: "Chương trình đào tạo",
      groups: [
        { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
        {
          title: "Kiến thức cơ sở",
          courses: [
            { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
            { name: "Phân tích và xử lý dữ liệu", credits: 3 },
            { name: "Chuyên đề liên ngành", credits: 2, elective: true },
          ],
        },
        {
          title: "Kiến thức chuyên ngành",
          courses: [].map((name, index) => ({
            name,
            credits: index === 0 ? 4 : 3,
            elective: index > 1,
          })),
        },
        { title: "Tốt nghiệp", courses: graduationCourses },
      ],
    },
  ];
}

export function getProgrammeDetails(programme: Programme) {
  if (programme.pageContent) {
    return {
      intro: programme.pageContent.hero.heroLead,
      highlights: programme.pageContent.section02.highlights.map((item) => item.text),
      outcomes:
        programme.pageContent.section02.learningOutcomes?.items.map((item) => item.text) ??
        programme.pageContent.section03.audience.map((item) => item.text),
      careers: programme.pageContent.section04.careers.map((item) => item.title),
    };
  }

  return {
    intro: `Chương trình ${programme.degree} ${programme.title} cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực ${programme.field.toLowerCase()}.`,
    highlights: [
      "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
    ],
    outcomes: [
      `Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành ${programme.title}`,
      "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
      "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn",
    ],
    careers: [
      "Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước",
      "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
      "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
    ],
  };
}
