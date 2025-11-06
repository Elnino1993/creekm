"use client"
import { Card } from "@/components/ui/card"
import type { QuizQuestion } from "@/lib/quiz-questions"

interface QuestionCardProps {
  question: QuizQuestion & { shuffledAnswers: Record<string, string>; shuffledCorrectAnswer: string }
  selectedAnswer: string | null
  showResult: boolean
  onAnswerClick: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

export function QuestionCard({
  question,
  selectedAnswer,
  showResult,
  onAnswerClick,
  currentQuestion,
  totalQuestions,
}: QuestionCardProps) {
  const getAnswerButtonClass = (answer: string) => {
    const baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all font-semibold"

    if (!selectedAnswer) {
      return `${baseClass} border-amber-600 bg-amber-900 text-amber-100 hover:bg-amber-800 hover:border-amber-400 cursor-pointer`
    }

    const isThisAnswerSelected = answer === selectedAnswer
    const isThisAnswerCorrect = answer === question.shuffledCorrectAnswer

    if (!showResult) {
      return `${baseClass} border-amber-600 bg-amber-900 text-amber-100`
    }

    if (isThisAnswerCorrect) {
      return `${baseClass} border-green-500 bg-green-900 text-green-100`
    }

    if (isThisAnswerSelected && !isThisAnswerCorrect) {
      return `${baseClass} border-red-500 bg-red-900 text-red-100`
    }

    return `${baseClass} border-amber-600 bg-amber-900 text-amber-100 opacity-50`
  }

  return (
    <Card className="bg-amber-800 border-2 border-amber-600 p-6">
      {/* Question */}
      <div className="mb-8">
        <p className="text-amber-100 text-lg font-semibold text-balance">{question.question}</p>
      </div>

      {/* Answers */}
      <div className="space-y-3 mb-8">
        {["A", "B", "C", "D"].map((letter) => {
          const answer = question.shuffledAnswers[letter]
          return (
            <button
              key={letter}
              onClick={() => onAnswerClick(letter)}
              disabled={selectedAnswer !== null}
              className={getAnswerButtonClass(letter)}
            >
              <span className="font-bold text-amber-400">{letter})&nbsp;</span>
              <span>{answer}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className={`p-4 rounded-lg ${
            selectedAnswer === question.shuffledCorrectAnswer
              ? "bg-green-900 border border-green-500 text-green-100"
              : "bg-red-900 border border-red-500 text-red-100"
          }`}
        >
          <p className="font-semibold mb-2">
            {selectedAnswer === question.shuffledCorrectAnswer ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <p className="text-sm">{question.explanation}</p>
        </div>
      )}
    </Card>
  )
}
