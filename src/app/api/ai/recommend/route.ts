import OpenAI from "openai";

import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackRecommendations: Record<string, string> = {
  drama: `
🎭 Drama Recommendations

1. The Shawshank Redemption
   - Emotional prison drama
   - Inspiring and powerful

2. Forrest Gump
   - Heartwarming life journey
   - Emotional storytelling

3. Whiplash
   - Intense musical drama
   - Ambition vs pressure
`,

  sciFi: `
🚀 Sci-Fi Recommendations

1. Interstellar
   - Emotional space exploration

2. Inception
   - Mind-bending dream thriller

3. Blade Runner 2049
   - Cinematic futuristic mystery
`,

  horror: `
👻 Horror Recommendations

1. The Conjuring
2. Hereditary
3. Insidious
`,

  comedy: `
😂 Comedy Recommendations

1. Superbad
2. The Hangover
3. Free Guy
`,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = body.prompt?.toLowerCase() || "";

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",

        messages: [
          {
            role: "system",

            content: `
You are an expert AI movie recommendation assistant.
Recommend movies based on user moods and genres.
              `,
          },

          {
            role: "user",

            content: prompt,
          },
        ],

        temperature: 0.8,
      });

      return NextResponse.json({
        response: completion.choices[0].message.content,
      });
    } catch (openAIError) {
      console.log("OpenAI failed. Using fallback AI.");

      if (prompt.includes("drama")) {
        return NextResponse.json({
          response: fallbackRecommendations.drama,
        });
      }

      if (prompt.includes("sci") || prompt.includes("space")) {
        return NextResponse.json({
          response: fallbackRecommendations.sciFi,
        });
      }

      if (prompt.includes("horror")) {
        return NextResponse.json({
          response: fallbackRecommendations.horror,
        });
      }

      if (prompt.includes("comedy")) {
        return NextResponse.json({
          response: fallbackRecommendations.comedy,
        });
      }

      return NextResponse.json({
        response: `
🎬 Recommended Movies

1. Inception
2. Interstellar
3. The Dark Knight
4. Parasite
5. Whiplash
        `,
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "AI request failed",
      },
      {
        status: 500,
      },
    );
  }
}
