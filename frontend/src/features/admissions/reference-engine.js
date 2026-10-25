// Adapted from the user-supplied admissions reference, 25/10/2026.
// Data and UI logic are bundled as a local module; no source scripts are evaluated.
import { sendAdmissionConsultation } from "./consultation-request";
export function initializeAdmissions(root) {
  const originalTitle = globalThis.document.title;
  const controller = new AbortController();
  const timers = new Set();
  const frames = new Set();
  const requestAnimationFrame = (callback) => {
    const id = globalThis.requestAnimationFrame(() => {
      frames.delete(id);
      callback();
    });
    frames.add(id);
    return id;
  };
  const setTimeout = (fn, ms) => {
    const id = globalThis.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const listen = (target, event, callback, options = {}) =>
    target.addEventListener(event, callback, { ...options, signal: controller.signal });
  const document = {
    querySelector: (selector) => root.querySelector(selector),
    querySelectorAll: (selector) => root.querySelectorAll(selector),
    getElementById: (id) => Array.from(root.querySelectorAll("[id]")).find((e) => e.id === id),
    createElement: (tag) => globalThis.document.createElement(tag),
    body: root,
    get activeElement() {
      return globalThis.document.activeElement;
    },
    get title() {
      return globalThis.document.title;
    },
    set title(value) {
      globalThis.document.title = value;
    },
  };

  const DATA = {
    programs: [
      {
        id: "environment",
        name: "Kỹ thuật môi trường",
        code: "8520320",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Công nghệ hoá học, vật liệu, luyện kim và môi trường (75104)",
            eligible_majors: "Công nghệ Kỹ thuật môi trường (7510406).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật hoá học, vật liệu, luyện kim và môi trường (75203)",
            eligible_majors: "Kỹ thuật môi trường (7520320).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors: "Quản lý tài nguyên và môi trường (7850101).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khoa học môi trường (74403)",
            eligible_majors: "Khoa học môi trường (7440301).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật Xây dựng (75802)",
            eligible_majors: "Kỹ thuật tài nguyên nước (7580212).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Sinh học (74201)",
            eligible_majors: "Sinh học (7420101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Sinh học ứng dụng (74202)",
            eligible_majors:
              "Công nghệ sinh học (7420201); Kỹ thuật sinh học (7420202); Sinh học ứng dụng (7420203).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khoa học vật chất (74401)",
            eligible_majors: "Hoá học (7440112); Khoa học vật liệu (7440122).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khoa học trái đất (74402)",
            eligible_majors:
              "Địa chất học (7440201); Địa vật lý (7440210); Bản đồ, viễn thám và hệ thông tin địa lý (7440214); Khí tượng và khí hậu học (7440222); Thuỷ văn học (7440224); Hải dương học (7440228).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Công nghệ kỹ thuật kiến trúc và công trình xây dựng (75101)",
            eligible_majors:
              "Công nghệ Kỹ thuật xây dựng (7510103); Công nghệ kỹ thuật vật liệu xây dựng (7510105).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Công nghệ hoá học, vật liệu, luyện kim và môi trường (75104)",
            eligible_majors: "Công nghệ kỹ thuật hoá học (7510401); Công nghệ vật liệu (7510402).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Công nghệ dầu khí và khai thác (75107)",
            eligible_majors: "Công nghệ dầu khí và khai thác dầu (7510701).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật hoá học, vật liệu, luyện kim và môi trường (75203)",
            eligible_majors: "Kỹ thuật hoá học (7520301); Kỹ thuật vật liệu (7520309).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật địa chất, địa vật lý và trắc địa (75205)",
            eligible_majors: "Kỹ thuật địa chất (7520501).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật mỏ (75206)",
            eligible_majors: "Kỹ thuật dầu khí (7520604).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Chế biến lương thực, thực phẩm và đồ uống (75401)",
            eligible_majors: "Công nghệ thực phẩm (7540101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Xây dựng (75802)",
            eligible_majors: "Kỹ thuật xây dựng (7580201).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản lý xây dựng (75803)",
            eligible_majors: "Quản lý xây dựng (7580302).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Nông nghiệp (76201)",
            eligible_majors: "Nông nghiệp (7620101); Khoa học đất (7620103).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Lâm nghiệp (76202)",
            eligible_majors:
              "Lâm học (7620201); Lâm nghiệp (620210); Quản lý tài nguyên rừng (7620211).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Thuỷ sản (76203)",
            eligible_majors: "Khoa học thuỷ sản (7620303).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n\tCơ sở công nghệ môi trường (03TC);\n\tCông nghệ xử lý chất thải (nước, không khí, chất thải rắn).\n\t\n\tHội đồng Khoa học Khoa Môi trường sẽ quyết định lĩnh vực xử lý nước, chất thải rắn, không khí phù hợp tuỳ theo định hướng đào tạo của ứng viên và không quá 06 tín chỉ.\n\t\n\tỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Môi trường sẽ xem xét từng trường hợp cụ thể và đề xuất các học phần bổ sung kiến thức phù hợp với văn bằng, bảng điểm và định hướng đào tạo của ứng viên.",
          },
        ],
      },
      {
        id: "mba",
        name: "Quản trị kinh doanh",
        code: "8340101",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển kết hợp phỏng vấn",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kinh doanh (73401)",
            eligible_majors: "Quản trị kinh doanh (7340101)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Kinh tế học đại cương (3TC),\n2. Quản trị học (3TC),\n3. Marketing căn bản (3TC),\n4. Nguyên lý tài chính (3TC).",
          },
        ],
      },
      {
        id: "commerce",
        name: "Kinh doanh thương mại",
        code: "8340121",
        tracks: [{ name: "Ứng dụng", duration_months: 18 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Quản trị kinh doanh (7340101); Marketing (7340115); Bất động sản (7340116); Kinh doanh quốc tế (7340120); Kinh doanh thương mại (7340121); Thương mại điện tử (7340122)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Quản trị – Quản lý (73404)",
            eligible_majors:
              "Khoa học quản lý (7340401); Quản lý công (7340403); Quản trị nhân lực (7340404); Hệ thống thông tin quản lý (7340405); Quản trị văn phòng (7340406); Quản trị nhân lực (7340408); Quản lý dự án (7340409)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Tài chính - Ngân hàng - Bảo hiểm (73402)",
            eligible_majors:
              "Tài chính - Ngân hàng (7340201); Bảo hiểm (7340204); Công nghệ tài chính (7340205)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kế toán – Kiểm toán (73403)",
            eligible_majors: "Kế toán (7340301); Kiểm toán (7340302)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors: "Kinh tế số (7310109)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên học tối đa 12 TC bổ sung kiến thức:\n1. Kinh tế học đại cương (3 TC)\n2. Quản trị học (3 TC)\n3. Marketing căn bản (3 TC)\n4. Nguyên lý tài chính (3 TC)",
          },
        ],
      },
      {
        id: "biotech",
        name: "Công nghệ sinh học",
        code: "8420201",
        tracks: [{ name: "Nghiên cứu", duration_months: 24 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Sinh học ứng dụng (74202)",
            eligible_majors:
              "Công nghệ sinh hoc (7420201); Kỹ thuật sinh học (7420202); Sinh học ứng dụng (7420203).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Sinh học (74201);",
            eligible_majors: "Sinh học (7420101).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Đào tạo giáo viên (71402)",
            eligible_majors: "Sư phạm sinh học (7140213).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Chế biến lương thực, thực phẩm và đồ uống (75401)",
            eligible_majors:
              "Công nghệ thực phẩm (7540101); Công nghệ sau thu hoạch (7540104); Công nghệ chế biến thủy sản (7540105); Đảm bảo chất lượng và an toàn thực phẩm (7540106).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Nông nghiệp (76201)",
            eligible_majors:
              "Nông nghiệp (7620101); Khuyến nông (7620102); Khoa học Đất (7620103); Chăn nuôi (7620105); Nông học (7620109); Khoa học cây trồng (7620110); Bảo vệ thực vật (7620112); Kinh tế nông nghiệp (7620115); Phát triển nông thôn (7620116).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Dược học (77202)",
            eligible_majors:
              "Dược học (7720201); Công nghệ dược phẩm (7720202); Hóa dược (7720203).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Dinh dưỡng (77204)",
            eligible_majors: "Dinh dưỡng (7720401).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật y học (77206)",
            eligible_majors: "Kỹ thuật xét nghiệm y học (7720601).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors:
              "Quản lý tài nguyên và môi trường (7850101); Môi trường và phát triển bền vững (7850104).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Lâm nghiệp (76202)",
            eligible_majors: "Lâm học (7620201); Lâm nghiệp đô thị (7620202); Lâm sinh (7620205).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Thủy sản (76203)",
            eligible_majors: "Khoa học thủy sản (7620303).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Y học (77201)",
            eligible_majors: "Y học cổ truyền (7720115).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Thú y (76401)",
            eligible_majors: "Thú y (7640101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức (tối đa 6 tín chỉ) được chọn từ các học phần dưới đây:\nNhập môn Công nghệ sinh học (2TC)\nHóa sinh  (2TC) \nSinh học phân tử và Di truyền (2TC) \nKỹ thuật vi sinh (2TC) \nSinh lý người và động vật (2TC) \nSinh lý thực vật (2TC) \nCông nghệ gen (2TC)\nTin sinh học (2TC)\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Công nghệ Ứng dụng sẽ xem xét từng trường hợp cụ thể và đề xuất các học phần bổ sung kiến thức phù hợp với văn bằng, bảng điểm và định hướng đào tạo của ứng viên.",
          },
        ],
      },
      {
        id: "resources",
        name: "Quản lý tài nguyên và môi trường",
        code: "8850101",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Khoa học môi trường (74403)",
            eligible_majors: "Khoa học môi trường (7440301).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Công nghệ hóa học, vật liệu, luyện kim và môi trường (75104)",
            eligible_majors: "Công nghệ Kỹ thuật môi trường (7510406).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật hoá học, vật liệu, luyện kim và môi trường (75203)",
            eligible_majors: "Kỹ thuật môi trường (7520320).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors: "Quản lý tài nguyên và môi trường (7850101).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật Xây dựng (75802)",
            eligible_majors: "Kỹ thuật tài nguyên nước (7580212).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors: "Kinh tế học (7310101).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Báo chí và truyền thông (73201)",
            eligible_majors:
              "Báo chí học (7320101); Truyền thông đa phương tiện (7320104); Công nghệ truyền thông (7320106); Quan hệ công chúng (7320108).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors:
              "Quản lý kinh tế (7310110); Kinh tế quốc tế (7310106); Kinh tế phát triển (7310105).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors: "Quản trị kinh doanh (7340101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản trị - Quản lý (73404)",
            eligible_majors: "Khoa học quản lý (7340401); Quản lý dự án (7340409).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Luật (73801)",
            eligible_majors: "Luật (7380101); Luật kinh tế (7380107).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Sinh học (74201)",
            eligible_majors: "Sinh học (7420101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Sinh học ứng dụng (74202)",
            eligible_majors:
              "Công nghệ sinh học (7420201); Kỹ thuật sinh học (7420202); Sinh học ứng dụng (7420203).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khoa học vật chất (74401)",
            eligible_majors: "Hoá học (7440112); Khoa học vật liệu (7440122).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khoa học trái đất (74402)",
            eligible_majors:
              "Địa chất học (7440201); Địa vật lý (7440210); Bản đồ, viễn thám và hệ thông tin địa lý (7440214); Địa lý tự nhiên (7440217); Biến đổi khí hậu (7440221); Khí tượng và khí hậu học (7440221); Thuỷ văn học (7440224); Hải dương học (7440228).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khoa học môi trường (74403)",
            eligible_majors:
              "Quản lý, an toàn và sức khỏe môi trường (7440304); Bảo tôn thiên nhiên và đa dạng sinh học (7440306).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Công nghệ hoá học, vật liệu, luyện kim và môi trường (75104)",
            eligible_majors: "Công nghệ kỹ thuật hoá học (7510401); Công nghệ vật liệu (7510402).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản lý công nghiệp (75106)",
            eligible_majors:
              "Quản lý công nghiệp (7510601); Quản lý năng lượng (7510602); Kinh tế công nghiệp (7510604).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật hoá học, vật liệu, luyện kim và môi trường (75203)",
            eligible_majors: "Kỹ thuật hoá học (7520301); Kỹ thuật vật liệu (7520309).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật địa chất, địa vật lý và trắc địa (75205)",
            eligible_majors: "Kỹ thuật địa chất (7520501); Kỹ thuật trắc địa - bản đồ (7520503).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Chế biến lương thực, thực phẩm và đồ uống (75401)",
            eligible_majors: "Công nghệ thực phẩm (7540101).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kiến trúc và quy hoạch (75801)",
            eligible_majors:
              "Kiến trúc (7580101); Kiến trúc cảnh quan (7580102); Quy hoạch vùng và đô thị (7580105); Quản lý đô thị và công trình (7580106); Đô thị học (7580112).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Kỹ thuật xây dựng (75802)",
            eligible_majors: "Kỹ thuật xây dựng (7580201).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản lý xây dựng (75803)",
            eligible_majors: "Quản lý xây dựng (7580302).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Nông nghiệp (76201)",
            eligible_majors:
              "Nông nghiệp (7620101); Khoa học đất (7620103); Kinh tế nông nghiệp (7620115); Phát triển nông thôn (7620116).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Lâm nghiệp (76202)",
            eligible_majors:
              "Lâm học (7620201); Lâm nghiệp đô thị (7620202); Lâm nghiệp (7620210); Quản lý tài nguyên rừng (7620211).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Thuỷ sản (76203)",
            eligible_majors: "Khoa học thuỷ sản (7620303); Quản lý thuỷ sản (7620305).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors:
              "Quản lý đất đai (7850103); Môi trường và phát triển bền vững (7850104).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Dịch vụ an toàn lao động và vệ sinh công nghiệp (78502)",
            eligible_majors: "Bảo hộ lao động (7850201); An toàn, vệ sinh lao động (7850202).",
            supplementary_requirement:
              "Ứng viên sẽ học bổ sung kiến thức các học phần:\n1. Quản lý môi trường: Giải pháp cho các đô thị thông minh (02TC);\n2. Đánh giá tác động môi trường (03TC);\n3. Luật và chính sách môi trường (03TC).\n\nỨng viên có thể được miễn học phần bổ sung kiến thức nếu bảng điểm học tập minh chứng được học phần tương đương.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Môi trường sẽ xem xét từng trường hợp cụ thể và đề xuất các học phần bổ sung kiến thức phù hợp với văn bằng, bảng điểm và định hướng đào tạo của ứng viên.",
          },
        ],
      },
      {
        id: "architecture",
        name: "Kiến trúc",
        code: "8580101",
        tracks: [{ name: "Ứng dụng", duration_months: 18 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Công nghệ kỹ thuật kiến trúc và công trình xây dựng (75101)",
            eligible_majors: "Công nghệ kỹ thuật kiến trúc (7510101).",
            supplementary_requirement:
              "1) Ngành Kiến trúc các trường có chương trình đào tạo từ 150 tín chỉ ở bậc đại học trở lên sẽ không cần học bổ sung kiến thức.\n2) Các ngành và chương trình còn lại, tùy theo bảng điểm, sẽ học bổ sung tối đa 9TC. Các học phần gồm:\n1. Đồ án kiến trúc công cộng (3TC),\n2. Nguyên lý kiến trúc dân dụng, công nghiệp - nhà ở (3TC),\n3. Lịch sử kiến trúc Phương Tây, Phương Đông, Việt Nam (3TC).",
          },
          {
            group: "Kiến trúc và quy hoạch (75801)",
            eligible_majors:
              "Kiến trúc (7580101), Kiến trúc cảnh quan (7580102), Kiến trúc nội thất (7580103), Quy hoạch vùng và đô thị (7580105), Thiết kế nội thất (7580108).",
            supplementary_requirement:
              "1) Ngành Kiến trúc các trường có chương trình đào tạo từ 150 tín chỉ ở bậc đại học trở lên sẽ không cần học bổ sung kiến thức.\n2) Các ngành và chương trình còn lại, tùy theo bảng điểm, sẽ học bổ sung tối đa 9TC. Các học phần gồm:\n1. Đồ án kiến trúc công cộng (3TC),\n2. Nguyên lý kiến trúc dân dụng, công nghiệp - nhà ở (3TC),\n3. Lịch sử kiến trúc Phương Tây, Phương Đông, Việt Nam (3TC).",
          },
        ],
      },
      {
        id: "finance",
        name: "Tài chính Ngân hàng",
        code: "8340201",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Tài chính - Ngân hàng - Bảo hiểm (73402)",
            eligible_majors:
              "Tài chính - Ngân hàng (7340201), Bảo hiểm (7340204), Công nghệ tài chính (7340205).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Quản trị kinh doanh (7340101); Marketing (7340115); Bất động sản (7340116); Kinh doanh quốc tế (7340120); Kinh doanh thương mại (7340121); Thương mại điện tử (7340122).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 6TC bổ sung kiến thức gồm 3 môn học:\n1. Tài chính - Tiền tệ (2TC),\n2. Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2TC),\n3. Tài chính doanh nghiệp (2TC).",
          },
          {
            group: "Kế toán – Kiểm toán (73403)",
            eligible_majors: "Kế toán (7340301); Kiểm toán (7340302).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 6TC bổ sung kiến thức gồm 3 môn học:\n1. Tài chính - Tiền tệ (2TC),\n2. Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2TC),\n3. Tài chính doanh nghiệp (2TC).",
          },
          {
            group: "Quản trị – Quản lý (73404)",
            eligible_majors:
              "Khoa học quản lý (7340401); Quản lý công (7340403); Quản trị nhân lực (7340404); Hệ thống thông tin quản lý (7340405); Quản trị văn phòng (7340406); Quản lý dự án (7340409).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 6TC bổ sung kiến thức gồm 3 môn học:\n1. Tài chính - Tiền tệ (2TC),\n2. Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2TC),\n3. Tài chính doanh nghiệp (2TC).",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors:
              "Kinh tế học (7310101); Kinh tế chính trị (7310102); Kinh tế đầu tư (7310104); Kinh tế phát triển (7310105); Kinh tế quốc tế (7310106); Thống kê kinh tế (7310107); Toán kinh tế (7310108); Kinh tế số (7310109).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 6TC bổ sung kiến thức gồm 3 môn học:\n1. Tài chính - Tiền tệ (2TC),\n2. Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2TC),\n3. Tài chính doanh nghiệp (2TC).",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Đối với ngành chưa được liệt kê trong hai nhóm trên, Khoa phối hợp Viện Sau đại học xem xét từng trường hợp dựa trên chương trình đào tạo, nội dung kiến thức đã tích lũy và quy định tuyển sinh hiện hành; trình cấp có thẩm quyền quyết định trước khi áp dụng.",
          },
        ],
      },
      {
        id: "law",
        name: "Luật kinh tế",
        code: "8380107",
        tracks: [{ name: "Ứng dụng", duration_months: 18 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Luật (73801)",
            eligible_majors:
              "Luật (7380101); Luật hiến pháp và luật hành chính (7380102); Luật dân sự và tố tụng dân sự (7380103); Luật hình sự và tố tụng hình sự (7380104); Luật kinh tế (7380107); Luật quốc tế (7380108); Luật thương mại quốc tế (7380109); Tội phạm học và phòng ngừa tội phạm (7380105); Lý luận và lịch sử nhà nước và pháp luật (7380106).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khoa học giáo dục (71401)",
            eligible_majors: "Quản lý giáo dục (7140114).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Đào tạo giáo viên (71402)",
            eligible_majors:
              "Giáo dục công dân (7140204); Giáo dục chính trị (7140205); Giáo dục Quốc phòng - An ninh (7140208); Giáo dục pháp luật (7140248).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Ngôn ngữ, văn học và văn hóa nước ngoài (72202)",
            eligible_majors: "Ngôn ngữ Anh \n(chuyên ngành Anh văn pháp lý) (7220201).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Khác (72290)",
            eligible_majors: "Quản lý văn hóa (7229042)",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors:
              "Kinh tế học (7310101); Kinh tế chính trị (7310102); Kinh tế đầu tư (7310104); Kinh tế phát triển (7310105); Kinh tế quốc tế (7310106); Quản lý kinh tế (7310110); Kinh tế số (7310109).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Khoa học chính trị (73102)",
            eligible_majors:
              "Chính trị học (7310201); Quản lý nhà nước (7310205); Quan hệ quốc tế (7310206).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Khu vực học (73106)",
            eligible_majors: "Quốc tế học (7310601).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Báo chí và truyền hông (73201)",
            eligible_majors:
              "Báo chí học (7320101); Truyền thông đa phương tiện (7320104); Truyền thông đại chúng (7320105); Công nghệ truyền thông (7320106); Truyền thông quốc tế (7320107); Quan hệ công chúng (7320108).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Thông tin - Thư viện (73202)",
            eligible_majors: "Thông tin học (7320202).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Quản trị kinh doanh (7340101); Marketing (7340115); Bất động sản (7340116); Kinh doanh quốc tế (7340120); Kinh doanh thương mại (7340121); Thương mại điện tử (7340122); Logistics và quản lý chuỗi cung ứng (7340123/7510605).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Tài chính - Ngân hàng - Bảo hiểm (73402)",
            eligible_majors:
              "Tài chính - Ngân hàng (7340201); Bảo hiểm (7340204); Công nghệ tài chính (7340205).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Kế Toán - Kiểm Toán (73403)",
            eligible_majors: "Kế toán (7340301); Kiểm toán (7340302).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Quản Trị - Quản Lý (73404)",
            eligible_majors:
              "Khoa học quản lý (7340401); Quản lý công (7340403); Quản trị nhân lực (7340404); Quản trị văn phòng (7340406); Quản lý dự án (7340409).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Quản lý công nghiệp (75106)",
            eligible_majors: "Quản lý công nghiệp (7510601); Kinh tế công nghiệp (7510604).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Kiến trúc và quy hoạch (75801)",
            eligible_majors: "Quản lý đô thị và công trình (7580106).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Quản lý xây dựng (75803)",
            eligible_majors: "Quản lý xây dựng (7580302).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Nông nghiệp (76201)",
            eligible_majors: "Kinh tế nông nghiệp (7620115).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Lâm nghiệp (76202)",
            eligible_majors: "Quản lý tài nguyên rừng (7620211).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Thủy sản (76203)",
            eligible_majors: "Quản lý thủy sản (7620305).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Quản lý Y tế (77208)",
            eligible_majors: "Quản lý y tế (7720801).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Du lịch (78101)",
            eligible_majors: "Du lịch (7810101).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Khách sạn, nhà hàng (78102)",
            eligible_majors:
              "Quản trị khách sạn (7810201); Quản trị nhà hàng và dịch vụ ăn uống (7810202).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Thể dục, thể thao (78103)",
            eligible_majors: "Quản lý thể dục thể thao (7810301).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Kinh tế gia đình (78105)",
            eligible_majors: "Kinh tế gia đình (7810501).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Khai thác vận tải (78401)",
            eligible_majors:
              "Khai thác vận tải (7840101); Quản lý hoạt động bay (7840102); Kinh tế vận tải (7840104).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors:
              "Quản lý tài nguyên và môi trường (7850101); Quản lý đất đai (7850103).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
          {
            group: "An ninh và trật tự xã hội (78601)",
            eligible_majors:
              "Trinh sát an ninh (7860101); Trinh sát cảnh sát (7860102); Điều tra hình sự (7860104); Quản lý nhà nước về an ninh trật tự (7860109); Quản lý trật tự an toàn giao thông (7860110); Thi hành án hình sự và hỗ trợ tư pháp (7860111); Tham mưu, chỉ huy công an nhân dân (7860112); An ninh mạng và phòng chống tội phạm sử dụng công nghệ cao (7860114).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 19TC bổ sung kiến thức gồm 6 môn học*:\n1. Luật Doanh nghiệp (3TC),\n2. Luật Thương mại (3TC),\n3. Luật Dân sự và Luật tố tụng dân sự (4TC),\n4. Luật Thương mại quốc tế (3TC),\n5. Luật Hiến pháp và Luật Hành chính (3TC),\n6. Luật Hình sự và Luật Tố tụng hình sự (3TC).\n(*): Học viên được xét công nhận và chuyển đổi tín chỉ đối với các học phần trong danh mục này nếu đã học trong chương trình đào tạo đại học. Hội đồng chuyên môn xem xét công nhận, chuyển đổi tín chỉ trên cơ sở đối sánh chuẩn đầu ra, nội dung và khối lượng học tập, cách thức đánh giá học phần và các điều kiện bảo đảm chất lượng thực hiện chương trình.",
          },
        ],
      },
      {
        id: "arts",
        name: "Mỹ thuật ứng dụng",
        code: "8210410",
        tracks: [{ name: "Ứng dụng", duration_months: 18 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển kết hợp phỏng vấn",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 100000000,
            installments_vnd: [35000000, 30000000, 35000000],
            installment_percent: [35, 30, 35],
          },
          {
            language: "Tiếng Anh",
            specialization: "Design Innovation",
            total_vnd: 160000000,
            installments_vnd: [56000000, 48000000, 56000000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Mỹ thuật ứng dụng (72104)",
            eligible_majors:
              "Thiết kế Công nghiệp (7210402), Thiết kế Đồ họa (7210403), Thiết kế Thời trang (7210404), Thiết kế mỹ thuật sân khấu, điện ảnh (7210406), Thiết kế Mỹ thuật số (7210409).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kiến trúc nội thất (75801)",
            eligible_majors: "Thiết kế Nội thất (7580108).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Mỹ thuật (72101)",
            eligible_majors: "Mỹ thuật đô thị (7210110).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Tư duy thiết kế (2TC),\n2. Mỹ thuật học (2TC).",
          },
          {
            group: "Kiến trúc và Quy hoạch (75801)",
            eligible_majors:
              "Kiến trúc (7580101), Kiến trúc cảnh quan (7580102), Kiến trúc Nội thất (7580103), Kiến trúc Đô thị (7580104).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Tư duy thiết kế (2TC),\n2. Mỹ thuật học (2TC).",
          },
          {
            group: "Báo chí truyền thông (73201)",
            eligible_majors:
              "Thiết kế truyền thông đa phương tiện (7320104), Công nghệ truyền thông (7320106).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Tư duy thiết kế (2TC),\n2. Mỹ thuật học (2TC).\n3. Lịch sử Mỹ thuật (3TC)\n4. Văn hóa dân tộc học nghệ thuật (3TC).",
          },
          {
            group: "Công nghệ thông tin (7480201)",
            eligible_majors:
              "Khoa học máy tính (7480101), trí tuệ nhân tạo (AI) (7480107), khoa học dữ liệu (7460108)",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Tư duy thiết kế (2TC),\n2. Mỹ thuật học (2TC).\n3. Lịch sử Mỹ thuật (3TC)\n4. Văn hóa dân tộc học nghệ thuật (3TC).",
          },
        ],
      },
      {
        id: "hospitality",
        name: "Quản trị khách sạn",
        code: "8810201",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Du lịch (78101)",
            eligible_majors: "Du lịch (7810101), Quản trị dịch vụ du lịch và lữ hành (7810103).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khách sạn, nhà hàng (78102)",
            eligible_majors:
              "Quản trị khách sạn (7810201), Quản trị nhà hàng và dịch vụ ăn uống (7810202).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors: "Kinh tế (7310101), Kinh tế phát triển (7310105).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 06TC bổ sung kiến thức gồm 2 môn học:\n1. Tổng quan du lịch (3TC),\n2. Quản trị tiền sảnh (3TC).",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Quản trị kinh doanh (7340101), Marketing (7340115), Kinh doanh quốc tế (7340120), Kinh doanh thương mại (7340121).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 06TC bổ sung kiến thức gồm 2 môn học:\n1. Tổng quan du lịch (3TC),\n2. Quản trị tiền sảnh (3TC).",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 09TC bổ sung kiến thức gồm 3 môn học:\n1. Tổng quan du lịch (3TC),\n2. Quản trị tiền sảnh (3TC),\n3. Marketing du lịch (3TC).",
          },
        ],
      },
      {
        id: "accounting",
        name: "Kế toán",
        code: "8340301",
        tracks: [{ name: "Ứng dụng", duration_months: 18 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kế toán - Kiểm toán (73403)",
            eligible_majors: "Kế toán (7340301); Kiểm toán (7340302).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh tế học (73101)",
            eligible_majors:
              "Kinh tế học (7310101); Kinh tế chính trị (7310102); Kinh tế đầu tư (7310104); Kinh tế phát triển (7310105), Kinh tế quốc tế (7310106), Thống kê kinh tế (7310107); Toán kinh tế (7310108); Kinh tế số (7310109), Quản lý kinh tế (7310110).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Nguyên lý kế toán (3 TC)\n2. Kế toán tài chính (3 TC)\n3. Kế toán quản trị (3 TC)\n4. Kiểm toán và dịch vụ đảm bảo (3 TC)",
          },
          {
            group: "Khoa học chính trị (73102)",
            eligible_majors: "Quản lý nhà nước (7310205), Quan hệ quốc tế (7310206).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Nguyên lý kế toán (3 TC)\n2. Kế toán tài chính (3 TC)\n3. Kế toán quản trị (3 TC)\n4. Kiểm toán và dịch vụ đảm bảo (3 TC)",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Quản trị kinh doanh (7340101); Marketing (7340115); Bất động sản (340116/7340116), Kinh doanh quốc tế (7340120); Kinh doanh thương mại (7340121); Thương mại điện tử (7340122), Kinh doanh thương mại (7340123).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Nguyên lý kế toán (3 TC)\n2. Kế toán tài chính (3 TC)\n3. Kế toán quản trị (3 TC)\n4. Kiểm toán và dịch vụ đảm bảo (3 TC)",
          },
          {
            group: "Tài chính - Ngân hàng - Bảo hiểm (73402)",
            eligible_majors:
              "Tài chính - Ngân hàng (7340201), Bảo hiểm (7340204), Công nghệ tài chính (7340205).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Nguyên lý kế toán (3 TC)\n2. Kế toán tài chính (3 TC)\n3. Kế toán quản trị (3 TC)\n4. Kiểm toán và dịch vụ đảm bảo (3 TC)",
          },
          {
            group: "Quản trị - Quản lý (73404)",
            eligible_majors:
              "Khoa học quản lý (7340401); Quản lý công (7340403), Quản trị nhân lực (7340404); Hệ thống thông tin quản lý (7340405); Quản trị văn phòng (7340406), Quản trị nhân lực (7340408), Quản lý dự án (340409/7340409).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Nguyên lý kế toán (3 TC)\n2. Kế toán tài chính (3 TC)\n3. Kế toán quản trị (3 TC)\n4. Kiểm toán và dịch vụ đảm bảo (3 TC)",
          },
        ],
      },
      {
        id: "english",
        name: "Ngôn ngữ Anh",
        code: "8220201",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Anh",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Ngôn ngữ, văn học và văn hóa nước ngoài\n(72202)",
            eligible_majors: "Ngôn ngữ Anh (7220201)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Đào tạo giáo viên (71402)",
            eligible_majors:
              "Sư phạm tiếng nước ngoài (7140238) chuyên ngành Sư phạm tiếng Anh; hoặc ngành Sư phạm tiếng Anh theo Thông tư 09 (7140123)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khoa học giáo dục (71401)",
            eligible_majors: "Giáo dục học (7140101), Quản lý giáo dục (7140114).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 12TC bổ sung kiến thức gồm 4 môn học:\n1. Hình thái học & cú pháp học (3TC),\n2. Ngữ âm & Âm vị học (3TC),\n3. Ngữ nghĩa học (3TC),\n4. Kỹ năng viết học thuật (3TC).\nNgoài học bổ sung kiến thức, ứng viên cần bổ sung chứng chỉ tương đương bậc 4 khung năng lực 6 bậc cho người Việt Nam trở lên mới đủ điều kiện xét tuyển.",
          },
        ],
      },
      {
        id: "construction",
        name: "Kỹ thuật xây dựng",
        code: "8580201",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kỹ thuật xây dựng (5802/75802)",
            eligible_majors:
              "Kỹ thuật xây dựng (7580201); Kỹ thuật xây dựng công trình thủy (7580202); Kỹ thuật xây dựng công trình ngầm (7580204); Kỹ thuật xây dựng công trình giao thông (7580205); Kỹ thuật cơ sở hạ tầng (7580210); Địa kỹ thuật (7580211); Kỹ thuật tài nguyên nước (7580212); Kỹ thuật an toàn giao thông (7580215).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Quản lý xây dựng (75803)",
            eligible_majors: "Quản lý xây dựng (7580302).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Công nghệ kỹ thuật kiến trúc và công trình xây dựng (75101)",
            eligible_majors:
              "Công nghệ kỹ thuật kiến trúc (7510101); Công nghệ kỹ thuật xây dựng (7510103); Công nghệ kỹ thuật giao thông (7510104); Công nghệ kỹ thuật vật liệu xây dựng (7510105).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kiến trúc và quy hoạch (75801)",
            eligible_majors:
              "Kiến trúc (7580101); Kiến trúc cảnh quan (7580102); Kiến trúc nội thất (7580103); Quy hoạch vùng và đô thị (7580105); Quản lý đô thị và công trình (7580106); Thiết kế nội thất (7580108); Đô thị học (7580112).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật địa chất, địa vật lý và trắc địa (75205)",
            eligible_majors:
              "Kỹ thuật địa chất (7520501); Kỹ thuật địa vật lý (7520502); Kỹ thuật trắc địa - bản đồ (7520503).",
            supplementary_requirement:
              "Tùy theo từng trường hợp, học viên có thể học một hoặc một số học phần trong các học phần sau:\n1. Sức bền vật liệu 1 (3TC),\n2. Cơ học kết cấu 1 (3TC),\n3. Vật liệu xây dựng (2TC),\n4. Kết cấu bê tông cốt thép 1 (3TC),\n5. Kết cấu thép 1 (3TC),\n6. Kỹ thuật thi công 1 (3TC),\n7. Tổ chức thi công & An toàn lao động (3TC),\n8. Nền móng (3TC).",
          },
          {
            group: "Khoa học trái đất (74402)",
            eligible_majors:
              "Địa chất học (7440201); Địa vật lý (7440210); Bản đồ, viễn thám và hệ thông tin địa lý (7440214); Địa lý tự nhiên (7440217); Biến đổi khí hậu (7440221); Khí tượng và khí hậu học (7440222); Thủy văn học (7440224); Hải dương học (7440228).",
            supplementary_requirement:
              "Tùy theo từng trường hợp, học viên có thể học một hoặc một số học phần trong các học phần sau:\n1. Sức bền vật liệu 1 (3TC),\n2. Cơ học kết cấu 1 (3TC),\n3. Vật liệu xây dựng (2TC),\n4. Kết cấu bê tông cốt thép 1 (3TC),\n5. Kết cấu thép 1 (3TC),\n6. Kỹ thuật thi công 1 (3TC),\n7. Tổ chức thi công & An toàn lao động (3TC),\n8. Nền móng (3TC).",
          },
          {
            group: "Quản lý tài nguyên và môi trường (78501)",
            eligible_majors:
              "Quản lý tài nguyên và môi trường (7850101); Quản lý đất đai (7850103); Môi trường và phát triển bền vững (7850104).",
            supplementary_requirement:
              "Tùy theo từng trường hợp, học viên có thể học một hoặc một số học phần trong các học phần sau:\n1. Sức bền vật liệu 1 (3TC),\n2. Cơ học kết cấu 1 (3TC),\n3. Vật liệu xây dựng (2TC),\n4. Kết cấu bê tông cốt thép 1 (3TC),\n5. Kết cấu thép 1 (3TC),\n6. Kỹ thuật thi công 1 (3TC),\n7. Tổ chức thi công & An toàn lao động (3TC),\n8. Nền móng (3TC).",
          },
          {
            group: "Lâm nghiệp (76202)",
            eligible_majors:
              "Lâm học (7620201); Lâm nghiệp đô thị (7620202); Lâm sinh (7620205); Lâm nghiệp (7620210); Quản lý tài nguyên rừng (7620211).",
            supplementary_requirement:
              "Tùy theo từng trường hợp, học viên có thể học một hoặc một số học phần trong các học phần sau:\n1. Sức bền vật liệu 1 (3TC),\n2. Cơ học kết cấu 1 (3TC),\n3. Vật liệu xây dựng (2TC),\n4. Kết cấu bê tông cốt thép 1 (3TC),\n5. Kết cấu thép 1 (3TC),\n6. Kỹ thuật thi công 1 (3TC),\n7. Tổ chức thi công & An toàn lao động (3TC),\n8. Nền móng (3TC).",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Xây dựng sẽ xem xét từng trường hợp cụ thể và đề xuất các học phần bổ sung kiến thức phù hợp với văn bằng, bảng điểm và định hướng đào tạo của ứng viên.",
          },
        ],
      },
      {
        id: "art-theory",
        name: "Lý luận và lịch sử mỹ thuật ứng dụng",
        code: "8210401",
        tracks: [{ name: "Nghiên cứu", duration_months: 24 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 100000000,
            installments_vnd: [35000000, 30000000, 35000000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Mỹ thuật (72101)",
            eligible_majors: "Lý luận Lịch sử và Phê bình Mỹ thuật (7210101).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Mỹ thuật (72101)",
            eligible_majors:
              "Hội họa (7210103), Đồ họa (7210104), Điêu khắc (7210105), Gốm Mỹ thuật (7210107), Mỹ thuật Đô thị (7210110).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC).",
          },
          {
            group: "Đào tạo giáo viên (71402)",
            eligible_majors: "Sư phạm Mỹ thuật (7140222).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC).",
          },
          {
            group: "Mỹ thuật ứng dụng (72104)",
            eligible_majors:
              "Thiết kế Công nghiệp (7210402), Thiết kế Đồ họa (7210403), Thiết kế Thời trang (7210404), Thiết kế Mỹ thuật Sân khấu - Điện ảnh (7210406), Thiết kế Mỹ thuật số (7210409).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC).",
          },
          {
            group: "Báo chí truyền thông (73201)",
            eligible_majors:
              "Thiết kế truyền thông đa phương tiện (7320104), Công nghệ truyền thông (7320106).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC).",
          },
          {
            group: "Kiến trúc và Quy hoạch (75801)",
            eligible_majors:
              "Kiến trúc (7580101), Kiến trúc cảnh quan (7580102), Kiến trúc Nội thất (7580103), Kiến trúc Đô thị (7580104).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 4TC bổ sung kiến thức gồm 2 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC).",
          },
          {
            group: "Kiến trúc và Quy hoạch (75801)",
            eligible_majors: "Bảo tồn Di sản kiến trúc và Đô thị (7580111).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
          {
            group: "Công nghệ Kỹ thuật in (75108)",
            eligible_majors: "Công nghệ Kỹ thuật in (7510801).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
          {
            group: "Nghệ thuật trình diễn (72102)",
            eligible_majors:
              "Lý luận và Lịch sử Sân khấu (7210221), Lý luận và Lịch sử Điện ảnh truyền hình (7210231).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
          {
            group: "Nghệ thuật Nghe nhìn (72103)",
            eligible_majors: "Nhiếp ảnh (7210301), Công nghệ điện ảnh truyền hình (7210302).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
          {
            group: "Khác (75490)",
            eligible_majors:
              "Công nghệ chế biến lâm sản (7549001), Kỹ nghệ gỗ và nội thất (7549002).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
          {
            group: "Khác (72290)",
            eligible_majors:
              "Văn hóa học (7229040), Khảo cổ học (7229017), Lịch sử Thế giới (7229011), Lịch sử Việt Nam (7229013).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 10TC bổ sung kiến thức gồm 5 môn học:\n1. Lịch sử Mỹ thuật (2TC),\n2. Văn hóa dân tộc học nghệ thuật (2TC),\n3. Mỹ thuật học (2TC).\n4. Lịch sử Design (2TC),\n5. Phương pháp luận sáng tạo (2TC).",
          },
        ],
      },
      {
        id: "pr",
        name: "Quan hệ công chúng",
        code: "8320108",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển kết hợp phỏng vấn",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 110000000,
            installments_vnd: [38500000, 33000000, 38500000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Báo chí và truyền thông (73201)",
            eligible_majors: "Quan hệ công chúng (7320108), Truyền thông đa phương tiện (7320104).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 05 môn học:\n1. Nhập môn Quan hệ công chúng (3TC);\n2. Lập kế hoạch Quan hệ công chúng (3TC);\n3. Kỹ năng viết cho Quan hệ công chúng (3TC);\n4. Marketing căn bản (3TC);\n5. Tâm lý học truyền thông (3TC).",
          },
        ],
      },
      {
        id: "logistics",
        name: "Logistics và quản lý chuỗi cung ứng",
        code: "8510605",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
          {
            language: "Tiếng Anh",
            specialization: null,
            total_vnd: 175000000,
            installments_vnd: [61250000, 52500000, 61250000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kinh doanh (73401)",
            eligible_majors: "Logistics và quản lý chuỗi cung ứng (7340123/7510605)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật cơ khí và cơ kỹ thuật (75201)",
            eligible_majors: "Kỹ thuật Hệ thống Công nghiệp (7520118)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Quản lý công nghiệp (75106)",
            eligible_majors: "Quản lý Công nghiệp (7510601)",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 6TC bổ sung kiến thức gồm 3 môn học:\n1. Quản trị sản xuất (2TC),\n2. Quản trị Logistics và chuỗi cung ứng (2TC),\n3. Các mô hình toán ứng dụng (2TC).",
          },
        ],
      },
      {
        id: "automotive",
        name: "Kỹ thuật ô tô",
        code: "8520130",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 85000000,
            installments_vnd: [29750000, 25500000, 29750000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Công nghệ kỹ thuật cơ khí (75102)",
            eligible_majors: "Công nghệ kỹ thuật ô tô (7510205).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kỹ thuật cơ khí và cơ kỹ thuật (75201)",
            eligible_majors: "Kỹ thuật ô tô (7520130), Kỹ thuật cơ khí động lực (7520116).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Công nghệ kỹ thuật cơ khí (75102)",
            eligible_majors:
              "Công nghệ kỹ thuật cơ khí (7510201), Công nghệ kỹ thuật cơ điện tử (7510203), Công nghệ kỹ thuật nhiệt (7510206), Công nghệ kỹ thuật tàu thủy (7510207), Bảo dưỡng công nghiệp (7510211).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 9TC bổ sung kiến thức gồm 3 môn học:\n1. Động cơ đốt trong (3TC),\n2. Lý thuyết ô tô (3TC),\n3. Hệ thống điện - điện tử ô tô (3TC).",
          },
          {
            group: "Kỹ thuật cơ khí và cơ kỹ thuật (75201)",
            eligible_majors:
              "Kỹ thuật cơ khí (7520103), Kỹ thuật cơ điện tử (7520114), Kỹ thuật nhiệt (7520115), Kỹ thuật công nghiệp (7520117), Kỹ thuật hệ thống công nghiệp (7520118), Kỹ thuật hàng không (7520120), Kỹ thuật tàu thủy (7520122).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 9TC bổ sung kiến thức gồm 3 môn học:\n1. Động cơ đốt trong (3TC),\n2. Lý thuyết ô tô (3TC),\n3. Hệ thống điện - điện tử ô tô (3TC).",
          },
          {
            group: "Công nghệ kỹ thuật kiến trúc và công trình xây dựng (75101)",
            eligible_majors:
              "Công nghệ kỹ thuật kiến trúc (7510101), Công nghệ Kỹ thuật xây dựng (7510103), Công nghệ kỹ thuật giao thông (7510104), Công nghệ kỹ thuật vật liệu xây dựng (7510105).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Công nghệ kỹ thuật điện, điện tử và viễn thông (75103)",
            eligible_majors:
              "Công nghệ kỹ thuật điện, điện tử (7510301), Công nghệ kỹ thuật điện tử - viễn thông (7510302), Công nghệ kỹ thuật điều khiển và tự động hóa (7510303).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Công nghệ hóa học, vật liệu, luyện kim và môi trường (75104)",
            eligible_majors:
              "Công nghệ kỹ thuật hóa học (7510401), Công nghệ vật liệu (7510402), Công nghệ Kỹ thuật môi trường (7510406).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Quản lý công nghiệp (75106)",
            eligible_majors:
              "Quản lý công nghiệp (7510601), Quản lý năng lượng (7510602), Kinh tế công nghiệp (7510604).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Công nghệ dầu khí và khai thác (75107)",
            eligible_majors: "Công nghệ dầu khí và khai thác dầu (7510701).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Công nghệ kỹ thuật in (75108)",
            eligible_majors: "Công nghệ kỹ thuật in (7510801).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Kỹ thuật cơ khí và cơ kỹ thuật (75201)",
            eligible_majors:
              "Cơ kỹ thuật (7520101), Kỹ thuật Robot (7520107), Kỹ thuật không gian (7520121), Kỹ thuật năng lượng (7520135), Kỹ thuật in (7520137), Kỹ thuật hàng hải (7520138).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Kỹ thuật điện, điện tử và viễn thông (75202)",
            eligible_majors:
              "Kỹ thuật điện (7520201), Thiết kế vi mạch (7520202), Kỹ thuật điện tử (7520203), Kỹ thuật rađa - dẫn đường (7520204), Kỹ thuật điện tử - viễn thông (7520207), Kỹ thuật mật mã (7520209), Kỹ thuật y sinh (7520212), Kỹ thuật điều khiển và tự động hóa (7520216).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Kỹ thuật hóa học, vật liệu, luyện kim và môi trường (75203)",
            eligible_majors:
              "Kỹ thuật hóa học (7520301), Kỹ thuật vật liệu (7520309), Kỹ thuật dệt, may (7520312), Kỹ thuật môi trường (7520320).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Vật lý kỹ thuật (75204)",
            eligible_majors: "Vật lý kỹ thuật (7520401), Kỹ thuật hạt nhân (7520402).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Kỹ thuật địa chất, địa vật lý và trắc địa (75205)",
            eligible_majors:
              "Kỹ thuật địa chất (7520501), Kỹ thuật địa vật lý (7520502), Kỹ thuật trắc địa - bản đồ (7520503).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
          {
            group: "Kỹ thuật mỏ (75206)",
            eligible_majors:
              "Kỹ thuật mỏ (7520601), Khai thác mỏ (7520603), Kỹ thuật dầu khí (7520604), Kỹ thuật tuyển khoáng (7520607).",
            supplementary_requirement:
              "Ứng viên sẽ học tối đa 15TC bổ sung kiến thức gồm 5 môn học:\n1. Lý thuyết ô tô (3TC),\n2. Hệ thống điện - điện tử ô tô (3TC),\n3. Kết cấu ô tô (3TC),\n4. Tính toán thiết kế ô tô (3TC),\n5. Công nghệ chẩn đoán sửa chữa ô tô (3TC).",
          },
        ],
      },
      {
        id: "marketing",
        name: "Marketing",
        code: "8340115",
        tracks: [{ name: "Nghiên cứu", duration_months: 24 }],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 90000000,
            installments_vnd: [31500000, 27000000, 31500000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Kinh doanh (73401)",
            eligible_majors:
              "Marketing (7340115); Quản trị kinh doanh (7340101); Kinh doanh quốc tế (7340120); Kinh doanh thương mại (7340121); Thương mại điện tử (7340122).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Kinh doanh (73401)",
            eligible_majors: "Logistics và Quản lý chuỗi cung ứng (7340123/7510605)",
            supplementary_requirement:
              "Ứng viên được xét miễn từng học phần tương đương theo bảng điểm và nội dung đã học; học bổ sung phần còn thiếu, tối đa 12TC trong 4 học phần: Kinh tế học đại cương, Quản trị học, Marketing căn bản và Nguyên lý tài chính (mỗi học phần 3TC).",
          },
          {
            group: "Quản trị – Quản lý (73404)",
            eligible_majors: "Hệ thống thông tin quản lý (7340405).",
            supplementary_requirement:
              "Ứng viên được xét miễn từng học phần tương đương theo bảng điểm và nội dung đã học; học bổ sung phần còn thiếu, tối đa 12TC trong 4 học phần: Kinh tế học đại cương, Quản trị học, Marketing căn bản và Nguyên lý tài chính (mỗi học phần 3TC).",
          },
          {
            group: "Báo chí và truyền thông (73201)",
            eligible_majors:
              "Truyền thông đa phương tiện (7320104); Công nghệ truyền thông (7320106); Quan hệ công chúng (7320108).",
            supplementary_requirement:
              "Ứng viên được xét miễn từng học phần tương đương theo bảng điểm và nội dung đã học; học bổ sung phần còn thiếu, tối đa 12TC trong 4 học phần: Kinh tế học đại cương, Quản trị học, Marketing căn bản và Nguyên lý tài chính (mỗi học phần 3TC).",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Ứng viên học tối đa 12TC gồm 4 học phần: Kinh tế học đại cương (3TC), Quản trị học (3TC), Marketing căn bản (3TC), Nguyên lý tài chính (3TC). Có thể được miễn học phần tương đương nếu bảng điểm hoặc hồ sơ minh chứng đã tích lũy nội dung tương ứng.",
          },
        ],
      },
      {
        id: "it",
        name: "Công nghệ thông tin",
        code: "8480201",
        tracks: [
          { name: "Ứng dụng", duration_months: 18 },
          { name: "Nghiên cứu", duration_months: 24 },
        ],
        intakes: [1, 2, 3],
        assessment: "Xét tuyển",
        tuition_variants: [
          {
            language: "Tiếng Việt",
            specialization: null,
            total_vnd: 90000000,
            installments_vnd: [31500000, 27000000, 31500000],
            installment_percent: [35, 30, 35],
          },
        ],
        bsk_groups: [
          {
            group: "Máy tính (74801)",
            eligible_majors:
              "Khoa học máy tính (7480101); Mạng máy tính và truyền thông dữ liệu (7480102); \nKỹ thuật phần mềm (7480103); Hệ thống thông tin (7480104); Kỹ thuật máy tính (7480106); Trí tuệ nhân tạo (7480107); Công nghệ kỹ thuật máy tính (7480108).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Công nghệ thông tin (74802)",
            eligible_majors: "Công nghệ thông tin (7480201); An ninh mạng (7480208).",
            supplementary_requirement: "Ứng viên không cần học bổ sung kiến thức.",
          },
          {
            group: "Toán học (74601)",
            eligible_majors: "Khoa học dữ liệu (7460108); Toán tin (7460117).",
            supplementary_requirement:
              "Ứng viên phải hoàn tất toàn bộ 05 học phần bổ sung kiến thức (15 tín chỉ) trước khi xét tuyển và nhập học chính thức:\nKỹ thuật lập trình (03 TC);\nCấu trúc dữ liệu và giải thuật (03 TC);\nCơ sở dữ liệu (03 TC);\nXác suất thống kê ứng dụng (03 TC);\nNhập môn Trí tuệ nhân tạo (03 TC).\nTổng số tín chỉ bổ sung kiến thức: 15 tín chỉ.",
          },
          {
            group: "Kỹ thuật điện, điện tử và viễn thông (75202)",
            eligible_majors:
              "Kỹ thuật điện tử - viễn thông (7520207); \nKỹ thuật điều khiển và tự động hóa (7520216).",
            supplementary_requirement:
              "Ứng viên phải hoàn tất toàn bộ 05 học phần bổ sung kiến thức (15 tín chỉ) trước khi xét tuyển và nhập học chính thức:\nKỹ thuật lập trình (03 TC);\nCấu trúc dữ liệu và giải thuật (03 TC);\nCơ sở dữ liệu (03 TC);\nXác suất thống kê ứng dụng (03 TC);\nNhập môn Trí tuệ nhân tạo (03 TC).\nTổng số tín chỉ bổ sung kiến thức: 15 tín chỉ.",
          },
          {
            group: "Kỹ thuật cơ khí và cơ kỹ thuật (75201)",
            eligible_majors: "Kỹ thuật cơ khí (7520103); \nKỹ thuật cơ điện tử (7520114).",
            supplementary_requirement:
              "Ứng viên phải hoàn tất toàn bộ 05 học phần bổ sung kiến thức (15 tín chỉ) trước khi xét tuyển và nhập học chính thức:\nKỹ thuật lập trình (03 TC);\nCấu trúc dữ liệu và giải thuật (03 TC);\nCơ sở dữ liệu (03 TC);\nXác suất thống kê ứng dụng (03 TC);\nNhập môn Trí tuệ nhân tạo (03 TC).\nTổng số tín chỉ bổ sung kiến thức: 15 tín chỉ.",
          },
          {
            group: "Khác",
            eligible_majors: "Những ngành không được liệt kê ở trên.",
            supplementary_requirement:
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Công nghệ thông tin sẽ xem xét từng trường hợp cụ thể và đề xuất các học phần bổ sung kiến thức phù hợp với văn bằng, bảng điểm và định hướng đào tạo của ứng viên, tối đa 15 tín chỉ.",
          },
        ],
      },
    ],
    scholarships: {
      development: {
        title: "Học bổng Phát triển năng lực",
        rates: [
          {
            graduation_class: "Xuất sắc",
            valedictorian: 50,
            salutatorian_1: 40,
            salutatorian_2: 35,
            no_honor: 30,
          },
          {
            graduation_class: "Giỏi",
            valedictorian: 30,
            salutatorian_1: 25,
            salutatorian_2: 20,
            no_honor: 15,
          },
          {
            graduation_class: "Khá",
            valedictorian: 20,
            salutatorian_1: 15,
            salutatorian_2: 15,
            no_honor: null,
          },
        ],
        eligibility: [
          "Đã trúng tuyển chương trình thạc sĩ.",
          "Tính từ được công nhận tốt nghiệp đại học đến được công nhận trúng tuyển thạc sĩ không quá24 tháng.",
          "Xếp loại và danh hiệu theo văn bằng, bảng điểm, quyết định hoặc minh chứng hợp lệ của cơ sở đào tạo.",
        ],
        ambiguous_salutatorian:
          "Tốt nghiệp Giỏi trở lên có danh hiệu Á khoa nhưng không rõ Á khoa1/2: Xuất sắc40%, Giỏi25%.",
        maintenance: [
          "Kết quả học tập xếp loại Khá trở lên.",
          "Học đúng lộ trình chuẩn của chương trình.",
          "Không vi phạm pháp luật hoặc quy định của Trường.",
        ],
        maintenance_failure: "Ngừng áp dụng từ thời điểm không còn đáp ứng điều kiện.",
      },
      stem: {
        title: "Học bổng đồng hành STEM",
        female_percent: 15,
        male_percent: 10,
        eligible_programs:
          "Theo danh mục STEM do Nhà trường công bố trong thông báo chính sách tuyển sinh hằng năm.",
        eligible_programs_named_in_proposal: null,
      },
      financial_support: [
        {
          number: 1,
          eligibility:
            "Học viên/nghiên cứu sinh là cán bộ, giảng viên, nhân viên cơ hữu tại đơn vị thuộc Tập đoàn Giáo dục Văn Lang",
          rate_percent: 30,
        },
        {
          number: 2,
          eligibility: "Học viên/nghiên cứu sinh là thương binh, bệnh binh",
          rate_percent: 30,
        },
        {
          number: 3,
          eligibility: "Học viên/nghiên cứu sinh là người khuyết tật",
          rate_percent: 30,
        },
        { number: 4, eligibility: "Gia đình thuộc diện hộ nghèo", rate_percent: 30 },
        { number: 5, eligibility: "Gia đình thuộc diện hộ cận nghèo", rate_percent: 20 },
        {
          number: 6,
          eligibility: "Học viên/nghiên cứu sinh là người dân tộc thiểu số rất ít người",
          rate_percent: 20,
        },
        {
          number: 7,
          eligibility: "Học viên/nghiên cứu sinh có cha/mẹ là bệnh binh",
          rate_percent: 15,
        },
        {
          number: 8,
          eligibility: "Học viên/nghiên cứu sinh có cha/mẹ là thương binh",
          rate_percent: 15,
        },
        {
          number: 9,
          eligibility: "Học viên/nghiên cứu sinh là con của người có công với Cách mạng",
          rate_percent: 15,
        },
        {
          number: 10,
          eligibility: "Học viên/nghiên cứu sinh có cha/mẹ là liệt sĩ",
          rate_percent: 15,
        },
        {
          number: 11,
          eligibility:
            "Học viên/nghiên cứu sinh có cha/mẹ là cán bộ, công nhân viên chức mắc bệnh nghề nghiệp/tai nạn lao động",
          rate_percent: 15,
        },
        {
          number: 12,
          eligibility:
            "Học viên/nghiên cứu sinh là cán bộ, giảng viên, nhân viên trường phổ thông/trung cấp/trung tâm giáo dục thường xuyên hoặc doanh nghiệp đối tác có ký kết MOU với Trường Đại học Văn Lang",
          rate_percent: 15,
        },
        {
          number: 13,
          eligibility:
            "Học viên/nghiên cứu sinh có cha/mẹ là cán bộ, giảng viên, nhân viên cơ hữu tại đơn vị thuộc Tập đoàn Giáo dục Văn Lang",
          rate_percent: 10,
        },
        {
          number: 14,
          eligibility:
            "Học viên/nghiên cứu sinh có anh/chị/em ruột đang học tại Trường Đại học Văn Lang",
          rate_percent: 10,
        },
        {
          number: 15,
          eligibility:
            "Học viên/nghiên cứu sinh có cha/mẹ hoặc con ruột cùng học tại Trường Đại học Văn Lang",
          rate_percent: 10,
        },
        {
          number: 16,
          eligibility:
            "Học viên/nghiên cứu sinh là cựu sinh viên/cựu học viên Trường Đại học Văn Lang",
          rate_percent: 10,
        },
      ],
      combination_rule:
        "Mỗi học viên chỉ áp dụng01 chính sách có mức cao nhất trong học bổng Phát triển năng lực, học bổng đồng hành STEM hoặc hỗ trợ tài chính; không áp dụng đồng thời, không cộng dồn.",
      application_process:
        "Đăng ký, nộp hồ sơ/minh chứng hợp lệ theo thông báo từng đợt; kết quả và mức được xác định sau xét hồ sơ, phê duyệt. Số lượng suất và hạn nộp chưa được ghi cụ thể.",
      percent_basis_not_explicit:
        "Các bảng ghi tỷ lệ% nhưng chưa nêu rõ ngay trong chính sách tỷ lệ tính trên toàn khóa, từng học kỳ hay thời gian áp dụng; tránh tự diễn đạt thành miễn/giảm toàn khóa nếu chưa xác nhận.",
    },
    research_support: {
      title: "Hỗ trợ nghiên cứu khoa học",
      eligibility:
        "Học viên có cam kết sản phẩm nghiên cứu và ký hợp đồng nghiên cứu khoa học với Nhà trường.",
      forms: [
        "Bài báo WoS/Scopus từ Q4 trở lên: được xem xét hỗ trợ thù lao định kỳ hằng tháng theo hợp đồng.",
        "Bài báo khoa học khác: thanh toán thù lao sau nghiệm thu, căn cứ kết quả công bố, thứ hạng và định mức hiện hành.",
      ],
      amount: "Theo quy định và hệ số của Nhà trường; tài liệu không ghi số tiền.",
      condition:
        "Nếu không hoàn thành sản phẩm, việc xử lý thù lao đã nhận theo hợp đồng và quy định.",
      note: "Đây là thù lao theo hợp đồng nghiên cứu, không tự cộng vào học bổng hoặc tính như giảm học phí.",
    },
    fees: [
      {
        name: "Lệ phí xét tuyển",
        amount_as_written: "500.000 đồng",
        applies: "Thu một lần khi đăng ký dự tuyển và nộp hồ sơ",
      },
      {
        name: "Lệ phí nhập học",
        amount_as_written: "1.000.000 đồng",
        applies: "Nộp khi thực hiện thủ tục nhập học theo thông báo của Nhà trường",
      },
      {
        name: "Học phí bổ sung kiến thức",
        amount_as_written: "1.200.000 đồng/môn",
        applies: "Áp dụng đối với ứng viên thuộc diện phải học bổ sung kiến thức",
      },
      {
        name: "Học phí ôn thi tiếng Anh đầu vào",
        amount_as_written: "1.000.000 đồng",
        applies: "Áp dụng đối với ứng viên có nhu cầu tham gia lớp ôn tập do Nhà trường tổ chức",
      },
      {
        name: "Lệ phí thi tiếng Anh đầu vào",
        amount_as_written: "1.000.000 đồng",
        applies: "Áp dụng đối với ứng viên đăng ký dự thi đánh giá năng lực tiếng Anh đầu vào",
      },
      {
        name: "Học phí toàn khóa",
        amount_as_written: "85.000.000 -175.000.000 đồng",
        applies: "Mức học phí theo từng ngành, chi tiết tại Phụ lục 1 của Đề án",
      },
    ],
    equivalence: [
      {
        language: "Tiếng Anh",
        certificate: "VSTEP",
        validity_exact: "Không thời hạn",
        level_3_exact: "Bậc 3",
        level_4_exact: "Bậc 4",
      },
      {
        language: "Tiếng Anh",
        certificate: "TOEFL iBT (trừ Home Edition)",
        validity_exact: "02 năm",
        level_3_exact: "30–45",
        level_4_exact: "46–93",
      },
      {
        language: "Tiếng Anh",
        certificate: "IELTS (Test Report Form)",
        validity_exact: "02 năm",
        level_3_exact: "4.0–5.0",
        level_4_exact: "5.5–6.5",
      },
      {
        language: "Tiếng Anh",
        certificate: "Cambridge Assessment English",
        validity_exact: "Không thời hạn",
        level_3_exact: "B1 Preliminary / B1 Business Preliminary / Linguaskill: 140–159",
        level_4_exact: "B2 First / B2 Business Vantage / Linguaskill: 160–179",
      },
      {
        language: "Tiếng Anh",
        certificate: "Cambridge",
        validity_exact: "Không thời hạn",
        level_3_exact: "PET",
        level_4_exact: "FCE",
      },
      {
        language: "Tiếng Anh",
        certificate: "TOEIC (4 kỹ năng)",
        validity_exact: "02 năm",
        level_3_exact: "Nghe: 275–399; Đọc: 275–384; Nói: 120–159; Viết: 120–149",
        level_4_exact: "Nghe: 400–489; Đọc: 385–454; Nói: 160–179; Viết: 150–179",
      },
      {
        language: "Tiếng Anh",
        certificate: "Aptis / Aptis ESOL International Certificate",
        validity_exact: "Không thời hạn",
        level_3_exact: "B1",
        level_4_exact: "B2",
      },
      {
        language: "Tiếng Anh",
        certificate: "Pearson English International Certificate (PEIC)",
        validity_exact: "Không thời hạn",
        level_3_exact: "Level 2",
        level_4_exact: "Level 3",
      },
      {
        language: "Tiếng Anh",
        certificate: "Pearson Test of English Academic (PTE Academic)",
        validity_exact: "02 năm",
        level_3_exact: "43–58",
        level_4_exact: "59–75",
      },
      {
        language: "Tiếng Anh",
        certificate: "Chứng chỉ C tiếng Anh thực hành",
        validity_exact: "Không thời hạn",
        level_3_exact: "B1",
        level_4_exact: "—",
      },
      {
        language: "Tiếng Anh",
        certificate: "LANGUAGECERT International ESOL",
        validity_exact: "Không thời hạn",
        level_3_exact: "B1 Achiever",
        level_4_exact: "B2 Communicator",
      },
      {
        language: "Tiếng Anh",
        certificate: "LANGUAGECERT Academic",
        validity_exact: "Không thời hạn",
        level_3_exact: "40–59 điểm",
        level_4_exact: "60–74 điểm",
      },
      {
        language: "Tiếng Pháp",
        certificate: "CIEP / Alliance française diplomas",
        validity_exact: "Không thời hạn",
        level_3_exact: "TCF: 300–399; DELF B1; Diplôme de Langue",
        level_4_exact: "TCF: 400–499; DELF B2; Diplôme de Langue",
      },
      {
        language: "Tiếng Đức",
        certificate: "Goethe-Institut",
        validity_exact: "Không thời hạn",
        level_3_exact: "Goethe-Zertifikat B1",
        level_4_exact: "Goethe-Zertifikat B2",
      },
      {
        language: "Tiếng Đức",
        certificate: "The German TestDaF language certificate",
        validity_exact: "Không thời hạn",
        level_3_exact: "TestDaF Bậc 3 (TDN 3)",
        level_4_exact: "TestDaF Bậc 4 (TDN 4)",
      },
      {
        language: "Tiếng Trung Quốc",
        certificate: "Hanyu Shuiping Kaoshi (HSK)",
        validity_exact: "02 năm",
        level_3_exact: "HSK Bậc 3",
        level_4_exact: "HSK Bậc 4",
      },
      {
        language: "Tiếng Nhật",
        certificate: "Japanese Language Proficiency Test (JLPT)",
        validity_exact: "Không thời hạn",
        level_3_exact: "N4",
        level_4_exact: "N3",
      },
      {
        language: "Tiếng Nga",
        certificate: "TRKI – Test po russkomu yazyku kak inostrannomu",
        validity_exact: "Không thời hạn",
        level_3_exact: "TRKI-1",
        level_4_exact: "TRKI-2",
      },
    ],
    docs: {
      application: [
        { title: "Phiếu đăng ký dự tuyển theo mẫu của Nhà trường", mode: "Trực tuyến" },
        { title: "Bằng tốt nghiệp đại học", mode: "Điện tử" },
        { title: "Bảng điểm đại học", mode: "Điện tử" },
        { title: "Minh chứng đáp ứng yêu cầu ngoại ngữ đầu vào (nếu có)", mode: "Điện tử" },
        { title: "Sơ yếu lí lịch/Lý lịch khoa học có xác nhận theo yêu cầu", mode: "Điện tử" },
        { title: "Thông tin căn cước công dân hoặc giấy tờ định danh cá nhân", mode: "Điện tử" },
        { title: "Thông tin giấy khai sinh hoặc trích lục khai sinh", mode: "Điện tử" },
        { title: "Giấy khám sức khoẻ còn giá trị sử dụng", mode: "Bản cứng/điện tử" },
        { title: "Giấy chứng nhận hoàn thành bổ sung kiến thức (nếu có)", mode: "Điện tử" },
        {
          title:
            "Giấy xác nhận văn bằng tương đương hoặc giấy tờ công nhận văn bằng đối với trường hợp sử dụng văn bằng do cơ sở giáo dục nước ngoài cấp (nếu có)",
          mode: "Điện tử",
        },
        { title: "Giấy xác nhận thâm niên công tác (nếu thuộc diện yêu cầu)", mode: "Điện tử" },
        {
          title:
            "Hồ sơ đăng ký xét học bổng, hỗ trợ tài chính và các minh chứng liên quan (nếu có)",
          mode: "Trực tiếp",
        },
      ],
      enrollment: [
        {
          title:
            "Bản sao hợp lệ bằng tốt nghiệp đại học hoặc giấy tờ tốt nghiệp được Nhà trường chấp nhận theo quy định",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
        { title: "Bản sao hợp lệ bảng điểm đại học", mode: "Bản giấy theo hướng dẫn nhập học" },
        { title: "Bản sao chứng chỉ ngoại ngữ hợp lệ", mode: "Bản giấy theo hướng dẫn nhập học" },
        {
          title: "Sơ yếu lý lịch/Lý lịch học viên theo mẫu của Nhà trường",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
        {
          title: "Giấy khám sức khỏe còn giá trị sử dụng, được cung cấp dưới hình thức bản giấy",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
        {
          title:
            "Giấy xác nhận văn bằng tương đương hoặc giấy tờ công nhận văn bằng đối với trường hợp sử dụng văn bằng do cơ sở giáo dục nước ngoài cấp (nếu có)",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
        {
          title: "Chứng chỉ/Giấy xác nhận/Bảng điểm bổ sung kiến thức (nếu có)",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
        {
          title: "Giấy xác nhận thâm niên công tác (nếu thuộc diện yêu cầu)",
          mode: "Bản giấy theo hướng dẫn nhập học",
        },
      ],
    },
  };

  const DOCTOR = {
    docs: [
      {
        title: "Biên nhận hồ sơ tuyển sinh",
        quantity: "02 bản",
        mode: "Theo mẫu",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Đơn đăng ký dự tuyển",
        quantity: "01 bản",
        mode: "Theo mẫu",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Bằng tốt nghiệp đại học",
        quantity: "02 bản",
        mode: "Sao y",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Bảng điểm đại học",
        quantity: "02 bản",
        mode: "Sao y",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Bằng tốt nghiệp thạc sĩ",
        quantity: "02 bản",
        mode: "Sao y",
        required: true,
        note: "Bảng hồ sơ trong Thông báo ghi bắt buộc. Điều kiện dự tuyển đồng thời cho phép ứng viên tốt nghiệp đại học hạng giỏi trở lên; ứng viên dự tuyển từ đại học cần liên hệ Viện để được hướng dẫn áp dụng hồ sơ văn bằng phù hợp.",
      },
      {
        title: "Bảng điểm tốt nghiệp thạc sĩ",
        quantity: "02 bản",
        mode: "Sao y",
        required: true,
        note: "Bảng hồ sơ trong Thông báo ghi bắt buộc. Điều kiện dự tuyển đồng thời cho phép ứng viên tốt nghiệp đại học hạng giỏi trở lên; ứng viên dự tuyển từ đại học cần liên hệ Viện để được hướng dẫn áp dụng hồ sơ văn bằng phù hợp.",
      },
      {
        title: "Văn bằng, chứng chỉ ngoại ngữ",
        quantity: "02 bản",
        mode: "Sao y",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Lý lịch học viên",
        quantity: "01 bản",
        mode: "Theo mẫu, có xác nhận",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Lý lịch khoa học",
        quantity: "01 bản",
        mode: "Theo mẫu và có xác nhận",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Minh chứng năng lực nghiên cứu khoa học",
        quantity: "01 bản",
        mode: "Đối với luận văn chương trình định hướng nghiên cứu: thể hiện ở bảng điểm tốt nghiệp. Đối với đề tài nghiên cứu: bản sao y Quyết định công nhận kết quả thực hiện đề tài hoặc văn bản khác thay thế. Đối với công bố khoa học: bản sao bìa, mục lục, toàn văn công trình.",
        required: false,
        note: "Nếu có, theo bảng hồ sơ. Người dự tuyển vẫn phải đáp ứng yêu cầu về kinh nghiệm nghiên cứu tại mục 5.1 của Thông báo.",
      },
      {
        title: "Giấy xác nhận thâm niên công tác",
        quantity: "01 bản",
        mode: "Mẫu của cơ quan công tác",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Đề cương nghiên cứu và dự kiến kế hoạch học tập, nghiên cứu toàn khóa",
        quantity: "01 bản",
        mode: "Đóng cuốn",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Thư giới thiệu",
        quantity: "01 bản",
        mode: "Có chữ ký xác nhận",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Căn cước công dân",
        quantity: "01 bản",
        mode: "Sao y",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Hình thẻ",
        quantity: "06 ảnh",
        mode: "Hình màu, mới chụp",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Giấy khám sức khỏe",
        quantity: "01 bản",
        mode: "Bản gốc",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Giấy chứng nhận hoàn thành chương trình bổ sung kiến thức",
        quantity: "01 bản",
        mode: "Sao y",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Công văn cử đi học của cơ quan",
        quantity: "01 bản",
        mode: "Mẫu của cơ quan công tác",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Hồ sơ dự tuyển học bổng",
        quantity: "01 bản",
        mode: "Theo mẫu",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Hồ sơ chứng minh đối tượng ưu tiên",
        quantity: "01 bản",
        mode: "Sao y",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Giấy xác nhận văn bằng tương đương của Cục Quản lý Chất lượng",
        quantity: "01 bản",
        mode: "Sao y, nếu văn bằng của cơ sở giáo dục nước ngoài cấp",
        required: false,
        note: "Nếu có.",
      },
      {
        title: "Lý lịch khoa học của người hướng dẫn khoa học",
        quantity: "01 bản",
        mode: "Theo mẫu và có xác nhận của cơ quan hoặc chính quyền địa phương nơi cư trú",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Minh chứng công bố khoa học của giảng viên hướng dẫn",
        quantity: "01 bản",
        mode: "Bản sao bìa, mục lục, toàn văn công trình hoặc một vài trang đầu, một vài trang cuối",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
      {
        title: "Biên lai nộp lệ phí xét tuyển",
        quantity: "01 bản",
        mode: "Bản sao",
        required: true,
        note: "Bắt buộc theo bảng hồ sơ dự tuyển.",
      },
    ],
    exempt_majors: [
      { name: "Khoa học môi trường", code: "8440301" },
      { name: "Quản lý tài nguyên và môi trường", code: "8850101" },
      { name: "Quản lý đất đai", code: "8850103" },
      { name: "Quản lý biển đảo và đới bờ", code: "8850104" },
      { name: "Bảo hộ lao động", code: "8900103" },
      { name: "Kỹ thuật hóa học", code: "8520301" },
      { name: "Kỹ thuật vật liệu", code: "8520309" },
      { name: "Kỹ thuật môi trường", code: "8520320" },
      { name: "Hóa môi trường", code: "8440120" },
      { name: "Vật lý nguyên tử và hạt nhân", code: "8440106" },
      { name: "Khoa học vật liệu", code: "8440122" },
      { name: "Địa chất học", code: "8440201" },
      { name: "Khoáng vật học và địa hóa học", code: "8440205" },
      { name: "Địa vật lý", code: "8440210" },
      { name: "Bản đồ, viễn thám, và hệ thống địa lý", code: "8440214" },
      { name: "Địa lý tự nhiên", code: "8440217" },
      { name: "Địa lý tài nguyên và môi trường", code: "8440220" },
      { name: "Khí tượng và khí hậu học", code: "8440222" },
      { name: "Thủy văn học", code: "8440224" },
      { name: "Hải dương học", code: "8440228" },
    ],
    supplement_majors: [
      {
        name: "Kỹ thuật địa chất",
        code: "8520501",
        group: "Kỹ thuật địa chất, vật lý và trắc địa (85205)",
      },
      {
        name: "Kỹ thuật địa vật lý",
        code: "8520502",
        group: "Kỹ thuật địa chất, vật lý và trắc địa (85205)",
      },
      {
        name: "Kỹ thuật trắc địa - bản đồ",
        code: "8520503",
        group: "Kỹ thuật địa chất, vật lý và trắc địa (85205)",
      },
      { name: "Sinh học", code: "8420101", group: "Sinh học (84201)" },
      { name: "Sinh thái học", code: "8420120", group: "Sinh học (84201)" },
      { name: "Công nghệ sinh học", code: "8420201", group: "Sinh học ứng dụng (84202)" },
      { name: "Quản lý công nghiệp", code: "8510601", group: "Quản lý công nghiệp (85106)" },
      { name: "Quản lý năng lượng", code: "8510602", group: "Quản lý công nghiệp (85106)" },
      {
        name: "Logistic và quản lý chuỗi cung ứng",
        code: "8510605",
        group: "Quản lý công nghiệp (85106)",
      },
      { name: "Kỹ thuật nhiệt", code: "8520115", group: "Kỹ thuật cơ khí và cơ kỹ thuật (85201)" },
      {
        name: "Kỹ thuật năng lượng",
        code: "8520135",
        group: "Kỹ thuật cơ khí và cơ kỹ thuật (85201)",
      },
      {
        name: "Công nghệ thực phẩm",
        code: "",
        source_code: "8520101",
        note: "Mã trong phụ lục cần được đối chiếu",
        group: "Chế biến lương thực, thực phẩm và đồ uống (85401)",
      },
      { name: "Kiến trúc", code: "8580101", group: "Kiến trúc và quy hoạch (85801)" },
      {
        name: "Quy hoạch vùng và đô thị",
        code: "8580105",
        group: "Kiến trúc và quy hoạch (85801)",
      },
      {
        name: "Quy hoạch đô thị và công trình",
        code: "8580106",
        group: "Kiến trúc và quy hoạch (85801)",
      },
      { name: "Đô thị học", code: "8580112", group: "Kiến trúc và quy hoạch (85801)" },
      { name: "Kỹ thuật xây dựng", code: "8580201", group: "Xây dựng (85802)" },
      { name: "Địa kỹ thuật xây dựng", code: "8580211", group: "Xây dựng (85802)" },
      { name: "Kỹ thuật tài nguyên nước", code: "8580212", group: "Xây dựng (85802)" },
      { name: "Kỹ thuật cấp thoát nước", code: "8580213", group: "Xây dựng (85802)" },
      { name: "Quản lý xây dựng", code: "8580302", group: "Quản lý xây dựng (85803)" },
      { name: "Khoa học đất", code: "8620103", group: "Nông nghiệp (86201)" },
      { name: "Phát triển nông thôn", code: "8620116", group: "Nông nghiệp (86201)" },
      { name: "Quản lý tài nguyên rừng", code: "8620211", group: "Lâm nghiệp (86202)" },
      { name: "Quản lý thủy sản", code: "8620305", group: "Thủy sản (86203)" },
      { name: "Công nghệ thông tin", code: "8480201", group: "Công nghệ thông tin (84802)" },
      { name: "Y tế công cộng", code: "8720701", group: "Y tế công cộng (87207)" },
    ],
    bachelor_majors: [
      {
        name: "Kỹ thuật môi trường",
        code: "7520320",
        group: "Kỹ thuật hóa học, vật liệu, luyện kim và môi trường (75203)",
      },
      { name: "Khoa học môi trường", code: "7440301", group: "Khoa học môi trường (74403)" },
      {
        name: "Công nghệ kỹ thuật môi trường",
        code: "7510406",
        group: "Công nghệ hóa học, vật liệu, luyện kim và môi trường (75104)",
      },
      {
        name: "Quản lý tài nguyên và môi trường",
        code: "7850101",
        group: "Quản lý tài nguyên và môi trường (78501)",
      },
    ],
    languages: [
      { language: "Tiếng Anh", certificate: "VSTEP", validity: "Không thời hạn", level: "Bậc 4" },
      { language: "Tiếng Anh", certificate: "TOEFL iBT", validity: "02 năm", level: "46–93" },
      { language: "Tiếng Anh", certificate: "CEFR", validity: "Không thời hạn", level: "B2" },
      {
        language: "Tiếng Anh",
        certificate: "IELTS Test Report Form",
        validity: "02 năm",
        level: "5.5–6.5",
      },
      {
        language: "Tiếng Anh",
        certificate: "Cambridge Assessment English",
        validity: "Không thời hạn",
        level: "B2 First / B2 Business Vantage / Linguaskill. Thang điểm: 160–179",
      },
      { language: "Tiếng Anh", certificate: "Cambridge", validity: "Không thời hạn", level: "FCE" },
      {
        language: "Tiếng Anh",
        certificate: "TOEIC (4 kỹ năng)",
        validity: "02 năm",
        level: "Nghe: 400–489; Đọc: 385–454; Nói: 160–179; Viết: 150–179",
      },
      {
        language: "Tiếng Anh",
        certificate: "Aptis / Aptis ESOL International Certificate",
        validity: "Không thời hạn",
        level: "B2",
      },
      {
        language: "Tiếng Anh",
        certificate: "Pearson English International Certificate (PEIC)",
        validity: "Không thời hạn",
        level: "Level 3",
      },
      {
        language: "Tiếng Anh",
        certificate: "Pearson Test of English Academic (PTE Academic)",
        validity: "02 năm",
        level: "59–75",
      },
      {
        language: "Tiếng Pháp",
        certificate: "CIEP / Alliance française diplomas",
        validity: "Không thời hạn",
        level: "TCF: 400–499; văn bằng DELF B2; Diplôme de Langue",
      },
      {
        language: "Tiếng Đức",
        certificate: "Goethe - Institut",
        validity: "Không thời hạn",
        level: "Goethe-Zertifikat B2",
      },
      {
        language: "Tiếng Đức",
        certificate: "The German TestDaF language certificate",
        validity: "Không thời hạn",
        level: "TestDaF Bậc 4 (TDN 4)",
      },
      {
        language: "Tiếng Trung Quốc",
        certificate: "Hanyu Shuiping Kaoshi (HSK)",
        validity: "02 năm",
        level: "HSK Bậc 4",
      },
      {
        language: "Tiếng Nhật",
        certificate: "Japanese Language Proficiency Test (JLPT)",
        validity: "Không thời hạn",
        level: "N3",
      },
      {
        language: "Tiếng Nga",
        certificate: "ТРКИ - Тест по русскому языку как иностранному",
        validity: "Không thời hạn",
        level: "ТРКИ-2",
      },
    ],
    scholarship_levels: [
      {
        level: 1,
        products: [
          "Tác giả chính, công bố khoa học được Hội đồng chức danh giáo sư nhà nước tính đến 2.0 điểm.",
          "Chủ trì đề tài nghiên cứu khoa học quốc tế.",
          "Tác giả bằng sáng chế thuộc loại Utility hoặc loại Design hoặc loại Plant được công nhận bởi USPTO và Cục Sở hữu trí tuệ Việt Nam.",
          "Tác giả bằng sáng chế được công nhận bởi EPO và Cục Sở hữu trí tuệ Việt Nam.",
        ],
      },
      {
        level: 2,
        products: [
          "Tác giả chính, công bố được HĐGSNN tính đến 1.5 điểm trở lên.",
          "Chủ trì đề tài nghiên cứu khoa học quốc gia.",
          "Tác giả bằng sáng chế được công nhận bởi Cục Sở hữu trí tuệ Việt Nam.",
        ],
      },
      {
        level: 3,
        products: [
          "Tác giả chính, công bố bằng tiếng nước ngoài được HĐGSNN tính đến 1.0 điểm trở lên.",
          "Chủ trì đề tài nghiên cứu khoa học cấp tỉnh/thành/Bộ.",
          "Chủ trì đề tài nghiên cứu khoa học cấp trường với sản phẩm là tác giả chính, công bố bằng tiếng nước ngoài được HĐGSNN tính đến 0.75 điểm trở lên.",
          "Chủ biên sách tham khảo trở lên.",
        ],
      },
      {
        level: 4,
        products: [
          "Tác giả chính, công bố bằng tiếng nước ngoài được HĐGSNN tính đến 0.75 điểm trở lên.",
          "Chủ trì đề tài nghiên cứu khoa học cấp trường với sản phẩm là tác giả chính, công bố được HĐGSNN tính đến 0.5 điểm trở lên.",
        ],
      },
      {
        level: 5,
        products: [
          "Tác giả chính, công bố được HĐGSNN tính đến 0.75 điểm trở lên.",
          "Chủ trì đề tài nghiên cứu khoa học cấp trường với sản phẩm tác giả chính, công bố được HĐGSNN tính đến 0.25 điểm trở lên.",
        ],
      },
    ],
  };
  const $ = (s) => document.querySelector(s),
    $$ = (s) => Array.from(document.querySelectorAll(s));
  const catalogueLocale = globalThis.location.pathname.split("/")[1] === "en" ? "en" : "vi";
  $$('a[href="/programmes"]').forEach((link) =>
    link.setAttribute("href", `/${catalogueLocale}/programmes`),
  );
  const escapeHtml = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch],
    );
  const normalize = (v) =>
    String(v)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const icon = (n) => '<svg class="icon" aria-hidden="true"><use href="#i-' + n + '"/></svg>';
  const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + " đ";
  const groups = {
    business: "Kinh tế & quản trị",
    tech: "Kỹ thuật & công nghệ",
    design: "Kiến trúc & nghệ thuật",
    humanities: "Luật, ngôn ngữ & truyền thông",
    hospitality: "Quản trị khách sạn",
  };
  const groupMap = {
    mba: "business",
    commerce: "business",
    finance: "business",
    accounting: "business",
    marketing: "business",
    logistics: "business",
    environment: "tech",
    biotech: "tech",
    resources: "tech",
    construction: "tech",
    automotive: "tech",
    it: "tech",
    architecture: "design",
    arts: "design",
    "art-theory": "design",
    law: "humanities",
    english: "humanities",
    pr: "humanities",
    hospitality: "hospitality",
  };
  const programs = DATA.programs.map((p) => ({ ...p, group: groupMap[p.id], degree: "master" }));
  const PORTAL = "https://tuyensinh.vlu.edu.vn/xet-tuyen/thac-si";
  const rounds = [
    { id: 1, start: "tháng 10/2026", end: "31/12/2026" },
    { id: 2, start: "tháng 01/2027", end: "30/04/2027" },
    { id: 3, start: "tháng 05/2027", end: "30/09/2027" },
  ];
  const state = {
    degree: "master",
    round: 1,
    showAll: false,
    doc: "application",
    checks: {},
    process: 0,
  };
  const masterSections = [
    "dieu-kien",
    "lich-tuyen-sinh",
    "hoc-phi",
    "ho-so",
    "huong-dan",
    "ket-qua",
    "cau-hoi",
  ];
  const source = () => "";
  const listHtml = (items) =>
    "<ul>" + items.map((x) => "<li>" + escapeHtml(x) + "</li>").join("") + "</ul>";
  const optionsHtml = (list) =>
    list.map((p) => '<option value="' + p.id + '">' + escapeHtml(p.name) + "</option>").join("");
  const table = (headers, rows) =>
    '<div class="data-table-wrap" tabindex="0" role="region" aria-label="Bảng thông tin có thể cuộn ngang"><table class="data-table"><thead><tr>' +
    headers.map((h) => '<th scope="col">' + escapeHtml(h) + "</th>").join("") +
    "</tr></thead><tbody>" +
    rows
      .map(
        (row) => "<tr>" + row.map((cell) => "<td>" + escapeHtml(cell) + "</td>").join("") + "</tr>",
      )
      .join("") +
    "</tbody></table></div>";
  function scrollToSection(id) {
    $("#" + id)?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }
  function selectedRound() {
    return rounds.find((r) => r.id === state.round);
  }
  function renderPrograms() {
    if (!$("#program-search")) return;
    const query = normalize($("#program-search").value.trim()),
      group = $("#program-group").value;
    const filtered = programs.filter(
      (p) =>
        (group === "all" || p.group === group) &&
        normalize(p.name + " " + p.code + " " + groups[p.group]).includes(query),
    );
    const filtering = !!query || group !== "all",
      shown = state.showAll || filtering ? filtered : filtered.slice(0, 6);
    $("#program-result-count").textContent = filtering
      ? filtered.length + " ngành phù hợp"
      : "Hiển thị " + shown.length + " / 19 ngành thạc sĩ";
    $("#program-grid").innerHTML = shown.length
      ? shown
          .map(
            (p) =>
              '<article class="program-card"><div class="category">' +
              icon("book") +
              escapeHtml(groups[p.group]) +
              '</div><div class="program-code">Mã ngành ' +
              p.code +
              "</div><h3>" +
              escapeHtml(p.name) +
              "</h3><p>" +
              escapeHtml(p.assessment) +
              '.</p><div class="program-meta">' +
              p.tracks
                .map(
                  (t) =>
                    "<span>" + escapeHtml(t.name) + " · " + t.duration_months + " tháng</span>",
                )
                .join("") +
              '</div><button class="text-link" data-program="' +
              p.id +
              '">Thông tin dự tuyển ' +
              icon("arrow") +
              "</button></article>",
          )
          .join("")
      : '<div class="program-empty"><h3>Chưa tìm thấy chương trình phù hợp.</h3><p>Thử tìm theo tên, mã ngành hoặc bỏ bộ lọc.</p><button class="text-link" id="clear-search">Xóa tìm kiếm và bộ lọc</button></div>';
    $("#show-more").hidden = filtering || filtered.length <= 6;
    $("#show-more").innerHTML =
      (state.showAll ? "Thu gọn danh sách" : "Xem đủ 19 ngành") + " " + icon("arrow");
  }
  function renderConditions() {
    const conditions = [
      [
        "Văn bằng và ngành tốt nghiệp",
        "Ứng viên đã tốt nghiệp đại học hoặc đủ điều kiện được công nhận tốt nghiệp, có ngành đào tạo phù hợp với chương trình dự tuyển.",
        [
          "Khoa và Viện xem xét ngành tốt nghiệp, bảng điểm và định hướng đào tạo để xác định mức độ phù hợp.",
          "Ứng viên cần hoàn tất các điều kiện đầu vào và học phần bổ sung kiến thức, nếu có, trước khi xét tuyển.",
          "Văn bằng do cơ sở giáo dục nước ngoài cấp được kiểm tra theo yêu cầu công nhận văn bằng áp dụng.",
        ],
        '<button class="text-link" data-bsk>Tra cứu ngành phù hợp và bổ sung kiến thức ' +
          icon("arrow") +
          "</button>",
      ],
      [
        "Yêu cầu ngoại ngữ",
        "Yêu cầu chung là năng lực ngoại ngữ tương đương Bậc 3 trở lên hoặc đáp ứng một trong các hình thức minh chứng tại Điều 6 Quy chế tuyển sinh và đào tạo sau đại học.",
        [
          "Có thể sử dụng văn bằng ngành ngôn ngữ nước ngoài, văn bằng chương trình chủ yếu bằng tiếng nước ngoài, chứng chỉ hợp lệ, hoặc kết quả đánh giá/đào tạo do Trường tổ chức hay công nhận theo quy định.",
          "Văn bằng từ đại học trở lên do Văn Lang cấp không quá 02 năm được xem xét khi chuẩn đầu ra ngoại ngữ của chương trình đã đáp ứng Bậc 3 trở lên.",
          "Chương trình dạy và học bằng tiếng nước ngoài yêu cầu Bậc 4 trở lên đối với ngôn ngữ giảng dạy hoặc trường hợp văn bằng phù hợp. Yêu cầu riêng của từng ngành vẫn phải được đáp ứng.",
          "Chứng chỉ cần còn hiệu lực đến ngày đăng ký dự tuyển.",
        ],
        '<button class="text-link" data-language>Tra cứu chứng chỉ và mức tương đương ' +
          icon("arrow") +
          "</button>",
      ],
      [
        "Bổ sung kiến thức",
        "Yêu cầu bổ sung kiến thức được xác định theo từng hồ sơ, căn cứ ngành đã học, bảng điểm và chương trình đăng ký.",
        [
          "Tra cứu nhóm ngành phù hợp và học phần bổ sung kiến thức theo chương trình đăng ký.",
          "Cùng một ngành tốt nghiệp có thể được xác định các học phần cần bổ sung khác nhau sau khi đối chiếu bảng điểm.",
          "Hoàn thành trước khi xét tuyển; kết quả được sử dụng trong 02 năm kể từ khi đạt yêu cầu và được công nhận.",
          "Học phí bổ sung kiến thức: 1.200.000 đồng/môn, thu riêng ngoài học phí toàn khóa.",
        ],
        '<button class="text-link" data-bsk>Tra cứu theo chương trình ' +
          icon("arrow") +
          "</button>",
      ],
      [
        "Phương thức tuyển sinh và yêu cầu riêng",
        "Xét tuyển kết hợp phỏng vấn đối với Quản trị kinh doanh, Quan hệ công chúng và Mỹ thuật ứng dụng. Các ngành còn lại thực hiện xét tuyển.",
        [
          "Lịch, hình thức và nội dung phỏng vấn được hướng dẫn theo từng đợt.",
          "Công dân nước ngoài học chương trình bằng tiếng Việt cần đáp ứng tiếng Việt Bậc 4 hoặc có văn bằng chương trình được giảng dạy bằng tiếng Việt theo quy định.",
          "Yêu cầu chuyên môn, ngoại ngữ và minh chứng đặc thù được đối chiếu theo ngành đăng ký.",
        ],
        "",
      ],
    ];
    $("#conditions-list").innerHTML = conditions
      .map(
        (c, i) =>
          "<details " +
          (i === 0 ? "open" : "") +
          '><summary><span class="n">0' +
          (i + 1) +
          "</span>" +
          c[0] +
          '</summary><div class="answer">' +
          c[1] +
          listHtml(c[2]) +
          c[3] +
          "</div></details>",
      )
      .join("");
  }
  function renderTimeline() {
    const r = selectedRound();
    $("#intake-select").value = String(r.id);
    $("#intake-period").textContent = "Nhận hồ sơ từ " + r.start;
    $("#intake-deadline").textContent = "Đến hết " + r.end;
    const items = [
      [
        "Nhận hồ sơ · Đợt " + r.id,
        "Đến hết " + r.end,
        "Nhận hồ sơ từ " +
          r.start +
          ". Đăng ký trực tuyến và hoàn thiện hồ sơ trong thời gian nhận hồ sơ.",
      ],
      [
        "Xét tuyển / phỏng vấn",
        "Theo lịch từng đợt",
        "Hoàn thành điều kiện ngoại ngữ, bổ sung kiến thức và tham gia phỏng vấn nếu chương trình có yêu cầu.",
      ],
      [
        "Công bố kết quả",
        "Theo thông báo của Trường",
        "Kết quả được công bố sau quyết định phê duyệt của Hiệu trưởng.",
      ],
      [
        "Làm thủ tục nhập học",
        "Theo thông báo nhập học",
        "Hoàn tất hồ sơ đối chiếu và nghĩa vụ tài chính đúng thời hạn được hướng dẫn.",
      ],
    ];
    $("#timeline-list").innerHTML = items
      .map(
        (x, i) =>
          '<article class="timeline-card"><div class="step-circle">0' +
          (i + 1) +
          "</div><h3>" +
          escapeHtml(x[0]) +
          '</h3><div class="timeline-date">' +
          escapeHtml(x[1]) +
          "</div><p>" +
          escapeHtml(x[2]) +
          "</p></article>",
      )
      .join("");
    $("#assessment-title").textContent = "Ba đợt tuyển sinh năm 2027.";
    $("#assessment-note").innerHTML =
      ' Đợt 1: tháng 10/2026–31/12/2026; Đợt 2: tháng 01/2027–30/04/2027; Đợt 3: tháng 05/2027–30/09/2027. <button class="text-link" data-notice>Xem đầy đủ ' +
      icon("arrow") +
      "</button>";
  }
  function updateFee(reset = false) {
    const p = programs.find((p) => p.id === $("#fee-program").value);
    if (!p) return;
    $("#fee-program-name").textContent = p.name;
    if (reset) {
      $("#fee-variant").innerHTML = p.tuition_variants
        .map(
          (v, i) =>
            '<option value="' +
            i +
            '">' +
            escapeHtml(v.language + (v.specialization ? " · " + v.specialization : "")) +
            "</option>",
        )
        .join("");
      $("#fee-variant").value = "0";
    }
    $("#fee-variant-field").hidden = p.tuition_variants.length < 2;
    const v = p.tuition_variants[Number($("#fee-variant").value) || 0];
    $("#fee-amount").textContent = money(v.total_vnd);
    $("#fee-caption").textContent =
      "Học phí toàn khóa · " + v.language + (v.specialization ? " · " + v.specialization : "");
    $("#fee-installments").innerHTML =
      '<table class="admissions-payment-table"><caption>Lịch đóng học phí theo chương trình</caption><thead><tr><th scope="col">Đợt thanh toán</th><th scope="col">Số tiền (VNĐ)</th></tr></thead><tbody>' +
      v.installments_vnd
        .map(
          (n, i) =>
            '<tr><th scope="row">Đợt ' +
            (i + 1) +
            " · " +
            v.installment_percent[i] +
            "%</th><td>" +
            money(n) +
            "</td></tr>",
        )
        .join("") +
      "</tbody></table>";
  }
  function docs() {
    return DATA.docs[state.doc];
  }
  function docKey() {
    return state.degree + "-" + state.doc;
  }
  function setDoc(type) {
    state.doc = type;
    $$("[data-doc]").forEach((b) => {
      const yes = b.dataset.doc === type;
      b.setAttribute("aria-selected", yes);
      b.tabIndex = yes ? 0 : -1;
    });
    $("#document-checklist").setAttribute("aria-labelledby", "doc-" + type);
    renderChecklist();
  }
  function renderChecklist() {
    const checked = state.checks[docKey()] || [];
    $("#document-checklist").innerHTML = docs()
      .map(
        (d, i) =>
          '<label class="checklist-item ' +
          (checked.includes(i) ? "done" : "") +
          '"><input type="checkbox" data-check="' +
          i +
          '" ' +
          (checked.includes(i) ? "checked" : "") +
          "><span><strong>" +
          escapeHtml(d.title) +
          "</strong><span>" +
          escapeHtml(d.mode) +
          (state.doc === "enrollment" && i === 2
            ? " · Trường hợp đáp ứng ngoại ngữ bằng hình thức khác cần đối chiếu hướng dẫn riêng."
            : "") +
          "</span></span></label>",
      )
      .join("");
    updateProgress();
  }
  function updateProgress() {
    const n = (state.checks[docKey()] || []).length,
      total = docs().length,
      percent = Math.round((n / total) * 100);
    $("#checklist-status").textContent = "Đã chuẩn bị " + n + " / " + total + " mục";
    $("#progress-fill").style.width = percent + "%";
    $("#checklist-progress").setAttribute("aria-valuenow", percent);
  }
  const processSteps = [
    {
      title: "Đăng ký trực tuyến",
      detail: "Chọn ngành và gửi hồ sơ dự tuyển",
      text: "Truy cập cổng tuyển sinh thạc sĩ của Trường, chọn ngành dự tuyển, khai thông tin và tải hồ sơ điện tử theo hướng dẫn.",
      items: [
        "Kiểm tra điều kiện và giấy tờ trước khi đăng ký.",
        "Lệ phí xét tuyển: 500.000 đồng, thu một lần khi đăng ký và nộp hồ sơ.",
        "Lưu thông tin tài khoản, mã hồ sơ hoặc xác nhận được cấp.",
      ],
      action: "Mở thông tin đăng ký",
      target: "apply",
    },
    {
      title: "Kiểm tra hồ sơ",
      detail: "Theo dõi yêu cầu bổ sung",
      text: "Viện tiếp nhận và kiểm tra tính đầy đủ, hợp lệ của hồ sơ. Ứng viên theo dõi kênh liên lạc đã đăng ký để bổ sung khi được yêu cầu.",
      items: [
        "Đảm bảo ảnh chụp hoặc bản quét đầy đủ và rõ ràng.",
        "Kiểm tra thông tin cá nhân, ngành đăng ký và minh chứng đã gửi.",
      ],
      action: "Xem danh mục hồ sơ",
      target: "ho-so",
    },
    {
      title: "Hoàn thiện điều kiện",
      detail: "Đối chiếu nền tảng và minh chứng",
      text: "Khoa và Viện xem xét ngành phù hợp, yêu cầu bổ sung kiến thức, ngoại ngữ và các điều kiện riêng của chương trình.",
      items: [
        "Hoàn thành học phần bổ sung kiến thức trước xét tuyển, nếu thuộc diện yêu cầu.",
        "Bổ sung minh chứng ngoại ngữ hợp lệ hoặc thực hiện hình thức đánh giá được chấp nhận.",
      ],
      action: "Xem điều kiện dự tuyển",
      target: "dieu-kien",
    },
    {
      title: "Xét tuyển / phỏng vấn",
      detail: "Tham gia tuyển sinh theo ngành",
      text: "Quản trị kinh doanh, Quan hệ công chúng và Mỹ thuật ứng dụng xét tuyển kết hợp phỏng vấn. Các ngành còn lại xét tuyển.",
      items: [
        "Theo dõi lịch và hướng dẫn của đợt đã đăng ký.",
        "Chuẩn bị nội dung, giấy tờ hoặc minh chứng được yêu cầu cho phỏng vấn.",
      ],
      action: "Xem lịch tuyển sinh",
      target: "lich-tuyen-sinh",
    },
    {
      title: "Nhận kết quả",
      detail: "Theo dõi kết quả được phê duyệt",
      text: "Nhà trường công bố kết quả sau khi có quyết định phê duyệt của Hiệu trưởng. Ứng viên đọc đầy đủ thông báo và hướng dẫn tiếp theo.",
      items: [
        "Đối chiếu kết quả với đúng thông tin hồ sơ đã đăng ký.",
        "Liên hệ Viện nếu cần làm rõ yêu cầu hoặc thủ tục tiếp theo.",
      ],
      action: "Hướng dẫn theo dõi",
      target: "status",
    },
    {
      title: "Hoàn tất nhập học",
      detail: "Hoàn thiện hồ sơ và tài chính",
      text: "Người trúng tuyển nộp, đối chiếu hồ sơ nhập học và hoàn thành các khoản theo thông báo của Trường.",
      items: [
        "Lệ phí nhập học: 1.000.000 đồng.",
        "Chuẩn bị học phí đợt 1 bằng 35% học phí toàn khóa theo chương trình.",
        "Theo dõi kế hoạch học tập và thời khóa biểu chính thức.",
      ],
      action: "Xem hồ sơ nhập học",
      target: "enrollment",
    },
  ];
  function renderProcess() {
    $("#process-list").innerHTML = processSteps
      .map(
        (s, i) =>
          '<button class="process-step" id="process-tab-' +
          i +
          '" role="tab" aria-selected="' +
          (i === state.process) +
          '" aria-controls="process-panel" tabindex="' +
          (i === state.process ? "0" : "-1") +
          '" data-step="' +
          i +
          '"><span class="step-num">' +
          (i + 1) +
          "</span><strong>" +
          s.title +
          "</strong>" +
          icon("arrow") +
          "</button>",
      )
      .join("");
    const s = processSteps[state.process];
    $("#process-panel").setAttribute("aria-labelledby", "process-tab-" + state.process);
    $("#process-panel").innerHTML =
      '<span class="large-step" aria-hidden="true">0' +
      (state.process + 1) +
      '</span><div class="eyebrow">Hướng dẫn từng bước</div><h3>' +
      s.detail +
      "</h3><p>" +
      s.text +
      "</p>" +
      listHtml(s.items) +
      '<div class="process-bottom"><span>Bước ' +
      (state.process + 1) +
      ' / 6</span><button class="text-link" data-process-action="' +
      s.target +
      '">' +
      s.action +
      " " +
      icon("arrow") +
      "</button></div>";
  }
  function renderFAQ() {
    const questions = [
      [
        "Tốt nghiệp ngành khác có thể đăng ký không?",
        "Có thể được xem xét nếu ngành tốt nghiệp thuộc nhóm phù hợp của chương trình đăng ký. Khoa và Viện sẽ đối chiếu bảng điểm, xác định học phần bổ sung kiến thức nếu cần. Kết quả tra cứu giúp chuẩn bị hồ sơ; điều kiện áp dụng được xác định theo hồ sơ cụ thể.",
      ],
      [
        "Chưa có chứng chỉ ngoại ngữ có được đăng ký không?",
        "Chứng chỉ là một trong các hình thức minh chứng. Bạn có thể sử dụng văn bằng phù hợp hoặc kết quả đánh giá, đào tạo ngoại ngữ được Trường tổ chức hay công nhận theo quy định. Bạn cần được đối chiếu trường hợp cụ thể và hoàn tất yêu cầu trước khi xét tuyển.",
      ],
      [
        "Cựu sinh viên Văn Lang có được miễn chứng chỉ ngoại ngữ không?",
        "Văn bằng từ đại học trở lên do Văn Lang cấp trong thời gian không quá 02 năm được xem xét khi chuẩn đầu ra ngoại ngữ của chương trình đã đạt Bậc 3 trở lên. Hai điều kiện phải đồng thời đáp ứng. Chương trình dạy bằng tiếng nước ngoài và yêu cầu riêng của ngành vẫn cần được kiểm tra.",
      ],
      [
        "Lịch học có phù hợp với người đang đi làm không?",
        "Chương trình đào tạo theo hình thức chính quy. Lịch học bố trí vào buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu cụ thể được công bố theo học kỳ. Thời gian chuẩn là 18 tháng với định hướng ứng dụng, 24 tháng với định hướng nghiên cứu.",
      ],
      [
        "Học phí toàn khóa đã bao gồm tất cả các khoản chưa?",
        "Chưa. Lệ phí xét tuyển 500.000 đồng và nhập học 1.000.000 đồng được thu riêng. Bổ sung kiến thức 1.200.000 đồng/môn áp dụng khi được yêu cầu; ôn tiếng Anh 1.000.000 đồng và thi tiếng Anh đầu vào 1.000.000 đồng áp dụng khi đăng ký tương ứng.",
      ],
      [
        "Học bổng và hỗ trợ tài chính có được cộng dồn không?",
        "Không. Mỗi học viên chỉ áp dụng một chính sách có mức cao nhất trong học bổng Phát triển năng lực, học bổng đồng hành STEM hoặc hỗ trợ tài chính. Hồ sơ và minh chứng phải được xét, phê duyệt trước khi xác định mức hưởng.",
      ],
      [
        "Cựu sinh viên, cựu học viên Văn Lang được hỗ trợ bao nhiêu?",
        "Cựu sinh viên và cựu học viên Văn Lang thuộc nhóm được xét hỗ trợ tài chính 10%. Việc áp dụng cần minh chứng hợp lệ và tuân theo nguyên tắc chọn một chính sách có mức cao nhất.",
      ],
      [
        "Tôi cần nộp hồ sơ giấy ngay khi dự tuyển không?",
        "Hồ sơ dự tuyển chủ yếu được tiếp nhận trực tuyến hoặc dưới dạng điện tử; hồ sơ xét học bổng, hỗ trợ tài chính có quy trình riêng. Khi nhập học, thực hiện danh mục hồ sơ và việc đối chiếu theo hướng dẫn của Trường, trong đó giấy khám sức khỏe được cung cấp bằng bản giấy.",
      ],
      [
        "Khi nào có lịch phỏng vấn, kết quả và nhập học?",
        "Lịch phỏng vấn, công bố kết quả và nhập học được thông báo theo từng đợt tuyển sinh.",
      ],
    ];
    $("#faq-intro").textContent =
      "Những thông tin cần làm rõ trước khi đăng ký dự tuyển thạc sĩ 2027.";
    $("#faq-list").innerHTML = questions
      .map(
        (x, i) =>
          "<details " +
          (i === 0 ? "open" : "") +
          "><summary>" +
          escapeHtml(x[0]) +
          '</summary><div class="answer">' +
          escapeHtml(x[1]) +
          "</div></details>",
      )
      .join("");
  }
  let lastDialogTrigger = null;
  function openDialog(title, body, badge = "Tuyển sinh thạc sĩ 2027", wide = false) {
    const d = $("#info-dialog");
    if (!d.open) lastDialogTrigger = document.activeElement;
    $("#dialog-title").textContent = title;
    $("#dialog-badge").textContent = badge;
    $("#dialog-body").innerHTML = body;
    d.classList.toggle("wide", wide);
    if (!d.open) d.showModal();
    d.scrollTop = 0;
  }
  function closeDialog() {
    if ($("#info-dialog").open) $("#info-dialog").close();
  }
  function showNotice() {
    if (state.degree === "doctor") {
      showDoctorNotice();
      return;
    }
    openDialog(
      "Kế hoạch tuyển sinh thạc sĩ 2027",
      '<p>Chọn trong 19 ngành thạc sĩ, với định hướng ứng dụng và/hoặc nghiên cứu tùy chương trình. Ba đợt nhận hồ sơ:</p><div class="notice-rounds">' +
        rounds
          .map(
            (r) =>
              "<div><strong>Đợt " +
              r.id +
              "</strong>Từ " +
              r.start +
              "<br>Đến hết " +
              r.end +
              "</div>",
          )
          .join("") +
        '</div><h3>Phương thức tuyển sinh</h3><p>Xét tuyển kết hợp phỏng vấn: <strong>Quản trị kinh doanh, Quan hệ công chúng, Mỹ thuật ứng dụng.</strong> Các ngành còn lại xét tuyển.</p><h3>Hình thức và thời gian học</h3><p>Chính quy. Định hướng ứng dụng: 18 tháng; nghiên cứu: 24 tháng. Lịch học bố trí vào buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật.</p><p>Lịch phỏng vấn, công bố kết quả và nhập học được thông báo theo từng đợt tuyển sinh.</p><div class="dialog-actions"><button class="btn primary" data-apply>Xem cổng đăng ký ' +
        icon("arrow") +
        '</button><button class="btn secondary" data-dialog-target="ho-so">Xem hồ sơ cần chuẩn bị</button></div>' +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.2 và II.3"),
      "Tuyển sinh thạc sĩ 2027",
      true,
    );
  }
  function showProgram(id) {
    const p = programs.find((x) => x.id === id);
    if (!p) return;
    const languages = [...new Set(p.tuition_variants.map((v) => v.language))].join(" / ");
    const kv = [
      ["Mã ngành", p.code],
      ["Hình thức", "Chính quy"],
      [
        "Định hướng & thời gian",
        p.tracks.map((t) => t.name + ": " + t.duration_months + " tháng").join(" · "),
      ],
      ["Phương thức", p.assessment],
      ["Ngôn ngữ giảng dạy", languages],
      ["Đợt tuyển sinh", "Đợt 1, 2 và 3 năm 2027"],
    ];
    openDialog(
      p.name,
      '<div class="dialog-kv">' +
        kv
          .map(
            (x) =>
              "<div><span>" +
              escapeHtml(x[0]) +
              "</span><strong>" +
              escapeHtml(x[1]) +
              "</strong></div>",
          )
          .join("") +
        "</div><h3>Học phí toàn khóa</h3>" +
        table(
          ["Chương trình", "Học phí"],
          p.tuition_variants.map((v) => [
            v.language + (v.specialization ? " · " + v.specialization : ""),
            money(v.total_vnd),
          ]),
        ) +
        '<p>Đóng thành ba đợt 35% – 30% – 35%. Các khoản xét tuyển, nhập học và bổ sung kiến thức được thu riêng theo trường hợp áp dụng.</p><h3>Trước khi đăng ký</h3><p>Đối chiếu ngành tốt nghiệp, bảng điểm và minh chứng ngoại ngữ. Việc bổ sung kiến thức được xác định theo từng hồ sơ.</p><div class="dialog-actions"><button class="btn primary" data-bsk="' +
        p.id +
        '">Tra cứu ngành phù hợp ' +
        icon("arrow") +
        '</button><button class="btn secondary" data-consult="Tư vấn chương trình" data-select-program="' +
        p.id +
        '">Tư vấn ngành này</button></div>' +
        source("Đề án tuyển sinh thạc sĩ 2027, mục I.5, II.2.2 và Phụ lục 1"),
      "Chương trình thạc sĩ",
    );
  }
  function showBsk(id) {
    if (state.degree !== "master") return;
    const chosen = programs.some((p) => p.id === id) ? id : $("#fee-program").value || "mba";
    openDialog(
      "Tra cứu ngành phù hợp & bổ sung kiến thức",
      '<p>Chọn chương trình thạc sĩ và tìm theo tên ngành đại học đã tốt nghiệp. Khoa và Viện sẽ đối chiếu bảng điểm để xác nhận yêu cầu cho từng hồ sơ.</p><div class="lookup-filters"><div class="field"><label for="bsk-program">Chương trình thạc sĩ</label><select id="bsk-program">' +
        optionsHtml(programs) +
        '</select></div><div class="field"><label for="bsk-search">Ngành đại học / nhóm ngành</label><input id="bsk-search" type="search" placeholder="Ví dụ: quản trị, kỹ thuật…" autocomplete="off"></div></div><div id="bsk-warning"></div><div class="lookup-count" id="bsk-count" aria-live="polite"></div><div id="bsk-results"></div><div class="review-note">Kết quả này là danh mục đối chiếu, chưa xác nhận đủ điều kiện dự tuyển. Hoàn thành bổ sung kiến thức trước khi xét tuyển; kết quả có giá trị 02 năm kể từ khi đạt yêu cầu và được công nhận. Học phí: 1.200.000 đồng/môn.</div>' +
        source(
          "Phụ lục ngành phù hợp và bổ sung kiến thức 19 ngành, ngày 21/10/2026; Đề án 2027, mục II.3.8 và II.3.11",
        ),
      "Tra cứu theo hồ sơ",
      true,
    );
    $("#bsk-program").value = chosen;
    $("#bsk-program").addEventListener("change", renderBsk);
    $("#bsk-search").addEventListener("input", renderBsk);
    renderBsk();
  }
  function renderBsk() {
    const p = programs.find((p) => p.id === $("#bsk-program").value),
      q = normalize($("#bsk-search").value.trim());
    const rows = p.bsk_groups.filter((g) =>
      normalize(g.group + " " + g.eligible_majors).includes(q),
    );
    $("#bsk-warning").innerHTML = "";
    $("#bsk-count").textContent =
      rows.length + " nhóm đối chiếu" + (q ? " theo từ khóa" : " trong phụ lục");
    $("#bsk-results").innerHTML = rows.length
      ? rows
          .map(
            (g) =>
              '<article class="bsk-item"><h3>' +
              escapeHtml(g.group) +
              '</h3><p class="preline">' +
              escapeHtml(g.eligible_majors) +
              '</p><div class="requirement preline">' +
              escapeHtml(g.supplementary_requirement) +
              "</div></article>",
          )
          .join("")
      : '<div class="callout"><strong>Chưa thấy ngành trong kết quả tra cứu.</strong>Hãy thử tên ngành khác hoặc gửi bảng điểm cho Viện để được xem xét. Kết quả tìm kiếm trống không phải kết luận về điều kiện dự tuyển.</div>';
  }
  function showLanguage() {
    openDialog(
      "Ngoại ngữ đầu vào & chứng chỉ tương đương",
      "<p><strong>Yêu cầu chung: Bậc 3 trở lên.</strong> Chương trình dạy và học bằng tiếng nước ngoài áp dụng <strong>Bậc 4 trở lên</strong> đối với ngôn ngữ giảng dạy hoặc trường hợp văn bằng phù hợp tại Điều 6. Yêu cầu riêng của từng chương trình vẫn được đối chiếu.</p><h3>Các hình thức minh chứng được xem xét</h3>" +
        listHtml([
          "Văn bằng từ đại học trở lên ngành ngôn ngữ nước ngoài, hoặc chương trình được thực hiện chủ yếu bằng ngôn ngữ nước ngoài.",
          "Văn bằng, chứng chỉ theo danh mục được chấp nhận và còn hiệu lực đến ngày đăng ký dự tuyển.",
          "Kết quả kỳ đánh giá hoặc chương trình đào tạo, bồi dưỡng ngoại ngữ do Trường tổ chức/công nhận, đáp ứng mức yêu cầu.",
          "Văn bằng từ đại học trở lên do Văn Lang cấp không quá 02 năm, đồng thời chuẩn đầu ra ngoại ngữ của chương trình đã đáp ứng Bậc 3 trở lên. Điều kiện này không tự thay thế yêu cầu riêng của chương trình dạy bằng tiếng nước ngoài.",
        ]) +
        "<h3>Chứng chỉ ngoại ngữ và mức tương đương</h3><p>Chứng chỉ phải còn hiệu lực và đáp ứng yêu cầu của chương trình đăng ký.</p>" +
        table(
          ["Ngôn ngữ / chứng chỉ", "Thời hạn", "Bậc 3", "Bậc 4"],
          DATA.equivalence.map((x) => [
            x.language + " · " + x.certificate,
            x.validity_exact,
            x.level_3_exact,
            x.level_4_exact,
          ]),
        ) +
        "" +
        source(
          "Quyết định 2600 ngày 30/09/2026, Điều 6 khoản 1 điểm c–f (trang PDF 6–7); Đề án 2027, Phụ lục 2",
        ),
      "Điều kiện ngoại ngữ",
      true,
    );
  }
  function showApply() {
    if (state.degree === "doctor") {
      showDoctorApply();
      return;
    }
    openDialog(
      "Đăng ký dự tuyển thạc sĩ 2027",
      '<p>Đăng ký trực tuyến trên Cổng tuyển sinh Trường Đại học Văn Lang.</p><ol><li>Chọn đúng chương trình và đợt tuyển sinh đang mở trên cổng.</li><li>Khai thông tin, tải hồ sơ điện tử và kiểm tra lại trước khi gửi.</li><li>Thực hiện lệ phí xét tuyển 500.000 đồng theo hướng dẫn chính thức.</li><li>Lưu thông tin xác nhận và theo dõi yêu cầu bổ sung.</li></ol><p>Hoàn tất đăng ký và thanh toán theo hướng dẫn trên Cổng tuyển sinh.</p><div class="dialog-actions"><a class="btn primary" href="' +
        PORTAL +
        '" target="_blank" rel="noopener noreferrer">Mở cổng tuyển sinh Văn Lang ' +
        icon("up-right") +
        '</a><button class="btn secondary" data-dialog-target="ho-so">Kiểm tra hồ sơ</button></div>' +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.7"),
      "Cổng đăng ký chính thức",
    );
  }
  function policyNote() {
    return '<div class="review-note"><strong>Nguyên tắc áp dụng:</strong> chỉ chọn một chính sách có mức cao nhất trong học bổng Phát triển năng lực, học bổng đồng hành STEM và hỗ trợ tài chính; không cộng dồn. Việc hưởng chính sách cần hồ sơ hợp lệ và phê duyệt.</div>';
  }
  function showPolicy(kind) {
    if (state.degree !== "master") {
      showDoctorNotice();
      return;
    }
    const s = DATA.scholarships;
    let title,
      body,
      wide = false;
    if (kind === "scholarship") {
      title = "Học bổng Phát triển năng lực";
      wide = true;
      body =
        "<p>Mức xét từ 15–50%, căn cứ đồng thời vào xếp loại tốt nghiệp và danh hiệu tại cơ sở đào tạo đại học.</p>" +
        table(
          ["Xếp loại", "Thủ khoa", "Á khoa 1", "Á khoa 2", "Không có danh hiệu"],
          s.development.rates.map((r) => [
            r.graduation_class,
            r.valedictorian + "%",
            r.salutatorian_1 + "%",
            r.salutatorian_2 + "%",
            r.no_honor === null ? "—" : r.no_honor + "%",
          ]),
        ) +
        "<h3>Điều kiện xét</h3>" +
        listHtml([
          "Đã trúng tuyển chương trình thạc sĩ.",
          "Từ ngày được công nhận tốt nghiệp đại học đến ngày được công nhận trúng tuyển thạc sĩ không quá 24 tháng.",
          "Xếp loại và danh hiệu được chứng minh bằng văn bằng, bảng điểm, quyết định hoặc giấy tờ hợp lệ của cơ sở đào tạo.",
        ]) +
        "<p>Trường hợp tốt nghiệp từ Giỏi trở lên có danh hiệu Á khoa nhưng không phân biệt Á khoa 1/2: xếp loại Xuất sắc được xét 40%, Giỏi 25%. Dấu “—” là mức không quy định trong bảng cho trường hợp tương ứng.</p><h3>Điều kiện duy trì</h3>" +
        listHtml(s.development.maintenance) +
        "<p>Ngừng áp dụng từ thời điểm không còn đáp ứng điều kiện.</p>" +
        policyNote() +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.5.2–3.5.3");
    } else if (kind === "stem") {
      title = "Học bổng đồng hành STEM";
      body =
        "<p>Học bổng áp dụng đối với học viên thuộc các ngành trong danh mục STEM do Trường công bố theo chính sách tuyển sinh hằng năm.</p>" +
        table(
          ["Đối tượng", "Mức xét"],
          [
            ["Nữ", "15%"],
            ["Nam", "10%"],
          ],
        ) +
        "" +
        policyNote() +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.5.4");
    } else if (kind === "support") {
      title = "16 nhóm được xét hỗ trợ tài chính";
      wide = true;
      body =
        "<p>Đối chiếu nhóm đối tượng và chuẩn bị giấy tờ minh chứng tương ứng. Mức hỗ trợ được xác định sau khi xét hồ sơ và phê duyệt.</p>" +
        table(
          ["STT", "Nhóm đối tượng", "Mức xét"],
          s.financial_support.map((r) => [
            r.number,
            r.eligibility.replace("Học viên/nghiên cứu sinh", "Học viên"),
            r.rate_percent + "%",
          ]),
        ) +
        policyNote() +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.4");
    } else if (kind === "research") {
      title = "Hỗ trợ nghiên cứu khoa học";
      body =
        "<p>Hỗ trợ gắn với cam kết sản phẩm nghiên cứu và hợp đồng nghiên cứu được ký kết theo quy định của Trường.</p>" +
        listHtml([
          "Nghiên cứu có cam kết công bố WoS/Scopus từ Q4 trở lên có thể được xem xét cơ chế thù lao hằng tháng theo hợp đồng.",
          "Với các bài báo khoa học khác, việc chi trả được thực hiện sau nghiệm thu, căn cứ kết quả công bố, thứ hạng và định mức hiện hành của Trường.",
          "Mức hỗ trợ được xác định theo hợp đồng nghiên cứu và phê duyệt của Trường.",
          "Nếu không hoàn thành sản phẩm theo cam kết, khoản thù lao đã nhận được xử lý theo hợp đồng nghiên cứu và quy định của Trường.",
        ]) +
        '<div class="review-note">Đây là cơ chế hỗ trợ nghiên cứu, không phải khoản giảm học phí tự động khi trúng tuyển.</div>' +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.6");
    } else {
      title = "Các khoản thu ngoài học phí toàn khóa";
      wide = true;
      body =
        table(
          ["Khoản thu", "Mức thu", "Phạm vi áp dụng"],
          DATA.fees
            .filter((f) => f.name !== "Học phí toàn khóa")
            .map((f) => [f.name, f.amount_as_written, f.applies]),
        ) +
        "<h3>Thanh toán học phí</h3><p>Học phí toàn khóa chia thành ba đợt: <strong>35% – 30% – 35%</strong>. Chọn chương trình tại phần học phí để xem số tiền từng đợt. Hạn đóng và kênh thanh toán thực hiện theo thông báo của Trường.</p><p>Chỉ sử dụng thông tin thanh toán được công bố hoặc gửi qua kênh chính thức.</p>" +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.11 và Phụ lục 1");
    }
    body +=
      '<div class="dialog-actions"><button class="btn primary" data-consult="' +
      escapeHtml(title) +
      '">Trao đổi với bộ phận tư vấn ' +
      icon("arrow") +
      "</button></div>";
    openDialog(title, body, "Học phí & chính sách 2027", wide);
  }
  function showStatus() {
    if (state.degree === "doctor") {
      showDoctorStatus();
      return;
    }
    openDialog(
      "Theo dõi hồ sơ và kết quả",
      "<p>Sau khi đăng ký, lưu tài khoản hoặc mã hồ sơ được cấp và theo dõi thông tin liên lạc đã khai báo.</p>" +
        listHtml([
          "Kiểm tra yêu cầu bổ sung từ Viện và hoàn thiện đúng thời hạn.",
          "Theo dõi lịch bổ sung kiến thức, ngoại ngữ hoặc phỏng vấn nếu có.",
          "Kết quả tuyển sinh được công bố sau quyết định phê duyệt của Hiệu trưởng.",
          "Nếu trúng tuyển, đọc hướng dẫn về hồ sơ, các khoản cần thanh toán và thời hạn nhập học.",
        ]) +
        '<p>Truy cập Cổng tuyển sinh để theo dõi hồ sơ và kết quả.</p><div class="dialog-actions"><a class="btn primary" href="' +
        PORTAL +
        '" target="_blank" rel="noopener noreferrer">Mở cổng tuyển sinh ' +
        icon("up-right") +
        '</a><button class="btn secondary" data-consult="Hỗ trợ theo dõi hồ sơ">Liên hệ Viện</button></div>' +
        source("Đề án tuyển sinh thạc sĩ 2027, mục II.3.7 và II.3.15"),
      "Kết quả & nhập học",
    );
  }
  function consult(topic, program) {
    closeDialog();
    if (program) $("#contact-program").value = program;
    else if (state.degree === "doctor") $("#contact-program").value = "doctor";
    else if (normalize(topic).includes("hoc phi"))
      $("#contact-program").value = $("#fee-program").value;
    $("#contact-question").value = topic;
    $("#form-success").hidden = true;
    scrollToSection("tu-van");
  }
  let toastTimer;
  function toast(text) {
    $("#toast").textContent = text;
    $("#toast").classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3500);
  }
  function downloadChecklist() {
    const checked = state.checks[docKey()] || [];
    const lines = [
      "CHUẨN BỊ HỒ SƠ THẠC SĨ 2027",
      "Viện Sau đại học · Trường Đại học Văn Lang",
      "Loại hồ sơ: " + (state.doc === "application" ? "Dự tuyển" : "Nhập học"),
      "",
      "Danh mục hồ sơ tuyển sinh thạc sĩ năm 2027.",
      "Các mục có điều kiện chỉ áp dụng với trường hợp tương ứng.",
      "",
      ...docs().map(
        (d, i) => (checked.includes(i) ? "[x] " : "[ ] ") + d.title + "\n    " + d.mode,
      ),
      "",
      "Dự tuyển chủ yếu bằng hồ sơ điện tử. Nhập học theo hướng dẫn đối chiếu và nộp hồ sơ của Trường. Hồ sơ học bổng/hỗ trợ tài chính theo quy trình riêng.",
      "Ngoại ngữ: trường hợp đáp ứng bằng hình thức khác chứng chỉ cần được hướng dẫn giấy tờ tương ứng.",
      "Hotline/Zalo: 0988 48 6869 · Email: tuyensinh.sdh@vlu.edu.vn",
      "Cổng đăng ký: " + PORTAL,
    ];
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/plain;charset=utf-8" }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "ho-so-thac-si-2027-" + state.doc + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Đã tạo danh sách hồ sơ để tải xuống.");
  }
  listen(root, "click", (e) => {
    const b = e.target.closest("button,a");
    if (!b) return;

    if (b.hasAttribute("data-degree")) {
      setDegree(b.dataset.degree);
      return;
    }
    if (b.hasAttribute("data-program")) {
      showProgram(b.dataset.program);
      return;
    }
    if (b.hasAttribute("data-notice")) {
      if (b.dataset.noticeContext) setDegree(b.dataset.noticeContext);
      showNotice();
      return;
    }
    if (b.hasAttribute("data-apply")) {
      showApply();
      return;
    }
    if (b.hasAttribute("data-bsk")) {
      showBsk(b.dataset.bsk);
      return;
    }
    if (b.hasAttribute("data-language")) {
      showLanguage();
      return;
    }
    if (b.hasAttribute("data-policy")) {
      showPolicy(b.dataset.policy);
      return;
    }
    if (b.hasAttribute("data-consult")) {
      consult(b.dataset.consult, b.dataset.selectProgram);
      return;
    }
    if (b.hasAttribute("data-doc")) {
      setDoc(b.dataset.doc);
      return;
    }
    if (b.hasAttribute("data-step")) {
      state.process = Number(b.dataset.step);
      renderProcess();
      $("#process-tab-" + state.process).focus({ preventScroll: true });
      return;
    }
    if (b.hasAttribute("data-dialog-target")) {
      closeDialog();
      scrollToSection(b.dataset.dialogTarget);
      return;
    }
    if (b.hasAttribute("data-status-guide")) {
      showStatus();
      return;
    }
    if (b.hasAttribute("data-process-action")) {
      const t = b.dataset.processAction;
      if (t === "apply") showApply();
      else if (t === "status") showStatus();
      else if (t === "enrollment") {
        setDoc("enrollment");
        scrollToSection("ho-so");
      } else scrollToSection(t);
      return;
    }
    if (b.id === "clear-search") {
      $("#program-search").value = "";
      $("#program-group").value = "all";
      renderPrograms();
    }
  });
  $("#program-search")?.addEventListener("input", renderPrograms);
  $("#program-group")?.addEventListener("change", renderPrograms);
  $("#intake-select").addEventListener("change", () => {
    state.round = Number($("#intake-select").value);
    renderTimeline();
  });
  $("#fee-program").addEventListener("change", () => updateFee(true));
  $("#fee-variant").addEventListener("change", () => updateFee(false));
  $("#show-more")?.addEventListener("click", () => {
    state.showAll = !state.showAll;
    renderPrograms();
  });
  $("#document-checklist").addEventListener("change", (e) => {
    if (!e.target.matches("[data-check]")) return;
    const n = Number(e.target.dataset.check),
      key = docKey(),
      v = state.checks[key] || [];
    state.checks[key] = e.target.checked ? [...new Set([...v, n])] : v.filter((x) => x !== n);
    e.target.closest(".checklist-item").classList.toggle("done", e.target.checked);
    updateProgress();
  });
  $("#reset-checklist").addEventListener("click", () => {
    state.checks[docKey()] = [];
    renderChecklist();
  });
  $("#download-checklist").addEventListener("click", downloadChecklist);
  $("#show-enrollment").addEventListener("click", () => {
    setDoc("enrollment");
    scrollToSection("ho-so");
  });
  $("#dialog-close").addEventListener("click", closeDialog);
  $("#info-dialog").addEventListener("click", (e) => {
    if (e.target === $("#info-dialog")) {
      const r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        closeDialog();
    }
  });
  $("#info-dialog").addEventListener("close", () => {
    if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus({ preventScroll: true });
  });
  listen($("#consultation-form"), "submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.reportValidity() || form.getAttribute("aria-busy") === "true") return;
    const success = $("#form-success");
    const error = $("#form-error");
    success.hidden = true;
    error.hidden = true;
    const submit = form.querySelector('button[type="submit"]');
    const originalLabel = submit.textContent;
    const input = {
      name: $("#contact-name").value.trim(),
      phone: $("#contact-phone").value.trim(),
      email: $("#contact-email").value.trim(),
      programme: $("#contact-program").selectedOptions[0].textContent,
      interestedField: state.degree === "doctor" ? "Tiến sĩ" : "Thạc sĩ",
      message: $("#contact-question").value.trim(),
      consent: $("#contact-consent").checked,
      website: $("#contact-website").value,
      sourcePage: "/admissions",
      sourceComponent: "AdmissionsReference",
    };
    if (input.name.length < 2) {
      error.textContent = "Vui lòng nhập họ và tên từ 2 ký tự.";
      error.hidden = false;
      return;
    }
    submit.disabled = true;
    submit.textContent = "Đang gửi yêu cầu…";
    form.setAttribute("aria-busy", "true");
    try {
      const message = await sendAdmissionConsultation(input);
      if (!root.isConnected || !form.isConnected) return;
      success.textContent = message;
      success.hidden = false;
      form.reset();
      $("#contact-degree").value = state.degree;
    } catch {
      if (!root.isConnected || !form.isConnected) return;
      error.textContent =
        "Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ Viện qua điện thoại/email bên cạnh.";
      error.hidden = false;
    } finally {
      if (root.isConnected && form.isConnected) {
        submit.disabled = false;
        submit.textContent = originalLabel;
        form.removeAttribute("aria-busy");
      }
    }
  });
  listen($("#admissions-degree"), "change", (e) => setDegree(e.target.value));
  listen($("#contact-degree"), "change", (e) => setDegree(e.target.value));
  listen(root, "keydown", (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))
      return;
    const tabs = Array.from(tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]'));
    let i = tabs.indexOf(tab);
    if (e.key === "Home") i = 0;
    else if (e.key === "End") i = tabs.length - 1;
    else
      i = (i + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) + tabs.length) % tabs.length;
    e.preventDefault();
    const next = tabs[i];
    next.click();
    document.getElementById(next.id)?.focus({ preventScroll: true });
  });
  const sectionLinks = $$(".section-nav a");
  let navUpdatePending = false;
  function updateSectionNav() {
    const sections = sectionLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const marker = $(".section-nav-shell").getBoundingClientRect().height + 24;
    let current = sections[0];
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= marker) current = s;
    });
    if (current)
      sectionLinks.forEach((a) => {
        const active = a.getAttribute("href") === "#" + current.id;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    navUpdatePending = false;
  }
  function requestNavUpdate() {
    if (!navUpdatePending) {
      navUpdatePending = true;
      requestAnimationFrame(updateSectionNav);
    }
  }
  listen(window, "scroll", requestNavUpdate, { passive: true });
  listen(window, "resize", requestNavUpdate);
  const doctorSectionMap = {
    "dieu-kien": "ts-dieu-kien",
    "lich-tuyen-sinh": "ts-lich-tuyen-sinh",
    "hoc-phi": "ts-hoc-phi",
    "ho-so": "ts-ho-so",
    "huong-dan": "ts-huong-dan",
    "ket-qua": "ts-ket-qua",
    "cau-hoi": "ts-cau-hoi",
  };
  const originalContactAddress = $(".contact-address").innerHTML;
  let doctorInitialized = false,
    doctorProcessIndex = 0;
  const doctorChecks = new Set();
  function doctorSource() {
    return "";
  }
  function setDegree(degree) {
    if (!["master", "doctor"].includes(degree)) return;
    state.degree = degree;
    state.showAll = false;
    state.process = 0;
    const master = degree === "master";
    $$("[data-degree]").forEach((b) => {
      const active = b.dataset.degree === degree;
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
    });
    $("#degree-content").setAttribute("aria-labelledby", "degree-" + degree);
    $$("[data-degree-label]").forEach((el) => (el.textContent = master ? "Thạc sĩ" : "Tiến sĩ"));
    masterSections.forEach((id) => ($("#" + id).hidden = !master));
    Object.values(doctorSectionMap).forEach((id) => ($("#" + id).hidden = master));
    $("#admissions-degree").value = degree;
    $("#contact-degree").value = degree;
    $(".section-nav").hidden = false;
    $("#intake-title").textContent = master ? "Tuyển sinh thạc sĩ 2027" : "Tuyển sinh tiến sĩ";
    $("#intake-badge").innerHTML =
      '<span class="dot"></span> ' +
      (master ? "Kế hoạch tuyển sinh 2027" : "Nhận hồ sơ thường xuyên");
    $("#intake-select").disabled = !master;
    $("#intake-select").hidden = !master;
    $("#doctor-intake-info").hidden = master;
    $("#doctor-intake-info").textContent = "Khoa học Môi trường";
    $("#intake-select").previousElementSibling.textContent = master
      ? "Chọn đợt tuyển sinh"
      : "Ngành tuyển sinh";
    $("#contact-program").innerHTML = master
      ? '<option value="">Chọn chương trình bạn quan tâm</option><option value="undecided">Chưa xác định — cần tư vấn thêm</option>' +
        optionsHtml(programs)
      : '<option value="">Chọn chương trình bạn quan tâm</option><option value="doctor">Tiến sĩ Khoa học Môi trường</option>';
    $(".hero-title-label").textContent = "Tuyển sinh năm 2027";
    $(".contact-address").innerHTML = master
      ? originalContactAddress
      : "Phòng 2.01, Tòa A, Cơ sở chính<br>69/68 Đặng Thùy Trâm, phường Bình Lợi Trung, TP. Hồ Chí Minh.";
    document.title = master
      ? "Tuyển sinh thạc sĩ 2027 | Viện Sau đại học Văn Lang"
      : "Tuyển sinh tiến sĩ Khoa học Môi trường | Viện Sau đại học Văn Lang";
    $$('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute("href");
      const base =
        a.dataset.degreeTarget ||
        Object.keys(doctorSectionMap).find(
          (k) => href === "#" + k || href === "#" + doctorSectionMap[k],
        );
      if (base) {
        a.dataset.degreeTarget = base;
        a.setAttribute("href", "#" + (master ? base : doctorSectionMap[base]));
      }
    });
    if (master) {
      if ($("#program-search")) $("#program-search").value = "";
      if ($("#program-group"))
        $("#program-group").innerHTML =
          '<option value="all">Tất cả nhóm ngành</option>' +
          Object.entries(groups)
            .map(([k, v]) => '<option value="' + k + '">' + escapeHtml(v) + "</option>")
            .join("");
      $("#fee-program").innerHTML = optionsHtml(programs);
      $("#fee-program").value = "mba";
      renderPrograms();
      renderConditions();
      renderTimeline();
      updateFee(true);
      setDoc("application");
      renderProcess();
      renderFAQ();
    } else {
      $("#intake-period").textContent = "Tiếp nhận hồ sơ";
      $("#intake-deadline").textContent = "Thường xuyên · Xét khi đủ hồ sơ";
      if (!doctorInitialized) {
        renderDoctorChecklist();
        renderDoctorProcess();
        renderDoctorFAQ();
        doctorInitialized = true;
      }
    }
    $("#context-announcement").textContent = master
      ? "Đang xem tuyển sinh thạc sĩ 2027, 19 ngành."
      : "Đang xem tuyển sinh tiến sĩ Khoa học Môi trường.";
    requestNavUpdate();
  }
  function doctorDocNote(i) {
    if (i === 4 || i === 5)
      return "Áp dụng với người dự tuyển từ trình độ thạc sĩ. Người dự tuyển từ đại học liên hệ Viện để được hướng dẫn hồ sơ phù hợp với văn bằng dự tuyển.";
    if (i === 9)
      return "Người dự tuyển cần đáp ứng yêu cầu về kinh nghiệm nghiên cứu và cung cấp minh chứng phù hợp.";
    return "";
  }
  function renderDoctorChecklist() {
    const groups = [
      ["Thông tin cá nhân & biểu mẫu", [0, 1, 7, 8, 12, 13, 14, 15]],
      ["Văn bằng & điều kiện đầu vào", [2, 3, 4, 5, 6, 16, 20]],
      ["Đề cương & năng lực nghiên cứu", [9, 10, 11, 21, 22]],
      ["Chính sách & xác nhận khác", [17, 18, 19, 23]],
    ];
    $("#doctor-document-checklist").innerHTML = groups
      .map(
        (g, gi) =>
          '<details class="doctor-doc-group" ' +
          (gi === 0 ? "open" : "") +
          "><summary>" +
          escapeHtml(g[0]) +
          " · " +
          g[1].length +
          " mục</summary>" +
          g[1]
            .map((i) => {
              const d = DOCTOR.docs[i],
                checked = doctorChecks.has(i),
                note = doctorDocNote(i);
              return (
                '<label class="checklist-item ' +
                (checked ? "done" : "") +
                '"><input type="checkbox" data-doctor-check="' +
                i +
                '" ' +
                (checked ? "checked" : "") +
                "><span><strong>" +
                String(i + 1).padStart(2, "0") +
                ". " +
                escapeHtml(d.title) +
                "</strong><span>" +
                escapeHtml(d.quantity + " · " + d.mode) +
                '</span><span class="doctor-document-note">' +
                escapeHtml(d.required ? "Bắt buộc" : "Nếu có") +
                (note ? " · " + escapeHtml(note) : "") +
                "</span></span></label>"
              );
            })
            .join("") +
          "</details>",
      )
      .join("");
    updateDoctorProgress();
  }
  function updateDoctorProgress() {
    const n = doctorChecks.size,
      total = DOCTOR.docs.length,
      pct = Math.round((n / total) * 100);
    $("#doctor-checklist-status").textContent = "Đã chuẩn bị " + n + " / " + total + " mục";
    $("#doctor-progress-fill").style.width = pct + "%";
    $("#doctor-checklist-progress").setAttribute("aria-valuenow", String(pct));
  }
  function saveDownload(blob, filename) {
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  function downloadDoctorPdf() {
    const a = document.createElement("a");
    a.href = "/admissions/thong-bao-tuyen-sinh-tien-si-2026.pdf";
    a.download = "thong-bao-tuyen-sinh-tien-si-2026.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function downloadDoctorChecklist() {
    const lines = [
      "DANH SÁCH HỒ SƠ DỰ TUYỂN TIẾN SĨ — KHOA HỌC MÔI TRƯỜNG",
      "Mã ngành: 9440301",
      "",
      'Các mục "nếu có" áp dụng theo trường hợp. Ứng viên dự tuyển từ đại học hạng giỏi trở lên liên hệ Viện để được hướng dẫn hồ sơ phù hợp với văn bằng dự tuyển.',
      "",
      ...DOCTOR.docs.map(
        (d, i) =>
          (doctorChecks.has(i) ? "[x] " : "[ ] ") +
          String(i + 1).padStart(2, "0") +
          ". " +
          d.title +
          "\n    Số lượng: " +
          d.quantity +
          " | " +
          d.mode +
          "\n    " +
          (d.required ? "Bắt buộc" : "Nếu có") +
          (doctorDocNote(i) ? " · " + doctorDocNote(i) : ""),
      ),
      "",
      "Học bổng: Nộp hồ sơ học bổng cùng hồ sơ ứng tuyển nếu có đăng ký.",
      "Biểu mẫu: Liên hệ Viện Sau đại học.",
      "Hotline: 0988 48 6869 | Điện thoại: 028 7101 6869",
      "Email: tuyensinh.sdh@vlu.edu.vn",
    ];
    saveDownload(
      new Blob(["\ufeff" + lines.join("\n")], { type: "text/plain;charset=utf-8" }),
      "danh-sach-ho-so-tien-si.txt",
    );
    toast("Đã tạo danh sách hồ sơ tiến sĩ để tải xuống.");
  }
  const doctorProcessSteps = [
    {
      title: "Đối chiếu điều kiện",
      detail: "Xác định diện dự tuyển",
      text: "Đối chiếu văn bằng, ngành tốt nghiệp, kinh nghiệm nghiên cứu và ngoại ngữ với yêu cầu chương trình tiến sĩ Khoa học Môi trường.",
      items: [
        "Chuẩn bị bằng tốt nghiệp và bảng điểm.",
        "Tra cứu danh mục ngành phù hợp.",
        "Đối chiếu minh chứng ngoại ngữ theo điều kiện tiến sĩ.",
      ],
      action: "Tra cứu ngành phù hợp",
      target: "bsk",
    },
    {
      title: "Chuẩn bị hướng nghiên cứu",
      detail: "Xây dựng đề cương và kế hoạch",
      text: "Chuẩn bị dự thảo đề cương nghiên cứu và dự kiến kế hoạch học tập, nghiên cứu toàn khóa.",
      items: [
        "Xác định vấn đề, mục tiêu và phương pháp nghiên cứu dự kiến.",
        "Tổng hợp minh chứng kinh nghiệm nghiên cứu.",
        "Trao đổi với Viện về người hướng dẫn và hồ sơ liên quan.",
      ],
      action: "Gợi ý chuẩn bị đề cương",
      target: "proposal",
    },
    {
      title: "Hoàn thiện và nộp hồ sơ",
      detail: "Chuẩn bị theo danh mục 24 mục",
      text: "Nhận biểu mẫu từ Viện, đối chiếu số lượng và quy cách, nộp hồ sơ đầy đủ theo hướng dẫn tiếp nhận.",
      items: [
        "Lệ phí xét tuyển: 500.000 đồng.",
        "Hồ sơ học bổng nộp cùng hồ sơ ứng tuyển nếu có đăng ký.",
        "Xác nhận điểm tiếp nhận và các tài liệu áp dụng cho diện của bạn.",
      ],
      action: "Xem checklist hồ sơ",
      target: "ts-ho-so",
    },
    {
      title: "Tham gia xét tuyển",
      detail: "Theo dõi hướng dẫn của Viện",
      text: "Xét tuyển sau khi ứng viên nộp đầy đủ hồ sơ; hình thức tổ chức trực tiếp.",
      items: [
        "Theo dõi yêu cầu bổ sung và lịch được thông báo.",
        "Chuẩn bị trao đổi về đề cương, kinh nghiệm nghiên cứu theo hướng dẫn.",
        "Hội đồng tuyển sinh quyết định danh sách trúng tuyển theo quy định.",
      ],
      action: "Hướng dẫn theo dõi kết quả",
      target: "status",
    },
    {
      title: "Hoàn tất nhập học",
      detail: "Bắt đầu kế hoạch học tập, nghiên cứu",
      text: "Thực hiện thủ tục nhập học và nghĩa vụ tài chính theo hướng dẫn chính thức của Trường.",
      items: [
        "Lệ phí nhập học: 1.000.000 đồng, nộp cùng học phí học kỳ đầu.",
        "Học phí năm 1: 50.000.000 đồng trước khi xét các chính sách.",
        "Theo dõi kết quả học bổng, xác nhận cam kết và kế hoạch học tập nếu được xét cấp.",
      ],
      action: "Xem việc cần chuẩn bị",
      target: "enrollment",
    },
  ];
  function renderDoctorProcess() {
    $("#doctor-process-list").innerHTML = doctorProcessSteps
      .map(
        (s, i) =>
          '<button class="process-step" id="doctor-process-tab-' +
          i +
          '" role="tab" aria-controls="doctor-process-panel" aria-selected="' +
          (i === doctorProcessIndex) +
          '" tabindex="' +
          (i === doctorProcessIndex ? "0" : "-1") +
          '" data-doctor-step="' +
          i +
          '"><span class="step-num">' +
          (i + 1) +
          "</span><strong>" +
          escapeHtml(s.title) +
          "</strong>" +
          icon("arrow") +
          "</button>",
      )
      .join("");
    const s = doctorProcessSteps[doctorProcessIndex];
    $("#doctor-process-panel").setAttribute(
      "aria-labelledby",
      "doctor-process-tab-" + doctorProcessIndex,
    );
    $("#doctor-process-panel").innerHTML =
      '<span class="large-step" aria-hidden="true">0' +
      (doctorProcessIndex + 1) +
      '</span><div class="eyebrow">Hướng dẫn chuẩn bị</div><h3>' +
      escapeHtml(s.detail) +
      "</h3><p>" +
      escapeHtml(s.text) +
      "</p>" +
      listHtml(s.items) +
      '<div class="process-bottom"><span>Bước ' +
      (doctorProcessIndex + 1) +
      " / " +
      doctorProcessSteps.length +
      '</span><button class="text-link" data-doctor-action="' +
      s.target +
      '">' +
      escapeHtml(s.action) +
      " " +
      icon("arrow") +
      "</button></div>";
  }
  function renderDoctorFAQ() {
    const rows = [
      [
        "Chưa có bằng thạc sĩ có được dự tuyển không?",
        "Có thể dự tuyển từ đại học hạng giỏi trở lên thuộc ngành phù hợp và đáp ứng các điều kiện còn lại. Bốn ngành đại học phù hợp gồm: Kỹ thuật môi trường, Khoa học môi trường, Công nghệ kỹ thuật môi trường, Quản lý tài nguyên và môi trường. Hồ sơ ngoài danh mục được Hội đồng xem xét theo bảng điểm.",
      ],
      [
        "Phải có bài báo khoa học mới đủ điều kiện không?",
        "Kinh nghiệm nghiên cứu có thể thể hiện qua luận văn thạc sĩ của chương trình định hướng nghiên cứu; hoặc bài báo, báo cáo khoa học đã công bố; hoặc từ 24 tháng làm giảng viên, nghiên cứu viên tại cơ sở đào tạo, tổ chức khoa học và công nghệ. Cần chuẩn bị minh chứng tương ứng và đáp ứng các điều kiện đầu vào khác.",
      ],
      [
        "Ngoại ngữ đầu vào tiến sĩ yêu cầu mức nào?",
        "Ngoại ngữ được chứng minh bằng văn bằng phù hợp hoặc chứng chỉ tương đương Bậc 4. Chứng chỉ phải còn hiệu lực đến ngày đăng ký dự tuyển và đáp ứng yêu cầu về đơn vị tổ chức thi, cấp chứng chỉ. Xem bảng riêng của tiến sĩ trong phần điều kiện.",
      ],
      [
        "Thời gian học tiến sĩ là bao lâu?",
        "Chính quy tập trung, thời gian chuẩn 3 năm với người có bằng thạc sĩ và 4 năm với người có bằng đại học. Tổng thời gian đào tạo không quá 6 năm theo quy định. Lịch học bố trí buổi tối trong tuần, thứ Bảy và Chủ nhật.",
      ],
      [
        "Có cần học bổ sung kiến thức không?",
        "Một số ngành thạc sĩ được miễn học bổ sung kiến thức. Với các nhóm ngành còn lại và ứng viên từ đại học, Hội đồng bảo vệ đề cương quyết định học phần bổ sung theo định hướng nghiên cứu. Học phí bổ sung kiến thức là 1.500.000 đồng/môn.",
      ],
      [
        "Học phí 145 triệu được đóng thế nào?",
        "Học phí toàn khóa 145.000.000 đồng, đóng năm 1: 50.000.000 đồng; năm 2: 45.000.000 đồng; năm 3: 50.000.000 đồng. Lệ phí xét tuyển, nhập học và bổ sung kiến thức được thu riêng. Lộ trình 4 năm từ đại học cần được Viện hướng dẫn kế hoạch đóng cụ thể.",
      ],
      [
        "Học bổng 100% có được áp dụng tự động không?",
        "Không. Nghiên cứu sinh phải đăng ký, được xét duyệt và cam kết tiến độ đào tạo, sản phẩm nghiên cứu vượt chuẩn đầu ra. Nhà trường rà soát cam kết, có thể điều chỉnh hoặc thu hồi học bổng. Hồ sơ học bổng nộp cùng hồ sơ ứng tuyển.",
      ],
      [
        "Khi nào hết hạn nộp hồ sơ?",
        "Viện tiếp nhận hồ sơ thường xuyên và tổ chức xét tuyển sau khi ứng viên nộp đầy đủ hồ sơ. Liên hệ Viện để được hướng dẫn nộp hồ sơ và lịch xét tuyển.",
      ],
      [
        "Tôi nhận biểu mẫu chính thức ở đâu?",
        "Liên hệ Viện Sau đại học qua 0988 48 6869 hoặc tuyensinh.sdh@vlu.edu.vn để nhận biểu mẫu và hướng dẫn. Checklist tải từ trang này hỗ trợ chuẩn bị; không thay thế đơn, lý lịch và biểu mẫu chính thức của Trường.",
      ],
    ];
    $("#doctor-faq-list").innerHTML = rows
      .map(
        (x, i) =>
          "<details " +
          (i === 0 ? "open" : "") +
          "><summary>" +
          escapeHtml(x[0]) +
          '</summary><div class="answer">' +
          escapeHtml(x[1]) +
          "</div></details>",
      )
      .join("");
  }
  function showDoctorNotice() {
    openDialog(
      "Tuyển sinh tiến sĩ Khoa học Môi trường",
      "<p>Tìm hiểu chương trình, điều kiện và kế hoạch dự tuyển tiến sĩ Khoa học Môi trường.</p>" +
        table(
          ["Nội dung", "Thông tin"],
          [
            ["Ngành / mã ngành", "Khoa học Môi trường · 9440301"],
            ["Phương thức / hình thức tuyển sinh", "Xét tuyển · Trực tiếp"],
            ["Nhận hồ sơ", "Thường xuyên; xét tuyển sau khi nộp đủ hồ sơ"],
            ["Hình thức đào tạo", "Chính quy tập trung"],
            ["Thời gian chuẩn", "3 năm từ thạc sĩ; 4 năm từ đại học"],
            ["Học phí toàn khóa", "145.000.000 đồng"],
            ["Học bổng", "Xét đến 100% học phí toàn khóa, có điều kiện và cam kết"],
          ],
        ) +
        '<div class="dialog-actions"><button class="btn primary" data-doctor-pdf>Tải thông báo tuyển sinh tiến sĩ 2026 ' +
        icon("download") +
        '</button><button class="btn secondary" data-doctor-apply>Hướng dẫn nộp hồ sơ</button></div>' +
        doctorSource("Mục 1–11 và Phụ lục 01–03"),
      "Tuyển sinh tiến sĩ",
      true,
    );
  }
  function showDoctorApply() {
    openDialog(
      "Hướng dẫn đăng ký dự tuyển tiến sĩ",
      '<p>Liên hệ <strong>Viện Sau đại học – Trường Đại học Văn Lang</strong> để nhận biểu mẫu, đối chiếu điều kiện và hướng dẫn nộp hồ sơ.</p><ol><li>Chuẩn bị văn bằng, bảng điểm, minh chứng ngoại ngữ và kinh nghiệm nghiên cứu.</li><li>Chuẩn bị dự thảo đề cương và kế hoạch học tập, nghiên cứu toàn khóa.</li><li>Hoàn thiện danh mục hồ sơ, các tài liệu của người hướng dẫn và lệ phí xét tuyển 500.000 đồng.</li><li>Nộp hồ sơ học bổng cùng hồ sơ ứng tuyển nếu có đăng ký; theo dõi lịch xét tuyển được hướng dẫn.</li></ol><h3>Đầu mối tiếp nhận</h3><p>Điện thoại: <a href="tel:+84988486869">0988 48 6869</a> hoặc <a href="tel:+842871016869">028 7101 6869</a>.<br>Email: <a href="mailto:tuyensinh.sdh@vlu.edu.vn">tuyensinh.sdh@vlu.edu.vn</a>.</p><p>Địa chỉ tiếp nhận: <strong>Phòng 2.01, Tòa A, Cơ sở chính</strong>, 69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, TP. Hồ Chí Minh.</p><div class="dialog-actions"><button class="btn primary" data-dialog-target="ts-ho-so">Xem checklist hồ sơ</button><a class="btn secondary" href="mailto:tuyensinh.sdh@vlu.edu.vn?subject=Tu%20van%20du%20tuyen%20tien%20si%20Khoa%20hoc%20Moi%20truong">Soạn email cho Viện ' +
        icon("mail") +
        "</a></div>" +
        doctorSource("Mục 4–6, 8 và 11, trang 1–5"),
      "Đăng ký dự tuyển tiến sĩ",
    );
  }
  function showDoctorStudy() {
    openDialog(
      "Thời gian & địa điểm học tiến sĩ",
      table(
        ["Nội dung", "Thông tin"],
        [
          ["Hình thức đào tạo", "Chính quy tập trung"],
          ["Có bằng thạc sĩ", "Thời gian chuẩn: 03 năm"],
          ["Có bằng đại học", "Thời gian chuẩn: 04 năm"],
          ["Giới hạn thời gian", "Không quá 06 năm / 72 tháng"],
          ["Lịch học", "Buổi tối trong tuần, thứ Bảy và Chủ nhật"],
          ["Khung giờ", "Sáng 08:30–11:30; chiều 13:30–16:30; tối 18:00–21:00 hoặc 18:30–21:30"],
        ],
      ) +
        "<p>Giới hạn 72 tháng tính từ ngày quyết định công nhận nghiên cứu sinh có hiệu lực đến khi hoàn thành thủ tục trình luận án cho Trường, trước quy trình phản biện độc lập và thành lập Hội đồng đánh giá luận án.</p><h3>Địa điểm học</h3>" +
        listHtml([
          "Cơ sở chính: 69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, TP. Hồ Chí Minh.",
          "Cơ sở 1: 45 Nguyễn Khắc Nhu, P. Cầu Ông Lãnh, TP. Hồ Chí Minh.",
          "Cơ sở 2: 233A Phan Văn Trị, P. Bình Lợi Trung, TP. Hồ Chí Minh.",
        ]) +
        doctorSource("Mục 10, trang 4–5"),
      "Kế hoạch đào tạo tiến sĩ",
      true,
    );
  }
  function showDoctorProposal() {
    openDialog(
      "Gợi ý chuẩn bị đề cương nghiên cứu",
      '<p>Hồ sơ cần có <strong>dự thảo đề cương nghiên cứu và dự kiến kế hoạch học tập, nghiên cứu toàn khóa</strong>. Các nội dung sau giúp bạn chuẩn bị cho buổi trao đổi với Viện và người hướng dẫn.</p><ol><li><strong>Tên đề tài dự kiến:</strong> chủ đề, đối tượng và phạm vi nghiên cứu.</li><li><strong>Vấn đề nghiên cứu:</strong> bối cảnh, lý do lựa chọn, khoảng trống cần tìm hiểu.</li><li><strong>Mục tiêu và câu hỏi nghiên cứu:</strong> kết quả muốn đạt và các câu hỏi chính.</li><li><strong>Tổng quan tài liệu:</strong> công trình liên quan, cách tiếp cận đã có và hướng phát triển.</li><li><strong>Phương pháp:</strong> thiết kế nghiên cứu, dữ liệu, cách thu thập và phân tích; nguồn lực cần thiết.</li><li><strong>Kết quả dự kiến:</strong> đóng góp khoa học, khả năng ứng dụng, sản phẩm nghiên cứu.</li><li><strong>Kế hoạch toàn khóa:</strong> các giai đoạn học tập, triển khai nghiên cứu, công bố và hoàn thiện luận án.</li><li><strong>Tài liệu tham khảo:</strong> nguồn đã đọc và dùng để xây dựng đề xuất.</li></ol><div class="review-note">Liên hệ Viện và Khoa để được hướng dẫn cấu trúc, độ dài, hình thức trình bày và yêu cầu cụ thể.</div><div class="dialog-actions"><button class="btn primary" data-consult="Xin hướng dẫn đề cương nghiên cứu và biểu mẫu tiến sĩ">Nhận hướng dẫn từ Viện ' +
        icon("arrow") +
        '</button><button class="btn secondary" data-doctor-checklist>Tải checklist hồ sơ</button></div>' +
        doctorSource("Yêu cầu đề cương: mục 5.1(d) và 6, trang 1–2"),
      "Chuẩn bị định hướng nghiên cứu",
    );
  }
  function showDoctorStatus() {
    openDialog(
      "Theo dõi hồ sơ & kết quả tiến sĩ",
      "<p>Trao đổi với đầu mối tiếp nhận của Viện để biết yêu cầu bổ sung, lịch xét tuyển và cách nhận kết quả.</p>" +
        listHtml([
          "Lưu biên nhận hoặc thông tin xác nhận khi nộp hồ sơ.",
          "Theo dõi số điện thoại, email đã đăng ký và hoàn thiện yêu cầu được thông báo.",
          "Hội đồng tuyển sinh quyết định danh sách trúng tuyển căn cứ kế hoạch và quy định.",
          "Khi số người đủ điều kiện vượt chỉ tiêu, Hội đồng có thể xem xét ưu tiên trình độ đã tốt nghiệp và kinh nghiệm nghiên cứu.",
        ]) +
        '<p>Kết quả của từng hồ sơ được thông báo qua kênh chính thức của Trường.</p><div class="dialog-actions"><button class="btn primary" data-consult="Hỗ trợ theo dõi hồ sơ dự tuyển tiến sĩ">Liên hệ Viện ' +
        icon("arrow") +
        '</button><button class="btn secondary" data-doctor-enrollment>Chuẩn bị nhập học</button></div>' +
        doctorSource("Mục 9 và 11, trang 4–5"),
      "Kết quả tuyển sinh tiến sĩ",
    );
  }
  function showDoctorEnrollment() {
    openDialog(
      "Chuẩn bị nhập học chương trình tiến sĩ",
      listHtml([
        "Đọc thông báo trúng tuyển và thực hiện đúng hướng dẫn nhập học của Trường.",
        "Đối chiếu, bổ sung hồ sơ theo yêu cầu của đơn vị tiếp nhận.",
        "Lệ phí nhập học 1.000.000 đồng nộp cùng học phí học kỳ đầu; học phí năm 1 là 50.000.000 đồng trước khi xét các chính sách.",
        "Theo dõi kết quả xét học bổng, các cam kết và nghĩa vụ tài chính nếu được cấp.",
        "Nhận kế hoạch học tập, nghiên cứu và thời khóa biểu chính thức.",
      ]) +
        '<p>Viện hướng dẫn danh mục hồ sơ và thời hạn nhập học khi ứng viên trúng tuyển.</p><div class="dialog-actions"><button class="btn primary" data-consult="Hướng dẫn nhập học chương trình tiến sĩ">Nhận hướng dẫn nhập học</button><button class="btn secondary" data-doctor-policy="fees">Xem học phí & lệ phí</button></div>' +
        doctorSource("Mục 7.2, 8–11, trang 3–5"),
      "Nhập học tiến sĩ",
    );
  }
  listen(root, "click", (e) => {
    const b = e.target.closest("button,a");
    if (!b) return;
    if (b.hasAttribute("data-doctor-pdf")) {
      downloadDoctorPdf();
      return;
    }
    if (b.hasAttribute("data-doctor-notice")) {
      showDoctorNotice();
      return;
    }
    if (b.hasAttribute("data-doctor-apply")) {
      showDoctorApply();
      return;
    }
    if (b.hasAttribute("data-doctor-bsk")) {
      showDoctorBsk();
      return;
    }
    if (b.hasAttribute("data-doctor-language")) {
      showDoctorLanguage();
      return;
    }
    if (b.hasAttribute("data-doctor-policy")) {
      showDoctorPolicy(b.dataset.doctorPolicy);
      return;
    }
    if (b.hasAttribute("data-doctor-study")) {
      showDoctorStudy();
      return;
    }
    if (b.hasAttribute("data-doctor-proposal")) {
      showDoctorProposal();
      return;
    }
    if (b.hasAttribute("data-doctor-checklist")) {
      downloadDoctorChecklist();
      return;
    }
    if (b.hasAttribute("data-doctor-status")) {
      showDoctorStatus();
      return;
    }
    if (b.hasAttribute("data-doctor-enrollment")) {
      showDoctorEnrollment();
      return;
    }
    if (b.hasAttribute("data-doctor-step")) {
      doctorProcessIndex = Number(b.dataset.doctorStep);
      renderDoctorProcess();
      $("#doctor-process-tab-" + doctorProcessIndex).focus({ preventScroll: true });
      return;
    }
    if (b.hasAttribute("data-doctor-action")) {
      const t = b.dataset.doctorAction;
      if (t === "bsk") showDoctorBsk();
      else if (t === "proposal") showDoctorProposal();
      else if (t === "status") showDoctorStatus();
      else if (t === "enrollment") showDoctorEnrollment();
      else scrollToSection(t);
      return;
    }
  });
  $("#doctor-document-checklist").addEventListener("change", (e) => {
    if (!e.target.matches("[data-doctor-check]")) return;
    const i = Number(e.target.dataset.doctorCheck);
    if (e.target.checked) doctorChecks.add(i);
    else doctorChecks.delete(i);
    e.target.closest(".checklist-item").classList.toggle("done", e.target.checked);
    updateDoctorProgress();
  });
  $("#doctor-reset-checklist").addEventListener("click", () => {
    doctorChecks.clear();
    renderDoctorChecklist();
  });
  function showDoctorBsk() {
    const body =
      "<p>Đối chiếu ngành đã tốt nghiệp với danh mục tuyển sinh tiến sĩ Khoa học Môi trường. Kết quả tra cứu giúp chuẩn bị hồ sơ; yêu cầu cụ thể được xác định qua văn bằng, bảng điểm và định hướng nghiên cứu.</p>" +
      '<div class="lookup-filters"><div class="field"><label for="doctor-qualification">Văn bằng dùng để dự tuyển</label><select id="doctor-qualification"><option value="master">Đã tốt nghiệp thạc sĩ</option><option value="bachelor">Đại học loại Giỏi trở lên</option><option value="other">Ngành hoặc trường hợp khác</option></select></div><div class="field"><label for="doctor-bsk-search">Tên ngành, mã ngành hoặc nhóm ngành</label><input id="doctor-bsk-search" type="search" placeholder="Ví dụ: môi trường, 8520320…" autocomplete="off"></div></div>' +
      '<div id="doctor-bsk-note"></div><div class="lookup-count" id="doctor-bsk-count" aria-live="polite"></div><div id="doctor-bsk-results"></div>' +
      '<div class="review-note">Hội đồng bảo vệ đề cương quyết định học phần bổ sung kiến thức theo định hướng nghiên cứu và hồ sơ của ứng viên. Học phí bổ sung kiến thức: <strong>1.500.000 đồng/môn</strong>.</div>' +
      '<div class="dialog-actions"><button class="btn primary" data-consult="Đối chiếu ngành tốt nghiệp và bổ sung kiến thức tiến sĩ">Nhờ Viện đối chiếu hồ sơ ' +
      icon("arrow") +
      '</button><button class="btn secondary" data-doctor-pdf>Tải thông báo tuyển sinh tiến sĩ 2026 ' +
      icon("file") +
      "</button></div>" +
      doctorSource("Phụ lục 1, trang 6–8; mục 8, trang 4");
    openDialog("Ngành phù hợp & bổ sung kiến thức", body, "Tuyển sinh tiến sĩ", true);
    $("#doctor-qualification").addEventListener("change", renderDoctorBsk);
    $("#doctor-bsk-search").addEventListener("input", renderDoctorBsk);
    renderDoctorBsk();
  }

  function renderDoctorBsk() {
    const select = $("#doctor-qualification"),
      search = $("#doctor-bsk-search");
    if (!select || !search) return;
    const qualification = select.value;
    const fold = (v) =>
      String(v || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
    const query = fold(search.value.trim());
    search.disabled = qualification === "other";
    if (qualification === "other") {
      $("#doctor-bsk-note").innerHTML =
        '<div class="callout"><strong>Cần đối chiếu hồ sơ cụ thể.</strong>Gửi văn bằng, bảng điểm, thông tin kinh nghiệm nghiên cứu và hướng đề tài dự kiến cho Viện. Viện và Hội đồng sẽ đối chiếu hồ sơ để hướng dẫn điều kiện phù hợp.</div>';
      $("#doctor-bsk-count").textContent = "Đối chiếu theo từng hồ sơ";
      $("#doctor-bsk-results").innerHTML = "";
      return;
    }
    const supplement = "Hội đồng bảo vệ đề cương quyết định học phần theo định hướng nghiên cứu.";
    const all =
      qualification === "master"
        ? DOCTOR.exempt_majors
            .map((m) => ({ ...m, requirement: "Không yêu cầu học bổ sung kiến thức." }))
            .concat(DOCTOR.supplement_majors.map((m) => ({ ...m, requirement: supplement })))
        : DOCTOR.bachelor_majors.map((m) => ({ ...m, requirement: supplement }));
    const rows = all.filter((m) =>
      fold(m.name + " " + m.code + " " + (m.group || "")).includes(query),
    );
    $("#doctor-bsk-note").innerHTML =
      qualification === "master"
        ? "<p>Danh mục gồm các ngành thạc sĩ không yêu cầu bổ sung kiến thức và các ngành được hội đồng xác định học phần theo định hướng nghiên cứu.</p>"
        : '<div class="callout"><strong>Điều kiện văn bằng: tốt nghiệp đại học loại Giỏi trở lên.</strong>Danh mục có 4 ngành đại học dưới đây. Ứng viên đồng thời phải đáp ứng các điều kiện về kinh nghiệm nghiên cứu, ngoại ngữ và hồ sơ dự tuyển.</div>';
    $("#doctor-bsk-count").textContent =
      rows.length +
      " / " +
      all.length +
      " ngành" +
      (query ? " phù hợp với từ khóa" : " trong danh mục đối chiếu");
    $("#doctor-bsk-results").innerHTML = rows.length
      ? table(
          ["Ngành tốt nghiệp", "Mã ngành", "Bổ sung kiến thức"],
          rows.map((m) => [m.name, m.code || "—", m.requirement]),
        )
      : '<div class="callout"><strong>Chưa tìm thấy ngành theo từ khóa.</strong>Thử tên hoặc mã ngành khác, hoặc gửi bảng điểm cho Viện để được hướng dẫn.</div>';
  }

  function showDoctorLanguage() {
    const body =
      "<p>Người dự tuyển đáp ứng yêu cầu ngoại ngữ bằng văn bằng phù hợp hoặc chứng chỉ <strong>tương đương Bậc 4</strong>.</p>" +
      "<h3>Các hình thức minh chứng</h3>" +
      listHtml([
        "Bằng tốt nghiệp từ đại học trở lên do cơ sở đào tạo nước ngoài, phân hiệu cơ sở đào tạo nước ngoài tại Việt Nam hoặc cơ sở đào tạo của Việt Nam cấp cho người học toàn thời gian bằng tiếng nước ngoài.",
        "Bằng tốt nghiệp từ đại học trở lên ngành ngôn ngữ tiếng nước ngoài do cơ sở đào tạo của Việt Nam cấp.",
        "Chứng chỉ trong danh mục được chấp nhận còn hiệu lực tính đến ngày đăng ký dự tuyển, hoặc chứng chỉ ngoại ngữ khác tương đương Bậc 4 theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam do Bộ Giáo dục và Đào tạo công bố.",
      ]) +
      "<h3>Chứng chỉ ngoại ngữ được chấp nhận</h3>" +
      table(
        ["Ngôn ngữ / chứng chỉ", "Thời hạn", "Mức tương đương Bậc 4"],
        DOCTOR.languages.map((x) => [x.language + " · " + x.certificate, x.validity, x.level]),
      ) +
      '<div class="review-note">Chứng chỉ phải đáp ứng yêu cầu về hiệu lực và được cấp qua các đơn vị tổ chức thi được Bộ Giáo dục và Đào tạo cho phép. Viện kiểm tra loại chứng chỉ, đơn vị cấp và phạm vi áp dụng theo hồ sơ.</div>' +
      "<h3>Ứng viên là công dân nước ngoài</h3><p>Nếu đăng ký học chương trình tiến sĩ bằng tiếng Việt, phải có chứng chỉ tiếng Việt tối thiểu Bậc 4 theo Khung năng lực tiếng Việt dùng cho người nước ngoài.</p>" +
      '<div class="dialog-actions"><button class="btn primary" data-consult="Đối chiếu minh chứng ngoại ngữ dự tuyển tiến sĩ">Tư vấn minh chứng ngoại ngữ ' +
      icon("arrow") +
      '</button><button class="btn secondary" data-doctor-pdf>Tải thông báo tuyển sinh tiến sĩ 2026 ' +
      icon("file") +
      "</button></div>" +
      doctorSource("Mục 5.2–5.3, trang 1–2; Phụ lục 2, trang 9–10");
    openDialog("Ngoại ngữ đầu vào tiến sĩ", body, "Tuyển sinh tiến sĩ", true);
  }

  function showDoctorPolicy(kind) {
    let title = "",
      body = "",
      sourceText = "",
      wide = false;
    if (kind === "scholarship") {
      title = "Học bổng tiến sĩ đến 100% học phí";
      wide = true;
      body =
        "<p>Ứng viên đủ điều kiện trúng tuyển có thể đăng ký xét học bổng <strong>đến 100% học phí toàn khóa</strong>. Kết quả được Nhà trường xét duyệt và công bố sau khi có dữ liệu trúng tuyển, nhập học.</p>" +
        "<h3>Điều kiện nhận và duy trì</h3>" +
        listHtml([
          "Thực hiện đúng tiến độ đào tạo trong kế hoạch học tập, nghiên cứu toàn khóa căn cứ quyết định công nhận trúng tuyển.",
          "Cam kết nghiên cứu và công bố khoa học vượt chuẩn điều kiện đầu ra tiến sĩ.",
          "Đăng ký học bổng trên ứng dụng VLU SDH – Financial Aid for Approvers theo hướng dẫn của Trường.",
          "Vị trí tác giả được tính theo quy định: tác giả chính, chủ nhiệm đề tài, chủ biên hoặc tác giả chính của bằng sáng chế.",
          "Ghi tên đơn vị, địa chỉ và email theo quy định của Nhà trường; dùng email do Trường Đại học Văn Lang cung cấp.",
        ]) +
        '<p>Đăng ký học bổng tại: <a href="https://vnshort.com/G4HA" target="_blank" rel="noopener noreferrer">VLU SDH – Financial Aid for Approvers ' +
        icon("up-right") +
        "</a>.</p>" +
        "<h3>Sản phẩm nghiên cứu và công bố khoa học</h3><p>Có thể đăng ký nhiều loại sản phẩm nghiên cứu, công bố khoa học vượt chuẩn; tổng tỷ lệ học bổng từ các sản phẩm <strong>không quá 100% học phí</strong>. Các mức sản phẩm dưới đây được xếp từ cao xuống thấp. Mỗi mức gồm những phương án sản phẩm có thể lựa chọn.</p>" +
        '<div class="accordion">' +
        DOCTOR.scholarship_levels
          .map(
            (x) =>
              "<details><summary>Mức " +
              escapeHtml(x.level) +
              '</summary><div class="answer">' +
              listHtml(x.products) +
              "</div></details>",
          )
          .join("") +
        "</div>" +
        "<p>Tỷ lệ học bổng được xác định theo sản phẩm cam kết, chất lượng nghiên cứu và kết quả xét duyệt.</p>" +
        "<h3>Khấu trừ học phí và rà soát cam kết</h3>" +
        listHtml([
          "Học bổng được khấu trừ theo từng đợt đóng học phí; nghiên cứu sinh nộp phần còn lại sau khấu trừ.",
          "Phần khấu trừ học bổng được ghi nợ trên hệ thống kế toán của Trường. Nhà trường rà soát cam kết trước mỗi đợt đóng học phí và trước khi xét tốt nghiệp.",
          "Khi thực hiện đầy đủ cam kết hoặc hoàn thành các khoản thu hồi học bổng, phần ghi nợ do khấu trừ được xóa. Chưa thực hiện thu hồi theo yêu cầu được xem là chưa hoàn thành nghĩa vụ tài chính và chưa được xét, công nhận tốt nghiệp.",
        ]) +
        "<h3>Khi kết quả khác với cam kết</h3>" +
        table(
          ["Trường hợp", "Cách xử lý"],
          [
            [
              "Đáp ứng điều kiện duy trì nhưng không có công trình khoa học được công bố",
              "Thu hồi 80% học bổng.",
            ],
            [
              "Công bố ở mức cao hơn hoặc thấp hơn cam kết",
              "Tính lại học bổng; khen thưởng hoặc thu hồi phần chênh lệch theo mức sản phẩm.",
            ],
            ["Đã nhận học bổng nhưng nghỉ học", "Hoàn lại các khoản học bổng đã nhận."],
            [
              "Chỉ công bố với vị trí đồng tác giả",
              "Tính lại theo vị trí tác giả: 20% học bổng áp dụng cho tác giả chính; 80% còn lại chia đều cho các đồng tác giả. Thu hồi phần chênh lệch theo quy định.",
            ],
          ],
        ) +
        '<div class="review-note">Học bổng gắn với cam kết và kết quả thực hiện. Mức khen thưởng, thu hồi được xác định theo mức sản phẩm được ghi nhận và chính sách nghiên cứu khoa học của Trường.</div>';
      sourceText = "Mục 7.2, trang 3; Phụ lục 3, trang 11–13";
    } else if (kind === "discount") {
      title = "Miễn giảm học phí tiến sĩ";
      wide = true;
      body =
        "<p>Chính sách giảm học phí toàn khóa theo nhóm đối tượng:</p>" +
        table(
          ["Nhóm đối tượng", "Mức giảm"],
          [
            ["Cựu sinh viên, cựu học viên Trường Đại học Văn Lang", "10%"],
            ["Người dân tộc thiểu số", "10%"],
            ["Con của thương binh, bệnh binh, liệt sĩ, nạn nhân chất độc màu da cam", "10%"],
            ["Có cha mẹ, con cái, vợ/chồng hoặc anh/chị/em ruột cùng đang học tại VLU", "10%"],
            [
              "Người học là thương binh, bệnh binh hoặc người khuyết tật, nếu có nguyện vọng",
              "30%",
            ],
          ],
        ) +
        "<h3>Nguyên tắc áp dụng</h3>" +
        listHtml([
          "Thuộc một hoặc nhiều nhóm không có nghĩa là cộng dồn mức giảm theo từng nhóm. Người học chỉ chọn mức miễn giảm cao nhất.",
          "Tổng giảm học phí không quá 30% học phí toàn khóa.",
          "Các khoản miễn giảm được áp dụng vào đợt đóng học phí cuối cùng.",
          "Chuẩn bị hồ sơ minh chứng đối tượng để Nhà trường đối chiếu và xét áp dụng.",
        ]) +
        '<div class="dialog-actions"><button class="btn secondary" data-doctor-policy="encouragement">Xem học bổng khuyến khích thêm 5% ' +
        icon("arrow") +
        "</button></div>";
      sourceText = "Mục 7.1, trang 3";
    } else if (kind === "prepay") {
      title = "Giảm 5% khi thanh toán học phí toàn khóa";
      body =
        "<p>Giảm <strong>5% trên học phí thực đóng</strong> sau khi trừ tất cả các khoản miễn giảm, học bổng (nếu có), khi nghiên cứu sinh thanh toán học phí toàn khóa một lần vào <strong>đợt đóng học phí đầu tiên</strong> theo thông báo.</p>" +
        listHtml([
          "Cơ sở tính 5% là số tiền học phí còn phải đóng sau các ưu đãi được duyệt, không mặc định là học phí niêm yết toàn khóa.",
          "Không áp dụng với nghiên cứu sinh đã nhận học bổng hoặc miễn giảm học phí từ 30% trở lên.",
          "Thực hiện đúng thời hạn và hướng dẫn thanh toán trong thông báo của Trường.",
        ]);
      sourceText = "Mục 7.1.a, trang 3";
    } else if (kind === "encouragement") {
      title = "Học bổng khuyến khích thêm 5%";
      body =
        "<p>Ngoài mức miễn giảm hoặc học bổng được xét, nghiên cứu sinh thuộc các nhóm dưới đây được nhận thêm học bổng khuyến khích <strong>5% học phí toàn khóa</strong>:</p>" +
        listHtml([
          "Nghiên cứu sinh là nữ.",
          "Người khuyết tật.",
          "Thương binh hoặc bệnh binh.",
          "Người dân tộc thiểu số.",
        ]) +
        "<h3>Giới hạn sau khi tính phần khuyến khích</h3>" +
        table(
          ["Trường hợp", "Tổng mức tối đa"],
          [
            ["Được miễn giảm học phí", "Không quá 30% học phí toàn khóa."],
            ["Nhận học bổng", "Không quá 100% học phí toàn khóa."],
          ],
        ) +
        "<p>Hồ sơ và mức được hưởng thực hiện theo xét duyệt của Trường.</p>";
      sourceText = "Mục 7.3, trang 4";
    } else if (kind === "fees") {
      title = "Học phí, lệ phí & hướng dẫn thanh toán";
      wide = true;
      body =
        "<p>Học phí toàn khóa: <strong>" +
        money(145000000) +
        "</strong>. Các khoản thu và kế hoạch thanh toán:</p>" +
        table(
          ["Khoản thu", "Mức thu", "Thời điểm / phạm vi"],
          [
            ["Lệ phí xét tuyển", money(500000), "Nộp khi nộp hồ sơ dự tuyển."],
            [
              "Lệ phí nhập học",
              money(1000000),
              "Nộp cùng học phí học kỳ đầu; phục vụ tổ chức nhập học, cấp thẻ học viên và thư viện điện tử.",
            ],
            [
              "Học phí bổ sung kiến thức",
              money(1500000) + "/môn",
              "Nếu phải bổ sung kiến thức, theo số môn được yêu cầu.",
            ],
          ],
        ) +
        "<h3>Học phí theo từng năm</h3>" +
        table(
          ["Năm học", "Học phí"],
          [
            ["Năm 1", money(50000000)],
            ["Năm 2", money(45000000)],
            ["Năm 3", money(50000000)],
            ["Tổng toàn khóa", money(145000000)],
          ],
        ) +
        "<p>Ứng viên dự tuyển từ đại học liên hệ Viện để được hướng dẫn kế hoạch đóng học phí phù hợp với thời gian đào tạo.</p>" +
        "<h3>Thông tin thanh toán</h3><p>Nộp trực tiếp tại Phòng Kế toán hoặc chuyển khoản theo thông tin của Nhà trường.</p>" +
        table(
          ["Nội dung", "Thông tin"],
          [
            ["Tên tài khoản", "TRƯỜNG ĐẠI HỌC VĂN LANG"],
            ["Số tài khoản", "1602201363522"],
            ["Ngân hàng thụ hưởng", "Ngân hàng Agribank CN3 - HCM"],
            ["Nội dung chuyển khoản", "SDH - Họ và tên - Số điện thoại - Lệ phí/học phí tiến sĩ"],
          ],
        ) +
        '<div class="review-note">Trước khi thanh toán, đối chiếu thông tin nhận tiền, nội dung chuyển khoản và thời hạn với hướng dẫn đang áp dụng của Trường.</div>' +
        "<h3>Lệ phí và rút học phí</h3><p>Nhà trường không hoàn lại lệ phí. Trường hợp có lý do hợp lý, người học có thể làm đơn xin rút học phí; việc giải quyết theo quy định của Trường.</p>";
      sourceText = "Mục 8, trang 4";
    } else {
      return;
    }
    body +=
      '<div class="dialog-actions"><button class="btn primary" data-consult="' +
      escapeHtml(title + " tiến sĩ") +
      '">Trao đổi với bộ phận tư vấn ' +
      icon("arrow") +
      '</button><button class="btn secondary" data-doctor-pdf>Tải thông báo tuyển sinh tiến sĩ 2026 ' +
      icon("file") +
      "</button></div>" +
      doctorSource(sourceText);
    openDialog(title, body, "Tuyển sinh tiến sĩ", wide);
  }
  setDegree("master");

  return () => {
    controller.abort();
    frames.forEach(globalThis.cancelAnimationFrame);
    timers.forEach(globalThis.clearTimeout);
    const dialog = root.querySelector("dialog[open]");
    if (dialog) dialog.close();
    globalThis.document.title = originalTitle;
  };
}
