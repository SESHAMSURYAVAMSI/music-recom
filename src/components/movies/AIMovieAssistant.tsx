"use client";

import { useState } from "react";

import axios from "axios";

import { Bot, Loader2, Send } from "lucide-react";

import { motion } from "framer-motion";

export default function AIMovieAssistant() {
  const [prompt, setPrompt] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      setResponse("");

      const res = await axios.post(
        "/api/ai/recommend",
        {
          prompt,
        }
      );

      setResponse(res.data.response);
    } catch {
      setResponse(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-16 max-w-4xl px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-3">
            <Bot className="text-white" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              AI Movie Assistant
            </h2>

            <p className="text-zinc-400">
              Ask for personalized movie recommendations
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Suggest emotional sci-fi movies..."
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
          />

          <button
            onClick={handleAskAI}
            disabled={loading}
            className="rounded-2xl bg-white px-6 text-black transition hover:scale-105"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send />
            )}
          </button>
        </div>

        {response && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-6 text-zinc-200"
          >
            {response}
          </motion.div>
        )}
      </div>
    </section>
  );
}