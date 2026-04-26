export const CONTENT_TYPES = {
  poll:    { key: 'poll',    label: '투표',       color: '#3B5BFF', soft: '#EEF1FF', ink: '#1E3AD1' },
  article: { key: 'article', label: '아티클',     color: '#D97757', soft: '#FBEFE8', ink: '#8E4322' },
  contest: { key: 'contest', label: '콘테스트',   color: '#7A5BFF', soft: '#F1EDFF', ink: '#4B32B8' },
  word:    { key: 'word',    label: '오늘의 단어', color: '#16A34A', soft: '#E7F6EC', ink: '#0E6A2E' },
  tip:     { key: 'tip',     label: '팁',         color: '#0EA5E9', soft: '#E4F4FC', ink: '#0A6A95' },
}

export const CONTENT_TOPICS = [
  { id: 'all',     label: '전체' },
  { id: 'time',    label: '⏱ 시간·루틴' },
  { id: 'comm',    label: '💬 커뮤니케이션' },
  { id: 'career',  label: '📈 커리어' },
  { id: 'culture', label: '🤝 조직문화' },
  { id: 'leave',   label: '🌴 휴가·복지' },
  { id: 'money',   label: '💰 돈·협상' },
]

export const CONTENT_POLLS = [
  {
    id: 'poll-1', type: 'poll', topic: 'time',
    title: '선배님들, 출근 시간 보통 몇 분 전에 도착하시나요?',
    audience: '#신입 사원', nParticipants: 2147, daysLeft: 3,
    options: [
      { label: '칼출근 (정시±5분)', pct: 38, self: false },
      { label: '10분 전 도착',       pct: 41, self: true  },
      { label: '20분 이상 여유있게', pct: 21, self: false },
    ],
  },
  {
    id: 'poll-2', type: 'poll', topic: 'money',
    title: '퇴근 시간 5분 전… 업무를 마친 당신은?',
    audience: '#전체', nParticipants: 1284, daysLeft: 5,
    options: [
      { label: 'A. 슬쩍 짐을 싼다',    pct: 54, self: false },
      { label: 'B. 눈치 보며 기다린다', pct: 46, self: false },
    ],
  },
  {
    id: 'poll-3', type: 'poll', topic: 'comm',
    title: '회식 자리, 1차 끝나고 어떻게 하세요?',
    audience: '#신입 사원', nParticipants: 892, daysLeft: 2,
    options: [
      { label: '무조건 2차까지',  pct: 18, self: false },
      { label: '분위기 봐서 결정', pct: 47, self: false },
      { label: '1차에서 빠지기',  pct: 35, self: false },
    ],
  },
]

export const CONTENT_ARTICLES = [
  {
    id: 'art-1', type: 'article', topic: 'comm',
    title: '요즘 팀장들이 팀원과 소통하는 진짜 방법 (feat. 1on1 미팅)',
    excerpt: '1on1은 형식이 아니라 리듬이에요. 매주 30분, 질문 3개면 충분합니다. 10년차 팀장 3명에게 들어봤어요.',
    minutes: 5, tag: '#조직문화', author: '편집팀', date: '2024. 4. 19',
    cover: 'linear-gradient(135deg, #FFE4D4 0%, #F5C7A8 100%)',
  },
  {
    id: 'art-2', type: 'article', topic: 'career',
    title: '3년차, 이직을 결심하게 되는 3가지 순간',
    excerpt: '성장 곡선이 완만해졌을 때, 배울 선배가 사라졌을 때, 연봉 정체가 1년 이상 지속될 때.',
    minutes: 7, tag: '#커리어', author: '오민지 기자', date: '2024. 4. 17',
    cover: 'linear-gradient(135deg, #E4ECFF 0%, #B8C9FF 100%)',
  },
  {
    id: 'art-3', type: 'article', topic: 'money',
    title: '연봉 협상, 숫자보다 중요한 건 "근거"입니다',
    excerpt: '시장가 2가지 · 성과 1가지 · 희망 범위 1가지. 이 네 줄만 준비해 가세요.',
    minutes: 4, tag: '#연봉협상', author: '편집팀', date: '2024. 4. 15',
    cover: 'linear-gradient(135deg, #E7F6EC 0%, #B8E0C5 100%)',
  },
]

export const CONTENT_CONTESTS = [
  {
    id: 'con-1', type: 'contest', topic: 'culture',
    title: '우리 회사 이상한 문화 공모전',
    excerpt: '사람마다 다른 "당연한 것"들. 여러분 회사의 신기한 관습을 들려주세요.',
    prize: '1,000,000원', daysLeft: 4, nApplied: 327, tag: '#공모전',
  },
  {
    id: 'con-2', type: 'contest', topic: 'time',
    title: '나만의 출근길 루틴 사진 챌린지',
    excerpt: '출근길 풍경 · 아침 메뉴 · 루틴 꿀팁을 사진 한 장과 함께 올려주세요.',
    prize: '스타벅스 기프티콘', daysLeft: 12, nApplied: 164, tag: '#챌린지',
  },
]

export const CONTENT_WORDS = [
  {
    id: 'word-1', type: 'word', topic: 'comm',
    word: '컴해요', pron: '[Come해요]',
    tag: '커뮤니케이션 약어',
    def: '"커뮤니케이션 해요"의 줄임말. 메신저 상에서 짧게 알림/요청할 때 쓰여요.',
    example: '"오늘 3시 전에 이 자료 컴해요?" — 부장님이 쓰시면 당황하지 말고 침착하게.',
  },
]

export const CONTENT_TIPS = [
  { id: 'tip-1', type: 'tip', topic: 'comm',    title: '중간보고는 언제, 어떻게 하나요?',        cover: '#FFE8D6' },
  { id: 'tip-2', type: 'tip', topic: 'culture',  title: '신입사원 유형: 질문 폭탄 vs 혼자 끙끙', cover: '#E8EFFF' },
  { id: 'tip-3', type: 'tip', topic: 'comm',    title: '상사에게 예쁨받는 깔끔한 보고 방법',    cover: '#FEE4E2' },
  { id: 'tip-4', type: 'tip', topic: 'time',    title: '첫 출근 일주일, 이것만은 꼭 메모하세요', cover: '#E7F6EC' },
]
