import Image from "next/image";

export function ArticleHeroVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_45%),linear-gradient(135deg,#ffffff,#eff6ff_55%,#f8fafc)] p-5 shadow-card sm:p-7">
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl" aria-hidden="true" />
      <div className="absolute bottom-4 left-8 h-16 w-16 rounded-full bg-emerald-200/25 blur-xl" aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        priority={false}
        className="relative mx-auto h-auto w-full max-w-xl"
      />
    </div>
  );
}
