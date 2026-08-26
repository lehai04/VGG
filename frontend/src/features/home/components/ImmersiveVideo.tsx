"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/video/video-banner.webm";

/** Video giới thiệu tự phát khi đi vào viewport và tạm dừng khi người dùng cuộn qua. */
export function ImmersiveVideo() {
  // Chỉ tải file video lớn khi section xuất hiện lần đầu.
  const [hasLoaded, setHasLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Ngưỡng 35% tránh phát video khi người dùng mới chỉ chạm nhẹ vào mép section.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        setShouldPlay(isVisible);
        if (isVisible) setHasLoaded(true);
      },
      { threshold: [0, 0.35] },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    // Ưu tiên phát có tiếng khi section đi vào viewport. Nếu chính sách autoplay
    // của trình duyệt chặn, vẫn phát hình ở chế độ tắt tiếng và mở tiếng ngay sau
    // tương tác đầu tiên của người dùng.
    video.muted = false;
    setIsMuted(false);
    void video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      void video.play();
    });
  }, [hasLoaded, shouldPlay]);

  useEffect(() => {
    if (!shouldPlay) return;

    const enableSound = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      setIsMuted(false);
      void video.play();
    };

    window.addEventListener("pointerdown", enableSound, { once: true });
    window.addEventListener("keydown", enableSound, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, [shouldPlay]);

  return (
    <div
      className="immersiveVideoStage"
      ref={stageRef}
      data-video-state={shouldPlay ? "playing" : "paused"}
    >
      <div className={shouldPlay ? "immersiveVideo isPlaying" : "immersiveVideo"}>
        {hasLoaded ? (
          <video ref={videoRef} src={VIDEO_SRC} loop playsInline preload="auto" />
        ) : (
          <div className="immersiveVideoPoster" />
        )}

        {!hasLoaded && (
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
              aria-label="Phát video giới thiệu Viện Sau Đại học"
              onClick={() => {
                setHasLoaded(true);
                setShouldPlay(true);
              }}
            >
              <i aria-hidden="true">▶</i>
              <span>PLAY FILM</span>
            </button>
          </>
        )}

        <div className="immersiveVideoMark" aria-hidden="true">
          Viện Sau Đại học <span>／</span> 03:15
        </div>

        {hasLoaded && shouldPlay && isMuted && (
          <button
            className="immersiveVideoSound"
            type="button"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.muted = false;
              setIsMuted(false);
              void video.play();
            }}
          >
            <span aria-hidden="true">🔊</span> Bật âm thanh
          </button>
        )}
      </div>
    </div>
  );
}
