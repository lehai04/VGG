import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
function loadData(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file).exports;
  const record = { exports: {} };
  modules.set(file, record);
  const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const requireData = (name) => loadData(path.resolve(path.dirname(file), `${name}.ts`));
  new Function("require", "exports", "module", compiled)(requireData, record.exports, record);
  return record.exports;
}
const { programmes, getProgrammeGraduationRequirements } = loadData(
  path.join(frontend, "src/data/programmes.ts"),
);
const {
  getProgrammeCurricula,
  getProgrammeDetails,
  getCurriculumOrientation,
  getCurriculumGraduationProject,
  getCurriculumCourses,
} = loadData(path.join(frontend, "src/data/curricula.ts"));

test("content curricula render only the current programme rows and retain their order", () => {
  const original = programmes.find((item) => item.id === "marketing");
  const custom = { ...original, contentCurriculum: [
    { name: "Course A", credits: "3", group: "Semester 1", track: "Ứng dụng", note: "Note" },
    { name: "Course B", credits: "2.5", group: "Semester 1", track: "Ứng dụng", note: "" },
    { name: "Research", credits: "6", group: "Research group", track: "Nghiên cứu", note: "" },
  ] };
  const tracks = getProgrammeCurricula(custom);
  assert.equal(tracks.length, 2);
  assert.deepEqual(tracks[0].groups[0].courses.map((course) => course.name), ["Course A", "Course B"]);
  assert.equal(tracks[0].groups[0].courses[1].credits, 2.5);
  assert.equal(tracks[1].groups[0].courses[0].name, "Research");
  assert.deepEqual(getProgrammeCurricula({ ...original, contentCurriculum: [] }), []);
  assert.ok(getProgrammeCurricula(original).length, "Source programme stays unchanged");
});

test("every registered programme has independently addressed content sections", () => {
  assert.equal(new Set(programmes.map((p) => p.id)).size, programmes.length);
  for (const p of programmes) {
    const content = p.pageContent;
    assert.ok(content, p.id);
    for (const number of ["01", "02", "03", "04", "05"]) {
      assert.equal(content[`section${number}`].sectionNumber, number, p.id);
    }
    assert.ok(content.hero.heroLead.length > 0, p.id);
    assert.ok(content.section01.overview.length > 0, p.id);
    assert.ok(content.faq.faqs.length > 0, p.id);
  }
});

test("directory projections and curricula still resolve for every programme", () => {
  for (const p of programmes) {
    const details = getProgrammeDetails(p);
    assert.equal(details.intro, p.pageContent.hero.heroLead, p.id);
    assert.deepEqual(
      details.highlights,
      p.pageContent.section02.highlights.map((item) => item.text),
    );
    assert.deepEqual(
      details.careers,
      p.pageContent.section04.careers.map((item) => item.title),
    );
    // Pending programmes deliberately retain incomplete authoring data.
    for (const track of p.detailsPending ? [] : getProgrammeCurricula(p)) {
      assert.ok(track.groups.length > 0, p.id);
      assert.ok(getCurriculumCourses(track.groups).length > 0, p.id);
      for (const group of track.groups)
        assert.ok(group.courses.length > 0 || group.subgroups?.length > 0, p.id);
    }
  }
});

test("editing one programme overview cannot mutate another programme", () => {
  const first = programmes[0].pageContent.section01;
  const remaining = programmes.slice(1).map((p) => [...p.pageContent.section01.overview]);
  const saved = first.overview[0];
  try {
    first.overview[0] = "isolation check";
    programmes
      .slice(1)
      .forEach((p, index) => assert.deepEqual(p.pageContent.section01.overview, remaining[index]));
  } finally {
    first.overview[0] = saved;
  }
});

