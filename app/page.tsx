"use client"

import { useState } from "react"
import { QuizGame } from "@/components/quiz-game"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 flex items-center justify-center p-4">
        <audio autoPlay loop>
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hello-new-punter-2008-long-R1XjZy3YCj10287fi2w7AgJK9cKhGK.mp3"
            type="audio/mpeg"
          />
        </audio>

        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-amber-300 mb-2 text-balance">Who Wants to Be a</h1>
            <h2 className="text-5xl font-bold text-amber-100 mb-8 text-balance">Creek Millionaire?</h2>
          </div>

          <div className="bg-amber-800 bg-opacity-50 border-2 border-amber-500 rounded-lg p-8 mb-8">
            <p className="text-amber-100 text-lg mb-6">
              Test your knowledge about Creek Protocol, the revolutionary RWAfi protocol that separates gold's value
              into stable and volatile components.
            </p>
            <p className="text-amber-200 text-md mb-8">
              Answer 15 questions correctly, progressing from easy to expert level. Can you become a Creek Millionaire?
            </p>
          </div>

          <Button
            onClick={() => setGameStarted(true)}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-lg px-8 py-6 rounded-lg"
          >
            Start Quiz
          </Button>

          <div className="mt-12 flex flex-col gap-4 items-center">
            <div className="flex gap-4 flex-wrap justify-center">
              <a
                href="https://docs.creek.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-700 hover:bg-amber-600 text-amber-100 font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                📚 Prepare for Quiz
              </a>
              <a
                href="https://x.com/OxVentura/status/1985796141556879812"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-700 hover:bg-amber-600 text-amber-100 font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                🎥 Testnet Guide
              </a>
            </div>
            <a
              href="https://x.com/OxVentura"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors underline"
            >
              Created by @OxVentura
            </a>
          </div>

          <div className="mt-8 text-amber-300 text-sm">
            <p>Where Gold Meets DeFi Yield 🏆</p>
          </div>
        </div>
      </div>
    )
  }

  return <QuizGame />
}
