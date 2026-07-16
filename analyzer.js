const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const GRAMMAR_PATTERNS = [
  { level: 0, regex: /\b(is|am|are|have|has|do|does|like|want|need|can)\b/gi },
  { level: 1, regex: /\b(did|was|were|went|ate|saw|took|made|said|told|gave|going to|had to|used to)\b/gi },
  { level: 2, regex: /\b(have been|has been|had been|will have|would like|because|although|however|therefore|if (you|he|she|it|they|we|i))\b/gi },
  { level: 3, regex: /\b(would have|could have|should have|might have|must have|is being|was being|are being|having been|nevertheless|furthermore|consequently|meanwhile)\b/gi },
  { level: 4, regex: /\b(not only|no sooner|hardly when|scarcely|on the contrary|notwithstanding|consequently|subsequently)\b/gi },
  { level: 5, regex: /\b(heretofore|thereupon|hitherto|aforementioned|thereby|wherein|whereby)\b/gi }
]

function scoreGrammar(text) {
  const lower = text.toLowerCase()
  let maxLevel = 0
  for (let i = 0; i < GRAMMAR_PATTERNS.length; i++) {
    const matches = lower.match(GRAMMAR_PATTERNS[i].regex)
    if (matches && matches.length >= 2) {
      maxLevel = Math.max(maxLevel, i + 1)
    }
  }
  return maxLevel
}

function scoreSentenceLength(avg) {
  if (avg < 7) return 0
  if (avg < 10) return 1
  if (avg < 13) return 2
  if (avg < 17) return 3
  if (avg < 22) return 4
  return 5
}

function scoreTTR(ttr) {
  if (ttr < 0.25) return 0
  if (ttr < 0.35) return 1
  if (ttr < 0.45) return 2
  if (ttr < 0.55) return 3
  if (ttr < 0.65) return 4
  return 5
}

function scoreLongWords(pct) {
  if (pct < 0.08) return 0
  if (pct < 0.15) return 1
  if (pct < 0.22) return 2
  if (pct < 0.30) return 3
  if (pct < 0.38) return 4
  return 5
}

function analyzeLevel(text) {
  if (!text || text.trim().length < 20) return null

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []
  const totalWords = words.length
  if (totalWords < 5) return null

  const uniqueWords = new Set(words)
  const typeTokenRatio = uniqueWords.size / totalWords
  const avgWordsPerSentence = totalWords / sentences.length
  const longWords = words.filter(w => w.length > 6).length
  const longWordPct = longWords / totalWords

  const sentenceLenScore = scoreSentenceLength(avgWordsPerSentence)
  const ttrScore = scoreTTR(typeTokenRatio)
  const longWordScore = scoreLongWords(longWordPct)
  const grammarScore = scoreGrammar(text)

  const rawScore = (sentenceLenScore + ttrScore + longWordScore + grammarScore) / 4
  const levelIndex = Math.round(rawScore)
  return CEFR_LEVELS[Math.max(0, Math.min(5, levelIndex))]
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { analyzeLevel }
}