test("local programme images exist and module class references resolve", () => {
  function checkImages(value, key = "") {
    if (
      typeof value === "string" &&
      /image|src|fallback/i.test(key) &&
      value.startsWith("/images/")
    ) {
      assert.ok(existsSync(path.join(frontend, "public", value)), value);
    } else if (Array.isArray(value)) value.forEach((item) => checkImages(item, key));
    else if (value && typeof value === "object")
      Object.entries(value).forEach(([k, v]) => checkImages(v, k));
  }
  programmes.forEach(checkImages);
  const base = path.join(frontend, "src/features/programmes/components");
  for (const [component, stylesheet] of [
    ["ProgrammeDetailPage", "ProgrammeDetailPage"],
    ["ProgrammeCurriculumGroups", "ProgrammeDetailPage"],
    ["ProgrammeSupplementaryContent", "ProgrammeSupplementaryContent"],
    ["ProgrammeDirectory", "ProgrammeCatalogue"],
    ["ProgrammesPage", "ProgrammeCatalogue"],
    ["ProgrammeSearch", "ProgrammeCatalogue"],
  ]) {
    const css = readFileSync(path.join(base, `${stylesheet}.module.css`), "utf8");
    const source = readFileSync(path.join(base, `${component}.tsx`), "utf8");
    const classes = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
    for (const match of source.matchAll(/styles(?:\.([a-zA-Z]\w*)|\["([\w-]+)"\])/g)) {
      assert.ok(classes.has(match[1] ?? match[2]), `${component}: ${match[0]}`);
    }
  }
});

test("every programme is selectable by the shared consultation form", () => {
  const { programmes: options } = loadData(path.join(frontend, "src/data/site.ts"));
  assert.equal(new Set(options).size, options.length);
  assert.deepEqual([...options].sort(), programmes.map((p) => p.title).sort());
});

test("Marketing source keeps the research curriculum and semester plan consistent", () => {
  const programme = programmes.find((p) => p.id === "marketing");
  assert.equal(programme.detailsPending, undefined);
  assert.equal(programme.code, "340115");
  assert.equal(programme.credits, 60);
  assert.equal(programme.duration, "24 tháng");
  assert.equal(programme.tuition, "90.000.000 VNĐ");
  const tracks = getProgrammeCurricula(programme);
  assert.equal(tracks.length, 1);
  assert.equal(getCurriculumOrientation(programme, tracks[0]), "Nghiên cứu");
  assert.match(getCurriculumGraduationProject(tracks[0]), /Luận văn/);
  const courses = getCurriculumCourses(tracks[0].groups);
  assert.equal(courses.length, 15);
  assert.equal(new Set(courses.map((c) => c.name)).size, 15);
  assert.ok(courses.every((c) => c.englishName && c.credits > 0));
  assert.equal(
    courses.find((c) => c.name === "Nghệ thuật kể chuyện trong truyền thông thương hiệu").credits,
    3,
  );
  assert.equal(courses.find((c) => c.name === "Luận văn tốt nghiệp").credits, 15);
  const semesters = programme.pageContent.section05.semesters.items;
  assert.equal(semesters.length, 4);
  for (const semester of semesters)
    for (const course of semester.groups.flatMap((g) => g.courses)) {
      const registered = courses.find((c) => c.name === course.name);
      assert.ok(registered, course.name);
      assert.equal(course.credits, registered.credits, course.name);
      assert.equal(course.englishName, registered.englishName, course.name);
    }
  assert.deepEqual(
    semesters[3].groups[0].courses.map((c) => c.name),
    ["Luận văn tốt nghiệp"],
  );
});

