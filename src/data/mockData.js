export const me = {
  years: '1-3',
  job: 'marketing',
  yearsLabel: '3년차',
  jobLabel: '마케팅',
}

export const filterOptions = {
  years: [
    { id: 'all', label: '전체 연차' },
    { id: '1-3', label: '1–3년차' },
    { id: '4-6', label: '4–6년차' },
    { id: '7-10', label: '7–10년차' },
  ],
  jobs: [
    { id: 'all', label: '전체 직군' },
    { id: 'marketing', label: '마케팅' },
    { id: 'dev', label: '개발' },
    { id: 'plan', label: '기획' },
    { id: 'design', label: '디자인' },
    { id: 'sales', label: '영업' },
    { id: 'hr', label: '인사' },
  ],
}

export const categoryChips = [
  { id: 'all', label: '전체' },
  { id: 'time', label: '⏱ 시간·루틴' },
  { id: 'comm', label: '💬 커뮤니케이션' },
  { id: 'career', label: '📈 커리어' },
  { id: 'culture', label: '🤝 조직문화' },
  { id: 'leave', label: '🌴 휴가·복지' },
]

export function computeDataView(matrix, job, years) {
  if (!matrix) return null
  const jobRow = matrix[job] || matrix['all']
  if (!jobRow) return null
  const bars = [
    { label: '1–3년차', value: jobRow['1-3'], highlight: years === '1-3' },
    { label: '4–6년차', value: jobRow['4-6'], highlight: years === '4-6' },
    { label: '7–10년차', value: jobRow['7-10'], highlight: years === '7-10' },
  ]
  const featured = years !== 'all' ? (jobRow[years] ?? jobRow.overall) : jobRow.overall
  return { bars, featured, n: jobRow.n }
}

export const mockData = {
  threads: [
    {
      id: 3,
      title: '회식 빠져도 될까?',
      category: 'culture',
      question: '이번 주 금요일에 팀 회식이 있는데 개인 약속이 있어서 못 가겠거든요. 신입인데 회식 빠지면 너무 눈치보이지 않을까요?',
      tags: ['#회식', '#사내문화'],
      timestamp: '3일 전',
      isOpen: false,
      aiAnswer: {
        headline: '충분한 이유가 있다면 괜찮아요.',
        highlight: '미리 양해를 구하면 대부분 이해해줘요.',
        body: '콘텐츠 6건 · 커뮤니티 178건을 분석했어요.',
        takeaways: [
          '최소 2~3일 전에 팀장에게 먼저 말하는 게 중요해요',
          '개인 약속보다 구체적인 이유를 간단히 설명하면 더 자연스러워요',
          '1차 회식엔 가능하면 잠깐이라도 참석하는 게 좋아요',
        ],
        dataCard: {
          title: '회식 불참 시 팀 반응',
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
          { id: 5, title: '신입 때 회식 빠진 썰', preview: '사전에 팀장님께 말씀드렸더니 오히려 잘 됐다고 하셨어요. 개인 사정 존중해주는 팀이라 다행이었어요.', role: '기획 · 3년차', comments: 19, likes: 44 },
          { id: 6, title: '회식 참여 강요하는 문화 어떻게 생각해?', preview: '요즘은 많이 달라졌다고 하지만 아직도 회식 빠지면 눈치주는 팀이 있는 게 사실이에요.', role: '마케팅 · 6년차', comments: 41, likes: 88 },
        ],
      },
      followUps: [],
      feedback: null,
    },
    {
      id: 2,
      title: '신입 출근, 몇 시까지 해야할까?',
      category: 'time',
      question: '출근 일주일 째... 출근 시간보다 10분 정도 일찍 도착하고 있는데 항상 다들 나보다 먼저 와 계신다. 더 일찍 와야 할까?',
      tags: ['#출근시간', '#신입'],
      timestamp: '어제',
      isOpen: false,
      aiAnswer: {
        headline: '10분이면 충분해요.',
        highlight: '대부분의 팀에서 정시 출근이 기본 기준이에요.',
        body: '콘텐츠 12건 · 커뮤니티 203건을 분석했어요.',
        takeaways: [
          '10분 전 도착이 가장 일반적인 신입 출근 기준이에요',
          '더 일찍 오는 것보다 일관된 시간이 더 중요해요',
          '팀장님의 패턴을 2주간 관찰해보는 것도 도움이 돼요',
        ],
        dataCard: {
          title: '신입의 출근 시간 여유',
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
          { id: 3, title: '신입 때 출근 몇 분 전 도착하세요?', preview: '저도 첫 주에 너무 일찍 가서 오히려 어색했어요. 10분 전이면 딱 좋은 것 같더라고요.', role: '개발 · 2년차', comments: 34, likes: 67 },
          { id: 4, title: '팀장이 일찍 오는 게 싫다고 했어요', preview: '저희 팀장님이 너무 일찍 오면 본인도 부담된다고... 오히려 정시에 맞춰 오라고 하시더라고요.', role: '인사 · 4년차', comments: 28, likes: 51 },
        ],
      },
      followUps: [],
      feedback: 'up',
    },
    {
      id: 1,
      title: '점심 혼자 먹어도 될까?',
      category: 'culture',
      question: '식비 절약하고 싶어서 이번주 점심은 도시락 싸와서 혼자 먹고 싶은데, 항상 같이 나가서 먹는 분위기라 눈치보여. 혼자 먹는다고 해도 될까?',
      tags: ['#사내문화', '#점심'],
      timestamp: '오전 11:23',
      isOpen: false,
      aiAnswer: {
        headline: '충분히 괜찮아요!',
        highlight: '도시락 문화가 자리잡은 팀이 점점 늘고 있어요.',
        body: '콘텐츠 8건 · 커뮤니티 124건을 분석했어요.',
        takeaways: [
          '팀 분위기에 따라 다르지만, 가볍게 먼저 말해두는 게 안전해요',
          '도시락 문화가 자리잡은 팀이 많아 거절당할 확률은 낮아요',
          '주 1~2회 함께, 나머지는 혼자로 절충하는 것도 방법이에요',
        ],
        dataCard: {
          title: '점심 혼밥 실천 비율',
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
          { id: 1, title: '도시락 싸오는 신입', preview: '처음엔 눈치보였는데 지금은 팀장님도 도시락 싸오시더라고요. 용기 내서 말했더니 오히려 팀이 더 자유로워졌어요.', role: '마케팅 · 3년차', comments: 21, likes: 35 },
          { id: 2, title: '점심 혼밥 어떻게 생각하세요?', preview: '저도 고민이었는데 솔직히 말하고 나니 팀 분위기가 더 자유로워졌어요. 다들 사실 편한 게 좋다더라고요.', role: '기획 · 5년차', comments: 16, likes: 42 },
        ],
      },
      followUps: [
        {
          id: 11,
          question: '그럼 팀장한테 어떻게 말하지?',
          isLoading: false,
          aiAnswer: {
            headline: '가볍게 먼저 운을 띄워보세요.',
            highlight: '"오늘은 간단히 먹을게요" 정도면 충분해요.',
            body: '커뮤니티 89건을 분석했어요.',
            takeaways: [],
            dataCard: null,
            communityPosts: [],
          },
        },
      ],
      feedback: null,
    },
  ],
  allTags: ['전체', '#사내문화', '#출근시간', '#회식', '#보고방식', '#점심', '#신입'],
}

