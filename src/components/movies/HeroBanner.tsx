interface HeroBannerProps {
  title: string;
  overview: string;
  image: string;
}

export default function HeroBanner({
  title,
  overview,
  image,
}: HeroBannerProps) {
  return (
    <div
      className="relative flex h-[90vh] items-end bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative z-10 max-w-3xl p-10">
        <h1 className="text-6xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-5 line-clamp-3 text-lg text-zinc-300">
          {overview}
        </p>

        <div className="mt-6 flex gap-4">
          <button className="rounded-xl bg-white px-8 py-3 font-semibold text-black">
            Watch Now
          </button>

          <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-white backdrop-blur-lg">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}