import type { ScaleQuestion, Localized } from '../types'

// EPDS 爱丁堡产后抑郁量表（简化版，适合自测）
export const epdsQuestions: ScaleQuestion[] = [
  { id: 1, text: { zh: '我能看到事物有趣的一面，并感到开心', en: 'I can see the funny side of things and feel happy' }, quick: true, options: [
    { score: 0, label: { zh: '和以前一样', en: 'As usual' } },
    { score: 1, label: { zh: '不如以前多', en: 'Less than usual' } },
    { score: 2, label: { zh: '明显减少', en: 'Much less' } },
    { score: 3, label: { zh: '完全没有', en: 'Hardly ever' } },
  ]},
  { id: 2, text: { zh: '我欣然期待未来的一切', en: 'I look forward to things with enjoyment' }, options: [
    { score: 0, label: { zh: '和以前一样', en: 'As usual' } },
    { score: 1, label: { zh: '不如以前多', en: 'Less than usual' } },
    { score: 2, label: { zh: '明显减少', en: 'Much less' } },
    { score: 3, label: { zh: '完全没有', en: 'Hardly ever' } },
  ]},
  { id: 3, text: { zh: '当事情出错时，我会不必要地责备自己', en: 'When things go wrong I blame myself unnecessarily' }, quick: true, options: [
    { score: 3, label: { zh: '大部分时候', en: 'Most of the time' } },
    { score: 2, label: { zh: '经常这样', en: 'Quite often' } },
    { score: 1, label: { zh: '偶尔这样', en: 'Sometimes' } },
    { score: 0, label: { zh: '从不这样', en: 'Not at all' } },
  ]},
  { id: 4, text: { zh: '我无缘无故感到焦虑和担心', en: 'I feel anxious or worried for no good reason' }, quick: true, options: [
    { score: 0, label: { zh: '一点也没有', en: 'Not at all' } },
    { score: 1, label: { zh: '很少这样', en: 'Hardly ever' } },
    { score: 2, label: { zh: '有时这样', en: 'Sometimes' } },
    { score: 3, label: { zh: '经常这样', en: 'Quite often' } },
  ]},
  { id: 5, text: { zh: '我无缘无故感到害怕和恐慌', en: 'I feel scared or panicky for no good reason' }, quick: true, options: [
    { score: 3, label: { zh: '经常这样', en: 'Quite often' } },
    { score: 2, label: { zh: '有时这样', en: 'Sometimes' } },
    { score: 1, label: { zh: '很少这样', en: 'Hardly ever' } },
    { score: 0, label: { zh: '一点也没有', en: 'Not at all' } },
  ]},
  { id: 6, text: { zh: '很多事情冲着我而来，我无法应付', en: 'Things have been getting on top of me' }, options: [
    { score: 3, label: { zh: '大部分时候', en: 'Most of the time' } },
    { score: 2, label: { zh: '有时这样', en: 'Sometimes' } },
    { score: 1, label: { zh: '很少能应付', en: 'Only occasionally' } },
    { score: 0, label: { zh: '和以前一样能应付', en: 'No more than usual' } },
  ]},
  { id: 7, text: { zh: '我因睡眠不好而情绪低落', en: 'I’ve been so unhappy that I’ve had difficulty sleeping' }, quick: true, options: [
    { score: 3, label: { zh: '大部分时候', en: 'Most of the time' } },
    { score: 2, label: { zh: '有时这样', en: 'Quite often' } },
    { score: 1, label: { zh: '偶尔这样', en: 'Sometimes' } },
    { score: 0, label: { zh: '从不这样', en: 'Not at all' } },
  ]},
  { id: 8, text: { zh: '我感到悲伤和痛苦', en: 'I have felt sad or miserable' }, quick: true, options: [
    { score: 3, label: { zh: '大部分时候', en: 'Most of the time' } },
    { score: 2, label: { zh: '经常这样', en: 'Quite often' } },
    { score: 1, label: { zh: '偶尔这样', en: 'Sometimes' } },
    { score: 0, label: { zh: '从不这样', en: 'Not at all' } },
  ]},
  { id: 9, text: { zh: '我因情绪低落而哭泣', en: 'I’ve been so unhappy that I’ve been crying' }, options: [
    { score: 3, label: { zh: '大部分时候', en: 'Most of the time' } },
    { score: 2, label: { zh: '经常这样', en: 'Quite often' } },
    { score: 1, label: { zh: '偶尔这样', en: 'Sometimes' } },
    { score: 0, label: { zh: '从不这样', en: 'Not at all' } },
  ]},
  { id: 10, text: { zh: '我有过伤害自己的想法', en: 'I have had thoughts of hurting myself' }, quick: true, options: [
    { score: 3, label: { zh: '经常这样', en: 'Quite often' } },
    { score: 2, label: { zh: '有时这样', en: 'Sometimes' } },
    { score: 1, label: { zh: '几乎不', en: 'Hardly ever' } },
    { score: 0, label: { zh: '从不', en: 'Never' } },
  ]},
]

