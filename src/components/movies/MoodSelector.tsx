"use client";

import { useRouter } from "next/navigation";

const moods = ["happy", "sad", "excited", "scared", "romantic", "thoughtful"];

export default function MoodSelector() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => router.push(`/recommendations?mood=${mood}`)}
          className="rounded-full bg-white/10 px-6 py-3 capitalize text-white transition hover:bg-white hover:text-black"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
