"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { toast } from "sonner";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import Link from "next/link";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/auth/signup",
        data
      );

      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Start discovering amazing movies.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3.5 text-zinc-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-3.5 text-zinc-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-white py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}