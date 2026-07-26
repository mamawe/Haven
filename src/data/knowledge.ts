import type { KnowledgeItem, Localized } from '../types'

export const knowledgeBase: KnowledgeItem[] = [
  // ===== 0-1 月 =====
  {
    id: 'sleep-0',
    stage: 'infant',
    month: 0, category: 'sleep',
    title: { zh: '新生儿睡眠：没有"应该"，只有"真实"', en: `Newborn Sleep: No "Should", Only "What Is"` },
    summary: { zh: '新生儿每天睡 16-20 小时，但每次只睡 1-3 小时。这不是问题，这是生理事实。', en: `Newborns sleep 16–20 hours a day, but only 1–3 hours at a time. This is not a problem — it is biology.` },
    content: { zh: `新生儿没有昼夜概念，他们的睡眠周期只有 50-60 分钟（成年人是 90 分钟）。这意味着他们频繁醒来是正常的，不是你的错。

**关键事实：**
- 新生儿胃容量只有樱桃大小，每 2-3 小时就会饿
- 他们需要频繁进食来维持血糖和生长
- "睡整觉"是 3-6 个月后才可能出现的里程碑，不是新生儿的标准

**你能做的：**
- 白天保持光线充足、正常噪音，晚上保持黑暗和安静——帮宝宝建立昼夜节律
- 学会识别"睡眠信号"：揉眼睛、打哈欠、烦躁——在过度疲劳前哄睡
- 接受现实：你也会睡眠碎片化，和伴侣轮流值夜

> 你的宝宝不是"睡渣"，他只是个按原始程序运行的新人类。`, en: `Newborns have no sense of day and night. Their sleep cycles last only 50–60 minutes (adults' are 90). That means waking often is normal — not your fault.

**Key facts:**
- A newborn's stomach is the size of a cherry and empties every 2–3 hours
- They need to feed frequently to keep blood sugar steady and grow
- "Sleeping through the night" is a milestone that may appear only after 3–6 months — not the newborn standard

**What you can do:**
- Keep days bright and noisy, nights dark and quiet — this helps your baby build a day-night rhythm
- Learn the "sleepy cues": rubbing eyes, yawning, fussing — soothe to sleep before overtired
- Accept reality: your sleep will be fragmented too. Take turns with your partner on night duty

> Your baby is not a "bad sleeper." He is simply a brand-new human running on an ancient program.` },
    tags: [{ zh: '新生儿', en: 'Newborn' }, { zh: '睡眠规律', en: 'Sleep rhythm' }, { zh: '夜醒', en: 'Night waking' }],
    quickTip: { zh: '新生儿一天睡 16-20 小时，每次 1-3 小时，这是正常的。不用和任何人比较。', en: `Newborns sleep 16–20 hours a day in 1–3 hour stretches. This is normal. No need to compare with anyone.` }
  },
  {
    id: 'feeding-0',
    stage: 'infant',
    month: 0, category: 'feeding',
    title: { zh: '喂养焦虑：母乳 vs 配方奶，你的选择就是最好的选择', en: `Feeding Anxiety: Breast or Formula — Your Choice Is the Right Choice` },
    summary: { zh: '无论母乳还是配方奶，喂养的核心是宝宝吃饱、妈妈不崩溃。', en: `Whether breast or formula, the goal of feeding is a full baby and a mother who is not falling apart.` },
    content: { zh: `关于喂养的争论可能是育儿焦虑最大的来源之一。

**母乳喂养的事实：**
- 初乳（前 3-5 天）量少（每次几毫升），但营养密度极高——不是"没奶"
- 奶量在第 3-5 天才会明显增多，和宝宝胃容量同步增长
- 判断宝宝吃没吃饱看尿量（每天 6-8 片湿尿布）和体重增长，不是看哭不哭

**配方奶喂养的事实：**
- 现代配方奶营养配比科学，完全能满足宝宝需求
- 配方奶宝宝可能睡得更久一些（消化更慢）
- 配方奶喂养可以让伴侣更多参与，减轻妈妈的负担

**混合喂养完全可以。**

> 喂养方式不应该成为评判母职的标准。开心的妈妈 > 母乳执念的崩溃妈妈。`, en: `The debate over feeding may be one of the biggest sources of parenting anxiety.

**Facts about breastfeeding:**
- Colostrum (the first 3–5 days) comes in tiny amounts (a few mL per feed) but is extremely nutrient-dense — it is not "no milk"
- Your supply visibly increases around day 3–5, growing in step with your baby's stomach
- To tell if your baby is fed enough, watch urine output (6–8 wet diapers a day) and weight gain — not crying

**Facts about formula:**
- Modern formula is scientifically balanced and fully meets your baby's needs
- Formula-fed babies may sleep a little longer (it digests more slowly)
- Formula-feeding lets your partner take part more, easing the load on mom

**Combo feeding is absolutely fine.**

> How you feed should never be the measure of good mothering. A happy mom beats a crumbling mom obsessed with breastfeeding.` },
    tags: [{ zh: '母乳', en: 'Breastfeeding' }, { zh: '配方奶', en: 'Formula' }, { zh: '喂养焦虑', en: 'Feeding anxiety' }],
    quickTip: { zh: '判断宝宝吃饱看尿量（每天 6-8 片湿尿布）和体重增长，不是看哭不哭。', en: `To tell if your baby is fed enough, watch urine (6–8 wet diapers a day) and weight gain — not crying.` }
  },
  {
    id: 'mama-0',
    stage: 'infant',
    month: 0, category: 'mama',
    title: { zh: '产后情绪：Baby Blues 还是产后抑郁？', en: `Postpartum Emotions: Baby Blues or Postpartum Depression?` },
    summary: { zh: '约 80% 的新妈妈会经历产后情绪低落（Baby Blues），但 10-15% 会发展成产后抑郁。', en: `About 80% of new mothers experience the postpartum blues (Baby Blues), but 10–15% develop postpartum depression.` },
    content: { zh: `产后 3-5 天出现的情绪波动、易哭、焦虑、失眠，被称为 Baby Blues，通常在 2 周内自行缓解。

**Baby Blues（正常）vs 产后抑郁（需要关注）：**

| | Baby Blues | 产后抑郁 |
|---|---|---|
| 出现时间 | 产后 3-5 天 | 产后几周到几个月 |
| 持续时间 | 2 周内自行缓解 | 超过 2 周持续不缓解 |
| 核心感受 | 情绪波动、易哭 | 持续低落、空虚、无力 |
| 对宝宝 | 仍有关心和爱 | 感觉疏离或过度焦虑 |
| 自我照顾 | 基本正常 | 食欲/睡眠严重紊乱 |

**如果超过 2 周仍然情绪低落、对任何事提不起兴趣、甚至有伤害自己或宝宝的想法——这不是你的错，是疾病。请立即求助。**

> 产后抑郁是生理+心理+环境的综合结果，不是"不够坚强"。`, en: `Mood swings, easy tears, anxiety, and sleeplessness appearing 3–5 days after birth are called the Baby Blues, and usually fade on their own within 2 weeks.

**Baby Blues (normal) vs. postpartum depression (needs attention):**

| | Baby Blues | Postpartum Depression |
|---|---|---|
| Onset | 3–5 days after birth | Weeks to months after birth |
| Duration | Resolves within 2 weeks | Lasts beyond 2 weeks without relief |
| Core feeling | Mood swings, tearfulness | Persistent low mood, emptiness, helplessness |
| Toward baby | Still caring and loving | Feeling detached or overly anxious |
| Self-care | Largely normal | Severely disrupted appetite/sleep |

**If low mood lasts beyond 2 weeks, you lose interest in everything, or you have thoughts of harming yourself or the baby — this is not your fault, it is an illness. Please reach out for help right away.**

> Postpartum depression is a mix of biology, psychology, and environment — not a matter of "not being strong enough."` },
    tags: [{ zh: '产后情绪', en: 'Postpartum mood' }, { zh: '产后抑郁', en: 'Postpartum depression' }, { zh: '妈妈关怀', en: 'Mom care' }],
    quickTip: { zh: 'Baby Blues 2周内自行缓解。如果超过2周仍情绪持续低落，请寻求专业帮助。', en: `Baby Blues eases within 2 weeks. If low mood persists beyond 2 weeks, seek professional help.` }
  },

  // ===== 1-3 月 =====
  {
    id: 'sleep-1',
    stage: 'infant',
    month: 1, category: 'sleep',
    title: { zh: '第 2-3 个月：开始建立睡眠节奏', en: `Months 2–3: Building a Sleep Rhythm` },
    summary: { zh: '宝宝的昼夜节律开始形成，是建立睡前程序的最佳时机。', en: `Your baby's day-night rhythm is starting to form — the perfect time to build a bedtime routine.` },
    content: { zh: `从第 6 周开始，宝宝的昼夜节律逐渐形成。这时可以开始建立固定的睡前程序。

**睡前程序示例（15-20 分钟）：**
1. 温水洗澡或擦洗
2. 换上睡衣和睡袋
3. 喂奶（不要在宝宝睡着时喂）
4. 轻声唱歌或读绘本
5. 放在小床上，轻拍并说晚安

**关键原则：**
- 在宝宝昏昏欲睡但还醒着时放下——让他学会自己入睡
- 不要等到宝宝完全睡着才放下，否则他醒来发现环境变了会恐慌
- 夜间喂奶保持安静、昏暗、不互动——让宝宝明白"夜晚不是玩耍时间"

> 一致性比完美更重要。即使今晚没做到，明晚继续就好。`, en: `From around week 6, your baby's day-night rhythm gradually forms. This is when you can start a consistent bedtime routine.

**Sample bedtime routine (15–20 min):**
1. Warm bath or wash
2. Change into pajamas and a sleep sack
3. Feed (not while baby is already asleep)
4. Sing softly or read a book
5. Lay in the crib, pat gently, and say goodnight

**Key principles:**
- Put baby down drowsy but still awake — so he learns to fall asleep on his own
- Don't wait until he is fully asleep, or he'll panic on waking to a changed environment
- Keep night feeds quiet, dim, and non-interactive — so baby learns "night is not playtime"

> Consistency matters more than perfection. Even if you miss tonight, just pick it up tomorrow.` },
    tags: [{ zh: '睡眠训练', en: 'Sleep training' }, { zh: '睡前程序', en: 'Bedtime routine' }, { zh: '昼夜节律', en: 'Circadian rhythm' }],
    quickTip: { zh: '在宝宝昏昏欲睡但还醒着时放下，这是自主入睡的第一步。', en: `Put baby down drowsy but awake — that is the first step to self-soothing.` }
  },
  {
    id: 'development-1',
    stage: 'infant',
    month: 1, category: 'development',
    title: { zh: '里程碑不是比赛：每个宝宝都有自己的节奏', en: `Milestones Are Not a Race: Every Baby Has Their Own Pace` },
    summary: { zh: '发育里程碑是参考范围，不是截止日期。早或晚几周都完全正常。', en: `Developmental milestones are reference ranges, not deadlines. A few weeks early or late is completely normal.` },
    content: { zh: `第 1-3 个月宝宝可能出现的行为：

- **1 个月**：能短暂抬头、视线追随人脸或物体
- **2 个月**：会微笑（社交性微笑！）、发出咕咕声
- **3 个月**：抬头更稳、会用手抓握、会笑出声

**什么时候不用担心：**
- 比"标准"晚 2-4 周达到某里程碑通常正常
- 早产儿按矫正月龄计算
- 一个领域慢、另一个领域快很常见

**什么时候应该咨询医生：**
- 3 个月仍不会追视移动的物体
- 对大声响没有反应
- 身体异常松软或僵硬

> 朋友圈里别人家宝宝 3 个月会翻身？正常范围是 3-6 个月。别刷朋友圈了。`, en: `Behaviors your baby may show in months 1–3:

- **1 month**: briefly lifts head, follows faces or objects with eyes
- **2 months**: smiles (a social smile!), coos
- **3 months**: holds head steadier, reaches with hands, laughs out loud

**When not to worry:**
- Reaching a milestone 2–4 weeks later than "the book" is usually fine
- For preterm babies, count by corrected age
- One area slow while another is fast is very common

**When to check with the doctor:**
- At 3 months still not tracking moving objects
- No reaction to loud sounds
- Body unusually floppy or stiff

> Someone's baby on social media rolled at 3 months? The normal range is 3–6 months. Put the phone down.` },
    tags: [{ zh: '发育里程碑', en: 'Developmental milestones' }, { zh: '抬头', en: 'Head control' }, { zh: '追视', en: 'Visual tracking' }],
    quickTip: { zh: '发育里程碑是参考范围，不是截止日期。早晚 2-4 周都正常。', en: `Milestones are reference ranges, not deadlines. 2–4 weeks either way is normal.` }
  },
  {
    id: 'health-2',
    stage: 'infant',
    month: 2, category: 'health',
    title: { zh: '肠绞痛/胀气：这不是你的错', en: `Colic and Gas: This Is Not Your Fault` },
    summary: { zh: '约 20% 的宝宝会经历肠绞痛，通常在 3-4 个月自行消失。', en: `About 20% of babies go through colic, which usually disappears on its own by 3–4 months.` },
    content: { zh: `肠绞痛（Colic）定义：每天哭闹超过 3 小时、每周超过 3 天、持续超过 3 周的健康宝宝。

**这不是你的错。** 肠绞痛的成因尚不完全清楚，可能与消化系统未成熟有关。

**可以尝试的方法：**
- 飞机抱：让宝宝趴在你的前臂上，肚子在你的手掌上
- 顺时针轻轻按摩宝宝腹部
- 白噪音（吹风机、吸尘器声音）
- 襁褓包裹（只适用 0-2 个月，会翻身后停止）
- 骑自行车式蹬腿运动

**最重要的：**
- 肠绞痛宝宝哭闹时检查完基本需求（饿、尿、冷热）后，有时候你什么也做不了
- 如果感到崩溃，把宝宝安全放在小床上，自己去另一个房间深呼吸 5 分钟
- 肠绞痛 3-4 个月后通常自行消失——这不是永久的

> 哄不住的哭不是你的失败。给自己 5 分钟冷静，比崩溃中继续哄更安全。`, en: `Colic is defined as a healthy baby crying more than 3 hours a day, more than 3 days a week, for more than 3 weeks.

**This is not your fault.** The cause of colic is not fully understood, and may relate to an immature digestive system.

**What you can try:**
- "Colic hold": lay baby belly-down along your forearm, with the tummy on your palm
- Massage the tummy gently in clockwise circles
- White noise (hair dryer, vacuum sounds)
- Swaddling (only for 0–2 months; stop once baby rolls)
- "Bicycle" leg exercises

**Most important:**
- After checking the basics (hunger, diaper, temperature), sometimes there is nothing you can do
- If you feel overwhelmed, place baby safely in the crib and step into another room to breathe for 5 minutes
- Colic usually passes by 3–4 months — it is not forever

> Crying you can't soothe is not your failure. Five minutes to calm yourself is safer than pushing through while falling apart.` },
    tags: [{ zh: '肠绞痛', en: 'Colic' }, { zh: '胀气', en: 'Gas' }, { zh: '哭闹', en: 'Crying' }],
    quickTip: { zh: '飞机抱和顺时针腹部按摩能缓解胀气。肠绞痛 3-4 个月通常会自然消失。', en: `The colic hold and clockwise tummy massage ease gas. Colic usually fades on its own by 3–4 months.` }
  },

  // ===== 3-6 月 =====
  {
    id: 'sleep-4',
    stage: 'infant',
    month: 4, category: 'sleep',
    title: { zh: '4 个月睡眠倒退：不是回去，是长大', en: `The 4-Month Sleep Regression: Not a Setback, a Growth Spurt` },
    summary: { zh: '4 个月左右的睡眠倒退是宝宝睡眠模式从新生儿向成人模式转变的标志，是发育进步，不是退步。', en: `The around-4-month sleep regression marks your baby's sleep shifting from newborn to adult patterns — progress, not regression.` },
    content: { zh: `4 个月左右，宝宝的睡眠结构从"新生儿模式"（快速入睡→深度睡眠）变成"成人模式"（浅睡→深睡→浅睡→深睡交替）。

**这意味着：**
- 每次睡眠周期转换时（约 50 分钟），宝宝可能会短暂醒来
- 如果宝宝不会自己重新入睡，就会哭闹找大人帮忙
- 夜醒次数可能从 1-2 次变成 3-5 次

**你的策略：**
1. 坚持睡前程序，不要因为倒退而放弃
2. 白天的规律作息（吃-玩-睡循环）有助于夜间睡眠
3. 尝试让宝宝在昏昏欲睡但醒着时入睡——自主入睡是度过倒退期的关键能力
4. 睡眠倒退通常持续 2-6 周——这是暂时的

> 你不是退步了。你的宝宝只是在升级操作系统，暂时有点不稳定。`, en: `Around 4 months, your baby's sleep architecture shifts from "newborn mode" (quick to deep sleep) to "adult mode" (light–deep–light–deep cycles).

**This means:**
- At each cycle change (about every 50 minutes) your baby may wake briefly
- If baby can't resettle alone, he'll cry for help
- Night wakings may jump from 1–2 to 3–5

**Your strategy:**
1. Stick with the bedtime routine — don't abandon it because of the regression
2. A predictable daytime rhythm (eat–play–sleep) supports night sleep
3. Try putting baby down drowsy but awake — self-soothing is the key skill for getting through this
4. The regression usually lasts 2–6 weeks — it is temporary

> You haven't gone backwards. Your baby is just upgrading the operating system, and it's a bit unstable for now.` },
    tags: [{ zh: '睡眠倒退', en: 'Sleep regression' }, { zh: '4个月', en: '4 months' }, { zh: '自主入睡', en: 'Self-soothing' }],
    quickTip: { zh: '4个月睡眠倒退是大脑发育的信号，通常 2-6 周会过去。坚持睡前程序。', en: `The 4-month sleep regression is a sign of brain development and usually passes in 2–6 weeks. Hold the bedtime routine.` }
  },
  {
    id: 'feeding-4',
    stage: 'infant',
    month: 4, category: 'feeding',
    title: { zh: '辅食添加：不急，6 个月也不晚', en: `Starting Solids: No Rush — 6 Months Is Fine` },
    summary: { zh: '世界卫生组织推荐纯母乳喂养到 6 个月。但 4-6 个月之间开始加辅食也 OK，关键看宝宝的准备信号。', en: `The WHO recommends exclusive breastfeeding to 6 months. Starting between 4–6 months is also OK — what matters are your baby's readiness signs.` },
    content: { zh: `**宝宝准备好加辅食的信号（需要同时满足）：**
1. 能坐稳（有支撑也可以）
2. 对大人吃饭表现出兴趣（盯着看、伸手抓）
3. 挺舌反射消失（不会用舌头把食物顶出来）
4. 能把食物从勺子送到喉咙并吞咽

**第一口辅食建议：**
- 单一谷物米粉（铁强化）→ 单一蔬菜泥 → 单一水果泥 → 肉泥
- 每次只引入一种新食物，观察 3-5 天再换下一种
- 从每天 1 次开始，慢慢增加到 2-3 次

**不建议：**
- 1 岁前不添加盐、糖、蜂蜜（蜂蜜有肉毒杆菌风险）
- 不要用奶瓶喂辅食
- 不要强迫进食——宝宝的胃口每天不同

> 辅食是"补"不是"替"。1 岁前奶仍然是主要营养来源。`, en: `**Signs your baby is ready for solids (all must be true):**
1. Can sit up steadily (supported is fine)
2. Shows interest in adults eating (watches, reaches)
3. Tongue-thrust reflex is gone (no longer pushing food out with the tongue)
4. Can move food from spoon to throat and swallow

**First foods to try:**
- Single-grain iron-fortified cereal → single veggie purée → single fruit purée → meat purée
- Introduce one new food at a time, watch 3–5 days before the next
- Start once a day, slowly build to 2–3 times

**Not recommended:**
- No salt, sugar, or honey before age 1 (honey carries botulism risk)
- Don't feed solids from a bottle
- Don't force-feed — appetite varies day to day

> Solids are a supplement, not a replacement. Before age 1, milk is still the main source of nutrition.` },
    tags: [{ zh: '辅食', en: 'Solids' }, { zh: '添加辅食', en: 'Starting solids' }, { zh: '喂养', en: 'Feeding' }],
    quickTip: { zh: '6 个月左右开始加辅食。每次只引入一种新食物，观察 3-5 天。1 岁前不加盐糖蜂蜜。', en: `Start solids around 6 months. One new food at a time, watch 3–5 days. No salt, sugar, or honey before age 1.` }
  },
  {
    id: 'mama-5',
    stage: 'infant',
    month: 5, category: 'mama',
    title: { zh: '回归职场 vs 全职带娃：没有标准答案', en: `Back to Work vs. Stay-at-Home: No Single Right Answer` },
    summary: { zh: '无论是回归职场还是选择全职带娃，你的价值不由带娃方式定义。', en: `Whether you return to work or stay home, your worth is not defined by how you parent.` },
    content: { zh: `产后 4-6 个月，很多妈妈面临是否回归职场的抉择。

**回归职场要考虑的：**
- 找靠谱的看护人（长辈/保姆/托育）很重要，这会极大影响你的心态
- 背奶妈妈的现实：泵奶、存奶、清洗设备——这是一份额外的工作
- 分离焦虑通常是妈妈比宝宝更严重

**全职带娃要考虑的：**
- 经济独立和个人价值感的挑战
- 社交圈缩小带来的孤独感
- 和伴侣沟通经济安排和家务分工

**不管选哪条路：**
- 你的选择可以在将来调整——这不是永久判决
- 和伴侣达成共识比选哪个更重要
- 你的情绪状态对宝宝的影响 > 你陪他的小时数

> 好的妈妈不是 24/7 在岗的妈妈，是情绪稳定的妈妈。`, en: `Around 4–6 months postpartum, many mothers face the choice of whether to return to work.

**If you return to work:**
- Finding reliable care (family, nanny, daycare) matters a lot — it shapes your peace of mind
- The reality of pumping: pump, store, clean equipment — it's a second job
- Separation anxiety is usually harder on mom than on baby

**If you stay home:**
- Challenges to financial independence and sense of self-worth
- Loneliness as your social circle shrinks
- Talk with your partner about money and the division of household work

**Whichever you choose:**
- Your choice can change later — it is not a permanent verdict
- Agreeing with your partner matters more than which option you pick
- Your emotional state affects baby more than the number of hours you spend with him

> A good mom is not a 24/7 mom — she is a mom who is emotionally steady.` },
    tags: [{ zh: '职场', en: 'Work' }, { zh: '全职妈妈', en: 'Stay-at-home mom' }, { zh: '选择', en: 'Choice' }],
    quickTip: { zh: '回归职场或全职带娃都不是永久判决。情绪稳定的妈妈 > 24/7在岗的妈妈。', en: `Returning to work or staying home is not a permanent verdict. An emotionally steady mom beats a 24/7 mom.` }
  },

  // ===== 6-9 月 =====
  {
    id: 'sleep-6',
    stage: 'infant',
    month: 6, category: 'sleep',
    title: { zh: '分离焦虑期的睡眠：这不是倒退，是依恋在发展', en: `Sleep During Separation Anxiety: Not a Regression, but Attachment Growing` },
    summary: { zh: '6-9 个月是分离焦虑高峰期，宝宝开始意识到"妈妈是独立的人，妈妈会离开"。夜醒增加是正常的依恋表现。', en: `Months 6–9 are peak separation anxiety, when baby realizes "mom is a separate person who leaves." More night waking is a normal sign of attachment.` },
    content: { zh: `6-9 个月的宝宝开始理解"客体永久性"——东西看不见了不代表不存在。这是个认知飞跃。

**但这也意味着：**
- 宝宝发现你离开了会哭——他懂了你还在，但不知道你什么时候回来
- 夜晚醒来发现你不在身边，可能会大哭

**应对策略：**
- 白天多玩躲猫猫游戏——帮助宝宝理解"你离开了还会回来"
- 睡前多一些身体接触和安抚，满足依恋需求
- 短暂离开时告诉宝宝"妈妈去 XX，马上回来"——即使他听不懂，语气和规律能给他安全感
- 夜间回应宝宝时保持冷静、简短——检查需求后安抚，不要变成游戏时间

> 这是依恋在健康成长，不是睡眠训练失败。`, en: `Babies 6–9 months start to grasp "object permanence" — things that disappear still exist. It's a cognitive leap.

**But it also means:**
- Baby cries when you leave — he knows you still exist, but not when you'll return
- Waking at night to find you gone may bring big tears

**How to cope:**
- Play peekaboo often by day — it teaches "you leave and come back"
- More cuddles and soothing at bedtime to meet the need for closeness
- When leaving briefly, tell baby "Mommy's going to XX, right back" — even if he can't understand, the tone and rhythm build security
- At night, stay calm and brief — meet the need, soothe, don't turn it into playtime

> This is attachment growing healthily, not sleep training failing.` },
    tags: [{ zh: '分离焦虑', en: 'Separation anxiety' }, { zh: '睡眠', en: 'Sleep' }, { zh: '依恋', en: 'Attachment' }],
    quickTip: { zh: '白天多玩躲猫猫，帮宝宝建立"妈妈离开还会回来"的信任。', en: `Play peekaboo by day to build baby's trust that "mom leaves and comes back."` }
  },
  {
    id: 'development-7',
    stage: 'infant',
    month: 7, category: 'development',
    title: { zh: '大运动发展：爬行不是必选项', en: `Gross Motor Development: Crawling Is Not Required` },
    summary: { zh: '有些宝宝不爬直接走，有些用屁股挪动，有些匍匐前进。只要在移动，方式不重要。', en: `Some babies skip crawling and walk, some scoot on their bottom, some belly-crawl. As long as they move, the method doesn't matter.` },
    content: { zh: `6-9 个月的宝宝进入大运动爆发期：

**常见里程碑（按出现概率，非严格顺序）：**
- 独坐（5-7 个月）
- 匍匐爬行（6-8 个月）
- 手脚爬行（7-10 个月）
- 扶站（8-10 个月）

**关于爬行的真相：**
- 约 10-15% 的宝宝跳过爬行直接走——完全正常
- 爬行姿势五花八门：匍匐、屁股挪、熊爬、后退爬——都算爬
- 更重要的是宝宝"在移动"这个事实，而不是移动的方式

**家庭安全清单：**
- 所有低于 70cm 的插座加保护盖
- 药瓶、清洁剂锁起来
- 家具尖角贴防撞条
- 楼梯装安全门

> 你家宝宝屁股挪着前进？恭喜，那也算在移动。`, en: `Babies 6–9 months hit a gross-motor explosion:

**Common milestones (by likelihood, not strict order):**
- Sits alone (5–7 months)
- Belly crawls (6–8 months)
- Crawls on hands and knees (7–10 months)
- Pulls to stand (8–10 months)

**The truth about crawling:**
- About 10–15% of babies skip crawling and go straight to walking — completely normal
- Crawl styles vary widely: commando, bottom-scoot, bear crawl, backwards — all count
- What matters more is that baby "is moving," not how

**Home safety checklist:**
- Cover all outlets below 70 cm
- Lock up medicine and cleaners
- Pad sharp furniture corners
- Install safety gates at stairs

> Your baby scoots forward on his bottom? Congrats — that counts as moving too.` },
    tags: [{ zh: '爬行', en: 'Crawling' }, { zh: '大运动', en: 'Gross motor' }, { zh: '发育', en: 'Development' }],
    quickTip: { zh: '10-15% 的宝宝跳过爬行直接走。只要在移动，方式不重要。', en: `10–15% of babies skip crawling and walk. As long as they move, the method doesn't matter.` }
  },
  {
    id: 'health-8',
    stage: 'infant',
    month: 8, category: 'health',
    title: { zh: '发烧不用慌：什么时候才需要去医院', en: `Fevers Without Panic: When You Actually Need the Hospital` },
    summary: { zh: '发烧是身体在战斗，不是敌人。关键看宝宝的精神状态，不是体温计上的数字。', en: `A fever is the body fighting, not the enemy. What matters is your baby's spirits, not the number on the thermometer.` },
    content: { zh: `**发烧的判断标准（耳温/肛温）：**
- 正常：36.5-37.5°C
- 低烧：37.5-38.0°C
- 中度发烧：38.0-39.0°C
- 高烧：39.0°C 以上

**居家处理：**
- 保持室温舒适，不要捂汗——穿一层薄衣服即可
- 多喂奶/水，防止脱水
- 38.5°C 以上或宝宝明显不适，可以用对乙酰氨基酚或布洛芬（按体重计算剂量）

**需要立即去医院的信号：**
- 3 个月以下宝宝发烧（任何温度）
- 精神萎靡、叫不醒、拒绝进食
- 持续高烧超过 3 天
- 抽搐、呼吸急促、嘴唇发紫
- 身上出现压不褪色的皮疹

> 发烧不可怕。可怕的是不看精神状态只看体温计。`, en: `**Fever thresholds (ear or rectal):**
- Normal: 36.5–37.5°C
- Low: 37.5–38.0°C
- Moderate: 38.0–39.0°C
- High: above 39.0°C

**At home:**
- Keep the room comfortable; don't bundle up to "sweat it out" — one light layer is enough
- Offer more milk/water to prevent dehydration
- At 38.5°C+ or clear distress, acetaminophen or ibuprofen is OK (dose by weight)

**Go to the hospital right away if:**
- Baby under 3 months has any fever
- Lethargic, won't wake, refuses to eat
- High fever over 3 days
- Seizures, fast breathing, bluish lips
- A rash that doesn't fade when pressed

> A fever isn't scary. What's scary is watching the thermometer and ignoring how your baby actually feels.` },
    tags: [{ zh: '发烧', en: 'Fever' }, { zh: '生病', en: 'Illness' }, { zh: '健康', en: 'Health' }],
    quickTip: { zh: '3个月以下发烧立即就医。大宝宝看精神状态 > 体温数字。不要捂汗！', en: `Any fever under 3 months: see a doctor now. For older babies, watch spirits over the number. Don't bundle up!` }
  },

  // ===== 9-12 月 =====
  {
    id: 'feeding-9',
    stage: 'infant',
    month: 9, category: 'feeding',
    title: { zh: '自主进食（BLW）vs 勺喂：没有"对"的方法', en: `Baby-Led Weaning vs. Spoon-Feeding: No "Right" Method` },
    summary: { zh: '宝宝主导的自主进食（BLW）和传统勺喂各有利弊。选你舒服的方式，混合也行。', en: `Baby-led weaning (BLW) and traditional spoon-feeding each have pros and cons. Pick what feels right — mixing is fine too.` },
    content: { zh: `**BLW（Baby-Led Weaning）原则：**
- 从 6 个月开始给手指食物（煮软的胡萝卜条、西兰花、香蕉等）
- 让宝宝自己抓、自己吃
- 好处：锻炼手眼协调、让宝宝自主控制食量

**传统勺喂：**
- 从泥糊状开始逐步过渡到碎末→小颗粒→小块
- 好处：确保进食量、减少呛噎风险

**不管你选哪种：**
- 永远不要让宝宝独自进食
- 学习海姆立克急救法——每个家长都应该会
- 呛噎和干呕的区别：干呕有声音、脸会红——这是保护性反射，不要拍背。呛噎无声、脸发紫——立即急救
- 可以混合：早餐 BLW 锻炼自主，晚餐勺喂保证营养

> 吃饭应该是快乐的。如果宝宝抗拒，退一步重新来，不要变成餐桌战争。`, en: `**BLW (Baby-Led Weaning) principles:**
- From 6 months, offer finger foods (soft-cooked carrot sticks, broccoli, banana)
- Let baby grab and eat on his own
- Upside: builds hand-eye coordination and lets baby control portions

**Traditional spoon-feeding:**
- Start with purées, progress to mash → small bits → pieces
- Upside: ensures intake, lowers choking risk

**Whichever you choose:**
- Never let baby eat alone
- Learn the Heimlich maneuver — every parent should know it
- Choking vs. gagging: gagging has sound and a red face — it's a protective reflex, don't pat the back. Choking is silent with a purple face — act immediately
- You can mix: BLW at breakfast for independence, spoon at dinner for nutrition

> Meals should be happy. If baby resists, step back and try again — don't turn it into a dinner-table war.` },
    tags: [{ zh: '自主进食', en: 'BLW' }, { zh: 'BLW', en: 'Baby-led weaning' }, { zh: '辅食', en: 'Solids' }],
    quickTip: { zh: 'BLW 和勺喂可以混合。学海姆立克急救法，呛噎无声脸发紫立即急救。', en: `BLW and spoon-feeding can mix. Learn the Heimlich maneuver — silent choking with a purple face needs immediate action.` }
  },
  {
    id: 'development-10',
    stage: 'infant',
    month: 10, category: 'development',
    title: { zh: '走路早晚不说明任何问题', en: `Early or Late Walking Means Nothing` },
    summary: { zh: '宝宝独立行走的正常范围是 9-18 个月。早走不代表聪明，晚走不代表有问题。', en: `The normal range for independent walking is 9–18 months. Early walking isn't smarter; late walking isn't a problem.` },
    content: { zh: `**走路的时间线（正常范围）：**
- 扶走：8-11 个月
- 独立站：9-13 个月
- 独立走：9-18 个月

**为什么范围这么大：**
- 遗传因素影响很大——看看你自己小时候什么时候走路的
- 体重偏重的宝宝可能稍晚
- 性格谨慎的宝宝可能更晚才敢撒手
- 家里空间小、总是被抱着的宝宝可能晚一些

**什么时候需要咨询：**
- 18 个月仍不能独立行走
- 走路姿势明显异常（持续踮脚、跛行、双腿交叉）
- 之前会走突然不走了（退步需要警惕）

**不用做的事：**
- 不用买学步车（有安全隐患，且不帮助学走路）
- 不用强迫宝宝走路
- 不用和小区里任何宝宝比较

> 早走晚走，18 岁都会走。别急。`, en: `**The walking timeline (normal range):**
- Cruising: 8–11 months
- Standing alone: 9–13 months
- Walking alone: 9–18 months

**Why such a wide range:**
- Genetics play a big role — when did you start walking?
- Heavier babies may go a bit later
- Cautious babies may wait longer to let go
- Babies with little floor space or always carried may start later

**When to check with the doctor:**
- Still not walking alone at 18 months
- Clearly abnormal gait (toe-walking, limping, legs crossing)
- Previously walked, then suddenly stopped (regression needs attention)

**What you don't need to do:**
- Don't buy a walker (safety risk, and it doesn't teach walking)
- Don't force baby to walk
- Don't compare with any neighbor's baby

> Early or late, by 18 they'll all be walking. No rush.` },
    tags: [{ zh: '走路', en: 'Walking' }, { zh: '大运动', en: 'Gross motor' }, { zh: '发育', en: 'Development' }],
    quickTip: { zh: '独立行走正常范围 9-18 个月。18个月不会走才需要关注。学步车不安全，别买。', en: `Normal range for walking alone is 9–18 months. Only worry if not walking at 18 months. Walkers are unsafe — skip them.` }
  },
  {
    id: 'mama-11',
    stage: 'infant',
    month: 11, category: 'mama',
    title: { zh: '一岁了：回头看，你已经走了多远', en: `One Year Old: Look Back at How Far You've Come` },
    summary: { zh: '宝宝一岁生日也是你为人父母的一周年纪念。回头看看，你比想象中做得更好。', en: `Your baby's first birthday is also your one-year anniversary as a parent. Look back — you've done better than you think.` },
    content: { zh: `宝宝即将满一岁，这是他的生日，也是你的里程碑——你已经当了一年的爸爸妈妈。

**这一年你可能经历了：**
- 大约 2500-3000 小时的睡眠剥夺
- 约 2000 次喂奶/喂食
- 约 1000 次换尿布
- 无数次抱起、放下、哄睡、喂药、担心……

**同时也经历了：**
- 宝宝第一次对你笑
- 第一次翻身、坐起、爬行、可能已经迈出第一步
- 第一次叫"妈妈"或"爸爸"
- 从完全依赖到开始有小个性

**给一周年的你：**
1. 你没有搞砸。你在学习，宝宝也在学习。
2. 那些关于喂养、睡眠、发育的焦虑，回头看大部分都是多余的。
3. 宝宝不记得你有没有买最贵的婴儿床，但他会感受到你抱着他时的温度。
4. 你不是完美的父母——没有人是。但你是他的父母，这就够了。

> 育儿不是一场考试，没有标准答案，也没有监考老师。`, en: `Your baby is about to turn one — his birthday, and your milestone too: you've been a parent for a whole year.

**What you may have been through this year:**
- Roughly 2,500–3,000 hours of lost sleep
- About 2,000 feeds
- About 1,000 diaper changes
- Countless pickups, put-downs, soothing, medicine, and worry…

**And what you also experienced:**
- Baby's first smile at you
- First roll, sit, crawl, maybe first steps
- First "mama" or "dada"
- From total dependence to a little personality of his own

**To you at this one-year mark:**
1. You didn't mess up. You're learning, and so is baby.
2. Most feeding, sleep, and development worries look unnecessary in hindsight.
3. Baby won't remember the priciest crib, but he'll feel the warmth when you hold him.
4. You're not a perfect parent — no one is. But you're his parent, and that's enough.

> Parenting isn't an exam. There's no right answer, and no proctor watching.` },
    tags: [{ zh: '一周年', en: 'First anniversary' }, { zh: '回顾', en: 'Reflection' }, { zh: '父母成长', en: 'Parental growth' }],
    quickTip: { zh: '你不是完美的父母。但你是他的父母。这就够了。', en: `You're not a perfect parent. But you're his parent. That's enough.` }
  },
  {
    id: 'sleep-9',
    stage: 'infant',
    month: 9, category: 'sleep',
    title: { zh: '如何安全地断夜奶', en: `How to Drop Night Feedings Safely` },
    summary: { zh: '9 个月后，大多数宝宝生理上不需要夜间进食了。但断夜奶要先确认宝宝准备好了。', en: `After 9 months most babies no longer need night feeds physically. But check baby is ready before you start.` },
    content: { zh: `**宝宝准备好断夜奶的信号：**
- 白天奶量/食量充足
- 体重增长正常
- 夜间醒来吃几口就睡着（习惯性吮吸，不是饿）

**温和断夜奶的方法：**
1. 逐渐减少夜间奶量（瓶喂减少 20-30ml/晚，亲喂缩短 1-2 分钟/晚）
2. 拉长喂奶间隔（推迟 15-30 分钟回应，每天延长一点）
3. 让非哺乳的伴侣去回应——宝宝闻到妈妈身上的奶味很难放弃

**不要同时做太多改变：**
- 断夜奶本身就够难了，不要同时断奶瓶、换房间、戒奶嘴
- 生病或出牙期暂停断奶
- 需要 1-2 周的稳定期

> 断夜奶不需要"一次成功"。反复很正常，调整节奏继续就好。`, en: `**Signs baby is ready to drop night feeds:**
- Enough milk/food by day
- Normal weight gain
- Wakes at night, takes a few sips, falls back asleep (habitual sucking, not hunger)

**A gentle way to drop them:**
1. Gradually cut the amount (bottle: −20–30 mL/night; nursing: −1–2 min/night)
2. Lengthen the interval (delay response 15–30 min, a bit more each day)
3. Let the non-nursing partner respond — baby smells milk on mom and won't let go

**Don't change too much at once:**
- Dropping nights is hard enough; don't also wean the bottle, change rooms, or drop the pacifier
- Pause during illness or teething
- Allow 1–2 weeks of stability

> Dropping night feeds doesn't need a "one-time success." Back-and-forth is normal — adjust the pace and keep going.` },
    tags: [{ zh: '断夜奶', en: 'Night weaning' }, { zh: '睡眠', en: 'Sleep' }, { zh: '喂养', en: 'Feeding' }],
    quickTip: { zh: '温和断夜奶三步：减量→拉长间隔→让伴侣回应。生病期暂停。', en: `Gentle night weaning in 3 steps: cut amount → lengthen interval → let your partner respond. Pause during illness.` }
  },

  // ===== 备孕 =====
  {
    id: 'prep-anxiety',
    stage: 'prepregnancy', month: 0, category: 'mama',
    title: { zh: '备孕焦虑：怀不上，怎么办', en: `Trying to Conceive: Not Getting Pregnant?` },
    summary: { zh: '备孕几个月没动静就焦虑？先看清"正常"的边界，再决定要不要紧张。', en: `Anxious after a few months of trying? First see where "normal" ends, then decide if it's time to worry.` },
    content: { zh: `很多夫妻备孕 3-6 个月没怀上就开始慌，但医学上"不孕"的定义是**未避孕规律同房 1 年未孕**（35 岁以上是 6 个月）。

**所以前几个月没怀上，不是你的问题，是概率。**
- 25-30 岁：每月自然受孕概率约 20-25%
- 即使一切正常，半年内怀上的也只有约 75%
- 也就是说，4 对夫妻里有 1 对半年还没怀上——这完全正常

**容易放大的焦虑源：**
- 排卵试纸变成日常仪式，没测到强阳就崩溃
- 把"没怀上"等同于"身体有问题"或"我不配当妈妈"
- 朋友圈一晒孕肚，自己就难受

**什么时候该就医（不用硬扛 1 年）：**
- 35 岁以上，尝试 6 个月未果
- 月经长期不规律或闭经
- 已知有多囊、子宫内膜异位、输卵管问题
- 男方有过生殖相关病史

> 备孕是两个人的事。别把压力全压在女方身上——男性的精子质量同样关键，双方一起检查才是正解。`, en: `Many couples panic after 3–6 months of trying, but medically "infertility" means **a full year of unprotected, regular sex without pregnancy** (6 months if over 35).

**So not conceiving in the first few months is not your fault — it's probability.**
- At 25–30, the monthly natural chance is about 20–25%
- Even with everything normal, only about 75% conceive within half a year
- That means 1 in 4 couples hasn't conceived by 6 months — completely normal

**Anxiety triggers easy to inflate:**
- Ovulation strips become a daily ritual; no strong positive and you fall apart
- Equating "not pregnant" with "something's wrong with my body" or "I don't deserve to be a mom"
- Feeling hurt the moment someone posts a bump

**When to see a doctor (no need to wait the full year):**
- Over 35 and trying 6 months with no result
- Long-term irregular periods or no periods
- Known PCOS, endometriosis, or fallopian tube issues
- Partner has a history of reproductive problems

> Conceiving takes two. Don't put all the pressure on the woman — sperm quality matters just as much. Getting checked together is the right move.` },
    tags: [{ zh: '备孕', en: 'Trying to conceive' }, { zh: '不孕焦虑', en: 'Infertility anxiety' }, { zh: '就医时机', en: 'When to see a doctor' }],
    quickTip: { zh: '35岁以下未避孕同房1年未孕才算"不孕"。前几个月没怀上是概率，不是失败。', en: `Under 35, a year of unprotected sex without pregnancy counts as "infertility." The first few months are probability, not failure.` }
  },
  {
    id: 'pre-overload',
    stage: 'prepregnancy', month: 0, category: 'health',
    title: { zh: '备孕期的"应该"：信息过载与完美主义', en: `The "Shoulds" of Trying to Conceive: Information Overload and Perfectionism` },
    summary: { zh: '叶酸、运动、戒烟酒、测排卵、吃黑豆……备孕变成了一场考试。', en: `Folic acid, exercise, no smoking or drinking, tracking ovulation, black beans… trying to conceive turns into an exam.` },
    content: { zh: `备孕期间，围绕"怎么做才对"的信息多到让人窒息。叶酸要吃、咖啡要戒、运动要适度、体重要达标、情绪要放松——可"要放松"这件事本身就很让人紧张。

**真正有共识的"应该"：**
- 孕前 3 个月开始补叶酸（0.4mg/天）
- 夫妻双方戒烟酒
- 保持合理体重（过瘦过胖都影响排卵）
- 接种风疹疫苗（如缺抗体）

**可以放下的"应该"：**
- "必须排卵期精准同房"——每周 2-3 次规律同房即可覆盖
- "吃各种偏方助孕"——大多无证据
- "心情必须愉悦才能怀"——压力大确实影响，但偶尔焦虑不代表怀不上

> 把备孕当成生活的自然延伸，而不是一个待办清单。你越把它当考试，越难通过。`, en: `While trying to conceive, advice about "doing it right" is suffocating. Take folic acid, quit coffee, exercise moderately, hit the right weight, relax — yet "relax" itself is stressful.

**The "shoulds" with real consensus:**
- Start folic acid 3 months before (0.4 mg/day)
- Both partners quit smoking and drinking
- Keep a healthy weight (too thin or too heavy affects ovulation)
- Get the rubella vaccine if you lack immunity

**The "shoulds" you can drop:**
- "Must time sex exactly to ovulation" — 2–3 times a week covers it
- "Eat every folk remedy to conceive" — most have no evidence
- "Must be cheerful to get pregnant" — stress does matter, but occasional anxiety doesn't block it

> Treat trying to conceive as a natural extension of life, not a to-do list. The more you make it an exam, the harder it is to pass.` },
    tags: [{ zh: '备孕', en: 'Trying to conceive' }, { zh: '叶酸', en: 'Folic acid' }, { zh: '完美主义', en: 'Perfectionism' }],
    quickTip: { zh: '有共识的：叶酸+戒烟酒+合理体重。其余偏方和"精准同房"大多可放下。', en: `Consensus items: folic acid + no smoke/alcohol + healthy weight. Most remedies and "precise timing" can be dropped.` }
  },

  // ===== 孕期 =====
  {
    id: 'preg-early',
    stage: 'pregnancy', month: 1, category: 'health',
    title: { zh: '孕早期：流产担忧与孕反', en: `Early Pregnancy: Miscarriage Worries and Morning Sickness` },
    summary: { zh: '前 12 周像走钢丝——一点出血、一点腹痛就脑补最坏结果。', en: `The first 12 weeks feel like walking a tightrope — a spot of blood or a twinge and you imagine the worst.` },
    content: { zh: `孕早期（1-12 周）是焦虑最密集的阶段。身体在剧烈变化，而你还没"显怀"，没人知道你怀孕了，连确认都靠试纸和血值。

**关于流产的事实：**
- 约 10-20% 的临床妊娠会以流产告终，大多发生在前 12 周
- 大部分流产是染色体异常导致，不是你做了什么或没做什么
- 一次流产不代表下次会流产，也不代表你"保不住孩子"

**什么情况才需要警惕（及时去医院）：**
- 出血量多于月经、伴随剧烈腹痛或组织物排出
- 早孕反应突然消失 + 阴道出血

**孕反（恶心呕吐）的缓解：**
- 少量多餐，床头放饼干，起床前先吃两口
- 避开诱发气味，姜茶、维生素 B6 有帮助
- 严重到喝水都吐、尿少——警惕妊娠剧吐，需就医补液

> 孕早期你感觉"什么都没做却很累"，那是因为身体在搭建整个人生最重要的器官系统。累是正常的。`, en: `Early pregnancy (weeks 1–12) is the most anxiety-dense stage. Your body is changing fast, but you're not "showing," no one knows, and even confirmation comes from strips and blood tests.

**Facts about miscarriage:**
- About 10–20% of clinical pregnancies end in loss, mostly in the first 12 weeks
- Most are caused by chromosome abnormalities — not something you did or didn't do
- One loss doesn't mean the next will, or that you "can't carry a child"

**When to be alert (go to the hospital):**
- Bleeding heavier than a period, with severe cramps or tissue passing
- Sudden loss of pregnancy symptoms + vaginal bleeding

**Easing nausea (morning sickness):**
- Small frequent meals; keep crackers by the bed, eat a bite before getting up
- Avoid trigger smells; ginger tea and vitamin B6 help
- If it's so bad you can't keep water down and urinate little — watch for hyperemesis, see a doctor for fluids

> In early pregnancy you feel "exhausted doing nothing" because your body is building the most important organ systems of a life. Tired is normal.` },
    tags: [{ zh: '孕早期', en: 'Early pregnancy' }, { zh: '流产', en: 'Miscarriage' }, { zh: '孕反', en: 'Morning sickness' }],
    quickTip: { zh: '流产多为染色体异常，不是你的错。出血量多于月经+剧痛才需急诊。', en: `Most miscarriages are chromosome issues, not your fault. Bleeding heavier than a period + severe pain needs ER.` }
  },
  {
    id: 'preg-checkup',
    stage: 'pregnancy', month: 2, category: 'health',
    title: { zh: '产检焦虑：每次产检像考试', en: `Prenatal Checkup Anxiety: Every Visit Feels Like an Exam` },
    summary: { zh: 'NT、大排畸、糖耐——每一项都怕"不过"。了解它们在查什么，焦虑会减半。', en: `NT, anatomy scan, glucose test — every one feels like a pass/fail. Knowing what they check cuts the anxiety in half.` },
    content: { zh: `整个孕期的产检像闯关，最让人紧张的三关：NT（11-13周）、大排畸（20-24周）、糖耐（24-28周）。

**NT（颈后透明带）：**
- 查胎儿颈后积液厚度，联合血值评估染色体风险
- 增厚≠一定有问题，需进一步无创 DNA 或羊水穿刺确认
- 它只是"风险筛查"，不是诊断

**大排畸（系统 B 超）：**
- 全面看器官结构，最佳窗口 20-24 周
- 宝宝姿势不对可能看不清，常需复查——这很常见，不代表异常
- 查出"心室强光点""肾盂分离"等软指标，大多后期吸收，别自己吓自己

**糖耐（OGTT）：**
- 查妊娠糖尿病。确诊后靠饮食+运动大多可控，少数需胰岛素
- 糖妈≠你吃太多糖，而是胎盘激素对抗了胰岛素

> 产检是"排查风险"不是"判定好坏"。绝大多数宝宝都会顺利通过这些关卡。`, en: `The whole pregnancy is a series of checkpoints; the three most nerve-wracking: NT (11–13 wks), anatomy scan (20–24 wks), glucose test (24–28 wks).

**NT (nuchal translucency):**
- Measures fluid at the back of the neck, combined with blood work to assess chromosome risk
- Thicker ≠ definitely a problem; needs further NIPT or amniocentesis to confirm
- It's a risk screen, not a diagnosis

**Anatomy scan (detailed ultrasound):**
- Looks at organ structures; best window 20–24 weeks
- Baby in a bad position may hide things; a re-scan is common — not a sign of trouble
- "Bright spot in heart" or "renal pelvis dilation" usually resolve later — don't scare yourself

**Glucose test (OGTT):**
- Checks for gestational diabetes. With diet + exercise most cases are controlled; a few need insulin
- Being a "glucose mom" ≠ you ate too much sugar; placental hormones fought your insulin

> Checkups screen for risk, they don't judge good or bad. The vast majority of babies pass these gates smoothly.` },
    tags: [{ zh: '产检', en: 'Prenatal checkup' }, { zh: 'NT', en: 'NT scan' }, { zh: '大排畸', en: 'Anatomy scan' }, { zh: '糖耐', en: 'Glucose test' }],
    quickTip: { zh: '产检是风险筛查不是判定。大排畸看不清很常见，软指标大多后期吸收。', en: `Checkups screen for risk, not pass/fail. Anatomy scans often need repeats; soft markers usually resolve later.` }
  },
  {
    id: 'preg-fetal-fear',
    stage: 'pregnancy', month: 3, category: 'health',
    title: { zh: '早产与"宝宝还好吗"的恐惧', en: `Preterm Labor and the Fear of "Is Baby OK?"` },
    summary: { zh: '中晚孕开始数胎动，少动一下就心慌。了解正常信号，少一点无谓惊慌。', en: `From mid-late pregnancy you count kicks; one quiet spell and your heart races. Know the normal signs to spare needless panic.` },
    content: { zh: `进入中晚孕，焦虑从"怀没怀上"转向"宝宝还好吗"。胎动成了你和宝宝唯一的"远程连线"。

**数胎动的正确姿势：**
- 孕 28 周起规律数，每天固定时间（如晚饭后）
- 2 小时内感受到 10 次以上胎动通常正常
- 重点是"规律和变化趋势"，不是精确次数

**需要就医的信号：**
- 胎动明显比平时减少一半以上，且持续 2 小时
- 肚子一阵阵发紧发痛（规律宫缩）
- 破水（阴道流液）、见红伴腹痛

**关于早产：**
- 37 周前出生算早产，但 34 周后存活率已很高
- 宫颈机能不全等可医学干预，不是完全不可控

> 你数的是"变化"不是"次数"。宝宝白天睡晚上闹很正常，突然反常才需要警惕。`, en: `Into mid-late pregnancy, anxiety shifts from "did I conceive" to "is baby OK?" Kick counts become your only "remote link" to baby.

**How to count kicks right:**
- From week 28, count regularly at a set time daily (e.g., after dinner)
- Feeling 10+ movements within 2 hours is usually normal
- The point is "pattern and trend," not exact counts

**Signs to see a doctor:**
- Movements clearly less than half the usual, lasting 2 hours
- Belly tightening and aching in waves (regular contractions)
- Water breaking (fluid leak), or blood with cramps

**About preterm labor:**
- Born before 37 weeks is preterm, but survival is already high after 34
- Incompetent cervix etc. can be treated medically — not entirely uncontrollable

> You're counting "change," not "counts." Baby sleeping by day and active by night is normal; a sudden reversal is what to watch.` },
    tags: [{ zh: '胎动', en: 'Fetal movement' }, { zh: '早产', en: 'Preterm labor' }, { zh: '中晚孕', en: 'Mid-late pregnancy' }],
    quickTip: { zh: '数胎动看"变化趋势"而非次数。减少一半且持续2小时才需就医。', en: `Watch the trend in kick counts, not the number. See a doctor if movement drops by half and lasts 2 hours.` }
  },
  {
    id: 'preg-birth-fear',
    stage: 'pregnancy', month: 3, category: 'mama',
    title: { zh: '分娩恐惧：顺还是剖，疼不疼', en: `Fear of Birth: Natural or C-Section, Will It Hurt?` },
    summary: { zh: '对疼痛、失控、意外的恐惧，是产前焦虑的核心。了解选择，恐惧会具体化。', en: `Fear of pain, loss of control, and the unexpected is the core of prenatal anxiety. Knowing your options makes the fear concrete.` },
    content: { zh: `越临近预产期，"怎么生"的焦虑越重。顺产的痛、剖宫的疤、意外的可能，轮番在脑子里播。

**先放下几个误解：**
- "必须顺产才伟大"——剖宫产是医学手段，该剖就剖，不丢人
- "无痛分娩影响宝宝"——硬膜外镇痛成熟安全，能大幅降低痛苦
- "分娩一定失控"——你有知情同意权，可以提前写分娩计划

**能做的准备：**
- 参加孕妇学校，了解产程三阶段，知道每个阶段会发生什么
- 和医生沟通分娩计划（镇痛意愿、陪产人、紧急情况预案）
- 练习呼吸法和放松技巧

**如果恐惧严重影响睡眠：**
- 这很常见，和伴侣或医生聊聊
- 极度恐惧分娩（tokophobia）是一种明确的焦虑障碍，可寻求心理支持

> 没有人能"准备好"迎接疼痛，但你知道会发生什么，就少了一半的怕。`, en: `The closer to the due date, the heavier the "how will I deliver" anxiety. The pain of natural birth, the scar of a C-section, the possibility of surprises — they all play in your head.

**Drop a few misconceptions first:**
- "Only natural birth is great" — a C-section is a medical tool; have one when needed, no shame
- "Epidural hurts the baby" — epidural analgesia is mature and safe, and greatly cuts pain
- "Birth is always out of control" — you have the right to informed consent and can write a birth plan ahead

**Prep you can do:**
- Join childbirth classes; learn the three stages so you know what's coming
- Talk with your doctor about a birth plan (pain relief wishes, who's present, emergency plan)
- Practice breathing and relaxation techniques

**If the fear badly disrupts sleep:**
- This is common — talk with your partner or doctor
- Extreme fear of birth (tokophobia) is a recognized anxiety disorder; seek mental health support

> No one can be "ready" for the pain, but knowing what will happen takes away half the fear.` },
    tags: [{ zh: '分娩', en: 'Birth' }, { zh: '顺产', en: 'Vaginal birth' }, { zh: '剖宫产', en: 'C-section' }, { zh: '无痛', en: 'Epidural' }],
    quickTip: { zh: '无痛分娩成熟安全。该剖就剖不丢人。提前写分娩计划能大幅降低失控感。', en: `Epidurals are mature and safe. A C-section when needed is no shame. A birth plan ahead cuts the loss-of-control feeling.` }
  },
  {
    id: 'preg-identity',
    stage: 'pregnancy', month: 2, category: 'mama',
    title: { zh: '身份转变：我要当妈妈了，但我还是我吗', en: `Identity Shift: I'm Becoming a Mom — But Am I Still Me?` },
    summary: { zh: '从"女人"到"妈妈"的过渡，伴随自由丧失感与自我怀疑。这正常。', en: `The transition from "woman" to "mom" comes with a sense of lost freedom and self-doubt. That's normal.` },
    content: { zh: `怀孕期间身体变化是可见的，心理变化却常被忽略。很多准妈妈在开心之外，还藏着一丝失落：我的自由呢？我的事业呢？我还是原来的我吗？

**常见的心理波动：**
- 对身材走样、妊娠纹的焦虑（身体意象冲击）
- 担心产后无法回归职场或失去独立性
- 对"母性本能"的怀疑——"我怎么没觉得那么爱这个宝宝？"
- 对成为"足够好妈妈"的不确定

**重要的事实：**
- 不是所有妈妈刚怀孕就充满母爱，情感是慢慢长出来的
- "母性本能"被过度浪漫化，真实是边学边爱
- 想要属于自己的时间和空间，不代表你不爱孩子

> 成为妈妈是"增加"一个身份，不是"替换"掉原来的你。你不必在宝宝出生前就交出一个全新的自己。`, en: `The body changes in pregnancy are visible; the mental ones are often ignored. Beyond the joy, many expectant moms hide a flicker of loss: my freedom? my career? am I still me?

**Common emotional shifts:**
- Anxiety about a changing body and stretch marks (body image shock)
- Worry about returning to work or losing independence
- Doubting "maternal instinct" — "why don't I feel that in love with this baby?"
- Uncertainty about being a "good enough mom"

**Important facts:**
- Not every mom is full of love from the start; feelings grow slowly
- "Maternal instinct" is over-romanticized; reality is learning while loving
- Wanting your own time and space doesn't mean you don't love your child

> Becoming a mom adds an identity, it doesn't replace the old you. You don't have to hand over a brand-new self before the baby arrives.` },
    tags: [{ zh: '身份转变', en: 'Identity shift' }, { zh: '母性', en: 'Maternal instinct' }, { zh: '自我', en: 'Self' }],
    quickTip: { zh: '母爱是慢慢长出来的，不是天生就有。想要自己的空间≠不爱孩子。', en: `Love for your child grows slowly, it isn't there from day one. Wanting your own space ≠ not loving your child.` }
  },
  {
    id: 'preg-couple',
    stage: 'pregnancy', month: 2, category: 'mama',
    title: { zh: '孕期夫妻关系：被忽视感与身体意象', en: `The Relationship in Pregnancy: Feeling Unseen and Body Image` },
    summary: { zh: '你一个人扛着身体变化，他却像没事人。这种落差需要被说出，不能被忍下。', en: `You carry the body changes alone while he seems unchanged. That gap needs saying out loud, not swallowed.` },
    content: { zh: `孕期矛盾常常不是大事，而是"你变了，他没变"的落差感。

**常见的关系张力：**
- 你孕反难受，他还照常聚会应酬——觉得不被理解
- 身体变化让你不想亲密，他可能误解为"你不爱我了"
- 育儿分工、双方父母介入等话题开始浮现

**能做的：**
- 直接说需求，别让对方"猜"——"我今天难受，需要你早点回家"
- 一起参加产检和孕妇课，让他也"参与"而不是旁观
- 亲密关系不只有性，拥抱、聊天、共同准备婴儿房也是连接

**警惕信号：**
- 言语贬低、控制、冷漠持续加重
- 孕期抑郁或家暴——这不是矫情，必须求助

> 孕期是关系的压力测试。把落差说出来，是给关系机会，不是制造矛盾。`, en: `Pregnancy conflict is rarely about big things — it's the gap of "you changed, he didn't."

**Common tensions:**
- You're sick with nausea, he goes out as usual — feeling misunderstood
- Body changes make you avoid intimacy; he may read it as "you don't love me"
- Talks about dividing childcare and in-laws start to surface

**What you can do:**
- State needs directly, don't make him guess — "I feel awful today, I need you home early"
- Attend checkups and classes together so he takes part, not just watches
- Intimacy isn't only sex; hugs, talks, and prepping the nursery together are connection too

**Warning signs:**
- Ongoing put-downs, control, or coldness
- Prenatal depression or abuse — this isn't oversensitivity; get help

> Pregnancy is a stress test for the relationship. Naming the gap gives the relationship a chance, it doesn't create conflict.` },
    tags: [{ zh: '夫妻关系', en: 'Couple relationship' }, { zh: '孕期', en: 'Pregnancy' }, { zh: '亲密', en: 'Intimacy' }],
    quickTip: { zh: '别让对方猜需求，直接说。一起产检让他从旁观变参与。', en: `Don't make him guess — say it directly. Attend checkups together so he moves from watching to taking part.` }
  },

  // ===== 1-3 岁 =====
  {
    id: 'toddler-terrible-two',
    stage: 'toddler', month: 18, category: 'development',
    title: { zh: '可怕的两岁：发脾气不是叛逆', en: `The Terrible Twos: A Tantrum Is Not Defiance` },
    summary: { zh: '地上打滚、一言不合就崩溃。这不是你教得不好，是大脑还没长好。', en: `Rolling on the floor, falling apart at "no." This isn't bad parenting — the brain just isn't built yet.` },
    content: { zh: `1.5-3 岁孩子频繁发脾气，是发育的标配，不是你带娃失败。

**为什么会这样：**
- 大脑负责情绪的杏仁核已在线，负责控制的 prefrontal 还没发育
- 语言能力追不上需求，表达不出来就炸
- "自我意识"刚萌芽，什么都想"我自己来"，做不到就挫败

**应对的核心：**
- 先接住情绪，再处理行为——"你很生气，因为想吃糖没吃到"
- 不跟发脾气的娃讲大道理，等冷静再说
- 给有限选择代替命令："穿红袜子还是蓝袜子？"
- 安全范围内让他"自己来"，减少权力争夺

**你自己的调节：**
- 娃崩溃时你先稳住，你的平静是他最好的锚
- 实在要炸，把娃放安全处，自己去隔壁深呼吸 2 分钟

> 发脾气是孩子在说"我搞不定自己"。你的耐心不是在惯他，是在帮他搭建情绪肌肉。`, en: `Frequent tantrums at 1.5–3 years are standard development, not your parenting failing.

**Why it happens:**
- The emotional amygdala is online, but the controlling prefrontal cortex isn't grown yet
- Language lags behind needs; when they can't say it, they explode
- "Self-awareness" just sprouted; they want "I do it myself," and fall apart when they can't

**The core response:**
- Catch the emotion first, then the behavior — "You're angry because you couldn't have the candy"
- Don't lecture a melting-down child; wait until calm
- Offer limited choices instead of orders: "Red socks or blue?"
- Let them "do it themselves" within safety, to cut the power struggle

**Regulating yourself:**
- When the child melts down, you stay steady — your calm is his best anchor
- If you're about to blow, put him somewhere safe and breathe in the next room for 2 minutes

> A tantrum is a child saying "I can't handle myself." Your patience isn't spoiling him — it's building his emotional muscles.` },
    tags: [{ zh: 'terrible two', en: 'Terrible twos' }, { zh: '发脾气', en: 'Tantrums' }, { zh: '情绪教养', en: 'Emotional coaching' }],
    quickTip: { zh: '先接住情绪再处理行为。娃崩溃时你先稳，你的平静是他的锚。', en: `Catch the feeling before the behavior. When he melts down, you stay steady — your calm is his anchor.` }
  },
  {
    id: 'toddler-potty',
    stage: 'toddler', month: 24, category: 'development',
    title: { zh: '如厕训练焦虑：什么时候开始不晚', en: `Potty Training Anxiety: When Is It Too Late to Start?` },
    summary: { zh: '别被"2岁必须脱裤"绑架。看信号，不卡年龄。', en: `Don't be held hostage by "must be out of diapers by 2." Watch the signs, not the age.` },
    content: { zh: `如厕训练是焦虑重灾区，因为太容易被比较："谁谁家1岁半就会自己上厕所了"。
**开始训练的 readiness 信号（需同时满足多条）：**
- 能憋尿 2 小时以上（纸尿裤能保持干爽一阵）
- 能听懂指令并表达"要尿/拉"
- 对马桶或大人上厕所表现出兴趣
- 能自己拉下裤子

**常见时间窗：**
- 多数孩子在 2-3 岁准备好，完全掌握可能到 4 岁
- 太早强行训练，反而拖延整体进程

**方法要点：**
- 买小马桶，让他先"坐"着玩，去掉恐惧
- 捕捉规律（饭后、睡醒），带他去坐
- 成功就夸张表扬，失败就平静收场，不施压
- 夜间控尿通常最晚，5 岁前偶尔尿床都正常

> 如厕训练是"等孩子 ready"不是"逼孩子学会"。晚半年真的没关系。`, en: `Potty training is an anxiety hotspot because it's so easy to compare: "so-and-so's kid was using the toilet at 18 months."

**Readiness signals to start (several at once):**
- Can hold urine 2+ hours (diaper stays dry a while)
- Understands instructions and can say "I need to pee/poop"
- Shows interest in the toilet or in adults using it
- Can pull pants down on their own

**Common window:**
- Most kids are ready at 2–3; full mastery may come by 4
- Starting too early can actually slow the whole process

**Method tips:**
- Buy a small potty; let him "sit" and play to remove fear
- Catch the rhythm (after meals, on waking) and bring him
- Praise big for success, end calmly on failure — no pressure
- Night dryness usually comes last; the odd accident before 5 is normal

> Potty training is "wait until ready," not "make them learn." Half a year later truly doesn't matter.` },
    tags: [{ zh: '如厕训练', en: 'Potty training' }, { zh: '脱裤', en: 'Out of diapers' }, { zh: ' readiness', en: 'Readiness' }],
    quickTip: { zh: '看信号不卡年龄。2-3岁准备好，完全掌握可能到4岁，晚半年没事。', en: `Watch signs, not age. Ready at 2–3, full mastery maybe by 4; half a year later is fine.` }
  },
  {
    id: 'toddler-early-ed',
    stage: 'toddler', month: 18, category: 'development',
    title: { zh: '早教焦虑：别被"抢跑"绑架', en: `Early-Ed Anxiety: Don't Be Held Hostage by the "Head Start" Race` },
    summary: { zh: '双语、识字、思维课……怕落后是人的本能，但 0-3 岁最好的早教是关系和玩耍。', en: `Bilingual, literacy, thinking classes… fear of falling behind is human, but the best early ed for 0–3 is relationship and play.` },
    content: { zh: `1 岁多就开始焦虑"输在起跑线"，是这一代父母最普遍的内耗。

**0-3 岁真正重要的事：**
- 安全的依恋关系（比任何课程都重要）
- 自由玩耍（搭积木、玩沙、跑跳）——这是大脑发育的"正经事"
- 大量对话（哪怕他不会说，你多讲多回应）
- 户外跑动（大运动促进神经发育）

**早教班的真相：**
- 大部分"早教"卖的是家长的安心，不是孩子的智商
- 3 岁前大量结构化训练，可能挤占本该自由玩的时间
- 双语环境有益，但靠日常对话比靠刷题自然

**当你焦虑时问自己：**
- 这是孩子需要的，还是我怕"落后"需要的？
- 邻居家报班，是因为适合他们，还是因为焦虑传染？

> 0-3 岁最好的早教，是一个愿意蹲下来陪他玩的大人，不是一张课程表。`, en: `Starting to fear "losing at the starting line" at just over a year old is the most common drain on this generation of parents.

**What truly matters at 0–3:**
- A secure attachment (matters more than any class)
- Free play (blocks, sand, running) — this is the "real work" of brain development
- Lots of talk (even if he can't speak, you talk and respond more)
- Outdoor movement (gross motor builds neural pathways)

**The truth about early-ed classes:**
- Most "early education" sells parents peace of mind, not the child's IQ
- Heavy structured training before 3 can crowd out free play
- A bilingual environment helps, but daily talk beats drilling

**When anxious, ask yourself:**
- Does the child need this, or do I need it to avoid "falling behind"?
- Did the neighbor sign up because it fits them, or because anxiety is contagious?

> The best early education for 0–3 is a grown-up willing to squat down and play — not a course schedule.` },
    tags: [{ zh: '早教', en: 'Early education' }, { zh: '抢跑', en: 'Racing ahead' }, { zh: '玩耍', en: 'Play' }],
    quickTip: { zh: '0-3岁最好早教=安全依恋+自由玩耍+大量对话。课程表卖的是家长安心。', en: `Best early ed at 0–3 = secure attachment + free play + lots of talk. Class schedules sell parental peace of mind.` }
  },
  {
    id: 'toddler-screen',
    stage: 'toddler', month: 18, category: 'health',
    title: { zh: '屏幕时间：不是非黑即白', en: `Screen Time: Not Black and White` },
    summary: { zh: '完全不接触不现实，放任不管也有害。关键是"内容"和"陪伴"。', en: `No contact at all isn't realistic, and free rein is harmful. The key is "content" and "company."` },
    content: { zh: `电子产品焦虑两极分化：要么严防死守，要么当电子保姆。其实有中间地带。

**权威建议（WHO）：**
- 1 岁以下不建议屏幕（视频通话除外）
- 1-2 岁：越少越好，如看需大人陪同
- 3-4 岁：每天累计不超过 1 小时，且选高质量内容

**比"时长"更关键的是：**
- 看什么：互动类、儿歌类、慢节奏优于快剪短视频
- 怎么看：陪着看、边看边聊 >> 扔给他自己刷
- 替代什么：屏幕占了本该跑跳、对话、睡觉的时间才有害

**现实建议：**
- 你累崩了用 20 分钟动画喘口气，不丢人，别内疚
- 设"无屏区/无屏时段"（吃饭、睡前 1 小时）
- 用真实互动替换无聊时的屏幕依赖

> 屏幕不是毒药也不是保姆。你陪着看的那 15 分钟，质量远高于他独自刷的 1 小时。`, en: `Screen anxiety splits in two: lock it down completely, or use it as an electronic babysitter. There's a middle ground.

**Authoritative advice (WHO):**
- Under 1: no screens (except video calls)
- 1–2: as little as possible, and only with an adult
- 3–4: no more than 1 hour total a day, of quality content

**What matters more than "time":**
- What: interactive, songs, slow pace beat fast-cut short videos
- How: watching together and talking >> handing it over to scroll alone
- What it replaces: screens only harm when they take time meant for running, talking, sleeping

**Realistic advice:**
- Using 20 min of cartoon to catch your breath when you're spent isn't shameful — don't feel guilty
- Set "no-screen zones/times" (meals, the hour before bed)
- Replace bored-screen time with real interaction

> Screens are neither poison nor babysitter. The 15 minutes you watch with him beat the hour he scrolls alone.` },
    tags: [{ zh: '屏幕', en: 'Screens' }, { zh: '电子产品', en: 'Devices' }, { zh: '短视频', en: 'Short videos' }],
    quickTip: { zh: '1-2岁越少越好需陪同，3-4岁每天≤1小时。陪着看>独自刷。', en: `1–2: as little as possible, with you. 3–4: ≤1 hr/day. Watching together beats scrolling alone.` }
  },
  {
    id: 'toddler-speech',
    stage: 'toddler', month: 20, category: 'development',
    title: { zh: '语言发育：贵人语迟吗', en: `Speech Development: Is Late Talking a Sign of Genius?` },
    summary: { zh: '说话晚不等于笨。但有几个时间点，值得认真评估而不是等。', en: `Late talking isn't stupidity. But there are points where it's worth a real evaluation, not just waiting.` },
    content: { zh: `"贵人语迟"是安慰，不是医学建议。语言发育有参考线，超太多该查。

**大致里程碑：**
- 12 个月：有意识叫爸妈、听懂简单指令
- 18 个月：能说 10-20 个词
- 24 个月：词组（"妈妈抱"）、约 50 词
- 3 岁：能说短句、陌生人能听懂大半

**需要评估的信号（别硬等）：**
- 18 个月仍几乎无有意义发音
- 24 个月不会组合两个词
- 任何年龄出现能力倒退（原会说现在不说了）

**能做的促进：**
- 多描述你在做的事（"我们在穿红色袜子"）
- 少问"这是什么"，多陈述；给他留回应空隙
- 减少背景电视（会抢走语言输入）
- 排除听力问题（中耳炎很常见）

> 早干预效果远好于晚干预。怀疑就说出来，评估一圈没问题，比干等一年强。`, en: `"Late talkers turn out fine" is comfort, not medical advice. Speech has reference lines; far past them, get it checked.

**Rough milestones:**
- 12 months: purposefully says mama/dada, follows simple instructions
- 18 months: says 10–20 words
- 24 months: two-word phrases ("mama hold"), about 50 words
- 3 years: short sentences, strangers understand most

**Signs worth evaluating (don't just wait):**
- At 18 months still almost no meaningful sounds
- At 24 months can't combine two words
- Any age shows skill loss (used to talk, now doesn't)

**What helps:**
- Narrate what you do ("we're putting on the red socks")
- Ask "what's this" less, state more; leave gaps for replies
- Cut background TV (it steals language input)
- Rule out hearing issues (ear infections are common)

> Early help works far better than late. Say it if you suspect; a clean evaluation beats a wasted year of waiting.` },
    tags: [{ zh: '语言', en: 'Speech' }, { zh: '说话晚', en: 'Late talking' }, { zh: '发育', en: 'Development' }],
    quickTip: { zh: '18个月几乎无发音、24个月不会组词、任何倒退——去评估，别等。', en: `At 18 months no sounds, at 24 no two-word phrases, any regression — get evaluated, don't wait.` }
  },
  {
    id: 'toddler-picky',
    stage: 'toddler', month: 15, category: 'feeding',
    title: { zh: '挑食与喂养战争', en: `Picky Eating and the Feeding Wars` },
    summary: { zh: '一顿饭追着喂、吐出来、只吃白米饭。这是控制权的较量，不是营养危机。', en: `Chasing him around to eat, spitting out, only white rice. This is a power struggle, not a nutrition crisis.` },
    content: { zh: `1 岁后很多孩子突然"挑食"，本质是自主意识觉醒 + 味觉敏感期叠加。

**先安心的事实：**
- 大多数挑食是阶段性的，不影响长期身高体重
- 孩子靠"本能"调节食量，你追着喂反而打乱他的饥饱感
- 重复接触 10-15 次，新食物才可能被接受

**减少战争的做法：**
- 提供"安全食物 + 一样新食物"搭配，不强迫吃新
- 固定就餐节奏，不零食不断、不边玩边喂
- 让他参与：自己抓食、选菜、摆碗
- 家长带头吃，不评价食物好坏

**警惕（需就医）：**
- 长期只吃极少数食物、体重不长、生长曲线下滑
- 吞咽明显困难、频繁呛咳

> 吃饭是孩子的本能，不是你的 KPI。你越用力，他越反抗。放松一点，饭桌气氛好了，胃口自然来。`, en: `After age 1 many kids suddenly turn "picky" — at root, budding autonomy plus a taste-sensitive phase.

**Reassuring facts first:**
- Most pickiness is a phase and doesn't affect long-term height or weight
- Kids self-regulate intake by instinct; chasing them to eat disrupts their hunger-fullness sense
- A new food may need 10–15 repeated exposures before it's accepted

**Ways to shrink the war:**
- Offer "safe food + one new food" — don't force the new one
- Keep a fixed meal rhythm; no endless snacks, no eating while playing
- Let him take part: self-feed, pick the dish, set the bowl
- Parents eat too, without judging foods good or bad

**Watch (see a doctor):**
- Long-term eats only a few foods, no weight gain, growth curve dropping
- Clearly hard to swallow, frequent choking

> Eating is a child's instinct, not your KPI. The harder you push, the more he resists. Relax; a happy table brings appetite naturally.` },
    tags: [{ zh: '挑食', en: 'Picky eating' }, { zh: '喂养', en: 'Feeding' }, { zh: '追喂', en: 'Chasing to feed' }],
    quickTip: { zh: '提供安全食物+1样新的，不强迫。固定节奏、不边玩边喂。体重不掉就别慌。', en: `Offer safe food + one new, no forcing. Fixed rhythm, no eating while playing. If weight holds, don't panic.` }
  },
  {
    id: 'toddler-separation',
    stage: 'toddler', month: 30, category: 'development',
    title: { zh: '入园分离焦虑：送托像上刑场', en: `Daycare Separation Anxiety: Drop-Off Feels Like the Execution Grounds` },
    summary: { zh: '撕心裂肺地哭，是你难受还是他难受？其实是你们俩都在练习告别。', en: `Heart-breaking tears — is it harder on you or him? Really, you're both practicing goodbye.` },
    content: { zh: `2.5-3 岁送托/入园，是很多家庭的"至暗时刻"——娃哭成泪人，你走两步回头看也想哭。

**为什么会这样：**
- 分离焦虑在 8-10 个月出现，2-3 岁因认知提升再次高峰
- 他能理解"妈妈走了"，但还不懂"妈妈会回来"
- 这是依恋健康的证明，不是性格问题

**送托过渡技巧：**
- 提前带他熟悉环境、认识老师
- 建立告别仪式（抱一下+说"下午接你"），说完就走，不反复回头
- 前期短时送去、准时接回，逐步拉长
- 在家玩"躲猫猫""妈妈去厨房马上回来"建立信任

**给家长的话：**
- 你越犹豫、越偷偷溜走，他越没安全感
- 老师见多了，大多数娃你一走就玩起来了
- 适应通常 2-4 周，个别更久，正常

> 你从容的告别，是孩子学会"妈妈走了还会回来"的第一课。`, en: `At 2.5–3, starting daycare or preschool is the "darkest hour" for many families — baby sobs, and you want to cry looking back after two steps.

**Why it happens:**
- Separation anxiety appears at 8–10 months and peaks again at 2–3 with growing cognition
- He understands "mom left" but not yet "mom will return"
- It's proof of healthy attachment, not a personality flaw

**Transition tips:**
- Familiarize him with the place and teacher ahead of time
- Build a goodbye ritual (a hug + "I'll pick you up this afternoon"), then leave — don't keep looking back
- Start with short stays and on-time pickups, gradually lengthen
- At home, play peekaboo and "mom goes to the kitchen, right back" to build trust

**For parents:**
- The more you hesitate or slip away secretly, the less safe he feels
- Teachers have seen it all; most kids play the moment you're gone
- Adjustment usually takes 2–4 weeks, sometimes longer — normal

> Your calm goodbye is the first lesson that "mom leaves and comes back."` },
    tags: [{ zh: '分离焦虑', en: 'Separation anxiety' }, { zh: '入园', en: 'Starting school' }, { zh: '送托', en: 'Daycare' }],
    quickTip: { zh: '告别说完就走别回头。你越犹豫他越没安全感。适应通常2-4周。', en: `Say goodbye and go, don't look back. The more you hesitate, the less safe he feels. Adjustment is usually 2–4 weeks.` }
  },
  {
    id: 'toddler-second',
    stage: 'toddler', month: 30, category: 'mama',
    title: { zh: '二胎：老大的爱与你的愧疚', en: `A Second Child: The Older Sibling's Love and Your Guilt` },
    summary: { zh: '怀二胎、生二胎，最大的焦虑往往不是钱，是"对老大不公平"。', en: `Expecting or having a second, the biggest anxiety often isn't money — it's "being unfair to the first."` },
    content: { zh: `决定要二胎或已经怀上，很多妈妈陷入双重愧疚：对老大的亏欠感，和对自己精力被分摊的担忧。

**老大可能出现的反应：**
- 退行行为（本来会的事突然不会了、尿裤子）
- 更黏人、更易怒、攻击弟弟妹妹
- 这不是"不懂事"，是他在用行为说"我还需要你"

**能做的：**
- 怀二胎后就跟老大预告，用他能懂的方式讲"宝宝来了"
- 每天保留"只属于老大"的 15 分钟（你和他的专属时间）
- 让老大参与（摸肚子、帮忙拿尿布），赋予"哥哥/姐姐"的角色感
- 不比较、不贴标签（"你是乖的，弟弟不懂事"反而伤老大）

**给你的宽慰：**
- 手足是礼物不是抢走的注意力
- 你不需要平分爱，每个孩子要的是"被看见"
- 短暂的混乱会过去，两个孩子的笑声是长期的

> 你不会少爱老大，你只是多了一个爱的人。给老大"专属时间"，比平分注意力更重要。`, en: `Deciding on or already expecting a second, many moms fall into double guilt: feeling they shortchange the first, and worry about split energy.

**Reactions the older child may show:**
- Regression (things he could do, suddenly not; wetting pants)
- Clingier, quicker to anger, aggressive toward the baby
- This isn't "being difficult" — it's him saying with behavior "I still need you"

**What you can do:**
- Once expecting, tell the first child ahead, in words he gets, that "a baby is coming"
- Keep a daily "first-child-only" 15 minutes (just you and him)
- Involve the first (touch the belly, fetch a diaper), give him the "big brother/sister" role
- Don't compare or label ("you're good, the baby isn't" actually hurts the first)

**Reassurance for you:**
- Siblings are a gift, not stolen attention
- You don't need to split love equally; each child needs to "be seen"
- The brief chaos passes; two kids' laughter lasts

> You won't love the first less — you'll just have one more person to love. "Special time" for the first matters more than splitting attention.` },
    tags: [{ zh: '二胎', en: 'Second child' }, { zh: '同胞', en: 'Siblings' }, { zh: '愧疚', en: 'Guilt' }],
    quickTip: { zh: '每天留15分钟只属于老大的专属时间。你不会少爱他，只是多了一个爱的人。', en: `Keep 15 minutes of first-child-only time daily. You won't love him less — just one more person to love.` }
  },
  {
    id: 'toddler-safety',
    stage: 'toddler', month: 15, category: 'health',
    title: { zh: '安全与意外：过度保护 vs 放手', en: `Safety and Accidents: Over-Protection vs. Letting Go` },
    summary: { zh: '会走会爬后家里处处是危险。焦虑的尽头是"怎么平衡保护和不束缚"。', en: `Once they walk and climb, the home is full of hazards. The end of anxiety is "how to protect without confining."` },
    content: { zh: `会走会爬的 toddler 是台没有刹车的小坦克，家里瞬间全是隐患。焦虑安全是正常的，但过度保护会阻碍探索。

**最高优先级（必须做）：**
- 药品、清洁剂、消毒液锁高处或上锁
- 电源孔保护盖、尖角防撞条
- 窗户限位器（防坠落，高层尤其）
- 热水调至 50°C 以下防烫伤

**需要警惕的意外：**
- 误食（纽扣电池、磁力珠、药片——纽扣电池极危险，误食立即急诊）
- 跌落（床、窗、楼梯）
- 溺水（浴缸、水桶，哪怕几厘米水也可能）

**平衡之道：**
- 环境做安全改造，比 24 小时盯人更可持续
- 允许安全的"冒险"（爬矮坡、玩土），锻炼能力也释放精力
- 学海姆立克和心肺复苏，有底气就不那么慌

> 你的目标不是零风险（不可能），是"把致命风险清零，把小磕碰留给他练胆"。`, en: `A walking, climbing toddler is a tank with no brakes; the home turns hazardous in an instant. Worrying about safety is normal, but over-protection blocks exploration.

**Top priority (must do):**
- Lock medicines, cleaners, disinfectants up high or away
- Outlet covers, corner guards
- Window limiters (against falls, especially upstairs)
- Set water heater below 50°C to prevent burns

**Accidents to watch:**
- Swallowing (button batteries, magnetic beads, pills — button batteries are extremely dangerous, ER immediately if swallowed)
- Falls (bed, window, stairs)
- Drowning (bathtub, bucket — even a few cm of water)

**The balance:**
- Make the environment safe; that's more sustainable than 24-hour watching
- Allow safe "risks" (low slopes, dirt play) to build skill and burn energy
- Learn the Heimlich and CPR; confidence calms the panic

> Your goal isn't zero risk (impossible) — it's "clear the fatal risks, leave the small bumps to build his nerve."` },
    tags: [{ zh: '安全', en: 'Safety' }, { zh: '意外', en: 'Accidents' }, { zh: '误食', en: 'Swallowing hazards' }],
    quickTip: { zh: '纽扣电池误食立即急诊！环境改造比24小时盯人可持续。致命风险清零即可。', en: `Swallowing a button battery = ER now! Environment fixes beat 24-hour watching. Just clear the fatal risks.` }
  },
  {
    id: 'toddler-sleep-regression',
    stage: 'toddler', month: 24, category: 'sleep',
    title: { zh: '2 岁睡眠倒退：哄睡回潮', en: `The 2-Year Sleep Regression: Bedtime Battles Return` },
    summary: { zh: '好不容易自主入睡，2 岁突然要陪睡、夜醒、不肯上床。不是退步，是发展阶段。', en: `Just when self-soothing clicked, at 2 they suddenly want company, wake at night, refuse bed. Not regression — a stage.` },
    content: { zh: `2 岁左右，不少家庭遭遇"睡眠倒退"：原本能自己睡的娃，突然要陪、要抱、夜醒找人。

**背后原因：**
- 想象力发展，开始怕黑、怕怪物
- 自主意识强，"不要睡觉"变成权力战场
- 白天刺激多、分离焦虑未消、出牙或生病

**应对：**
- 固定睡前程序，给"可控感"（选睡衣、选绘本）
- 怕黑：留小夜灯、陪"检查怪物"、给"守护娃娃"
- 陪睡逐步"退场"：坐床边→坐门口→门外，慢退
- 夜醒：简短安抚、不互动、送回自己床，保持一致
- 白天充分放电（运动+户外），但睡前 1 小时转安静

**别做的：**
- 每次夜醒都抱回大床——容易形成依赖难断
- 睡前训斥或恐吓——焦虑更睡不好

> 2岁睡眠倒退是大脑跳跃的信号。保持程序稳定，这波通常几周就过去。`, en: `Around 2, many families hit a "sleep regression": the kid who slept alone suddenly wants company, hugs, and wakes looking for you.

**What's behind it:**
- Imagination grows; fear of the dark and monsters appears
- Strong autonomy makes "no sleeping" a power battle
- Busy days, leftover separation anxiety, teething or illness

**How to cope:**
- Keep a fixed bedtime routine; give "a sense of control" (pick pajamas, pick the book)
- Fear of dark: leave a nightlight, "check for monsters" together, give a "guardian doll"
- Phase out company slowly: sit by bed → by door → outside, step back gradually
- Night waking: brief comfort, no interaction, back to own bed, stay consistent
- Burn energy by day (movement + outdoors), but calm down in the hour before bed

**Don't:**
- Bring him into your bed every wake — it builds a hard-to-break habit
- Scold or scare at bedtime — anxiety makes sleep worse

> The 2-year sleep regression is a sign of a brain leap. Keep the routine steady; this wave usually passes in a few weeks.` },
    tags: [{ zh: '睡眠倒退', en: 'Sleep regression' }, { zh: '陪睡', en: 'Co-sleeping' }, { zh: '2岁', en: '2 years' }],
    quickTip: { zh: '2岁倒退是大脑跳跃信号。睡前程序稳定+怕黑给小夜灯。几周会过去。', en: `The 2-year dip is a brain-leap signal. Steady routine + a nightlight for dark fears. It passes in weeks.` }
  },
]

