import Image from "next/image";

/** Lauren's hand drawn flower from her brand style guide. Decorative, so screen readers skip it. */
export function Flower({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/flower.webp"
      alt=""
      width={440}
      height={608}
      priority={priority}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}
