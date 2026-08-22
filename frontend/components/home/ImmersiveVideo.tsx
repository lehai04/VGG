"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "M-d6m_ATQEU";

/** Video giới thiệu tự phát khi đi vào viewport và tạm dừng khi người dùng cuộn qua. */
export function ImmersiveVideo() {
  // Chỉ tạo iframe khi video xuất hiện lần đầu để giảm tài nguyên tải ban đầu.
  const [hasLoaded, setHasLoaded] = useState(false);
  // Trạng thái mong muốn; trình phát YouTube được điều khiển qua postMessage bên dưới.
  const [shouldPlay, setShouldPlay] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Gửi lệnh theo chuẩn YouTube IFrame Player API mà không cần tải thêm SDK ngoài.
  const controlVideo = (play: boolean) => {
    const player = iframeRef.current?.contentWindow;
    if (!player) return;

    const command = (func: string, args: unknown[] = []) =>
      player.postMessage(JSON.stringify({ event: "command", func, args }), "*");

    if (play) {
      // Autoplay nền phải luôn tắt tiếng để không bị trình duyệt chặn.
      command("mute");
      command("playVideo");
    } else {
      command("pauseVideo");
    }
  };

  useEffect(() => {
    if (!hasLoaded) return;

    controlVideo(shouldPlay);
    // Gửi lại sau 500 ms để xử lý trường hợp iframe vừa tải nhưng player chưa sẵn sàng.
    const retry = window.setTimeout(() => controlVideo(shouldPlay), 500);
    return () => window.clearTimeout(retry);
  }, [hasLoaded, shouldPlay]);

  return (
    <div
      className="immersiveVideoStage"
      ref={stageRef}
      data-video-state={shouldPlay ? "playing" : "paused"}
    >
      <div className={shouldPlay ? "immersiveVideo isPlaying" : "immersiveVideo"}>
        {hasLoaded ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&rel=0&enablejsapi=1`}
            title="Video giới thiệu VGG"
            allow="autoplay; encrypted-media"
            onLoad={() => controlVideo(shouldPlay)}
          />
        ) : (
          <div
            className="immersiveVideoPoster"
            style={{
              backgroundImage: `url("https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg")`,
            }}
          />
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
              aria-label="Phát video giới thiệu VGG"
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
          VGG <span>／</span> 03:15
        </div>
      </div>
    </div>
  );
}
