export interface QuizQuestion {
  question: string
  A: string
  B: string
  C: string
  D: string
  correctAnswer: "A" | "B" | "C" | "D"
  explanation: string
}

function getShuffledAnswers(question: QuizQuestion): { answers: Record<string, string>; correctAnswer: string } {
  const options = [
    { letter: "A", text: question.A },
    { letter: "B", text: question.B },
    { letter: "C", text: question.C },
    { letter: "D", text: question.D },
  ]

  // Fisher-Yates shuffle algorithm
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }

  const shuffledAnswers: Record<string, string> = {}
  let correctLetter = ""

  options.forEach((option, index) => {
    const newLetter = String.fromCharCode(65 + index) // A=65 in ASCII
    shuffledAnswers[newLetter] = option.text
    if (option.letter === question.correctAnswer) {
      correctLetter = newLetter
    }
  })

  return { answers: shuffledAnswers, correctAnswer: correctLetter }
}

export interface ShuffledQuestion extends QuizQuestion {
  shuffledAnswers: Record<string, string>
  shuffledCorrectAnswer: string
}

export function getShuffledQuestions(): ShuffledQuestion[] {
  return quizQuestions.map((question) => {
    const { answers, correctAnswer } = getShuffledAnswers(question)
    return {
      ...question,
      shuffledAnswers: answers,
      shuffledCorrectAnswer: correctAnswer,
    }
  })
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What blockchain does Creek Protocol operate on?",
    A: "Ethereum",
    B: "Sui",
    C: "Solana",
    D: "Polygon",
    correctAnswer: "B",
    explanation:
      'Creek is an RWAfi protocol on Sui. This is mentioned in the protocol documentation as "The pioneering gold tokenization protocol of Sui."',
  },
  {
    question: "What is the base tokenized gold asset in Creek Protocol?",
    A: "GR",
    B: "GY",
    C: "XAUm",
    D: "GUSD",
    correctAnswer: "C",
    explanation:
      "XAUm is the base tokenized gold asset issued by Matrixdock. Users stake XAUm to receive GR and GY tokens.",
  },
  {
    question: "What is Creek Protocol's main value proposition?",
    A: "Creating a currency exchange platform",
    B: "Separating gold value into stable and volatile components for DeFi",
    C: "Mining cryptocurrencies",
    D: "Providing insurance services",
    correctAnswer: "B",
    explanation:
      "Creek separates gold value into Stable Value and Volatile Value to create DeFi products on top of gold. This is the core innovation of the Value Separation Protocol.",
  },
  {
    question: "How is Stable Value (sValue) calculated in the Value Separation mechanism?",
    A: "Using only the current spot price",
    B: "Using EMA120 and EMA90 with weights 0.8 and 0.7, combined with current spot price",
    C: "Using a random algorithm",
    D: "Using the highest price of the day",
    correctAnswer: "B",
    explanation:
      "Stable Value is calculated from EMA120, EMA90, and the current spot price with weights 0.8 and 0.7, which can be adjusted via governance.",
  },
  {
    question: "What does Volatile Value (vValue) represent?",
    A: "The percentage of gold that is insurance",
    B: "The difference between current gold price and Stable Value",
    C: "The total supply of XAUm",
    D: "The governance voting power",
    correctAnswer: "B",
    explanation:
      "Volatile Value equals the current gold price minus Stable Value. Because this is smaller than total price, it becomes naturally leveraged.",
  },
  {
    question: 'Why does the Volatile Value become "naturally leveraged" in Creek Protocol?',
    A: "Due to active borrowing mechanisms",
    B: "Because it represents a smaller portion than total gold price",
    C: "Through governance voting",
    D: "By using flash loans",
    correctAnswer: "B",
    explanation:
      "Since Volatile Value is smaller than the total gold price, it captures price movements with amplified percentage changes, creating natural leverage without complex mechanics.",
  },
  {
    question: "What is GR in the Creek Protocol token structure?",
    A: "The volatile/yield side of gold",
    B: "The stable side of gold, used as strong collateral",
    C: "The governance token",
    D: "The reserve currency",
    correctAnswer: "B",
    explanation:
      "GR represents the stable side of gold and is viewed as strong collateral. Users can borrow against it with LTV up to ~85%.",
  },
  {
    question: "What is the primary characteristic of GY tokens?",
    A: "They are stablecoins",
    B: "They have fixed interest rates",
    C: "They capture gold price movement and protocol revenues without classic liquidations",
    D: "They are used only for governance",
    correctAnswer: "C",
    explanation:
      "GY is the volatile/yield side of gold designed to capture price movements and part of protocol revenues. It is designed without classic liquidations.",
  },
  {
    question: "What collateral types does GUSD support, and what are their maximum LTV values?",
    A: "Only GR at 100% LTV",
    B: "GR at 85% LTV and SUI at 50% LTV",
    C: "Only XAUm at 75% LTV",
    D: "All tokens at 90% LTV",
    correctAnswer: "B",
    explanation: "Creek supports GR collateral at up to ~85% LTV and SUI collateral at up to 50% LTV for minting GUSD.",
  },
  {
    question: "What is GUSD in the Creek Protocol?",
    A: "A governance token",
    B: "A gold-backed volatile token",
    C: "A USD-pegged stablecoin (pegged to $1, not to gold)",
    D: "A loan instrument with variable interest",
    correctAnswer: "C",
    explanation:
      "GUSD is a USD-pegged stablecoin (pegged to $1) that users can mint against collateral or obtain via PSM 1:1 for USDC with a 0.3% redemption fee.",
  },
  {
    question: "What is the PSM in Creek Protocol?",
    A: "A governance mechanism",
    B: "A fixed USDC ↔ GUSD conversion with 1:1 rate (0.3% fee for redemptions)",
    C: "A liquidation system",
    D: "A yield farming pool",
    correctAnswer: "B",
    explanation:
      "PSM provides fixed USDC ↔ GUSD conversion at 1:1 with no fee for minting and 0.3% fee for redeeming GUSD to USDC.",
  },
  {
    question: "What is the health factor threshold for safe positions in Creek Protocol?",
    A: "Above 1.0",
    B: "Above 1.25",
    C: "Above 2.0",
    D: "Above 0.5",
    correctAnswer: "B",
    explanation: "In Creek Protocol, health factor >1.25 is considered safe, while ≤1 triggers liquidation.",
  },
  {
    question: "How much of protocol revenues are distributed to CREEK stakers?",
    A: "5%",
    B: "10%",
    C: "15%",
    D: "25%",
    correctAnswer: "C",
    explanation: "15% of protocol revenues are distributed to stakers who have staked CREEK into the Insurance Fund.",
  },
  {
    question: "What is the minimum CREEK token amount required to submit a proposal in governance?",
    A: "10,000 CREEK",
    B: "50,000 CREEK",
    C: "100,000 CREEK",
    D: "500,000 CREEK",
    correctAnswer: "B",
    explanation: "The proposal threshold is 50,000 CREEK. The governance process also requires 2,000,000 CREEK quorum.",
  },
  {
    question: "What is the full governance timeline in Creek Protocol?",
    A: "2 days delay → 2 days voting → immediate execution",
    B: "1 day delay → 3 days voting → 1 day execution delay",
    C: "2 days delay → 5 days voting → 2 days execution delay → 30 days to carry out",
    D: "7 days delay → 7 days voting → 7 days execution delay",
    correctAnswer: "C",
    explanation:
      "Creek governance follows: 2 days initial delay → 5 days voting period → 2 days execution delay → 30 days to carry out the approved action.",
  },
  {
    question: "If a user stakes 10 XAUm and receives 6 GR and 4 GY, which statement is true about their position?",
    A: "They can only borrow stablecoins against GY",
    B: "They can borrow GUSD against GR, and GY captures upside without liquidation risk",
    C: "They must immediately liquidate their GY",
    D: "They cannot trade either token",
    correctAnswer: "B",
    explanation:
      'The landing page flow shows: "Stake XAUm → get GR and GY → stake GR and borrow GUSD." GR is collateral for borrowing GUSD, while GY captures volatility and yield without liquidations.',
  },
]