test("Marketing financial and academic requirements do not leak into other programmes", () => {
  const marketing = programmes.find((p) => p.id === "marketing");
  assert.equal(marketing.pageContent.section02.learningOutcomes.items.length, 6);
  assert.equal(getProgrammeDetails(marketing).outcomes.length, 6);
  assert.equal(marketing.pageContent.section03.audience.length, 3);
  assert.equal(marketing.pageContent.faq.faqs.length, 6);
  assert.deepEqual(
    marketing.pageContent.fees.installments.map((r) => r.amount),
    ["31.500.000 đồng", "27.000.000 đồng", "31.500.000 đồng"],
  );
  assert.equal(marketing.pageContent.fees.additionalFees.length, 6);
  assert.equal(getProgrammeGraduationRequirements(marketing).length, 4);
  assert.ok(getProgrammeGraduationRequirements(marketing).some((r) => r.includes("5,5/10")));
  for (const programme of programmes.filter(
    (p) =>
      ![
        "marketing",
        "cong-nghe-sinh-hoc",
        "kinh-doanh-thuong-mai",
        "ke-toan",
        "ky-thuat-moi-truong",
        "ky-thuat-o-to",
        "kien-truc",
        "ly-luan-lich-su-my-thuat",
        "logistics",
        "luat-kinh-te",
        "my-thuat-ung-dung",
        "quan-tri-khach-san",
        "quan-tri-kinh-doanh",
        "tai-chinh-ngan-hang",
        "ngon-ngu-anh",
        "quan-he-cong-chung",
        "quan-ly-tai-nguyen-moi-truong",
      ].includes(p.id),
  )) {
    assert.equal(programme.pageContent.fees, undefined, programme.id);
    assert.equal(programme.pageContent.section05.semesters, undefined, programme.id);
    assert.ok(
      !JSON.stringify(programme.pageContent).includes("Bổ sung kiến thức đầu vào"),
      programme.id,
    );
  }
  assert.ok(
    !getProgrammeGraduationRequirements(programmes.find((p) => p.id === "quan-he-cong-chung")).some(
      (r) => r.includes("01 công bố"),
    ),
  );
  assert.ok(
    !getProgrammeGraduationRequirements(programmes.find((p) => p.id === "my-thuat-ung-dung")).some(
      (r) => r.includes("02 công bố"),
    ),
  );
});

test("Economic Law rejects the accidental Accounting facts and keeps its own credits and internship", () => {
  const p = programmes.find((p) => p.id === "luat-kinh-te");
  assert.equal(p.code, "380107");
  assert.equal(p.duration, "18 tháng");
  const content = JSON.stringify(p.pageContent);
  assert.ok(!content.includes("340301") && !content.includes("8340301"));
  assert.ok(content.includes("8380107"));
  const [track] = getProgrammeCurricula(p);
  const courses = getCurriculumCourses(track.groups);
  assert.equal(courses.length, 19);
  assert.equal(courses.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 18, 60);
  assert.ok(courses.some((c) => c.name === "Thực tập" && c.credits === 8));
  assert.ok(track.completion.items.some((r) => r.includes("09 tuần") && r.includes("03 tháng")));
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /19 tín chỉ/);
  assert.equal(p.pageContent.section02.learningOutcomes.items.length, 7);
});

test("Applied Arts uses interview admission and the six-semester reference plan without old publication rules", () => {
  const p = programmes.find((p) => p.id === "my-thuat-ung-dung");
  assert.equal(p.code, "210410");
  assert.equal(p.duration, "18–24 tháng");
  assert.equal(p.orientation, "Ứng dụng");
  const [track] = getProgrammeCurricula(p);
  const courses = getCurriculumCourses(track.groups);
  assert.equal(courses.length, 23);
  assert.equal(courses.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 21, 60);
  assert.equal(track.semesters.items.length, 6);
  assert.match(track.semesters.intro, /2024/);
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /phỏng vấn/);
  assert.equal(p.pageContent.section02.learningOutcomes.items.length, 10);
  assert.equal(
    p.pageContent.consultation.formIntro.titleLines[0],
    "Bắt đầu từ định hướng sáng tạo của bạn.",
  );
  assert.ok(!JSON.stringify(track.completion).includes("công bố"));
  assert.deepEqual(
    p.pageContent.fees.installments.map((r) => r.amount),
    ["35.000.000 đồng", "30.000.000 đồng", "35.000.000 đồng"],
  );
});

