from pathlib import Path
import re
p=Path('frontend/src/features/programmes/components/ProgrammeDetailPage.tsx');s=p.read_text(encoding='utf-8')
backup=Path('outputs/vgg-content-audit/before-source/features/programmes/components/ProgrammeDetailPage.tsx');backup.parent.mkdir(parents=True,exist_ok=True);backup.write_text(s,encoding='utf-8')
s=s.replace('import { getProgrammeCurricula }','import { getProgrammeCurricula, getCurriculumOrientation, getCurriculumGraduationProject }')
s=s.replace('import styles from "./ProgrammeDetailPage.module.css";','import styles from "./ProgrammeDetailPage.module.css";\nimport { ProgrammeCurriculumGroups } from "./ProgrammeCurriculumGroups";\nimport { ProgrammeAdmissions, ProgrammeCompletion, ProgrammeFees, ProgrammeSemesterPlan } from "./ProgrammeSupplementaryContent";')
s=s.replace('  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});\n','')
s=re.sub(r'  const toggleModule = .*?\n  };\n','',s,flags=re.S)
s=s.replace('interface CareerRoleItem {','interface CareerRoleItem {\n  group?: string;')
start=s.index('  const graduationProjectName =');end=s.index('  /* ── 07. FAQs',start)
s=s[:start]+'''  const orientationIndex = getCurriculumOrientation(programme, currentTrack) === "Nghiên cứu" ? 1 : 0;
  const graduationProjectName = getCurriculumGraduationProject(currentTrack)
    ?? pageContent.section05.graduationProjects[orientationIndex]
    ?? pageContent.section05.graduationProjects[0];
  const curriculumIntroText = pageContent.section05.curriculumIntro[orientationIndex]
    ?? pageContent.section05.curriculumIntro[0];
  const generalFacts = [
    { label: pageContent.section05.creditsLabel, value: pageContent.section05.trackCredits?.[activeTrackIndex] ?? `${programme.credits} ${pageContent.section05.creditUnit}` },
    ...(pageContent.section05.generalFacts ?? [
      { label: pageContent.section05.durationLabel, value: pageContent.section05.trackDurations?.[activeTrackIndex] ?? programme.duration },
      { label: pageContent.section05.studyModeLabel, value: programme.studyMode },
      { label: pageContent.section05.graduationLabel, value: graduationProjectName },
    ]),
  ];

'''+s[end:]
start=s.index('          {/* Orientation switcher tabs */}');end=s.index('          <div className={styles.curriculumLayout}>',start)
s=s[:start]+'''          <div className={styles.curriculumTabs} aria-label="Định hướng chương trình">
            {availableTracks.map((track, index) => <button
              type="button"
              key={track.title}
              className={`${styles.curriculumTab} ${activeTrackIndex === index ? styles.curriculumTabActive : ""}`}
              aria-pressed={activeTrackIndex === index}
              onClick={() => setActiveTrackIndex(index)}
            >
              {getCurriculumOrientation(programme, track) === "Nghiên cứu" ? <BookOpen size={18} aria-hidden="true" /> : <Briefcase size={18} aria-hidden="true" />}
              <span>{track.title}</span>
            </button>)}
          </div>

'''+s[end:]
start=s.index('              <div className={styles.infoList}>');end=s.index('            </aside>',start)
s=s[:start]+'''              <div className={styles.infoList}>
                {generalFacts.map((fact) => <div className={styles.infoItem} key={fact.label}>
                  <FileText className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div><div className={styles.infoItemTitle}>{fact.label}</div><div className={styles.infoItemValue}>{fact.value}</div></div>
                </div>)}
              </div>
'''+s[end:]
start=s.index('              <div className={styles.moduleList}>');end=s.index('              <a\n                className={styles.btnDownloadOutline}',start)
s=s[:start]+'''              {pageContent.section05.notes?.map((note) => <p key={note}>{note}</p>)}
              <ProgrammeCurriculumGroups key={currentTrack?.title} groups={currentTrack?.groups ?? []} />
              <ProgrammeSemesterPlan programme={programme} />
              <ProgrammeCompletion programme={programme} />

'''+s[end:]
s=s.replace('data-curriculum-download="true"','data-curriculum-download={/\\.pdf(?:[?#]|$)/i.test(pageContent.section05.link.href) || undefined}')
s=s.replace('              {overviewParagraphs.map','              {pageContent.section01.headline && <h3 className={styles.contentHeadline}>{pageContent.section01.headline}</h3>}\n              {overviewParagraphs.map')
s=s.replace('              {pageContent.section01.link && (','              {pageContent.section01.focusAreas && <ul className={styles.focusAreas}>{pageContent.section01.focusAreas.map((area) => <li key={area}>{area}</li>)}</ul>}\n              {pageContent.section01.link && (')
s=s.replace('                {pageContent.section01.tags.length > 0 && (','                {pageContent.section01.imageCredit && <a className={styles.photoCredit} href={pageContent.section01.imageCredit.href}>{pageContent.section01.imageCredit.text}</a>}\n                {pageContent.section01.tags.length > 0 && (')
s=s.replace('          <div className={styles.audienceGrid}>','          {pageContent.section03.headline && <h3 className={styles.contentHeadline}>{pageContent.section03.headline}</h3>}\n          {pageContent.section03.intro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}\n          <div className={styles.audienceGrid}>')
start=s.index('      <section id="doi-tuong"');end=s.index('      </section>',start);chunk=s[start:end];pos=chunk.rfind('        </div>');chunk=chunk[:pos]+'''          {pageContent.section03.requirements && <ProgrammeAdmissions blocks={pageContent.section03.requirements} />}
'''+chunk[pos:];s=s[:start]+chunk+s[end:]
s=s.replace('          <div className={styles.careersLayout}>','          {pageContent.section04.headline && <h3 className={styles.contentHeadline}>{pageContent.section04.headline}</h3>}\n          {pageContent.section04.intro && <p>{pageContent.section04.intro}</p>}\n          <div className={styles.careersLayout}>')
s=s.replace('careersList.map(({ Icon, title, sub }, idx)','careersList.map(({ Icon, title, sub, group }, idx)')
s=s.replace('                    <h3 className={styles.careerTitle}>','                    {group && <p className={styles.careerGroup}>{group}</p>}\n                    <h3 className={styles.careerTitle}>')
start=s.index('      <section id="nghe-nghiep"');end=s.index('      </section>',start);chunk=s[start:end];pos=chunk.rfind('        </div>');chunk=chunk[:pos]+'''          {pageContent.section04.note && <p>{pageContent.section04.note}</p>}
'''+chunk[pos:];s=s[:start]+chunk+s[end:]
start=s.index('      <section className={styles.hero}');end=s.index('      </section>',start);s=s[:end]+'''        {pageContent.hero.imageCredit && <a className={styles.heroImageCredit} href={pageContent.hero.imageCredit.href}>{pageContent.hero.imageCredit.text}</a>}
'''+s[end:]
s=s.replace('      {/* ────────────────────────────────────────────────────────\n          CALL TO ACTION BANNER','      <ProgrammeFees programme={programme} />\n\n      {/* ────────────────────────────────────────────────────────\n          CALL TO ACTION BANNER')
s=s.replace('      <ResourcesConsultation initialProgramme={programme.title} />','      <ResourcesConsultation initialProgramme={programme.title} intro={programme.pageContent?.consultation.formIntro} />')
s=s.replace('          </div>\n        </div>\n      </section>\n\n      {/* ────────────────────────────────────────────────────────\n          CONSULTATION SECTION', '          </div>\n        </div>\n      </section>\n\n      {/* ────────────────────────────────────────────────────────\n          CONSULTATION SECTION')
needle='''              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CONSULTATION SECTION'''
replacement='''              </div>
              {pageContent.consultation.contactActions && <div className={styles.contactActions}>{pageContent.consultation.contactActions.map((action) => <Link href={action.href} key={action.href}>{action.text}</Link>)}</div>}
            </aside>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CONSULTATION SECTION'''
assert needle in s;s=s.replace(needle,replacement)
# The overview action previously repeated a download icon on each side.
s=s.replace('                  <Download size={17} aria-hidden="true" />\n                  <span>{pageContent.section01.link.text}</span>\n                  <Download size={17} aria-hidden="true" />','                  <ArrowRight size={17} aria-hidden="true" />\n                  <span>{pageContent.section01.link.text}</span>')
p.write_text(s,encoding='utf-8')
