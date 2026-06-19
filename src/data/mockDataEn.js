export const me = {
  years: '1-3',
  job: 'marketing',
  yearsLabel: '3 Years',
  jobLabel: 'Marketing',
}

export const filterOptions = {
  years: [
    { id: 'all', label: 'All Levels' },
    { id: '1-3', label: '1–3 Years' },
    { id: '4-6', label: '4–6 Years' },
    { id: '7-10', label: '7–10 Years' },
  ],
  jobs: [
    { id: 'all', label: 'All Jobs' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'dev', label: 'Dev' },
    { id: 'plan', label: 'Planning' },
    { id: 'design', label: 'Design' },
    { id: 'sales', label: 'Sales' },
    { id: 'hr', label: 'HR' },
  ],
}

export const categoryChips = [
  { id: 'all', label: 'All' },
  { id: 'time', label: '⏱ Time & Routine' },
  { id: 'comm', label: '💬 Communication' },
  { id: 'career', label: '📈 Career' },
  { id: 'culture', label: '🤝 Work Culture' },
  { id: 'leave', label: '🌴 Leave & Benefits' },
]

export function computeDataView(matrix, job, years) {
  if (!matrix) return null
  const jobRow = matrix[job] || matrix['all']
  if (!jobRow) return null
  const bars = [
    { label: '1–3 Yrs', value: jobRow['1-3'], highlight: years === '1-3' },
    { label: '4–6 Yrs', value: jobRow['4-6'], highlight: years === '4-6' },
    { label: '7–10 Yrs', value: jobRow['7-10'], highlight: years === '7-10' },
  ]
  const featured = years !== 'all' ? (jobRow[years] ?? jobRow.overall) : jobRow.overall
  return { bars, featured, n: jobRow.n }
}

export const mockData = {
  threads: [
    {
      id: 3,
      title: 'Can I skip the team dinner?',
      category: 'culture',
      question: "There's a team dinner this Friday but I have personal plans and can't make it. I'm a new hire — is it too awkward to skip?",
      tags: ['#TeamDinner', '#WorkCulture'],
      timestamp: '3 days ago',
      isOpen: false,
      aiAnswer: {
        headline: "It's fine if you have a valid reason.",
        highlight: 'Most teams are understanding if you ask in advance.',
        body: 'Analyzed 6 articles · 178 community posts.',
        dataSummary: 'Junior employees who skip team dinners are more likely to be understood than you might think.',
        communitySummary: 'Many found it went smoothly when they gave a brief heads-up beforehand.',
        dataCard: {
          title: 'Team Reaction When Skipping Dinner',
          matrix: {
            'all':       { '1-3': 62, '4-6': 55, '7-10': 49, 'overall': 57, 'n': 245 },
            'marketing': { '1-3': 65, '4-6': 58, '7-10': 52, 'overall': 60, 'n': 44 },
            'dev':       { '1-3': 68, '4-6': 61, '7-10': 55, 'overall': 63, 'n': 58 },
            'plan':      { '1-3': 60, '4-6': 53, '7-10': 47, 'overall': 55, 'n': 41 },
            'design':    { '1-3': 63, '4-6': 56, '7-10': 50, 'overall': 58, 'n': 34 },
            'sales':     { '1-3': 55, '4-6': 48, '7-10': 42, 'overall': 50, 'n': 38 },
            'hr':        { '1-3': 58, '4-6': 51, '7-10': 45, 'overall': 53, 'n': 30 },
          },
        },
        communityPosts: [
          { id: 5, title: 'The time I skipped a team dinner as a new hire', preview: 'I told my manager in advance and they were actually relieved. The team respected personal time.', role: 'Planning · 3 Yrs', comments: 19, likes: 44 },
          { id: 6, title: 'What do you think about forced team dinner attendance?', preview: "Things have changed, but some teams still give you a hard time for skipping.", role: 'Marketing · 6 Yrs', comments: 41, likes: 88 },
        ],
      },
      followUps: [],
      feedback: null,
    },
    {
      id: 2,
      title: 'What time should I arrive as a new hire?',
      category: 'time',
      question: 'First week on the job... I arrive about 10 minutes early but everyone else seems to be there before me. Should I come even earlier?',
      tags: ['#Commute', '#NewHire'],
      timestamp: 'Yesterday',
      isOpen: false,
      aiAnswer: {
        headline: '10 minutes early is enough.',
        highlight: 'Most teams expect you to arrive by the official start time.',
        body: 'Analyzed 12 articles · 203 community posts.',
        dataSummary: '1–3 year employees most commonly say arriving 10 minutes early is sufficient.',
        communitySummary: 'Consistency matters more than arriving very early, according to most.',
        dataCard: {
          title: 'Arrival Buffer for New Hires',
          matrix: {
            'all':       { '1-3': 48, '4-6': 35, '7-10': 28, 'overall': 41, 'n': 287 },
            'marketing': { '1-3': 52, '4-6': 38, '7-10': 30, 'overall': 44, 'n': 52 },
            'dev':       { '1-3': 44, '4-6': 31, '7-10': 25, 'overall': 38, 'n': 68 },
            'plan':      { '1-3': 50, '4-6': 36, '7-10': 29, 'overall': 42, 'n': 46 },
            'design':    { '1-3': 47, '4-6': 34, '7-10': 27, 'overall': 40, 'n': 39 },
            'sales':     { '1-3': 55, '4-6': 41, '7-10': 33, 'overall': 47, 'n': 48 },
            'hr':        { '1-3': 46, '4-6': 33, '7-10': 26, 'overall': 39, 'n': 34 },
          },
        },
        communityPosts: [
          { id: 3, title: 'How early do you arrive as a new hire?', preview: 'I also came too early my first week and felt awkward. 10 minutes early seems just right.', role: 'Dev · 2 Yrs', comments: 34, likes: 67 },
          { id: 4, title: "My manager said they don't like it when people come too early", preview: "My manager told me coming in too early made them feel pressured — just be on time.", role: 'HR · 4 Yrs', comments: 28, likes: 51 },
        ],
      },
      followUps: [],
      feedback: 'up',
    },
    {
      id: 1,
      title: 'Is it okay to eat lunch alone?',
      category: 'culture',
      question: "I want to save money by bringing lunch and eating alone this week, but everyone always goes out together. Can I just say I want to eat by myself?",
      tags: ['#WorkCulture', '#Lunch'],
      timestamp: '11:23 AM',
      isOpen: false,
      aiAnswer: {
        headline: "It's totally fine!",
        highlight: 'Teams that embrace solo lunches are becoming more common.',
        body: 'Analyzed 8 articles · 124 community posts.',
        dataSummary: 'Solo lunch rates are relatively higher among junior and creative roles.',
        communitySummary: "Most find it's well-received if you mention it naturally — like you brought your own food or have plans.",
        dataCard: {
          title: 'Solo Lunch Rate',
          matrix: {
            'all':       { '1-3': 44, '4-6': 38, '7-10': 31, 'overall': 38, 'n': 312 },
            'marketing': { '1-3': 48, '4-6': 42, '7-10': 35, 'overall': 42, 'n': 58 },
            'dev':       { '1-3': 51, '4-6': 45, '7-10': 38, 'overall': 46, 'n': 72 },
            'plan':      { '1-3': 40, '4-6': 34, '7-10': 28, 'overall': 35, 'n': 49 },
            'design':    { '1-3': 52, '4-6': 46, '7-10': 39, 'overall': 47, 'n': 41 },
            'sales':     { '1-3': 36, '4-6': 30, '7-10': 25, 'overall': 31, 'n': 55 },
            'hr':        { '1-3': 38, '4-6': 33, '7-10': 27, 'overall': 33, 'n': 37 },
          },
        },
        communityPosts: [
          { id: 1, title: 'The new hire who brought lunch every day', preview: "I felt awkward at first, but now even my manager brings lunch. Speaking up made the team more relaxed.", role: 'Marketing · 3 Yrs', comments: 21, likes: 35 },
          { id: 2, title: 'What do you think about eating lunch alone?', preview: "I was worried at first, but being honest about it opened things up. Turns out everyone prefers comfort.", role: 'Planning · 5 Yrs', comments: 16, likes: 42 },
        ],
      },
      followUps: [
        {
          id: 11,
          question: 'Then how do I tell my manager?',
          isLoading: false,
          aiAnswer: {
            headline: 'Bring it up casually.',
            highlight: '"I\'ll just grab something quick today" is enough.',
            body: 'Analyzed 89 community posts.',
            communitySummary: 'A short, casual comment works better than over-explaining.',
            dataCard: null,
            communityPosts: [],
          },
        },
      ],
      feedback: null,
    },
  ],
  allTags: ['All', '#WorkCulture', '#Commute', '#TeamDinner', '#Reporting', '#Lunch', '#NewHire'],
}