test("Art Theory follows its research source, bridging limits and 100-million tuition", () => {
  const p = programmes.find((p) => p.id === "ly-luan-lich-su-my-thuat");
  assert.equal(p.code, "210401");
  assert.equal(p.duration, "24 tháng");
  const [track] = getProgrammeCurricula(p);
  assert.equal(track.orientation, "Nghiên cứu");
  const courses = getCurriculumCourses(track.groups);
  assert.equal(courses.length, 25);
  assert.equal(courses.filter((c) => c.elective).length, 14);
  assert.equal(courses.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 17, 60);
  assert.equal(track.semesters, undefined);
  assert.equal(p.pageContent.section02.learningOutcomes.items.length, 9);
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /Tối đa 4 tín chỉ/);
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /Tối đa 10 tín chỉ/);
  assert.deepEqual(
    p.pageContent.fees.installments.map((r) => r.amount),
    ["35.000.000 đồng", "30.000.000 đồng", "35.000.000 đồng"],
  );
  assert.ok(p.pageContent.faq.faqs.every((faq) => faq.answer.length > 0));
});

test("Logistics separates language tuition, entry conditions and track elective allocations", () => {
  const p = programmes.find((p) => p.id === "logistics");
  assert.equal(p.code, "340123");
  const [applied, research] = getProgrammeCurricula(p);
  const ac = getCurriculumCourses(applied.groups),
    rc = getCurriculumCourses(research.groups);
  assert.equal(ac.length, 19);
  assert.equal(rc.length, 20);
  assert.equal(ac.filter((c) => c.elective).length, 6);
  assert.equal(rc.filter((c) => c.elective).length, 10);
  for (const courses of [ac, rc])
    assert.equal(courses.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 12, 60);
  assert.equal(applied.generalFacts[0].value, "18 tháng");
  assert.equal(research.generalFacts[0].value, "24 tháng");
  assert.deepEqual(
    p.pageContent.fees.variants.map((v) => v.total),
    ["85.000.000 đồng", "175.000.000 đồng"],
  );
  assert.deepEqual(
    p.pageContent.fees.variants[1].installments.map((r) => r.amount),
    ["61.250.000 đồng", "52.500.000 đồng", "61.250.000 đồng"],
  );
  const requirement = p.pageContent.section03.requirements.find(
    (r) => r.title === "Điều kiện riêng của định hướng nghiên cứu",
  );
  assert.match(requirement.paragraphs.join(" "), /Khá trở lên và có công bố/);
  assert.ok(p.pageContent.faq.faqs.every((faq) => faq.answer.length > 0));
});

test("Automotive Engineering keeps distinct elective choices and final projects without inventing semesters", () => {
  const p = programmes.find((p) => p.id === "ky-thuat-o-to");
  assert.equal(p.code, "520130");
  const [applied, research] = getProgrammeCurricula(p);
  for (const [track, electiveCredits] of [
    [applied, 9],
    [research, 12],
  ]) {
    const courses = getCurriculumCourses(track.groups);
    assert.equal(courses.length, 25);
    assert.equal(
      courses.filter((c) => !c.elective).reduce((sum, c) => sum + c.credits, 0) + electiveCredits,
      60,
    );
    assert.equal(track.semesters, undefined);
  }
  assert.equal(applied.generalFacts[0].value, "18 tháng");
  assert.equal(research.generalFacts[0].value, "24 tháng");
  assert.ok(
    getCurriculumCourses(applied.groups).some(
      (c) => c.name === "Đề án tốt nghiệp" && c.credits === 6,
    ),
  );
  assert.ok(
    getCurriculumCourses(research.groups).some(
      (c) => c.name === "Luận văn tốt nghiệp" && c.credits === 15,
    ),
  );
  assert.equal(p.pageContent.section02.outcomesHeading, "Mục tiêu phát triển năng lực");
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /Tối đa 9 tín chỉ/);
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /Tối đa 15 tín chỉ/);
  assert.ok(p.pageContent.faq.faqs.every((f) => f.answer.length > 0));
});

