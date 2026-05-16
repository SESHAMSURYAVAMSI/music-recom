"use client";

interface Genre {
  id: number;
  name: string;
  count: string;
}

interface GenreFilterProps {
  genres: Genre[];

  selectedGenre: number | null;

  onSelect: (id: number | null) => void;
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onSelect,
}: GenreFilterProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`flex min-w-fit flex-col rounded-2xl border px-5 py-3 transition ${
          selectedGenre === null
            ? "border-white bg-white text-black"
            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        <span className="font-semibold">All</span>

        <span className="text-xs opacity-70">Explore All</span>
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`flex min-w-fit flex-col rounded-2xl border px-5 py-3 transition ${
            selectedGenre === genre.id
              ? "border-white bg-white text-black"
              : "border-white/10 bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          <span className="font-semibold">{genre.name}</span>

          <span className="text-xs opacity-70">{genre.count} Movies</span>
        </button>
      ))}
    </div>
  );
}
