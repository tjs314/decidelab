export interface ResultType {
  key: string;
  type: string;
  color: string;
  iconLabel: string;
  desc: string;
  tip?: string;
  steps?: string[];
  rarity?: number;
}

export const RESULTS: ResultType[] = [
  {
    key: 'growth',
    type: '직장 성장형',
    color: '#1EC33F',
    iconLabel: '현재 포지션 최적화',
    desc: '지금 직장에서 충분히 성장 가능한 상태예요. 섣부른 창업보다 커리어 최적화가 우선이에요.',
    rarity: 16.2,
    tip: '현재 직장에서 연봉 협상, 사내 이동, 역량 개발에 집중하세요.',
    steps: [
      '<strong>연봉 협상 타이밍을 잡으세요</strong> — 지난 6개월 성과를 수치로 정리하고 팀장과 1on1을 요청하세요',
      '<strong>사내 이동 옵션을 탐색하세요</strong> — 관심 있는 팀의 프로젝트에 자원하거나 담당자와 커피챗을 시도하세요',
      '<strong>외부 시장가치를 확인하세요</strong> — 이직 제안 1~2개를 받아봄으로써 협상 레버리지와 현재 위치를 파악하세요',
    ],
  },
  {
    key: 'burnout',
    type: '번아웃 경고형',
    color: '#F4C506',
    iconLabel: '회복 우선',
    desc: '직장도 창업도 지금은 무리예요. 회복과 방향 재정립이 먼저입니다.',
    rarity: 8.7,
    tip: '지금 당장 결정하지 마세요. 번아웃 회복 후 재진단을 권장해요.',
    steps: [
      '<strong>큰 결정을 최소 4주 뒤로 미루세요</strong> — 번아웃 상태에서 내린 결정은 후회 확률이 2배 높다는 연구 결과가 있어요',
      '<strong>에너지 회복을 첫 번째 목표로 삼으세요</strong> — 수면·운동·연결 중 한 가지를 2주간 집중 개선하세요',
      '<strong>번아웃 원인을 구조적으로 분리하세요</strong> — 직무 문제인지, 환경 문제인지, 관계 문제인지 명확히 해야 올바른 해법이 나와요',
    ],
  },
  {
    key: 'startup',
    type: '창업 실행형',
    color: '#FE4C1B',
    iconLabel: '지금이 실행 타이밍',
    desc: '이탈 신호와 창업 준비도 모두 충족된 상태예요. 지금이 실행 타이밍이에요.',
    rarity: 11.4,
    tip: '구체적인 실행 계획을 수립하고 첫 고객을 확보하는 단계로 넘어가세요.',
    steps: [
      '<strong>퇴사 날짜를 역산하세요</strong> — 6개월치 생활비 확보 시점을 기준으로 구체적인 D-Day를 설정하세요',
      '<strong>첫 유료 고객 1명을 지금 찾으세요</strong> — 아는 사람 중 이 문제를 가진 사람 5명에게 오늘 연락하세요',
      '<strong>사이드로 먼저 검증하세요</strong> — 퇴사 전 주말 3시간을 써서 MVP 반응을 측정하고 리스크를 줄이세요',
    ],
  },
  {
    key: 'transition',
    type: '전환 준비형',
    color: '#811EC3',
    iconLabel: '이직 후 창업 검토',
    desc: '떠날 신호는 있지만 준비는 아직 부족해요. 이직 또는 사이드 프로젝트가 먼저예요.',
    rarity: 14.3,
    tip: '창업 준비도 C 섹션 미체크 항목을 보완하거나 이직을 먼저 고려하세요.',
    steps: [
      '<strong>창업 준비도 부족 항목을 파악하세요</strong> — C 섹션에서 체크 못 한 항목이 가장 먼저 채워야 할 숙제예요',
      '<strong>이직을 단기 전략으로 활용하세요</strong> — 창업 도메인에 더 가까운 회사로 이동해 실력과 네트워크를 쌓으세요',
      '<strong>사이드 프로젝트로 검증 기간을 확보하세요</strong> — 퇴근 후 2시간으로 가설을 검증하고 6개월 뒤 재진단하세요',
    ],
  },
];

export const EXPLORE: ResultType = {
  key: 'explore',
  type: '탐색 중',
  color: '#B0B8C1',
  iconLabel: '탐색 중',
  desc: '직장 만족도·이탈 신호·창업 준비도가 아직 뚜렷한 방향을 가리키지 않아요. 결정의 초기 단계에 있다는 뜻이에요.',
  tip: '방향을 정하는 것보다, 내가 뭘 원하는지 명확히 하는 게 먼저예요.',
  steps: [
    '<strong>불만족 포인트를 구체화하세요</strong> — "막연히 답답하다"를 "보상이 부족하다" "성장이 안 된다" 등 구체적 언어로 바꿔보세요',
    '<strong>한 달간 관찰 일지를 시작하세요</strong> — 매주 금요일, 이번 주 가장 에너지가 올라간 순간과 빠진 순간을 한 줄씩 기록하세요',
    '<strong>1개월 뒤 다시 체크해보세요</strong> — 기록이 쌓이면 패턴이 보이고, 그때 훨씬 정확한 결과가 나와요',
  ],
};

export function getResultByKey(key: string): ResultType | undefined {
  if (key === 'explore') return EXPLORE;
  return RESULTS.find((r) => r.key === key);
}

export function getResult(a: number, b: number, c: number): ResultType {
  if (a >= 5 && b <= 3) return RESULTS[0]; // growth
  if (a <= 3 && b >= 5 && c <= 7) return RESULTS[1]; // burnout
  if (b >= 4 && c >= 9) return RESULTS[2]; // startup
  if (b >= 3) return RESULTS[3]; // transition
  return EXPLORE;
}