test("Architecture follows seven elective groups and the 150-credit admission condition", () => {
  const p = programmes.find((p) => p.id === "kien-truc");
  assert.equal(p.code, "580101");
  assert.equal(p.duration, "18 tháng");
  const [track] = getProgrammeCurricula(p);
  const courses = getCurriculumCourses(track.groups);
  assert.equal(courses.length, 27);
  assert.equal(courses.filter((c) => c.elective).length, 14);
  assert.equal(courses.filter((c) => !c.elective).reduce((sum, c) => sum + c.credits, 0) + 14, 60);
  assert.equal(
    track.groups[1].subgroups.filter((g) => g.courses.some((c) => c.elective)).length,
    7,
  );
  assert.equal(track.semesters, undefined);
  assert.equal(p.pageContent.section02.learningOutcomes.items.length, 10);
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /150 tín chỉ/);
  assert.ok(courses.some((c) => c.name === "Đề án tốt nghiệp" && c.credits === 9));
  assert.ok(courses.every((c) => !c.englishName)); // Nguồn không cung cấp tên tiếng Anh học phần.
  assert.ok(p.pageContent.faq.faqs.every((f) => f.answer.length > 0));
});

test("Accounting preserves five elective groups, six semesters and the eight-credit project", () => {
  const p = programmes.find((p) => p.id === "ke-toan");
  assert.equal(p.code, "340301");
  assert.equal(p.duration, "24 tháng");
  const track = getProgrammeCurricula(p)[0];
  const courses = getCurriculumCourses(track.groups);
  assert.equal(courses.length, 28);
  assert.equal(courses.filter((c) => c.elective).length, 17);
  assert.equal(courses.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 18, 60);
  assert.equal(track.semesters.items.length, 6);
  assert.equal(courses.find((c) => c.name === "Đề án tốt nghiệp").credits, 8);
  assert.equal(p.pageContent.section02.learningOutcomes.items.length, 6);
  assert.equal(p.pageContent.faq.faqs.length, 9);
  assert.ok(p.pageContent.faq.faqs.every((faq) => faq.answer.length > 0));
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /Nguyên lý kế toán/);
});

test("Environmental Engineering keeps applied and research plans and completion rules separate", () => {
  const p = programmes.find((p) => p.id === "ky-thuat-moi-truong");
  assert.equal(p.code, "520320");
  assert.ok(p.pageContent.faq.faqs.every((faq) => faq.answer.length > 0));
  assert.match(JSON.stringify(p.pageContent.section03.requirements), /từ loại Khá/);
  const [applied, research] = getProgrammeCurricula(p);
  assert.equal(applied.orientation, "Ứng dụng");
  assert.equal(research.orientation, "Nghiên cứu");
  assert.equal(applied.generalFacts[0].value, "18 tháng");
  assert.equal(research.generalFacts[0].value, "24 tháng");
  const ac = getCurriculumCourses(applied.groups),
    rc = getCurriculumCourses(research.groups);
  assert.equal(ac.length, 33);
  assert.equal(rc.length, 32);
  assert.equal(ac.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 20, 60);
  assert.equal(rc.filter((c) => !c.elective).reduce((s, c) => s + c.credits, 0) + 5, 60);
  assert.ok(ac.some((c) => c.name === "Tư vấn chính sách môi trường quốc tế" && c.credits === 6));
  assert.ok(!rc.some((c) => c.name === "Tư vấn chính sách môi trường quốc tế"));
  assert.ok(
    !applied.completion.items.some((text) => text.includes("công trình nghiên cứu công bố")),
  );
  assert.ok(
    research.completion.items.some((text) => text.includes("công trình nghiên cứu công bố")),
  );
  assert.ok(
    applied.semesters.items[3].groups[0].courses.some(
      (c) => c.name === "Đề án tốt nghiệp" && c.credits === 9,
    ),
  );
  assert.ok(
    research.semesters.items[3].groups[0].courses.some(
      (c) => c.name === "Luận văn tốt nghiệp" && c.credits === 15,
    ),
  );
  assert.match(
    p.pageContent.section02.learningOutcomes.items.find((o) => o.code === "PLO3").title,
    /Định hướng nghiên cứu/,
  );
});