// 育儿焦虑量表（0-1岁版本）
export const parentingAnxietyQuestions: ScaleQuestion[] = [
  { id: 11, text: { zh: '我担心宝宝的发育是否正常', en: 'I worry whether my baby’s development is normal' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 12, text: { zh: '宝宝哭的时候，我感到手足无措', en: 'When my baby cries I feel at a loss' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 13, text: { zh: '我担心自己不是一个好妈妈/好爸爸', en: 'I worry I’m not a good enough mom or dad' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 14, text: { zh: '我担心母乳/配方奶喂养是否正确', en: 'I worry whether breastfeeding or formula feeding is right' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 15, text: { zh: '我因宝宝睡眠问题感到焦虑', en: 'I feel anxious about my baby’s sleep' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 16, text: { zh: '我担心宝宝生病或出意外', en: 'I worry my baby will get sick or have an accident' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 17, text: { zh: '看到别人带娃轻松，我感到压力很大', en: 'Seeing others parent easily makes me feel pressured' }, quick: true, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 18, text: { zh: '我因为带娃没有自己的时间而感到烦躁', en: 'I feel irritable because I have no time for myself' }, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 19, text: { zh: '伴侣/家人给的建议让我更加焦虑', en: 'Advice from my partner or family makes me more anxious' }, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
  { id: 20, text: { zh: '我担心有了孩子后夫妻关系会受影响', en: 'I worry having a child will hurt our relationship' }, options: [
    { score: 0, label: { zh: '从不', en: 'Never' } },
    { score: 1, label: { zh: '偶尔', en: 'Occasionally' } },
    { score: 2, label: { zh: '经常', en: 'Often' } },
    { score: 3, label: { zh: '总是', en: 'Always' } },
  ]},
]

// 评估结果逻辑
export function evaluateScore(category: 'epds' | 'parenting', score: number): {
  level: 'low' | 'moderate' | 'high' | 'severe'
  label: Localized
  color: string
  bgColor: string
} {
  if (category === 'epds') {
    if (score <= 8) return { level: 'low', label: { zh: '情绪状态良好', en: 'Emotional state is good' }, color: 'text-soft-green-600', bgColor: 'bg-soft-green-50' }
    if (score <= 12) return { level: 'moderate', label: { zh: '轻度情绪困扰', en: 'Mild emotional distress' }, color: 'text-warm-500', bgColor: 'bg-warm-50' }
    if (score <= 16) return { level: 'high', label: { zh: '中度情绪困扰', en: 'Moderate emotional distress' }, color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { level: 'severe', label: { zh: '建议寻求专业帮助', en: 'Consider professional help' }, color: 'text-red-600', bgColor: 'bg-red-50' }
  } else {
    if (score <= 10) return { level: 'low', label: { zh: '焦虑水平较低', en: 'Low anxiety' }, color: 'text-soft-green-600', bgColor: 'bg-soft-green-50' }
    if (score <= 17) return { level: 'moderate', label: { zh: '存在一定焦虑', en: 'Some anxiety present' }, color: 'text-warm-500', bgColor: 'bg-warm-50' }
    if (score <= 23) return { level: 'high', label: { zh: '焦虑水平较高', en: 'Elevated anxiety' }, color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { level: 'severe', label: { zh: '焦虑水平很高', en: 'Very high anxiety' }, color: 'text-red-600', bgColor: 'bg-red-50' }
  }
}

// 快速版：每部分精选 7 题（保留区分度最高的条目）
export function getQuickQuestions(questions: ScaleQuestion[]): ScaleQuestion[] {
  return questions.filter(q => q.quick)
}

// 快速版分数归一化到 30 分制，使评估阈值与完整版一致
export function normalizeQuickScore(raw: number, quickCount: number): number {
  const maxRaw = quickCount * 3
  return Math.round((raw / maxRaw) * 30)
}

export function getSuggestions(category: 'epds' | 'parenting', level: string): Localized[] {
  const common: Localized[] = [
    { zh: '带娃不是一个人的战斗。允许自己求助，允许自己不完美。', en: 'Parenting isn’t a solo fight. Allow yourself to ask for help and to be imperfect.' },
    { zh: '每天给自己 10 分钟的独处时间，哪怕只是安静地喝杯水。', en: 'Give yourself 10 minutes alone each day — even just to sit quietly with a glass of water.' },
    { zh: '和伴侣沟通你的感受，他/她可能不知道你需要什么。', en: 'Talk to your partner about how you feel — they may not know what you need.' },
  ]

  if (level === 'low') {
    return [
      { zh: '你的情绪状态总体良好，继续保持自我关怀的习惯。', en: 'Your mood is generally good — keep up the self-care habits.' },
      { zh: '可以记录每日心情，留意是否有持续下滑的趋势。', en: 'Track your daily mood and watch for any sustained dip.' },
      ...common.slice(0, 1),
    ]
  }

  if (level === 'moderate') {
    return [
      { zh: '你的焦虑在可管理范围内，但不要忽视。每天花 5 分钟做深呼吸练习。', en: 'Your anxiety is manageable, but don’t ignore it. Spend 5 minutes on breathing each day.' },
      { zh: '试试「三件好事」练习：每天睡前写下今天发生的三件好事。', en: 'Try the “three good things” exercise: write down three good moments before bed.' },
      { zh: '和家人或朋友聊聊你的感受，说出来本身就是一种释放。', en: 'Talk with family or a friend about how you feel — saying it out loud is a release.' },
      ...common.slice(0, 1),
    ]
  }

  if (level === 'high') {
    return [
      { zh: '你的焦虑水平偏高，建议和伴侣或信任的家人谈谈你的状态。', en: 'Your anxiety is elevated — talk with your partner or a trusted family member.' },
      { zh: '考虑咨询产后心理健康热线或社区医生，早干预效果更好。', en: 'Consider a postpartum mental-health line or community doctor — early support helps most.' },
      { zh: '睡眠不足会放大焦虑。和伴侣商量轮流带夜，确保你有连续 4 小时的睡眠。', en: 'Poor sleep amplifies anxiety. Take turns on night duty so you get 4 hours of continuous sleep.' },
      { zh: '减少刷育儿社群和短视频，比较是焦虑的燃料。', en: 'Cut back on parenting groups and short videos — comparison fuels anxiety.' },
      ...common.slice(0, 1),
    ]
  }

  // severe
  return [
    { zh: '⚠️ 你的分数提示需要关注心理健康。这不代表你做错了什么——育儿本身就是巨大的挑战。', en: '⚠️ Your score suggests attending to your mental health. That doesn’t mean you did anything wrong — parenting is a huge challenge.' },
    { zh: '强烈建议你联系产后心理支持热线或社区医院心理科。', en: 'We strongly suggest contacting a postpartum support line or a community mental-health clinic.' },
    { zh: '如果你有伤害自己或宝宝的想法，请立即告诉伴侣或拨打心理援助热线。', en: 'If you have thoughts of hurting yourself or your baby, tell your partner now or call a support hotline.' },
    { zh: '你不需要一个人扛。求助是勇敢，不是软弱。', en: 'You don’t have to carry this alone. Asking for help is brave, not weak.' },
    { zh: '让伴侣或家人多分担实际育儿工作，给自己恢复的空间和时间。', en: 'Let your partner or family take on more of the actual caregiving, and give yourself space and time to recover.' },
  ]
}
