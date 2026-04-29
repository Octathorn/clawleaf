import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SHOWCASE_VIDEO_DEFAULT_START_SECONDS } from "@/config/showcaseVideos";

type ShowcaseVideoProps = {
  src: string;
  /** Seconds to skip at the start (defaults to global showcase intro skip). Override with 0 to play from beginning. */
  startAtSeconds?: number;
  poster?: string;
  /** Classes on the wrapping element (layout, radius, overflow). */
  wrapperClassName?: string;
  /** Classes on the `<video>` element. */
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  /** When false, video does not loop. Default true. */
  loop?: boolean;
  /**
   * When true, playback follows visibility (~25% in viewport) to limit work when many clips are on-page.
   * Hero / primary bands should keep this false.
   */
  playWhenVisible?: boolean;
  "aria-label"?: string;
};

export function ShowcaseVideo({
  src,
  startAtSeconds = SHOWCASE_VIDEO_DEFAULT_START_SECONDS,
  poster,
  wrapperClassName = "relative min-h-0 min-w-0",
  videoClassName = "h-full w-full object-cover",
  preload = "metadata",
  loop = true,
  playWhenVisible = false,
  "aria-label": ariaLabel,
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });
  const safeStart = Math.max(0, startAtSeconds);
  const [seekReady, setSeekReady] = useState(() => safeStart <= 0);
  const useNativeLoop = loop && safeStart <= 0;

  useEffect(() => {
    setSeekReady(safeStart <= 0);
  }, [src, safeStart]);

  // Seek to start offset once metadata is known.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (safeStart <= 0) return;

    const applySeek = () => {
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      v.currentTime = Math.min(safeStart, Math.max(0, dur - 0.05));
    };

    const onSeeked = () => setSeekReady(true);

    const onMeta = () => {
      applySeek();
    };

    const fallback = window.setTimeout(() => setSeekReady(true), 900);

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("seeked", onSeeked);
    if (v.readyState >= HTMLMediaElement.HAVE_METADATA) applySeek();

    return () => {
      window.clearTimeout(fallback);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("seeked", onSeeked);
    };
  }, [src, safeStart]);

  // When looping with a start offset, restart from offset instead of 0 (native `loop` always rewinds to 0).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loop || safeStart <= 0) return;

    const onEnded = () => {
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      v.currentTime = Math.min(safeStart, Math.max(0, dur - 0.05));
      void v.play().catch(() => {});
    };

    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [src, loop, safeStart]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !seekReady) return;
    if (!playWhenVisible) {
      void v.play().catch(() => {});
      return;
    }
    if (isInView) void v.play().catch(() => {});
    else v.pause();
  }, [isInView, playWhenVisible, src, seekReady]);

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={videoClassName}
        muted
        loop={useNativeLoop}
        playsInline
        preload={preload}
        autoPlay={!playWhenVisible && safeStart <= 0}
        aria-label={ariaLabel}
      />
    </div>
  );
}
