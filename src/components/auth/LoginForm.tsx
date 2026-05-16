/* eslint-disable react-hooks/purity */
"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Film } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/auth/login", data);

      toast.success(response.data.message || "Login successful");

      router.push("/dashboard");

      router.refresh();
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow Effects */}
      <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-red-500/20 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({
          length: 20,
        }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
            }}
            className="absolute h-2 w-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.08)]"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-500/40">
            <Film className="text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              CineVerse
            </h1>

            <p className="text-sm text-zinc-400">Your cinematic universe</p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">Welcome Back 👋</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Continue your movie journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-500"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4 text-zinc-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-red-600 py-4 font-semibold text-white shadow-lg shadow-red-500/30 transition duration-300 hover:scale-[1.02] hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-white transition hover:text-red-400"
            >
              Signup
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
