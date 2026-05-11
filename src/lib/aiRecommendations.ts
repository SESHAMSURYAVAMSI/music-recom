interface MoodMap {
  [key: string]: number[];
}

const moodGenres: MoodMap = {
  happy: [35, 10751],

  sad: [18, 10749],

  excited: [28, 12],

  scared: [27, 53],

  emotional: [18],

  romantic: [10749],

  thoughtful: [99, 36],
};

export function getMoodGenres(
  mood: string
) {
  return moodGenres[mood] || [];
}