export const MOCK_NEW_TITLES = [
  '야근 거절해도 될까?',
  '연봉협상 어떻게 시작하지?',
  '팀장님 말투가 불편해',
  '휴가 눈치보지 않고 쓰는 법',
  '업무 실수했을 때 어떻게 말하지?',
  '재택근무 신청해도 될까?',
]

export const MOCK_NEW_ANSWER = {
  headline: '충분히 이야기해볼 수 있어요.',
  highlight: '비슷한 고민을 한 분들이 생각보다 많아요.',
  body: '콘텐츠 10건 · 커뮤니티 156건을 분석했어요.',
  takeaways: [
    '혼자 끌어안기보다 명확히 표현하는 게 장기적으로 더 나아요',
    '비슷한 상황을 먼저 경험한 선배들의 방식을 참고해보세요',
    '작은 시도부터 시작하면 생각보다 쉽게 해결되는 경우가 많아요',
  ],
  dataCard: {
    title: '같은 고민을 해본 직장인 비율',
    matrix: {
      'all':       { '1-3': 71, '4-6': 58, '7-10': 44, 'overall': 62, 'n': 198 },
      'marketing': { '1-3': 74, '4-6': 61, '7-10': 47, 'overall': 64, 'n': 36 },
      'dev':       { '1-3': 68, '4-6': 55, '7-10': 41, 'overall': 59, 'n': 48 },
      'plan':      { '1-3': 72, '4-6': 59, '7-10': 45, 'overall': 62, 'n': 31 },
      'design':    { '1-3': 75, '4-6': 62, '7-10': 48, 'overall': 65, 'n': 27 },
      'sales':     { '1-3': 69, '4-6': 56, '7-10': 42, 'overall': 60, 'n': 33 },
      'hr':        { '1-3': 73, '4-6': 60, '7-10': 46, 'overall': 63, 'n': 23 },
    },
  },
  communityPosts: [
    { id: 101, title: '저도 같은 고민이었어요', preview: '처음엔 말하기 어려웠는데 솔직하게 얘기했더니 생각보다 괜찮았어요. 팀 분위기에 따라 다르지만...', role: '기획 · 2년차', comments: 14, likes: 29 },
    { id: 102, title: '경험자가 알려드릴게요', preview: '비슷한 상황이 있었는데 결국 직접 대화하는 게 최선이더라고요. 제 경우엔 이렇게 풀었어요...', role: '마케팅 · 5년차', comments: 22, likes: 38 },
  ],
}

export const MOCK_FOLLOWUP_ANSWER = {
  headline: '구체적으로 접근해보세요.',
  highlight: '작은 한 마디가 분위기를 바꿔요.',
  body: '커뮤니티 94건을 분석했어요.',
  takeaways: [],
  dataCard: null,
  communityPosts: [],
}