test("Commerce keeps its own applied curriculum, elective groups and graduation project", () => {
  const p = programmes.find((p) => p.id === "kinh-doanh-thuong-mai");
  assert.equal(p.code, "340121");
  assert.equal(p.duration, "24 tháng");
  assert.equal(p.englishTitle, "Master of Commerce");
  const tracks = getProgrammeCurricula(p);
  assert.equal(tracks.length, 1);
  assert.equal(getCurriculumOrientation(p, tracks[0]), "Ứng dụng");
  const courses = getCurriculumCourses(tracks[0].groups);
  assert.equal(courses.length, 18);
  assert.equal(courses.find((c) => c.name === "Triết học").credits, 4);
  assert.equal(courses.filter((c) => c.elective).length, 6);
  assert.equal(courses.filter((c) => !c.elective).reduce((sum, c) => sum + c.credits, 0) + 8, 60);
  const data = p.pageContent;
  assert.equal(data.section02.learningOutcomes.items.length, 10);
  assert.equal(data.section04.careers.length, 7);
  assert.equal(data.section05.semesters.items.length, 4);
  assert.deepEqual(
    data.section05.semesters.items[3].groups[0].courses.map((c) => [c.name, c.credits]),
    [
      ["Thực tập tốt nghiệp", 6],
      ["Đề án tốt nghiệp", 9],
    ],
  );
  assert.equal(getProgrammeGraduationRequirements(p).length, 4);
  assert.deepEqual(
    data.fees.installments.map((r) => r.amount),
    ["29.750.000 đồng", "25.500.000 đồng", "29.750.000 đồng"],
  );
  assert.match(JSON.stringify(data.section03.requirements), /tối đa 12 tín chỉ/);
  assert.equal(data.faq.faqs.length, 8);
  const project = courses.find((c) => c.name === "Dự án kinh doanh kết hợp chuyến đi thực tế");
  assert.equal(project.credits, 2);
  assert.equal(project.englishName, ""); // Nguồn không cung cấp tên tiếng Anh cho học phần này.
});

test("Biotechnology follows its own six-semester source and elective allocation", () => {
  const p = programmes.find((p) => p.id === "cong-nghe-sinh-hoc");
  assert.equal(p.code, "420201");
  assert.equal(p.duration, "24 tháng");
  assert.equal(p.englishTitle, "Master of Engineering in Biotechnology");
  const tracks = getProgrammeCurricula(p);
  assert.equal(tracks.length, 1);
  const courses = getCurriculumCourses(tracks[0].groups);
  assert.equal(courses.length, 19);
  assert.ok(courses.every((c) => c.englishName));
  const electives = courses.filter((c) => c.elective);
  assert.equal(electives.length, 9);
  assert.ok(electives.every((c) => c.credits === 3));
  assert.equal(courses.filter((c) => !c.elective).reduce((n, c) => n + c.credits, 0) + 12, 60);
  const content = p.pageContent;
  assert.equal(content.section02.learningOutcomes.items.length, 6);
  assert.equal(content.section04.careers.length, 9);
  assert.equal(content.section05.semesters.items.length, 5);
  assert.equal(content.section05.semesters.items[4].title, "Học kỳ 5–6");
  assert.match(content.section05.semesters.items[2].groups[0].description[0], /Chọn 4 trong 9/);
  assert.equal(getProgrammeGraduationRequirements(p).length, 3);
  assert.deepEqual(
    content.fees.installments.map((r) => r.amount),
    ["29.750.000 đồng", "25.500.000 đồng", "29.750.000 đồng"],
  );
  const requirements = JSON.stringify(content.section03.requirements);
  assert.match(requirements, /tối đa 6 tín chỉ/);
  assert.match(requirements, /7420201/);
  assert.doesNotMatch(requirements, /hạng tốt nghiệp đại học từ khá|tối đa 12 tín chỉ/);
  assert.equal(content.faq.faqs.length, 7);
});

