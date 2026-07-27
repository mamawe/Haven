import type { Localized, Region } from '../types'

export type { Region }

export interface Hotline {
  number: string
  label: Localized
}

// 各地区心理援助热线（免费、保密，由专业咨询师接听）
export const HOTLINES: Record<Region, Hotline[]> = {
  CN: [
    { number: '12356', label: { zh: '全国心理援助热线（24小时）', en: 'National Mental Health Hotline (24h)' } },
    { number: '010-82951332', label: { zh: '北京心理危机研究与干预中心', en: 'Beijing Crisis Intervention Center' } },
  ],
  HK: [
    { number: '23892222', label: { zh: '香港撒玛利亚防止自杀会（24小时）', en: 'Samaritan Befrienders HK (24h)' } },
    { number: '27720000', label: { zh: '香港心理卫生会', en: 'Hong Kong Mental Health Association' } },
  ],
  TW: [
    { number: '1925', label: { zh: '安心专线（24小时）', en: 'Mental Health Hotline (24h)' } },
    { number: '1995', label: { zh: '生命线协谈专线', en: 'Life Line Taipei' } },
  ],
  US: [
    { number: '988', label: { zh: '美国自杀与危机生命线（拨打/短信）', en: '988 Suicide & Crisis Lifeline (call/text)' } },
  ],
  UK: [
    { number: '116123', label: { zh: '撒玛利亚会免费热线', en: 'Samaritans Freephone' } },
    { number: '111', label: { zh: 'NHS 非紧急医疗', en: 'NHS Non-emergency' } },
  ],
}
