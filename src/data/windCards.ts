// 风向卡片数据：12 张卡对应 12 种心情的「罗盘指向」
// 与 public/cards/01..12.{webp,jpg} 一一对应（索引 0 → 01）
export interface WindCard {
  /** 卡序号 1-12，对应图片文件名 */
  no: number
  /** 风名 */
  name: string
  /** 风向副标题 */
  sub: string
  /** 卡片引导语 */
  guidance: string
}

export const WIND_CARDS: WindCard[] = [
  { no: 1, name: '静风', sub: '允许停泊', guidance: '今天不必前进，靠岸本身也是一种选择。' },
  { no: 2, name: '和风', sub: '温柔此刻', guidance: '把对自己的苛责，换成一句轻轻的「辛苦了」。' },
  { no: 3, name: '微风', sub: '小步就好', guidance: '完成一件小事，胜过焦虑十件大事。' },
  { no: 4, name: '清风', sub: '回到当下', guidance: '深吸一口气，风会穿过，不必抓住它。' },
  { no: 5, name: '暖风', sub: '连接所爱', guidance: '抱抱孩子，也抱抱那个疲惫的自己。' },
  { no: 6, name: '顺风', sub: '顺势而行', guidance: '今天顺着感觉走，不跟自己较劲。' },
  { no: 7, name: '逆风', sub: '站稳就好', guidance: '风迎面而来时，你只需站稳，不必前进。' },
  { no: 8, name: '晨风', sub: '重新起锚', guidance: '昨天的情绪留在昨天，今天重新起锚。' },
  { no: 9, name: '晚风', sub: '放下一天', guidance: '天黑了，把没做完的也轻轻放下吧。' },
  { no: 10, name: '季风', sub: '接受起伏', guidance: '情绪像季风，来了会走，你不是它。' },
  { no: 11, name: '谷风', sub: '向内安顿', guidance: '关掉外界的噪音，听一听自己的需要。' },
  { no: 12, name: '长风', sub: '望远一点', guidance: '把目光放远，眼前的事没那么重。' },
]

/** 根据日期稳定地选出今日风向卡（同一天结果一致）*/
export function getTodayWindIndex(date = new Date()): number {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h % WIND_CARDS.length
}

/** 图片序号补零：1 -> '01' */
export function padNo(no: number): string {
  return String(no).padStart(2, '0')
}