test("Hospitality and MBA preserve their own elective totals, source fees and admission exemptions", () => {
  for (const [id, code, count, mandatory, elective, plos] of [
    ["quan-tri-khach-san", "8810201", 17, 54, 6, 6],
    ["quan-tri-kinh-doanh", "8340101", 21, 47, 13, 6],
  ]) {
    const p = programmes.find((p) => p.id === id);
    const tracks = getProgrammeCurricula(p);
    assert.equal(p.code, code);
    assert.equal(p.duration, "18–24 tháng");
    assert.equal(tracks.length, 1);
    assert.equal(tracks[0].orientation, "Ứng dụng");
    const courses = getCurriculumCourses(tracks[0].groups);
    assert.equal(courses.length, count);
    assert.equal(
      courses.filter((c) => !c.elective).reduce((sum, c) => sum + c.credits, 0),
      mandatory,
    );
    assert.equal(mandatory + elective, 60);
    assert.equal(p.pageContent.section02.learningOutcomes.items.length, plos);
    assert.deepEqual(
      p.pageContent.fees.installments.map((r) => r.amount),
      ["30.000.000 đồng", "25.000.000 đồng", "30.000.000 đồng"],
    );
    assert.equal(
      p.pageContent.faq.faqs[1].answer,
      p.pageContent.section03.requirements[0].paragraphs[0],
    );
    assert.equal(p.pageContent.fees.additionalFees.length, 5);
    assert.ok(tracks[0].notes.some((n) => n.includes("Lộ trình mẫu")));
  }
  const hotel = programmes.find((p) => p.id === "quan-tri-khach-san");
  assert.match(hotel.pageContent.section05.curriculumIntro[0], /17 tín chỉ chuyên ngành bắt buộc/);
  assert.match(hotel.pageContent.section03.requirements[0].paragraphs[0], /Quản trị nhà hàng/);
  const mba = programmes.find((p) => p.id === "quan-tri-kinh-doanh");
  assert.match(
    mba.pageContent.section03.requirements[0].paragraphs[0],
    /của Trường Đại học Văn Lang/,
  );
});

test("Finance tracks and Natural Resources research retain independent source curricula and admission logic", () => {
  const finance = programmes.find((p) => p.id === "tai-chinh-ngan-hang");
  const resources = programmes.find((p) => p.id === "quan-ly-tai-nguyen-moi-truong");
  assert.equal(finance.code, "8340201");
  assert.equal(resources.code, "8850101");
  const ft = getProgrammeCurricula(finance);
  const rt = getProgrammeCurricula(resources);
  assert.deepEqual(
    ft.map((t) => t.orientation),
    ["Ứng dụng", "Nghiên cứu"],
  );
  assert.deepEqual(
    ft.map((t) => getCurriculumCourses(t.groups).length),
    [19, 18],
  );
  assert.equal(rt.length, 1);
  assert.equal(rt[0].orientation, "Nghiên cứu");
  assert.equal(getCurriculumCourses(rt[0].groups).length, 30);
  assert.deepEqual(
    ft.map((t) => getCurriculumCourses(t.groups).at(-1).credits),
    [9, 12],
  );
  assert.deepEqual(
    rt[0].groups[1].courses.map((c) => c.credits),
    [15, 15],
  );
  assert.match(ft[0].intro, /1\/2 chuyên đề và 2\/3 học phần/);
  assert.match(ft[1].intro, /ứng dụng AI/);
  assert.ok(!getCurriculumCourses(ft[1].groups).some((c) => c.name.includes("ứng dụng AI")));
  for (const p of [finance, resources]) {
    assert.equal(p.duration, "18–24 tháng");
    assert.equal(p.pageContent.section02.learningOutcomes.items.length, 8);
    assert.match(
      p.pageContent.section03.requirements.find(
        (b) => b.title === "Điều kiện định hướng nghiên cứu",
      ).paragraphs[0],
      /hoặc có công bố/,
    );
    assert.deepEqual(
      p.pageContent.fees.installments.map((r) => r.amount),
      ["30.000.000 đồng", "25.000.000 đồng", "30.000.000 đồng"],
    );
    assert.ok(getProgrammeGraduationRequirements(p).length > 0);
  }
  assert.equal(
    finance.pageContent.faq.faqs[1].answer,
    finance.pageContent.section03.requirements[0].paragraphs[1],
  );
  assert.match(
    resources.pageContent.section03.requirements.at(-1).groups[1].paragraphs[1],
    /2 tín chỉ.*3 tín chỉ.*3 tín chỉ/,
  );
});