export const MOCK_NEW_TITLES = [
  'Can I say no to overtime?',
  'How do I start a salary negotiation?',
  "My manager's tone makes me uncomfortable",
  'How to use vacation without awkward stares',
  'How do I bring up a mistake I made?',
  'Can I apply for remote work?',
]

export const MOCK_NEW_ANSWER = {
  headline: "You can say no — but how you say it matters.",
  highlight: "Framing it as a capacity issue works better than a flat refusal.",
  body: 'Analyzed 9 articles · 142 community posts.',
  dataSummary: "Over 60% of junior employees have declined overtime at least once in their first 1–3 years.",
  communitySummary: "Many say giving advance notice and offering an alternative — like finishing first thing in the morning — makes it much easier.",
  dataCard: {
    title: "Employees Who've Declined Overtime",
    matrix: {
      'all':       { '1-3': 63, '4-6': 71, '7-10': 78, 'overall': 69, 'n': 214 },
      'marketing': { '1-3': 61, '4-6': 69, '7-10': 76, 'overall': 67, 'n': 39 },
      'dev':       { '1-3': 68, '4-6': 75, '7-10': 82, 'overall': 73, 'n': 52 },
      'plan':      { '1-3': 59, '4-6': 67, '7-10': 74, 'overall': 65, 'n': 33 },
      'design':    { '1-3': 65, '4-6': 73, '7-10': 79, 'overall': 70, 'n': 28 },
      'sales':     { '1-3': 54, '4-6': 62, '7-10': 70, 'overall': 61, 'n': 35 },
      'hr':        { '1-3': 60, '4-6': 68, '7-10': 75, 'overall': 66, 'n': 27 },
    },
  },
  communityPosts: [
    { id: 101, title: 'I said no to overtime for the first time', preview: "I told my manager I had a prior commitment. They were fine with it — giving a heads-up early was the key.", role: 'Marketing · 2 Yrs', comments: 18, likes: 41 },
    { id: 102, title: 'Is refusing overtime actually okay?', preview: "Depends on your team, but flagging it early and showing you're on top of your workload goes a long way.", role: 'Dev · 4 Yrs', comments: 27, likes: 55 },
  ],
}

export const MOCK_FOLLOWUP_ANSWER = {
  headline: 'Try a more specific approach.',
  highlight: 'One small phrase can shift the whole dynamic.',
  body: 'Analyzed 94 community posts.',
  communitySummary: 'Most suggest a short, specific sentence rather than escalating the situation.',
  dataCard: null,
  communityPosts: [],
}
