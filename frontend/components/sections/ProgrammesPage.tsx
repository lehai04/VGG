import Image from "next/image";
import Link from "next/link";

import {
  SiteFooter
} from "@/components/layout/SiteFooter";

import {
  SiteHeader
} from "@/components/layout/SiteHeader";

import ProgrammeDirectory from "@/components/sections/ProgrammeDirectory";
import { NextStepCTA } from "@/components/sections/NextStepCTA";


/*
 * PAGE COMPONENT CHUYÊN BIỆT
 * Route: /programmes
 */

export function ProgrammesLanding() {

  return (

    <main
      className="subpage programmes-page"
      id="main-content"
    >

      {/* ===============================
          HEADER
          =============================== */}

      <SiteHeader compact />


      {/* ===============================
          HERO
          =============================== */}

      <section
        className="programmes-hero"
        aria-labelledby="programmes-title"
      >

        <Image
          src="/images/hero/campus-hero.jpg"
          alt="Khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />

        <div className="programmes-hero-overlay" />


        <div className="programmes-hero-copy">

          <p className="programmes-label">
            PROGRAMMES · CHƯƠNG TRÌNH ĐÀO TẠO
          </p>

          <h1 id="programmes-title">

            Học để tiến xa.

            <br />

            <em>
              Dẫn dắt tương lai.
            </em>

          </h1>

          <p className="programmes-hero-lead">

            Kiến tạo lộ trình học thuật phù hợp
            với tham vọng nghề nghiệp — từ chuyên
            môn chuyên sâu đến năng lực nghiên cứu
            và lãnh đạo toàn cầu.

          </p>


          <div className="programmes-hero-actions">

            <a href="#programme-directory">

              Khám phá chương trình

              <span>
                ↓
              </span>

            </a>


            <Link href="/admissions">

              Thông tin tuyển sinh

              <span>
                ↗
              </span>

            </Link>

          </div>

        </div>


        {/* ===============================
            HERO STATS
            =============================== */}

        <div
          className="programmes-hero-stats"
          aria-label="Thông tin tổng quan chương trình"
        >

          <div>

            <strong>
              18
            </strong>

            <span>
              Chương trình
              <br />
              Thạc sĩ
            </span>

          </div>


          <div>

            <strong>
              01
            </strong>

            <span>
              Chương trình
              <br />
              Tiến sĩ
            </span>

          </div>


          <div>

            <strong>
              05
            </strong>

            <span>
              Nhóm ngành
              <br />
              chuyên sâu
            </span>

          </div>

        </div>

      </section>

      {/* ===============================
          INTRO
          =============================== */}

      {/*<section className="programmes-intro">

        <p className="programmes-section-index">
          01 / ĐỊNH HƯỚNG ĐÀO TẠO
        </p>


        <div>

          <h2>
            Không chỉ là
            một tấm bằng.
          </h2>


          <p>

            Chương trình sau đại học tại VGG
            kết hợp nền tảng học thuật,
            trải nghiệm thực tiễn và kết nối
            đa ngành.

          </p>

        </div>

      </section>*/}


      {/* ===============================
          PROGRAMME DIRECTORY
          Sidebar + Search + Results
          =============================== */}

      <ProgrammeDirectory />


      {/* ===============================
          ADMISSIONS CTA
          =============================== */}

      <section className="programmes-admission">

        <div>

          <p>
            ADMISSIONS 2026
          </p>

          <h2>
            Sẵn sàng cho bước
            tiến tiếp theo?
          </h2>

        </div>


        <p>

          Đội ngũ tư vấn VGG sẽ giúp bạn
          lựa chọn chương trình và chuẩn bị
          hồ sơ phù hợp với mục tiêu cá nhân.

        </p>


        <Link href="/admissions">

          Khám phá tuyển sinh

          <span>
            ↗
          </span>

        </Link>

      </section>

      <NextStepCTA />

      {/* ===============================
          FOOTER
          =============================== */}

      <SiteFooter />

    </main>

  );
}
