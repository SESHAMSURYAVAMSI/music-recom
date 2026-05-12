"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function Home() {
 const router = useRouter()
 function handleNavigate() {
  router.push("/dashboard") // go to dashboard list
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-200 px-6">
      <div className="w-full max-w-5xl flex flex-col items-center text-center gap-12">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src="/images/header-logo.png"
            alt="TDC User Logo"
            width={180}
            height={110}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Movie Recomendation System 
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            Know All type of Movies, Traailers and Favroutes.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 bg-green-800 hover:bg-sky-900"
          >
            <a href="/login">Login</a>
          </Button>

          <Button
            onClick={handleNavigate}
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            Get Started
          </Button>
        </motion.div>

      </div>
    </div>
  )
}