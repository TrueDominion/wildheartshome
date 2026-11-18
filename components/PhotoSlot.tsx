import Image from "next/image";
import type { Photo } from "@/content/types";

type Props = {
  photo: Photo;
  /** CSS aspect ratio for the slot, for example "4 / 5". Omit to fill the parent. */
  ratio?: string;
  /** Tells the browser how wide the image renders. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

// A flat peach colored placeholder shown while a real photo loads.
const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="5"><rect width="4" height="5" fill="#fcb196"/></svg>').toString("base64");

/**
 * A photo with a fixed shape, so the page never jumps while loading.
 * With no photo yet, it shows a labeled placeholder with the shot number from SHOT_LIST.md.
 */
export function PhotoSlot({ photo, ratio, sizes, priority = false, className = "" }: Props) {
  const style = ratio ? { aspectRatio: ratio } : { height: "100%" };
  if (!photo.src) {
    return (
      <div
        role="img"
        aria-label={`Photo to come: ${photo.alt}`}
        className={`relative flex items-end border border-dashed border-dark/30 bg-peach p-4 text-dark ${className}`}
        style={style}
      >
        <span className="t-label" aria-hidden="true">
          Photo to come · Shot {String(photo.shot).padStart(2, "0")}
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-peach ${className}`} style={style}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover"
      />
    </div>
  );
}
