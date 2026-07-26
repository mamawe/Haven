import { useState } from 'react'
import { WIND_CARDS, getTodayWindIndex, padNo, type WindCard as WindCardData } from '../data/windCards'

function CardImage({ no, alt, className }: { no: number; alt: string; className?: string }) {
  const p = padNo(no)
  return (
    <picture className="block w-full h-full">
      <source srcSet={`/cards/${p}.webp`} type="image/webp" />
      <img src={`/cards/${p}.jpg`} alt={alt} className={`w-full h-full object-cover ${className ?? ''}`} draggable={false} />
    </picture>
  )
}

/** 今日风向：首页主卡，每天稳定轮换一张背景图 */
export function TodayWindCard() {
  const idx = getTodayWindIndex()
  const card = WIND_CARDS[idx]
  const p = padNo(card.no)
  return (
    <div className="relative rounded-[18px] overflow-hidden border border-hairline aspect-[4/5] bg-calm-100 select-none">
      <CardImage no={card.no} alt={card.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between text-white/90">
        <span className="text-xs font-medium tracking-wide">今日风向</span>
        <span className="text-[11px] font-medium opacity-80">第 {p} / 12 张</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="text-xs font-medium opacity-80 mb-1">
          {card.name} · {card.sub}
        </div>
        <p className="text-[17px] font-semibold leading-snug tracking-apple">{card.guidance}</p>
      </div>
    </div>
  )
}

/** 风向卡库：可横滑浏览全部 12 张，点击切换为「今日风向」*/
export function WindDeck({ onPick }: { onPick?: (card: WindCardData) => void }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="-mx-4 px-4">
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
        {WIND_CARDS.map((c) => (
          <button
            key={c.no}
            onClick={() => {
              setActive(c.no)
              onPick?.(c)
            }}
            className={`relative shrink-0 w-24 h-32 rounded-[14px] overflow-hidden border transition-all snap-start ${
              active === c.no ? 'border-apple ring-2 ring-apple/30' : 'border-hairline'
            }`}
          >
            <CardImage no={c.no} alt={c.name} />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-white text-[11px] font-semibold leading-tight">
              {c.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