// 宝宝月龄里程碑参考
export const milestones = [
  { month: 0, title: { zh: '能短暂抬头', en: 'Briefly lifts head' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 1, title: { zh: '视线追随人脸', en: 'Follows face with eyes' }, category: { zh: '认知', en: 'Cognitive' } },
  { month: 2, title: { zh: '社交性微笑', en: 'Social smile' }, category: { zh: '社交', en: 'Social' } },
  { month: 3, title: { zh: '抬头稳、会抓握', en: 'Holds head steady, reaches' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 4, title: { zh: '翻身（仰卧→俯卧）', en: 'Rolls over (back to tummy)' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 5, title: { zh: '能伸手抓物', en: 'Reaches for objects' }, category: { zh: '精细动作', en: 'Fine motor' } },
  { month: 6, title: { zh: '独坐（有支撑）', en: 'Sits alone (supported)' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 7, title: { zh: '开始咿呀学语', en: 'Starts babbling' }, category: { zh: '语言', en: 'Language' } },
  { month: 8, title: { zh: '匍匐爬行', en: 'Belly crawls' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 9, title: { zh: '能扶站', en: 'Pulls to stand' }, category: { zh: '大运动', en: 'Gross motor' } },
  { month: 10, title: { zh: '用拇指食指捏东西', en: 'Pincer grasp (thumb and finger)' }, category: { zh: '精细动作', en: 'Fine motor' } },
  { month: 11, title: { zh: '能发 mama/dada 等音节', en: 'Says syllables like mama/dada' }, category: { zh: '语言', en: 'Language' } },
  { month: 12, title: { zh: '可能迈出第一步', en: 'May take first steps' }, category: { zh: '大运动', en: 'Gross motor' } },
]
