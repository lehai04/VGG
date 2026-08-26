import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";

import {
  SiteFooter
} from "@/shared/components/layout/SiteFooter";

import {
  SiteHeader
} from "@/shared/components/layout/SiteHeader";

import ProgrammeDirectory from "@/features/programmes/components/ProgrammeDirectory";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";


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
          src="/images/pages/programmes/content/campus.jpg"
          alt="Khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />

        <div className="programmes-hero-overlay" />

        <nav className="programmes-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <strong>Chương trình đào tạo</strong>
        </nav>


        <div className="programmes-hero-copy">

          <h1 id="programmes-title">
            <span>Học để tiến xa.</span>
            <em>Dẫn dắt tương lai.</em>
          </h1>

          <p className="programmes-hero-lead">

            Kiến tạo lộ trình học thuật phù hợp
            với tham vọng nghề nghiệp — từ chuyên
            môn chuyên sâu đến năng lực nghiên cứu
            và lãnh đạo toàn cầu.

          </p>

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
          PROGRAMME DIRECTORY
          Sidebar + Search + Results
          =============================== */}

      <ProgrammeDirectory />

      <NextStepCTA />

      {/* ===============================
          FOOTER
          =============================== */}

      <SiteFooter />

    </main>

  );
}