test("English and PR preserve track-specific credits, admission and source omissions", () => {
  const english = programmes.find((p) => p.id === "ngon-ngu-anh");
  const pr = programmes.find((p) => p.id === "quan-he-cong-chung");
  const et = getProgrammeCurricula(english),
    pt = getProgrammeCurricula(pr);
  assert.deepEqual(
    et.map((t) => getCurriculumCourses(t.groups).length),
    [23, 23],
  );
  assert.deepEqual(
    pt.map((t) => getCurriculumCourses(t.groups).length),
    [23, 26],
  );
  assert.deepEqual(
    et.map((t) => t.orientation),
    ["Ứng dụng", "Nghiên cứu"],
  );
  assert.deepEqual(pr.pageContent.section05.trackCredits, ["60 tín chỉ", "61 tín chỉ"]);
  assert.equal(pr.creditsLabel, "60–61");
  assert.equal(getCurriculumCourses(pt[1].groups).at(-1).credits, 13);
  assert.equal(getCurriculumCourses(et[1].groups).at(-1).credits, 12);
  assert.match(et[0].intro, /2\/5 và 2\/6/);
  assert.match(et[1].intro, /2\/5 và 3\/7/);
  assert.ok(!getCurriculumCourses(pt[0].groups).some((c) => c.name.includes("Đề án tốt nghiệp")));
  assert.ok(pt[0].completion.items.some((i) => i.includes("Đề án tốt nghiệp · 9")));
  assert.match(JSON.stringify(english.pageContent.section03.requirements), /IELTS 6.5/);
  assert.match(
    JSON.stringify(pr.pageContent.section03.requirements),
    /xét tuyển kết hợp phỏng vấn/,
  );
  assert.equal(english.pageContent.section02.learningOutcomes.items.length, 9);
  assert.equal(pr.pageContent.section02.learningOutcomes.items.length, 10);
  assert.deepEqual(
    pr.pageContent.fees.installments.map((r) => r.amount),
    ["35.000.000 đồng", "35.000.000 đồng", "40.000.000 đồng"],
  );
  assert.equal(
    english.pageContent.faq.faqs[1].answer,
    english.pageContent.section03.requirements[0].paragraphs[0],
  );
  assert.equal(
    pr.pageContent.faq.faqs[2].answer,
    pr.pageContent.section03.requirements[0].paragraphs[0],
  );
});

test("Every programme has relevant local audience imagery and valid source attribution", () => {
  const { programmeImageSelections, programmeImageLibrary } = loadData(
    path.join(frontend, "src/data/programmes/images.ts"),
  );
  assert.equal(Object.keys(programmeImageSelections).length, programmes.length);
  for (const p of programmes) {
    assert.ok(programmeImageSelections[p.id], p.id);
    const audience = p.pageContent.section03;
    if (audience.audience.length) {
      for (const item of audience.audience) {
        assert.ok(item.image.startsWith("/images/programme-library/"), p.id);
        assert.ok(item.alt.length > 10, p.id);
        assert.match(item.imageSource, /^https:\/\/unsplash.com\/photos\//);
      }
    } else {
      assert.ok(audience.illustration, p.id);
      assert.ok(existsSync(path.join(frontend, "public", audience.illustration.src)), p.id);
    }
    assert.ok(p.pageContent.section04.careerImage.startsWith("/images/programme-library/"), p.id);
  }
  for (const image of Object.values(programmeImageLibrary)) {
    assert.ok(existsSync(path.join(frontend, "public", image.src)), image.src);
    assert.match(image.source, /^https:\/\/unsplash.com\/photos\//);
  }
});
