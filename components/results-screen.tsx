"use client"

import { Button } from "@/components/ui/button"

interface ResultsScreenProps {
  onRestart: () => void
  won: boolean
  prizeLevel: number
}

export function ResultsScreen({ onRestart, won, prizeLevel }: ResultsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {won ? (
          <>{/* Removed all congratulations text and emojis */}</>
        ) : (
          <>{/* Removed all game over text and emojis */}</>
        )}

        <Button
          onClick={onRestart}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-lg px-8 py-6 rounded-lg"
        >
          Play Again
        </Button>
      </div>
    </div>
  )
}
