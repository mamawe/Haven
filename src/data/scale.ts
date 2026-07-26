import type { ScaleQuestion } from '../types'

// EPDS 爱丁堡产后抑郁量表（简化版，适合自测）
export const epdsQuestions: ScaleQuestion[] = [
  { id: 1, text: '我能看到事物有趣的一面，并感到开心', quick: true, options: [
    { score: 0, label: '和以前一样' }, { score: 1, label: '不如以前多' }, { score: 2, label: '明显减少' }, { score: 3, label: '完全没有' }
  ]},
  { id: 2, text: '我欣然期待未来的一切', options: [
    { score: 0, label: '和以前一样' }, { score: 1, label: '不如以前多' }, { score: 2, label: '明显减少' }, { score: 3, label: '完全没有' }
  ]},
  { id: 3, text: '当事情出错时，我会不必要地责备自己', quick: true, options: [
    { score: 3, label: '大部分时候' }, { score: 2, label: '经常这样' }, { score: 1, label: '偶尔这样' }, { score: 0, label: '从不这样' }
  ]},
  { id: 4, text: '我无缘无故感到焦虑和担心', quick: true, options: [
    { score: 0, label: '一点也没有' }, { score: 1, label: '很少这样' }, { score: 2, label: '有时这样' }, { score: 3, label: '经常这样' }
  ]},
  { id: 5, text: '我无缘无故感到害怕和恐慌', quick: true, options: [
    { score: 3, label: '经常这样' }, { score: 2, label: '有时这样' }, { score: 1, label: '很少这样' }, { score: 0, label: '一点也没有' }
  ]},
  { id: 6, text: '很多事情冲着我而来，我无法应付', options: [
    { score: 3, label: '大部分时候' }, { score: 2, label: '有时这样' }, { score: 1, label: '很少能应付' }, { score: 0, label: '和以前一样能应付' }
  ]},
  { id: 7, text: '我因睡眠不好而情绪低落', quick: true, options: [
    { score: 3, label: '大部分时候' }, { score: 2, label: '有时这样' }, { score: 1, label: '偶尔这样' }, { score: 0, label: '从不这样' }
  ]},
  { id: 8, text: '我感到悲伤和痛苦', quick: true, options: [
    { score: 3, label: '大部分时候' }, { score: 2, label: '经常这样' }, { score: 1, label: '偶尔这样' }, { score: 0, label: '从不这样' }
  ]},
  { id: 9, text: '我因情绪低落而哭泣', options: [
    { score: 3, label: '大部分时候' }, { score: 2, label: '经常这样' }, { score: 1, label: '偶尔这样' }, { score: 0, label: '从不这样' }
  ]},
  { id: 10, text: '我有过伤害自己的想法', quick: true, options: [
    { score: 3, label: '经常这样' }, { score: 2, label: '有时这样' }, { score: 1, label: '几乎不' }, { score: 0, label: '从不' }
  ]},
]

// 育儿焦虑量表（0-1岁版本）
export const parentingAnxietyQuestions: ScaleQuestion[] = [
  { id: 11, text: '我担心宝宝的发育是否正常', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 12, text: '宝宝哭的时候，我感到手足无措', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 13, text: '我担心自己不是一个好妈妈/好爸爸', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 14, text: '我担心母乳/配方奶喂养是否正确', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 15, text: '我因宝宝睡眠问题感到焦虑', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 16, text: '我担心宝宝生病或出意外', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 17, text: '看到别人带娃轻松，我感到压力很大', quick: true, options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 18, text: '我因为带娃没有自己的时间而感到烦躁', options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 19, text: '伴侣/家人给的建议让我更加焦虑', options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
  { id: 20, text: '我担心有了孩子后夫妻关系会受影响', options: [
    { score: 0, label: '从不' }, { score: 1, label: '偶尔' }, { score: 2, label: '经常' }, { score: 3, label: '总是' }
  ]},
]

// 评估结果逻辑
export function evaluateScore(category: 'epds' | 'parenting', score: number) {
  if (category === 'epds') {
    if (score <= 8) return { level: 'low' as const, label: '情绪状态良好', color: 'text-soft-green-600', bgColor: 'bg-soft-green-50' }
    if (score <= 12) return { level: 'moderate' as const, label: '轻度情绪困扰', color: 'text-warm-500', bgColor: 'bg-warm-50' }
    if (score <= 16) return { level: 'high' as const, label: '中度情绪困扰', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { level: 'severe' as const, label: '建议寻求专业帮助', color: 'text-red-600', bgColor: 'bg-red-50' }
  } else {
    if (score <= 10) return { level: 'low' as const, label: '焦虑水平较低', color: 'text-soft-green-600', bgColor: 'bg-soft-green-50' }
    if (score <= 17) return { level: 'moderate' as const, label: '存在一定焦虑', color: 'text-warm-500', bgColor: 'bg-warm-50' }
    if (score <= 23) return { level: 'high' as const, label: '焦虑水平较高', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { level: 'severe' as const, label: '焦虑水平很高', color: 'text-red-600', bgColor: 'bg-red-50' }
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

export function getSuggestions(category: 'epds' | 'parenting', level: string): string[] {
  const common = [
    '带娃不是一个人的战斗。允许自己求助，允许自己不完美。',
    '每天给自己 10 分钟的独处时间，哪怕只是安静地喝杯水。',
    '和伴侣沟通你的感受，他/她可能不知道你需要什么。',
  ]

  if (level === 'low') {
    return [
      '你的情绪状态总体良好，继续保持自我关怀的习惯。',
      '可以记录每日心情，留意是否有持续下滑的趋势。',
      ...common.slice(0, 1),
    ]
  }

  if (level === 'moderate') {
    return [
      '你的焦虑在可管理范围内，但不要忽视。每天花 5 分钟做深呼吸练习。',
      '试试「三件好事」练习：每天睡前写下今天发生的三件好事。',
      '和家人或朋友聊聊你的感受，说出来本身就是一种释放。',
      ...common.slice(0, 1),
    ]
  }

  if (level === 'high') {
    return [
      '你的焦虑水平偏高，建议和伴侣或信任的家人谈谈你的状态。',
      '考虑咨询产后心理健康热线或社区医生，早干预效果更好。',
      '睡眠不足会放大焦虑。和伴侣商量轮流带夜，确保你有连续 4 小时的睡眠。',
      '减少刷育儿社群和短视频，比较是焦虑的燃料。',
      ...common.slice(0, 1),
    ]
  }

  // severe
  return [
    '⚠️ 你的分数提示需要关注心理健康。这不代表你做错了什么——育儿本身就是巨大的挑战。',
    '强烈建议你联系产后心理支持热线或社区医院心理科。',
    '如果你有伤害自己或宝宝的想法，请立即告诉伴侣或拨打心理援助热线。',
    '你不需要一个人扛。求助是勇敢，不是软弱。',
    '让伴侣或家人多分担实际育儿工作，给自己恢复的空间和时间。',
  ]
}
