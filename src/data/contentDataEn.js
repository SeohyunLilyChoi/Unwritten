export const CONTENT_TYPES = {
  poll:    { key: 'poll',    label: 'Poll',            color: '#3B5BFF', soft: '#EEF1FF', ink: '#1E3AD1' },
  article: { key: 'article', label: 'Article',         color: '#D97757', soft: '#FBEFE8', ink: '#8E4322' },
  contest: { key: 'contest', label: 'Contest',         color: '#7A5BFF', soft: '#F1EDFF', ink: '#4B32B8' },
  word:    { key: 'word',    label: 'Word of the Day', color: '#16A34A', soft: '#E7F6EC', ink: '#0E6A2E' },
  tip:     { key: 'tip',     label: 'Tip',             color: '#0EA5E9', soft: '#E4F4FC', ink: '#0A6A95' },
}

export const CONTENT_TOPICS = [
  { id: 'all',     label: 'All' },
  { id: 'time',    label: '⏱ Time & Routine' },
  { id: 'comm',    label: '💬 Communication' },
  { id: 'career',  label: '📈 Career' },
  { id: 'culture', label: '🤝 Work Culture' },
  { id: 'leave',   label: '🌴 Leave & Benefits' },
  { id: 'money',   label: '💰 Money & Negotiation' },
]

export const CONTENT_POLLS = [
  {
    id: 'poll-1', type: 'poll', topic: 'time',
    title: 'Seniors, how early do you usually arrive for work?',
    audience: '#NewHire', nParticipants: 2147, daysLeft: 3,
    options: [
      { label: 'Right on time (±5 min)', pct: 38, self: false },
      { label: '10 minutes early',        pct: 41, self: true  },
      { label: '20+ minutes early',       pct: 21, self: false },
    ],
  },
  {
    id: 'poll-2', type: 'poll', topic: 'money',
    title: "5 minutes before clocking out… you've wrapped up. What do you do?",
    audience: '#Everyone', nParticipants: 1284, daysLeft: 5,
    options: [
      { label: 'A. Quietly start packing up', pct: 54, self: false },
      { label: 'B. Wait nervously for others', pct: 46, self: false },
    ],
  },
  {
    id: 'poll-3', type: 'poll', topic: 'comm',
    title: 'After the first round of team drinks, what do you do?',
    audience: '#NewHire', nParticipants: 892, daysLeft: 2,
    options: [
      { label: 'Always go to round 2',     pct: 18, self: false },
      { label: 'Read the room and decide', pct: 47, self: false },
      { label: 'Leave after round 1',      pct: 35, self: false },
    ],
  },
]

export const CONTENT_ARTICLES = [
  {
    id: 'art-1', type: 'article', topic: 'comm',
    title: "How today's managers really communicate with their teams (feat. 1-on-1s)",
    excerpt: "A 1-on-1 is a rhythm, not a formality. 30 minutes a week, 3 questions — that's all it takes. We asked 3 managers with 10+ years of experience.",
    minutes: 5, tag: '#WorkCulture', author: 'Editorial Team', date: 'Apr 19, 2024',
    cover: 'linear-gradient(135deg, #FFE4D4 0%, #F5C7A8 100%)',
  },
  {
    id: 'art-2', type: 'article', topic: 'career',
    title: '3 moments that make 3rd-year employees decide to job-hop',
    excerpt: "When growth slows down, when there's no one left to learn from, when salary hasn't changed in over a year.",
    minutes: 7, tag: '#Career', author: 'Min-ji Oh', date: 'Apr 17, 2024',
    cover: 'linear-gradient(135deg, #E4ECFF 0%, #B8C9FF 100%)',
  },
  {
    id: 'art-3', type: 'article', topic: 'money',
    title: 'In salary negotiations, "evidence" matters more than numbers',
    excerpt: '2 market comparisons · 1 performance point · 1 desired range. Just prepare these four lines.',
    minutes: 4, tag: '#SalaryNegotiation', author: 'Editorial Team', date: 'Apr 15, 2024',
    cover: 'linear-gradient(135deg, #E7F6EC 0%, #B8E0C5 100%)',
  },
]

export const CONTENT_CONTESTS = [
  {
    id: 'con-1', type: 'contest', topic: 'culture',
    title: 'Bizarre Company Culture Contest',
    excerpt: "Everyone's \"normal\" is different. Share the weirdest customs at your company.",
    prize: '₩1,000,000', daysLeft: 4, nApplied: 327, tag: '#Contest',
  },
  {
    id: 'con-2', type: 'contest', topic: 'time',
    title: 'My Morning Commute Routine Photo Challenge',
    excerpt: 'Share a photo of your commute scenery, morning meal, or routine tips.',
    prize: 'Starbucks Gift Card', daysLeft: 12, nApplied: 164, tag: '#Challenge',
  },
]

export const CONTENT_WORDS = [
  {
    id: 'word-1', type: 'word', topic: 'comm',
    word: '컴해요',
    options: [
      'A farewell expression',
      'Short for "communicate"',
      'An expression to file a complaint',
      'Asking someone to do computer work',
    ],
    answer: 1,
    explanation: 'Short for "커뮤니케이션 해요" (let\'s communicate). Used in messaging to quickly notify or request something.',
    example: '"Can you 컴해요 this file before 3pm today?"',
  },
  {
    id: 'word-2', type: 'word', topic: 'work',
    word: '롤백',
    options: [
      'Starting a new project',
      'Requesting approval again',
      'Reverting to a previous state',
      'Delegating work to someone',
    ],
    answer: 2,
    explanation: "Originally an IT term, but in the workplace it broadly means reverting a decision or task to its previous state.",
    example: '"Let\'s 롤백 the direction and go back to the original plan."',
  },
  {
    id: 'word-3', type: 'word', topic: 'culture',
    word: '사바사',
    options: [
      'Short for "manager-obsessed employee"',
      'Short for "person by person"',
      'Expression for life outside the office',
      'Short for "in-office viral example"',
    ],
    answer: 1,
    explanation: '"Person by Person" — used when an outcome or situation varies depending on the individual.',
    example: '"Whether overtime is forced is 사바사. It completely depends on your manager\'s style."',
  },
]

export const CONTENT_TIPS = [
  { id: 'tip-1', type: 'tip', topic: 'comm',    title: 'When and how should you give progress updates?',         cover: '#FFE8D6' },
  { id: 'tip-2', type: 'tip', topic: 'culture',  title: 'New hire types: Question bomb vs. struggle in silence',  cover: '#E8EFFF' },
  { id: 'tip-3', type: 'tip', topic: 'comm',    title: 'How to give clean, concise reports your boss will love', cover: '#FEE4E2' },
  { id: 'tip-4', type: 'tip', topic: 'time',    title: 'First week at work: the one thing you must write down',  cover: '#E7F6EC' },
]
