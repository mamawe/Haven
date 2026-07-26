// 今日一句 / 每日提醒 文案池
// 基调：安抚、有科学底、不鸡汤、不说教

import type { Localized } from '../types'

export const whispers: Localized[] = [
  { zh: '你今天的情绪不需要"有意义"。哭一场、发呆一下，都是允许的自我修复。', en: 'Your feelings today don’t need to “mean something.” Crying, or just zoning out — both are allowed self-repair.' },
  { zh: '宝宝不会记得你有没有买最贵的婴儿床，但会记住你抱他时手的温度。', en: 'Your baby won’t remember the priciest crib, but will remember the warmth of your hands when you hold them.' },
  { zh: '焦虑不是你软弱，是大脑在替你扫雷。扫完这一轮，歇一会儿。', en: 'Anxiety isn’t weakness — it’s your brain sweeping for landmines. After this sweep, rest a while.' },
  { zh: '今天如果只做成了一件事——给自己热了一杯水，那也算好好照顾了自己。', en: 'If the only thing you did today was warm a cup of water for yourself, that still counts as taking care of you.' },
  { zh: '别人家娃的"标准"是朋友圈的滤镜，不是你家的现实。别拿滤镜比生活。', en: 'Other people’s “standards” are social-media filters, not your reality. Don’t compare your life to a filter.' },
  { zh: '睡眠碎片化会放大所有情绪。今晚哪怕多连续睡一小时，都是在还债。', en: 'Fragmented sleep amplifies every emotion. Even one more continuous hour tonight is paying back a debt.' },
  { zh: '你不是"不够好的妈妈/爸爸"，你是一个正在边学边爱的新手。', en: 'You’re not a “not-good-enough parent” — you’re a beginner learning and loving at the same time.' },
  { zh: '把"我应该"换成"我已经"。你已经做了很多，只是习惯了忽略。', en: 'Swap “I should” for “I already have.” You’ve done a lot — you’ve just learned to overlook it.' },
  { zh: '孩子不需要完美的父母，需要一个情绪稳定、会道歉、会拥抱的大人。', en: 'Kids don’t need perfect parents — they need a steady adult who can apologize and give hugs.' },
  { zh: '此刻的崩溃不是失败，是积压太久的一次释放。释放完，会轻一点。', en: 'Breaking down right now isn’t failure — it’s a release you’ve held too long. After it, you’ll feel lighter.' },
  { zh: '今天允许自己"偷懒"一次：外卖、没收拾的玩具、没洗的碗——明天还在。', en: 'Allow yourself to “slack” today: takeout, untouched toys, unwashed dishes — tomorrow they’ll still be there.' },
  { zh: '你对宝宝的爱不是一下子满的，是每天一点点长出来的，慢一点没关系。', en: 'Your love for your baby doesn’t fill up at once — it grows a little each day. Slow is okay.' },
  { zh: '如果今天很糟，记住：糟的一天也会结束。你的宝宝明天还会对你笑。', en: 'If today was awful, remember: even a bad day ends. Your baby will still smile at you tomorrow.' },
  { zh: '求助不是软弱，是给自己和宝宝最靠谱的保护。你值得被接住。', en: 'Asking for help isn’t weakness — it’s the most reliable protection for you and your baby. You deserve to be caught.' },
  { zh: '深呼吸一次。你此刻在这里，娃在这里，这就是此刻全部需要成立的事。', en: 'Take one deep breath. You are here, your child is here — that’s all that needs to be true right now.' },
  { zh: '你不需要懂所有育儿知识，你只需要愿意蹲下来，听他说"妈妈抱"。', en: 'You don’t need to know all the parenting knowledge — just be willing to squat down and hear “mommy, hold me.”' },
  { zh: '比较是焦虑的燃料。今天关掉一个让你不舒服的群，省下一点心力给自己。', en: 'Comparison is anxiety fuel. Today, mute one group that makes you uneasy and save that energy for yourself.' },
  { zh: '产后情绪像天气，有阴有晴。阴天不代表你坏，只是需要等云散。', en: 'Postpartum mood is like weather — cloudy and clear. A cloudy day doesn’t mean you’re bad; it just needs the clouds to pass.' },
  { zh: '今天试着写下三件小好事——哪怕只是"娃今天多睡了半小时"。', en: 'Try writing down three small good things today — even just “baby slept an extra half hour.”' },
  { zh: '你不是一个人扛。无数个父母也在这条路上跌跌撞撞，你并不孤单。', en: 'You’re not carrying this alone. Countless parents stumble along this road too — you’re not lonely.' },
  { zh: '完美是育儿最大的敌人。差不多，就够了。', en: 'Perfection is parenting’s greatest enemy. Good enough is enough.' },
  { zh: '你的价值不由带娃方式定义，由"你愿意为他努力"这件事本身定义。', en: 'Your worth isn’t defined by how you parent, but by the fact that you’re willing to try for them.' },
]

// 根据日期确定性地选一句（同一天所有人看到同一句，刷新不变）
export function getWhisperForDate(date = new Date()): Localized {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return whispers[dayOfYear % whispers.length]
}

// 焦虑急救箱：快速安抚语句（可滑动卡片）
export const reassuranceCards: Localized[] = [
  { zh: '这不是紧急状况，只是情绪在报警。你安全，宝宝安全。', en: 'This isn’t an emergency — it’s just your emotions sounding an alarm. You’re safe. Your baby’s safe.' },
  { zh: '你现在感受到的"失控"，是焦虑在骗你。事实是：你正在处理它。', en: 'The “loss of control” you feel right now is anxiety lying to you. The truth: you’re handling it.' },
  { zh: '呼吸还在，心跳还在，你就还在。先稳住这个，别的稍后再说。', en: 'Breath is still here, heartbeat is still here, so you’re still here. Hold onto that first; deal with the rest later.' },
  { zh: '你不需要立刻好起来。允许自己此刻就是不太好，这本身就需要勇气。', en: 'You don’t need to feel better right away. Allowing yourself to be not-okay right now takes courage.' },
  { zh: '宝宝不需要一个永远平静的妈妈，需要一个真实的人陪在身边。', en: 'Your baby doesn’t need an always-calm mom — they need a real person by their side.' },
  { zh: '这一波情绪会过去，像所有之前的波一样。它来，它走，你还在。', en: 'This wave of emotion will pass, like all the waves before. It comes, it goes, and you remain.' },
  { zh: '你刚才已经在照顾宝宝了，这证明你比焦虑以为的更有能力。', en: 'You were just taking care of your baby — that proves you’re more capable than anxiety gives you credit for.' },
  { zh: '把手机放下，摸摸宝宝的手，回到此刻真实的温度里。', en: 'Put the phone down, touch your baby’s hand, and return to the real warmth of this moment.' },
]
