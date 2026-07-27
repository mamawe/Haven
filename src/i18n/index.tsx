import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Localized } from '../types'

export type Lang = 'zh' | 'en'

const LANG_KEY = 'parent-calm-lang'

function detectLang(): Lang {
  const saved = localStorage.getItem(LANG_KEY)
  if (saved === 'zh' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

// 取双语值：Localized 按语言取，字符串原样返回
export function pick(v: Localized | string | null | undefined, lang: Lang): string {
  if (v == null) return ''
  if (typeof v === 'string') return v
  return v[lang]
}

// ============ 全部 UI 文案字典（{ zh, en }） ============
export const UI: Record<string, Localized> = {
  // 应用名 / App name
  'app.name': { zh: '锚点', en: 'Haven' },

  // 底部导航 / Nav
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.scale': { zh: '自测', en: 'Check' },
  'nav.knowledge': { zh: '知识', en: 'Learn' },
  'nav.journal': { zh: '记录', en: 'Journal' },
  'nav.trends': { zh: '趋势', en: 'Trends' },
  'nav.firstaid': { zh: '急救', en: 'First Aid' },

  // 首页 / Home
  'home.subtitle': { zh: '育儿这条路你不需要完美', en: "On this parenting journey, you don't need to be perfect" },
  'home.babyAge': { zh: '宝宝 {n} 个月', en: 'Baby {n} months' },
  'home.setBabyBirthday': { zh: '设置宝宝生日，获取个性化内容', en: 'Set your baby’s birthday for personalized content' },
  'home.confirm': { zh: '确定', en: 'Done' },
  'home.recentSelfTest': { zh: '{name} · 最近自测', en: '{name} · Recent check' },
  'home.anxietySelfTest': { zh: '{name} · 焦虑自测', en: '{name} · Anxiety check' },
  'home.understand': { zh: '了解自己的情绪状态，只需 3 分钟', en: 'Understand your feelings in just 3 minutes' },
  'home.otherView': { zh: '{name}的视角', en: "{name}'s view" },
  'home.switchView': { zh: '切换查看 →', en: 'Switch view →' },
  'home.shareCard': { zh: '生成分享卡片', en: 'Create share card' },
  'home.shareCardDesc': { zh: '把今天的状态做成一张图，分享给在意的人', en: 'Turn today’s mood into a card to share with loved ones' },
  'home.qaScale': { zh: '焦虑自测', en: 'Anxiety check' },
  'home.qaScaleSub': { zh: '3 分钟了解自己', en: 'Know yourself in 3 min' },
  'home.qaKnowledge': { zh: '知识库', en: 'Knowledge base' },
  'home.qaKnowledgeSub': { zh: '分月龄育儿指南', en: 'Month-by-month guides' },
  'home.qaJournal': { zh: '每日记录', en: 'Daily journal' },
  'home.qaJournalSub': { zh: '情绪 + 宝宝日记', en: 'Mood + baby diary' },
  'home.qaTrends': { zh: '趋势追踪', en: 'Trend tracking' },
  'home.qaTrendsSub': { zh: '看见自己的变化', en: 'See your changes' },

  // 伴侣双视角对比洞察
  'home.compareTitle': { zh: '我们俩的状态', en: "How we're both doing" },
  'home.compareAvgAnxiety': { zh: '平均焦虑', en: 'Avg anxiety' },
  'home.compareAvgMood': { zh: '平均心情', en: 'Avg mood' },
  'home.compareAvgSleep': { zh: '平均睡眠', en: 'Avg sleep' },
  'home.compareNoData': { zh: '你和{name}都还没有足够的记录', en: "You and {name} don't have enough records yet" },
  'home.compareInsight.bothCalm': { zh: '你们最近都挺平稳，真好', en: "You're both steady lately — that's lovely" },
  'home.compareInsight.youHigher': { zh: '你最近的焦虑比{name}略高，记得照顾好自己', en: 'Your anxiety has been a bit higher than {name}’s — be kind to yourself' },
  'home.compareInsight.partnerHigher': { zh: '{name}最近焦虑略高，多给对方一些支持', en: '{name} has been a bit more anxious — a little support goes a long way' },
  'home.compareInsight.similar': { zh: '你和{name}的状态很接近', en: "You and {name} are in a similar place" },
  'home.compareInsight.oneMissing': { zh: '{name}的记录还不够，多鼓励对方也记一记', en: "{name} doesn't have enough entries yet — encourage them to log too" },

  // 自测量表 / Scale
  'scale.title': { zh: '焦虑自测', en: 'Anxiety Self-Check' },
  'scale.part1': { zh: 'Part 1 · 情绪状态', en: 'Part 1 · Emotional State' },
  'scale.part1sub': { zh: '产后情绪筛查', en: 'Postpartum mood screening' },
  'scale.part2': { zh: 'Part 2 · 育儿焦虑', en: 'Part 2 · Parenting Anxiety' },
  'scale.part2sub': { zh: '带娃具体焦虑', en: 'Specific caregiving worries' },
  'scale.twoParts': { zh: '本测试分为 两个部分，请按顺序完成：', en: 'This check has two parts. Please complete them in order:' },
  'scale.twoPartsHint': { zh: '两部分之间有明确的分段提示，做完 Part 1 会先停留再进入 Part 2', en: 'There’s a clear pause between the two parts — after Part 1 you’ll pause before entering Part 2' },
  'scale.start': { zh: '开始测试', en: 'Start' },
  'scale.chooseLength': { zh: '选择测试长度', en: 'Choose test length' },
  'scale.standard': { zh: '标准版', en: 'Standard' },
  'scale.standardDesc': { zh: '每部分 10 题 · 约 4 分钟', en: '10 questions each · ~4 min' },
  'scale.standardNote': { zh: '完整量表，结果最可靠', en: 'Full scale, most reliable' },
  'scale.quick': { zh: '快速版', en: 'Quick' },
  'scale.quickDesc': { zh: '每部分 7 题 · 约 2 分钟', en: '7 questions each · ~2 min' },
  'scale.quickNote': { zh: '精选高区分度题目', en: 'High-discrimination items' },
  'scale.disclaimer': { zh: '⚠️ 本测试为自测工具，不能替代专业心理评估。如果持续感到情绪低落，请咨询专业医生。', en: '⚠️ This is a self-check tool and cannot replace professional evaluation. If low mood persists, please consult a doctor.' },
  'scale.startStandard': { zh: '标准版 20 题', en: 'Standard · 20 questions' },
  'scale.startQuick': { zh: '快速版 14 题', en: 'Quick · 14 questions' },
  'scale.part1done': { zh: 'Part 1 完成', en: 'Part 1 done' },
  'scale.part1doneSub': { zh: '情绪状态筛查已作答', en: 'Emotional screening completed' },
  'scale.part1tag': { zh: '✓ Part 1 情绪状态', en: '✓ Part 1 Emotional' },
  'scale.part2tag': { zh: 'Part 2 育儿焦虑', en: 'Part 2 Parenting' },
  'scale.part2intro': { zh: '接下来是 Part 2 · 育儿焦虑，聚焦你在带娃过程中的具体焦虑点。', en: 'Next is Part 2 · Parenting Anxiety — your specific worries while caregiving.' },
  'scale.part2remain': { zh: '快速版剩余 {n} 题', en: '{n} questions left' },
  'scale.enterPart2': { zh: '进入 Part 2 →', en: 'Enter Part 2 →' },
  'scale.result': { zh: '测评结果', en: 'Your Results' },
  'scale.viewOf': { zh: '{name} 的视角', en: "{name}'s view" },
  'scale.fullLabel': { zh: '标准版（20 题）', en: 'Standard (20 questions)' },
  'scale.quickLabel': { zh: '快速版（14 题）', en: 'Quick (14 questions)' },
  'scale.selfRef': { zh: '仅供自我参考', en: 'For self-reference only' },
  'scale.part1Score': { zh: '情绪状态（Part 1）', en: 'Emotional State (Part 1)' },
  'scale.part2Score': { zh: '育儿焦虑（Part 2）', en: 'Parenting Anxiety (Part 2)' },
  'scale.suggestions': { zh: '给你的建议', en: 'Suggestions for you' },
  'scale.highAlert': { zh: '你的分数提示需要关注心理健康', en: 'Your score suggests paying attention to your mental health' },
  'scale.hotline': { zh: '全国心理援助热线：', en: 'National mental-health hotline:' },
  'scale.seekHelp': { zh: '求助不是软弱，是保护自己和宝宝的第一步。', en: 'Seeking help isn’t weakness — it’s the first step to protecting yourself and your baby.' },
  'scale.retake': { zh: '重新测试', en: 'Retake' },
  'scale.partLabel1': { zh: 'Part 1 / 2 · 情绪状态', en: 'Part 1/2 · Emotional' },
  'scale.partLabel2': { zh: 'Part 2 / 2 · 育儿焦虑', en: 'Part 2/2 · Parenting' },
  'scale.part2hint': { zh: '这是 Part 2，关注带娃过程中的具体焦虑', en: 'This is Part 2 — your specific caregiving worries' },
  'scale.level.low': { zh: '整体状态良好', en: 'Overall you’re doing well' },
  'scale.level.moderate': { zh: '轻度焦虑，建议自我关怀', en: 'Mild anxiety — practice self-care' },
  'scale.level.high': { zh: '焦虑偏高，建议寻求支持', en: 'Elevated anxiety — reach out for support' },
  'scale.level.severe': { zh: '建议寻求专业帮助', en: 'Consider professional help' },

  // 知识库 / Knowledge
  'knowledge.title': { zh: '知识库', en: 'Knowledge Base' },
  'knowledge.cat.all': { zh: '全部', en: 'All' },
  'knowledge.cat.sleep': { zh: '睡眠', en: 'Sleep' },
  'knowledge.cat.feeding': { zh: '喂养', en: 'Feeding' },
  'knowledge.cat.development': { zh: '发育', en: 'Development' },
  'knowledge.cat.health': { zh: '健康', en: 'Health' },
  'knowledge.cat.mama': { zh: '妈妈', en: 'For Mom' },
  'knowledge.stage.prepregnancy': { zh: '备孕', en: 'Preparing' },
  'knowledge.stage.pregnancy': { zh: '孕期', en: 'Pregnancy' },
  'knowledge.stage.infant': { zh: '0-1岁', en: '0-1 yr' },
  'knowledge.stage.toddler': { zh: '1-3岁', en: '1-3 yr' },
  'knowledge.period.all': { zh: '全部', en: 'All' },
  'knowledge.newborn': { zh: '新生儿', en: 'Newborn' },
  'knowledge.period.t1': { zh: '孕早期', en: 'First trimester' },
  'knowledge.period.t2': { zh: '孕中期', en: 'Second trimester' },
  'knowledge.period.t3': { zh: '孕晚期', en: 'Third trimester' },
  'knowledge.period.toddler12': { zh: '1-2岁', en: '1-2 yr' },
  'knowledge.period.toddler23': { zh: '2-3岁', en: '2-3 yr' },
  'knowledge.searchPlaceholder': { zh: '搜索你关心的问题...', en: 'Search what’s on your mind...' },
  'knowledge.empty': { zh: '没有找到相关内容', en: 'No matching articles' },
  'knowledge.emptySub': { zh: '试试换个阶段或分类', en: 'Try a different stage or category' },

  // 每日记录 / Journal
  'journal.title': { zh: '每日记录', en: 'Daily Journal' },
  'journal.moodQ': { zh: '今天整体心情如何？', en: 'How’s your overall mood today?' },
  'journal.mood.0': { zh: '很糟', en: 'Awful' },
  'journal.mood.1': { zh: '不太好', en: 'Not great' },
  'journal.mood.2': { zh: '一般', en: 'Okay' },
  'journal.mood.3': { zh: '还不错', en: 'Good' },
  'journal.mood.4': { zh: '很好', en: 'Great' },
  'journal.anxietyQ': { zh: '今天的焦虑程度', en: "Today’s anxiety level" },
  'journal.anxietyCalm': { zh: '很平静', en: 'Calm' },
  'journal.anxietyHigh': { zh: '非常焦虑', en: 'Very anxious' },
  'journal.sleepQ': { zh: '昨晚睡了几小时？', en: 'Hours slept last night?' },
  'journal.sleepHour': { zh: '小时', en: 'hrs' },
  'journal.sleepTip': { zh: '睡眠不足会放大焦虑。试试和伴侣商量轮流带夜。', en: 'Poor sleep amplifies anxiety. Try taking turns with your partner on night duties.' },
  'journal.milestoneQ': { zh: '宝宝今天有什么新变化？', en: 'What’s new with your baby today?' },
  'journal.milestonePh': { zh: '比如：第一次翻身、笑出了声、抓到了玩具...', en: 'e.g. first roll, first laugh, grabbed a toy...' },
  'journal.gratitude': { zh: '✨ 今天的一件好事', en: '✨ One good thing today' },
  'journal.gratitudeSub': { zh: '每天写下至少一件让你感到温暖或感恩的小事。这个练习被证明能有效提升情绪。', en: 'Write down at least one small thing that warmed you or you felt grateful for. Proven to lift mood.' },
  'journal.gratitudePh': { zh: '比如：宝宝对我笑了、伴侣帮我带了半小时娃、喝到了一杯热咖啡...', en: 'e.g. baby smiled at me, partner took the baby for 30 min, a hot coffee...' },
  'journal.noteQ': { zh: '还想记点什么？', en: 'Anything else to note?' },
  'journal.notePh': { zh: '自由书写...', en: 'Free writing...' },
  'journal.save': { zh: '保存记录', en: 'Save entry' },
  'journal.saved': { zh: '✅ 保存成功', en: '✅ Saved' },

  // 趋势 / Trends
  'trends.title': { zh: '趋势追踪', en: 'Trends' },
  'trends.viewOf': { zh: '{name} 的视角', en: "{name}'s view" },
  'trends.scaleCount': { zh: '次自测', en: 'checks' },
  'trends.journalCount': { zh: '天记录', en: 'days logged' },
  'trends.avgAnxiety': { zh: '平均焦虑 /10', en: 'Avg anxiety /10' },
  'trends.avgMood': { zh: '平均心情 /5', en: 'Avg mood /5' },
  'trends.shareCard': { zh: '生成分享卡片', en: 'Create share card' },
  'trends.shareCardDesc': { zh: '把 {name} 的状态做成一张图，分享出去', en: 'Turn {name}’s status into a shareable card' },
  'trends.anxietyTrend': { zh: '近 14 天焦虑趋势', en: 'Anxiety trend (14 days)' },
  'trends.keepRecording': { zh: '坚持每天记录，就能看到自己的变化轨迹', en: 'Keep daily logging to see your trajectory' },
  'trends.noData': { zh: '还没有足够的数据', en: 'Not enough data yet' },
  'trends.noDataSub': { zh: '坚持记录几天就能看到趋势了', en: 'Log for a few days to see trends' },
  'trends.moodCalendar': { zh: '近 30 天心情日历', en: 'Mood calendar (30 days)' },
  'trends.legend.bad': { zh: '差', en: 'Low' },
  'trends.legend.mid': { zh: '一般', en: 'Neutral' },
  'trends.legend.good': { zh: '好', en: 'Good' },
  'trends.legend.none': { zh: '无记录', en: 'No data' },
  'trends.weekday.mon': { zh: '一', en: 'M' },
  'trends.weekday.tue': { zh: '二', en: 'T' },
  'trends.weekday.wed': { zh: '三', en: 'W' },
  'trends.weekday.thu': { zh: '四', en: 'T' },
  'trends.weekday.fri': { zh: '五', en: 'F' },
  'trends.weekday.sat': { zh: '六', en: 'S' },
  'trends.weekday.sun': { zh: '日', en: 'S' },
  'trends.history': { zh: '自测历史', en: 'Assessment history' },
  'trends.level.low': { zh: '良好', en: 'Good' },
  'trends.level.moderate': { zh: '轻度', en: 'Mild' },
  'trends.level.high': { zh: '偏高', en: 'Elevated' },
  'trends.level.severe': { zh: '需关注', en: 'Watch' },

  // 急救箱 / First Aid
  'firstaid.title': { zh: '焦虑急救箱', en: 'Anxiety First-Aid Kit' },
  'firstaid.sub': { zh: '情绪上头时，先别想，跟着做', en: 'When emotions spike, just follow along' },
  'breath.title': { zh: '箱式呼吸', en: 'Box Breathing' },
  'breath.sub': { zh: '吸气 4 秒 · 屏息 4 秒 · 呼气 4 秒 · 屏息 4 秒', en: 'Inhale 4s · Hold 4s · Exhale 4s · Hold 4s' },
  'breath.rounds': { zh: '已完成 {n} 轮', en: '{n} rounds done' },
  'breath.start': { zh: '开始呼吸', en: 'Start' },
  'breath.continue': { zh: '继续', en: 'Continue' },
  'breath.stop': { zh: '停止', en: 'Stop' },
  'breath.inhale': { zh: '吸气', en: 'Inhale' },
  'breath.hold': { zh: '屏息', en: 'Hold' },
  'breath.exhale': { zh: '呼气', en: 'Exhale' },
  'ground.title': { zh: '5-4-3-2-1 grounding', en: '5-4-3-2-1 Grounding' },
  'ground.sub': { zh: '焦虑时大脑在跑，用感官把它拉回此刻。逐项点一下，数够数量。', en: 'When anxious, your mind races. Use your senses to bring it back. Tap each to count.' },
  'ground.done': { zh: '✓ 做得好。你已经被拉回此刻了。', en: '✓ Well done. You’re back in the present moment.' },
  'ground.see': { zh: '看见', en: 'See' },
  'ground.hear': { zh: '听见', en: 'Hear' },
  'ground.touch': { zh: '触摸', en: 'Touch' },
  'ground.smell': { zh: '闻到', en: 'Smell' },
  'ground.taste': { zh: '尝到', en: 'Taste' },
  'ground.hint.see': { zh: '5 样你能看到的东西', en: '5 things you can see' },
  'ground.hint.hear': { zh: '4 种你能听到的声音', en: '4 sounds you can hear' },
  'ground.hint.touch': { zh: '3 样你能摸到的质感', en: '3 textures you can feel' },
  'ground.hint.smell': { zh: '2 种你能闻到的气味', en: '2 scents you can smell' },
  'ground.hint.taste': { zh: '1 种你能尝到的味道', en: '1 taste you can notice' },
  'reassurance.title': { zh: '一句话，先稳住', en: 'One line to steady you' },
  'reassurance.prev': { zh: '← 上一条', en: '← Prev' },
  'reassurance.next': { zh: '下一条 →', en: 'Next →' },
  'firstaid.journal': { zh: '记一笔此刻', en: 'Note this moment' },
  'firstaid.journalSub': { zh: '把现在的感受写下来，会轻一点', en: 'Writing down how you feel right now can lighten it' },

  // 今日一句 / Daily Whisper
  'whisper.label': { zh: '今日一句', en: 'Daily Whisper' },
  'whisper.reminderTitle': { zh: '每日温和提醒', en: 'Gentle daily reminder' },
  'whisper.reminderOn': { zh: '每天 {time} 一句暖心话', en: 'A warm note at {time} daily' },
  'whisper.reminderOff': { zh: '开启后每天推一句', en: 'Get one each day when enabled' },
  'whisper.notSupported': { zh: '当前浏览器不支持通知', en: 'Notifications unsupported here' },
  'whisper.timeLabel': { zh: '提醒时间', en: 'Reminder time' },
  'whisper.denied': { zh: '通知被浏览器拒绝，请在站点设置里允许通知后重试。今日一句仍会显示。', en: 'Notifications blocked. Allow them in site settings, then retry. Today’s whisper still shows.' },

  // 档案称呼 / Profile
  'profile.title': { zh: '档案称呼', en: 'Profile Names' },
  'profile.sub': { zh: '给两个视角起个你喜欢的名字', en: 'Name the two perspectives' },
  'profile.me': { zh: '我的视角', en: 'My view' },
  'profile.partner': { zh: '伴侣的视角', en: "Partner's view" },
  'profile.placeholderMe': { zh: '我', en: 'Me' },
  'profile.placeholderPartner': { zh: '伴侣', en: 'Partner' },
  'profile.cancel': { zh: '取消', en: 'Cancel' },
  'profile.save': { zh: '保存', en: 'Save' },
  'profile.editAria': { zh: '编辑称呼', en: 'Edit names' },

  // 数据备份 / Data backup
  'profile.backupTitle': { zh: '数据备份', en: 'Data Backup' },
  'profile.backupHint': { zh: '所有数据只存在你的设备本地。建议定期导出备份，换设备或清缓存前尤其重要。', en: 'All data lives only on this device. Export a backup regularly — especially before switching devices or clearing cache.' },
  'profile.export': { zh: '导出备份', en: 'Export backup' },
  'profile.import': { zh: '导入备份', en: 'Import backup' },
  'profile.clear': { zh: '清空全部数据', en: 'Clear all data' },
  'profile.exportDone': { zh: '已导出备份文件', en: 'Backup file exported' },
  'profile.importDone': { zh: '备份已导入', en: 'Backup imported' },
  'profile.importFail': { zh: '导入失败：文件格式不正确', en: 'Import failed: invalid file' },
  'profile.clearConfirm': { zh: '确定清空全部数据？此操作不可恢复。', en: 'Clear all data? This cannot be undone.' },

  // 分享卡片 / Share Card
  'share.title': { zh: '分享卡片', en: 'Share Card' },
  'share.chooseBg': { zh: '选择卡片背景', en: 'Choose a background' },
  'share.close': { zh: '关闭', en: 'Close' },
  'share.saveImg': { zh: '保存图片', en: 'Save Image' },
  'share.saved': { zh: '已保存 ✓', en: 'Saved ✓' },
  'share.statusDefault': { zh: '今天也在好好照顾自己', en: 'Taking good care of yourself today' },
  'share.todayStatus': { zh: '{name} · 今日状态', en: "{name} · Today's status" },
  'share.anxietyToday': { zh: '今日焦虑 {n}/10', en: 'Anxiety {n}/10' },
  'share.tagline': { zh: '育儿这条路，你不需要完美', en: "On this parenting journey, you don't need to be perfect" },
  'share.captionLabel': { zh: '分享文案（可编辑）', en: 'Caption (editable)' },
  'share.captionPlaceholder': { zh: '写点什么，或点下方按钮根据今日记录生成…', en: 'Write something, or tap below to generate from today…' },
  'share.generate': { zh: '根据今日记录生成', en: 'Generate from today' },

  // 答案之书 / Book of Answers
  'answerbook.title': { zh: '答案之书', en: 'Book of Answers' },
  'answerbook.hint': { zh: '在心里默念一个问题，然后翻开书。', en: 'Hold a question in your heart, then open the book.' },
  'answerbook.open': { zh: '翻开答案之书', en: 'Open the Book' },
  'answerbook.flipping': { zh: '正在翻页…', en: 'Turning the pages…' },
  'answerbook.again': { zh: '再翻一次', en: 'Flip again' },
  'answerbook.close': { zh: '关闭', en: 'Close' },
  'home.answerBook': { zh: '答案之书', en: 'Book of Answers' },
  'home.answerBookDesc': { zh: '心里有疑问？让书替你翻一页。', en: 'A question on your mind? Let the book turn a page.' },

  // 主题 / Theme
  'theme.label': { zh: '切换主题', en: 'Theme' },
  'theme.choose': { zh: '选择主题风格', en: 'Choose a theme' },
  'theme.calm': { zh: '暖杏', en: 'Warm Apricot' },
  'theme.calmDesc': { zh: '温暖米杏色', en: 'Warm beige' },
  'theme.ocean': { zh: '深海', en: 'Deep Sea' },
  'theme.oceanDesc': { zh: '沉静海蓝色', en: 'Calm sea blue' },
  'theme.blossom': { zh: '樱花', en: 'Blossom' },
  'theme.blossomDesc': { zh: '柔嫩樱粉色', en: 'Soft cherry pink' },

  // 语言 / Language
  'lang.label': { zh: '语言', en: 'Language' },
  'lang.zh': { zh: '中文', en: '中文' },
  'lang.en': { zh: 'EN', en: 'EN' },

  // 错误边界 / Error Boundary
  'error.title': { zh: '出了点小问题', en: 'Something went wrong' },
  'error.sub': { zh: '别担心，你的数据都还在。刷新一下试试。', en: 'Don’t worry — your data is safe. Try refreshing.' },
  'error.reload': { zh: '刷新', en: 'Reload' },

  // SW 更新提示 / Update banner
  'update.title': { zh: '发现新版本', en: 'A new version is available' },
  'update.reload': { zh: '立即更新', en: 'Update now' },

  // 新手引导 / Onboarding
  'onboard.title': { zh: '欢迎来到 锚点', en: 'Welcome to Haven' },
  'onboard.sub': { zh: '先花 20 秒，让我们更懂你', en: '20 seconds to personalize your experience' },
  'onboard.role': { zh: '你的角色是？', en: 'Your role?' },
  'onboard.roleMom': { zh: '妈妈', en: 'Mom' },
  'onboard.roleDad': { zh: '爸爸', en: 'Dad' },
  'onboard.roleOther': { zh: '其他照护者', en: 'Other caregiver' },
  'onboard.babyStage': { zh: '宝宝现在处于？', en: 'Where is your baby now?' },
  'onboard.stagePre': { zh: '备孕中', en: 'Trying to conceive' },
  'onboard.stagePreg': { zh: '孕期', en: 'Pregnancy' },
  'onboard.stageBorn': { zh: '已出生', en: 'Already born' },
  'onboard.stageUnsure': { zh: '还不确定', en: 'Not sure yet' },
  'onboard.birthday': { zh: '宝宝生日', en: 'Baby’s birthday' },
  'onboard.next': { zh: '下一步', en: 'Next' },
  'onboard.start': { zh: '开始使用', en: 'Get started' },
  'onboard.skip': { zh: '跳过', en: 'Skip' },

  // 知识库收藏 / Knowledge favorites & weekly rec
  'knowledge.weekRec': { zh: '本周推荐', en: 'Recommended this week' },
  'knowledge.favorites': { zh: '我的收藏', en: 'My favorites' },
  'knowledge.favEmpty': { zh: '还没有收藏，点文章右上角 ★ 收藏', en: 'No favorites yet — tap ★ on an article' },
  'knowledge.favTab': { zh: '收藏', en: 'Favorites' },
  'knowledge.favAria': { zh: '收藏', en: 'Favorite' },
  'knowledge.unfavAria': { zh: '取消收藏', en: 'Unfavorite' },

  // 趋势多指标 / Trends multi-metric
  'trends.moodTrend': { zh: '心情趋势', en: 'Mood trend' },
  'trends.sleepTrend': { zh: '睡眠趋势', en: 'Sleep trend' },
  'trends.insight': { zh: '关联洞察', en: 'Insight' },
  'trends.insightSleep': { zh: '睡眠更充足的日子，焦虑平均低 {d} 分', en: 'On better-slept days, anxiety averages {d} points lower' },
  'trends.insightMood': { zh: '心情更好的日子，焦虑平均低 {d} 分', en: 'On better-mood days, anxiety averages {d} points lower' },
  'trends.insightNone': { zh: '继续记录，洞察会越来越多', en: 'Keep logging — insights grow over time' },
  'trends.showAnxiety': { zh: '焦虑', en: 'Anxiety' },
  'trends.showMood': { zh: '心情', en: 'Mood' },
  'trends.showSleep': { zh: '睡眠', en: 'Sleep' },

  // 焦虑急救 · 紧急求助 / First Aid emergency
  'firstaid.emergency': { zh: '需要紧急帮助？', en: 'Need urgent help?' },
  'firstaid.emergencyDesc': { zh: '如果你或宝宝处于危险中，请立即寻求紧急帮助', en: 'If you or your baby are in danger, get emergency help now' },
  'firstaid.callHotline': { zh: '拨打心理援助热线', en: 'Call mental-health hotline' },
  'firstaid.hotlineNote': { zh: '专业咨询师接听，免费、保密', en: 'Staffed by professional counselors — free & confidential' },
  'firstaid.region': { zh: '所在地区', en: 'Your region' },
  'firstaid.regionCN': { zh: '中国大陆', en: 'Mainland China' },
  'firstaid.regionHK': { zh: '中国香港', en: 'Hong Kong, China' },
  'firstaid.regionTW': { zh: '中国台湾', en: 'Taiwan, China' },
  'firstaid.regionUS': { zh: '美国', en: 'United States' },
  'firstaid.regionUK': { zh: '英国', en: 'United Kingdom' },
}

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  L: (v: Localized | string | null | undefined) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const t = (key: string) => pick(UI[key], lang)
  const L = (v: Localized | string | null | undefined) => pick(v, lang)

  return (
    <I18nContext.Provider value={{ lang, setLang, t, L }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
