"use client";

interface GenreFilterProps {
  genres: {
    id: number;
    name: string;
  }[];

  selectedGenre: number | null;

  onSelect: (id: number | null) => void;
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onSelect,
}: GenreFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-5 py-2 ${
          selectedGenre === null
            ? "bg-white text-black"
            : "bg-white/10 text-white"
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() =>
            onSelect(genre.id)
          }
          className={`rounded-full px-5 py-2 ${
            selectedGenre === genre.id
              ? "bg-white text-black"
              : "bg-white/10 text-white"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}