import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type ShowcaseVideoProps = {
  src: string;
  poster?: string;
  /** Classes on the wrapping element (layout, radius, overflow). */
  wrapperClassName?: string;
  /** Classes on the `<video>` element. */
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  /**
   * When true, playback follows visibility (~25% in viewport) to limit work when many clips are on-page.
   * Hero / primary bands should keep this false.
   */
  playWhenVisible?: boolean;
  "aria-label"?: string;
};

export function ShowcaseVideo({
  src,
  poster,
  wrapperClassName = "relative min-h-0 min-w-0",
  videoClassName = "h-full w-full object-cover",
  preload = "metadata",
  playWhenVisible = false,
  "aria-label": ariaLabel,
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!playWhenVisible) {
      void v.play().catch(() => {});
      return;
    }
    if (isInView) void v.play().catch(() => {});
    else v.pause();
  }, [isInView, playWhenVisible, src]);

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={videoClassName}
        muted
        loop
        playsInline
        preload={preload}
        autoPlay={!playWhenVisible}
        aria-label={ariaLabel}
      />
    </div>
  );
}
