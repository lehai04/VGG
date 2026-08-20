"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "M-d6m_ATQEU";

export function ImmersiveVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || isPlaying) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <div className="immersiveVideoStage" ref={stageRef}>
      <div className={isPlaying ? "immersiveVideo isPlaying" : "immersiveVideo"}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&rel=0&playsinline=1`}
            title="Video giới thiệu VGG"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div
            className="immersiveVideoPoster"
            style={{
              backgroundImage: `url("https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg")`,
            }}
          />
        )}

        {!isPlaying && (
          <>
            <div className="immersiveVideoShade" />
            <div className="immersiveVideoCopy">
              <p>VAN LANG GLOBAL GRADUATE · THE FILM</p>
              <h3>
                Học để hiểu.
                <br />
                <em>Học để dẫn đầu.</em>
              </h3>
              <span>Khám phá tinh thần học thuật và cộng đồng sáng tạo tại Văn Lang.</span>
            </div>
            <button
              className="immersiveVideoPlay"
              type="button"
              aria-label="Phát video giới thiệu VGG"
              onClick={() => setIsPlaying(true)}
            >
              <i aria-hidden="true">▶</i>
              <span>PLAY FILM</span>
            </button>
          </>
        )}

        <div className="immersiveVideoMark" aria-hidden="true">
          VGG <span>／</span> 03:15
        </div>
      </div>
    </div>
  );
}
