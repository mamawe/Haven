import { useState } from 'react'
import {
  epdsQuestions, parentingAnxietyQuestions, evaluateScore, getSuggestions,
  getQuickQuestions, normalizeQuickScore
} from '../data/scale'
import { addScaleResult, getHotlineRegion } from '../utils/storage'
import { useProfile } from '../context/ProfileContext'
import { useI18n } from '../i18n'
import { HOTLINES } from '../data/hotlines'
import type { ScaleQuestion, Localized } from '../types'

type Phase = 'intro' | 'epds' | 'transition' | 'parenting' | 'result'
type Mode = 'full' | 'quick'

export function ScalePage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [mode, setMode] = useState<Mode>('full')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [epdsAnswers, setEpdsAnswers] = useState<number[]>([])
  const [parentingAnswers, setParentingAnswers] = useState<number[]>([])
  const { profileName } = useProfile()
  const { t, L, lang } = useI18n()
  const region = getHotlineRegion()

  // 根据模式选择题目集
  const epdsSet = mode === 'full' ? epdsQuestions : getQuickQuestions(epdsQuestions)
  const parentingSet = mode === 'full' ? parentingAnxietyQuestions : getQuickQuestions(parentingAnxietyQuestions)
  const totalEPDS = epdsSet.length
  const totalParenting = parentingSet.length

  const handleSelect = (score: number) => {
    if (phase === 'epds') {
      const next = [...epdsAnswers, score]
      setEpdsAnswers(next)
      if (next.length < totalEPDS) {
        setCurrentQuestion(next.length)
      } else {
        setPhase('transition')
        setCurrentQuestion(0)
      }
    } else if (phase === 'parenting') {
      const next = [...parentingAnswers, score]
      setParentingAnswers(next)
      if (next.length < totalParenting) {
        setCurrentQuestion(next.length)
      } else {
        setPhase('result')
        saveResults()
      }
    }
  }

  const getOverallLevel = (a: string, b: string): 'low' | 'moderate' | 'high' | 'severe' => {
    const levels = ['low', 'moderate', 'high', 'severe']
    const max = Math.max(levels.indexOf(a), levels.indexOf(b))
    return levels[max] as 'low' | 'moderate' | 'high' | 'severe'
  }

  const saveResults = () => {
    let epdsTotal: number
    let parentingTotal: number

    if (mode === 'full') {
      epdsTotal = epdsAnswers.reduce((a, b) => a + b, 0)
      parentingTotal = parentingAnswers.reduce((a, b) => a + b, 0)
    } else {
      // 快速版：归一化到 30 分制
      epdsTotal = normalizeQuickScore(epdsAnswers.reduce((a, b) => a + b, 0), totalEPDS)
      parentingTotal = normalizeQuickScore(parentingAnswers.reduce((a, b) => a + b, 0), totalParenting)
    }

    const epdsResult = evaluateScore('epds', epdsTotal)
    const parentingResult = evaluateScore('parenting', parentingTotal)
    const overallLevel = getOverallLevel(epdsResult.level, parentingResult.level)

    addScaleResult({
      totalScore: epdsTotal + parentingTotal,
      level: overallLevel,
      category: {
        zh: `${epdsResult.label.zh} · ${parentingResult.label.zh}`,
        en: `${epdsResult.label.en} · ${parentingResult.label.en}`,
      },
      suggestions: [
        ...getSuggestions('epds', epdsResult.level),
        ...getSuggestions('parenting', parentingResult.level),
      ],
      timestamp: Date.now(),
    })
  }

  // ===== Intro =====
  if (phase === 'intro') {
    return (
      <div className="px-4 py-6 space-y-5">
        <h1 className="text-2xl font-serif text-calm-800 text-center">{t('scale.title')}</h1>

        <div className="card space-y-4">
          <div className="text-center">
            <span className="text-4xl">🧘</span>
          </div>

          {/* 明确提示两段式结构 */}
          <div className="bg-warm-50 rounded-xl p-4 space-y-3">
            <p className="text-center text-sm font-medium text-calm-700">{t('scale.twoParts')}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-lg p-3 text-center border border-warm-200">
                <div className="text-lg mb-1">1️⃣</div>
                <div className="text-sm font-medium text-calm-800">{t('scale.part1')}</div>
                <div className="text-xs text-calm-500 mt-0.5">{t('scale.part1sub')}</div>
              </div>
              <div className="text-calm-400">→</div>
              <div className="flex-1 bg-white rounded-lg p-3 text-center border border-warm-200">
                <div className="text-lg mb-1">2️⃣</div>
                <div className="text-sm font-medium text-calm-800">{t('scale.part2')}</div>
                <div className="text-xs text-calm-500 mt-0.5">{t('scale.part2sub')}</div>
              </div>
            </div>
            <p className="text-xs text-calm-500 text-center">
              {t('scale.twoPartsHint')}
            </p>
          </div>

          {/* 模式选择 */}
          <div>
            <p className="text-sm font-medium text-calm-700 mb-2">{t('scale.chooseLength')}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('full')}
                className={`rounded-xl p-3 border text-left transition-all ${
                  mode === 'full'
                    ? 'border-warm-400 bg-warm-50 ring-1 ring-warm-400'
                    : 'border-calm-200 hover:border-calm-300'
                }`}
              >
                <div className="text-sm font-medium text-calm-800">{t('scale.standard')}</div>
                <div className="text-xs text-calm-500 mt-0.5">{t('scale.standardDesc')}</div>
                <div className="text-[10px] text-calm-400 mt-1">{t('scale.standardNote')}</div>
              </button>
              <button
                onClick={() => setMode('quick')}
                className={`rounded-xl p-3 border text-left transition-all ${
                  mode === 'quick'
                    ? 'border-warm-400 bg-warm-50 ring-1 ring-warm-400'
                    : 'border-calm-200 hover:border-calm-300'
                }`}
              >
                <div className="text-sm font-medium text-calm-800">{t('scale.quick')}</div>
                <div className="text-xs text-calm-500 mt-0.5">{t('scale.quickDesc')}</div>
                <div className="text-[10px] text-calm-400 mt-1">{t('scale.quickNote')}</div>
              </button>
            </div>
          </div>

          <div className="bg-calm-50 rounded-xl p-3 text-xs text-calm-600 leading-relaxed">
            {t('scale.disclaimer')}
          </div>

          <button
            onClick={() => { setPhase('epds'); setCurrentQuestion(0) }}
            className="btn-primary w-full text-center"
          >
            {t('scale.start')}（{mode === 'full' ? t('scale.startStandard') : t('scale.startQuick')}）
          </button>
        </div>
      </div>
    )
  }

  // ===== Transition between Part 1 and Part 2 =====
  if (phase === 'transition') {
    return (
      <div className="px-4 py-6">
        <div className="card text-center space-y-5 py-10">
          <div className="text-5xl">✅</div>
          <div>
            <h2 className="text-xl font-serif text-calm-800">{t('scale.part1done')}</h2>
            <p className="text-sm text-calm-500 mt-1">{t('scale.part1doneSub')}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-soft-green-100 text-soft-green-700 rounded-full font-medium">{t('scale.part1tag')}</span>
            <span className="text-calm-300">→</span>
            <span className="px-3 py-1 bg-warm-100 text-warm-700 rounded-full font-medium">{t('scale.part2tag')}</span>
          </div>
          <div className="bg-calm-50 rounded-xl p-4 text-sm text-calm-600 leading-relaxed">
            {t('scale.part2intro')}
            {mode === 'quick' && <span className="block mt-2 text-xs text-calm-500">{t('scale.part2remain').replace('{n}', String(totalParenting))}</span>}
          </div>
          <button
            onClick={() => { setPhase('parenting'); setCurrentQuestion(0) }}
            className="btn-primary w-full text-center"
          >
            {t('scale.enterPart2')}
          </button>
        </div>
      </div>
    )
  }

  // ===== Result =====
  if (phase === 'result') {
    let epdsTotal: number
    let parentingTotal: number
    if (mode === 'full') {
      epdsTotal = epdsAnswers.reduce((a, b) => a + b, 0)
      parentingTotal = parentingAnswers.reduce((a, b) => a + b, 0)
    } else {
      epdsTotal = normalizeQuickScore(epdsAnswers.reduce((a, b) => a + b, 0), totalEPDS)
      parentingTotal = normalizeQuickScore(parentingAnswers.reduce((a, b) => a + b, 0), totalParenting)
    }
    const epdsResult = evaluateScore('epds', epdsTotal)
    const parentingResult = evaluateScore('parenting', parentingTotal)
    const overallLevel = getOverallLevel(epdsResult.level, parentingResult.level)
    const suggestions: Localized[] = [
      ...getSuggestions('epds', epdsResult.level),
      ...getSuggestions('parenting', parentingResult.level),
    ]

    return (
        <div className="px-4 py-6 space-y-5">
          <h1 className="text-2xl font-serif text-calm-800 text-center">{t('scale.result')}</h1>
          <p className="text-center text-xs text-calm-400 -mt-3">{t('scale.viewOf').replace('{name}', profileName)}</p>

        <div className={`card ${getBgColor(overallLevel)} text-center`}>
          <span className="text-4xl block mb-2">{getMoodEmoji(overallLevel)}</span>
          <div className={`text-xl font-medium ${getTextColor(overallLevel)}`}>
            {t(`scale.level.${overallLevel}`)}
          </div>
          <div className="text-xs text-calm-500 mt-1">
            {mode === 'full' ? t('scale.fullLabel') : t('scale.quickLabel')} · {t('scale.selfRef')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={`card text-center ${epdsResult.bgColor}`}>
            <div className="text-xs text-calm-500 mb-1">{t('scale.part1Score')}</div>
            <div className="text-2xl font-bold text-calm-800">{epdsTotal}<span className="text-sm text-calm-400 font-normal">/30</span></div>
            <div className={`text-sm mt-1 ${epdsResult.color} font-medium`}>{L(epdsResult.label)}</div>
          </div>
          <div className={`card text-center ${parentingResult.bgColor}`}>
            <div className="text-xs text-calm-500 mb-1">{t('scale.part2Score')}</div>
            <div className="text-2xl font-bold text-calm-800">{parentingTotal}<span className="text-sm text-calm-400 font-normal">/30</span></div>
            <div className={`text-sm mt-1 ${parentingResult.color} font-medium`}>{L(parentingResult.label)}</div>
          </div>
        </div>

        <div className="card space-y-3">
          <h3 className="font-medium text-calm-800 text-sm">{t('scale.suggestions')}</h3>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-calm-700 leading-relaxed">
                <span className="text-warm-500 mt-0.5">•</span>
                <span>{L(s)}</span>
              </li>
            ))}
          </ul>
        </div>

        {(overallLevel === 'high' || overallLevel === 'severe') && (
          <div className="card bg-red-50 border-red-200 text-center">
            <p className="text-sm text-red-700 font-medium mb-2">
              {t('scale.highAlert')}
            </p>
            <div className="space-y-1 mb-3">
              {HOTLINES[region].map(h => (
                <p key={h.number} className="text-xs text-red-600">
                  {t('scale.hotline')}
                  <a href={`tel:${h.number}`} className="font-bold underline ml-1">{h.number}</a>
                  <span className="opacity-80 ml-1">· {L(h.label)}</span>
                </p>
              ))}
            </div>
            <p className="text-xs text-red-500">
              {t('scale.seekHelp')}
            </p>
          </div>
        )}

        <button
          onClick={() => { setPhase('intro'); setEpdsAnswers([]); setParentingAnswers([]); setMode('full') }}
          className="btn-ghost w-full text-center"
        >
          {t('scale.retake')}
        </button>
      </div>
    )
  }

  // ===== Quiz in progress =====
  const isEPDS = phase === 'epds'
  const questions = isEPDS ? epdsSet : parentingSet
  const total = isEPDS ? totalEPDS : totalParenting
  const q: ScaleQuestion = questions[currentQuestion]
  const partLabel = isEPDS ? t('scale.partLabel1') : t('scale.partLabel2')
  const partNum = isEPDS ? 1 : 2

  return (
    <div className="px-4 py-6 space-y-5">
      {/* 分段提示 + 进度 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            partNum === 1 ? 'bg-soft-green-100 text-soft-green-700' : 'bg-warm-100 text-warm-700'
          }`}>
            {partLabel}
          </span>
          <span className="text-xs text-calm-500">
            {currentQuestion + 1} / {total}
          </span>
        </div>
        <div className="h-1.5 bg-calm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-warm-400 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / total) * 100}%` }}
          />
        </div>
        {partNum === 2 && (
          <p className="text-[11px] text-warm-600">{t('scale.part2hint')}</p>
        )}
      </div>

      <div className="card">
        <p className="text-lg text-calm-800 leading-relaxed font-serif mb-5">
          {L(q.text)}
        </p>
        <div className="space-y-2">
          {q.options.map((opt: { score: number; label: Localized }, i: number) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.score)}
              className="w-full text-left px-4 py-3 rounded-xl border border-calm-200
                         hover:border-warm-400 hover:bg-warm-50 active:bg-warm-100
                         transition-all text-sm text-calm-700"
            >
              {L(opt.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== 工具函数 =====
function getBgColor(level: string): string {
  switch (level) {
    case 'low': return 'bg-soft-green-50 border-soft-green-200'
    case 'moderate': return 'bg-warm-50 border-warm-200'
    case 'high': return 'bg-orange-50 border-orange-200'
    case 'severe': return 'bg-red-50 border-red-200'
    default: return ''
  }
}

function getTextColor(level: string): string {
  switch (level) {
    case 'low': return 'text-soft-green-600'
    case 'moderate': return 'text-warm-500'
    case 'high': return 'text-orange-600'
    case 'severe': return 'text-red-600'
    default: return 'text-calm-800'
  }
}

function getMoodEmoji(level: string): string {
  switch (level) {
    case 'low': return '😊'
    case 'moderate': return '😐'
    case 'high': return '😟'
    case 'severe': return '😢'
    default: return '😊'
  }
}
