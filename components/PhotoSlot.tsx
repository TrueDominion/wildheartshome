import Image from "next/image";
import type { Photo } from "@/content/types";

type Props = {
  photo: Photo;
  /** Tailwind aspect classes for the real photo, for example "aspect-[4/5]". */
  ratio: string;
  /** Aspect classes while the photo is missing. Placeholders stay small so the page never reads as empty boxes. */
  emptyRatio?: string;
  /** Tells the browser how wide the image renders, for picking the right file size. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

// A flat peach colored placeholder shown while a real photo loads.
const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="5"><rect width="4" height="5" fill="#fde7dd"/></svg>').toString("base64");

/**
 * A photo with a fixed shape, so the page never jumps while loading.
 * With no photo yet, it shows a labeled placeholder with the shot number from SHOT_LIST.md.
 */
export function PhotoSlot({ photo, ratio, emptyRatio, sizes, priority = false, className = "" }: Props) {
  if (!photo.src) {
    return (
      <div
        role="img"
        aria-label={`Photo to come: ${photo.alt}`}
        className={`relative flex items-end rounded-3xl border border-dashed border-coral/60 bg-peach-tint p-4 ${emptyRatio ?? ratio} ${className}`}
      >
        <span className="t-label text-ink-2" aria-hidden="true">
          Photo to come · Shot {String(photo.shot).padStart(2, "0")}
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-peach-tint ${ratio} ${className}`}>
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
