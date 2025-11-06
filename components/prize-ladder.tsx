"use client"

interface PrizeLadderProps {
  currentQuestion: number
  totalQuestions: number
  prizeLevel: number
}

const prizes = [
  "$100",
  "$200",
  "$500",
  "$1,000",
  "$2,000",
  "$5,000",
  "$10,000",
  "$32,000",
  "$64,000",
  "$125,000",
  "$250,000",
  "$500,000",
  "$1,000,000",
  "$2,000,000",
  "$4,000,000",
]

export function PrizeLadder({ currentQuestion, totalQuestions, prizeLevel }: PrizeLadderProps) {
  return (
    <div className="bg-amber-900 border-2 border-amber-600 rounded-lg p-6 h-full flex flex-col justify-between">
      <h2 className="text-amber-300 font-bold text-lg mb-4 text-center">Prize Fund</h2>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {prizes.map((prize, index) => {
          const questionNum = index + 1
          let bgColor = "bg-amber-950 border-amber-700"
          let textColor = "text-amber-400"

          if (questionNum < prizeLevel) {
            bgColor = "bg-green-900 border-green-600"
            textColor = "text-green-200"
          } else if (questionNum === currentQuestion) {
            bgColor = "bg-amber-500 border-amber-300"
            textColor = "text-amber-950"
          }

          return (
            <div
              key={index}
              className={`flex justify-between items-center px-3 py-2 rounded border ${bgColor} ${textColor} text-sm font-semibold`}
            >
              <span>Q{questionNum}</span>
              <span>{prize}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
