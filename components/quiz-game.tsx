"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "./question-card"
import { ResultsScreen } from "./results-screen"
import { getShuffledQuestions } from "@/lib/quiz-questions"
import { PrizeLadder } from "./prize-ladder"

type GameState = "playing" | "finished" | "gameOver"

export function QuizGame() {
  const [shuffledQuestions] = useState(() => getShuffledQuestions())
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>("playing")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [prizeLevel, setPrizeLevel] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  const question = shuffledQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question.shuffledCorrectAnswer

  useEffect(() => {
    if (gameState === "playing" && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser, user interaction required
      })
    }
  }, [gameState])

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return // Prevent changing answer
    setSelectedAnswer(answer)
    setShowResult(true)
  }

  const handleNext = () => {
    if (!isCorrect) {
      setGameState("gameOver")
      return
    }

    if (currentQuestion + 1 === shuffledQuestions.length) {
      setGameState("finished")
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setPrizeLevel(currentQuestion + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setGameState("playing")
    setSelectedAnswer(null)
    setShowResult(false)
    setPrizeLevel(0)
  }

  if (gameState === "finished") {
    return <ResultsScreen onRestart={handleRestart} won={true} prizeLevel={15} />
  }

  if (gameState === "gameOver") {
    return <ResultsScreen onRestart={handleRestart} won={false} prizeLevel={prizeLevel} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 p-4">
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q1-5-bed-2008-xJ1Pgvpk1E8Jkgi79gwnaGegP7LZlT.mp3"
        loop
        className="hidden"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-amber-300">Creek Millionaire</h1>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Question section */}
          <div className="flex-1">
            <QuestionCard
              question={question}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerClick={handleAnswerClick}
              currentQuestion={currentQuestion + 1}
              totalQuestions={shuffledQuestions.length}
            />

            {/* Button */}
            {showResult && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className={
                    isCorrect ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                  }
                >
                  {isCorrect
                    ? currentQuestion + 1 === shuffledQuestions.length
                      ? "See Results"
                      : "Next Question"
                    : "Game Over"}
                </Button>
              </div>
            )}
          </div>

          <div className="w-64">
            <PrizeLadder
              currentQuestion={currentQuestion + 1}
              totalQuestions={shuffledQuestions.length}
              prizeLevel={prizeLevel + 1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
