export interface Question {
  idx: number;
  label: string;
}

export interface Section {
  key: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  max: number;
  badgeClass: string;
  questions: Question[];
  subLabels?: { beforeIdx: number; label: string }[];
}

export const sections: Section[] = [
  {
    key: 'A',
    title: '직장 적합도',
    subtitle: '나는 지금 직장에서 성장 중인가?',
    max: 8,
    badgeClass: 'bg-[#1EC33F]',
    questions: [
      { idx: 0, label: '지난 6개월간 새로운 스킬이나 지식을 업무에 실제로 적용한 경험이 3회 이상 있다' },
      { idx: 1, label: '지금 하는 업무가 3년 후 내 커리어 방향과 연결된다고 구체적으로 설명할 수 있다' },
      { idx: 2, label: '최근 6개월 내 상사 또는 동료로부터 내 기여에 대한 긍정적 피드백을 받은 적이 있다' },
      { idx: 3, label: '동종업계 같은 연차와 비교했을 때 연봉이 심하게 낮다고 느끼지 않는다' },
      { idx: 4, label: '직장을 떠나고 싶은 주된 이유가 \'이 일이 싫다\'보다 \'다른 무언가를 해보고 싶다\'에 가깝다' },
      { idx: 5, label: '지금 조직 안에 내가 배울 점이 있는 사람이 최소 1명 이상 있다' },
      { idx: 6, label: '현재 팀·조직의 방향성에 어느 정도 공감하며, 그 안에서 내 역할이 의미 있다고 느낀다' },
      { idx: 7, label: '지금 회사에서 향후 1년 내 성장 기회(승진, 프로젝트, 역할 확장 등)가 존재한다고 본다' },
    ],
  },
  {
    key: 'B',
    title: '이탈 신호',
    subtitle: '나는 떠나야 할 상황인가?',
    max: 7,
    badgeClass: 'bg-[#F4C506]',
    questions: [
      { idx: 0, label: '월요일 아침마다 무기력함이나 불안감이 느껴지고, 이 패턴이 6개월 이상 지속되고 있다' },
      { idx: 1, label: '내 성과가 실력보다 조직 내 정치·구조 문제로 저평가되고 있다고 느낀다' },
      { idx: 2, label: '지난 1년간 연봉 또는 직급 변화가 기대보다 현저히 낮았다' },
      { idx: 3, label: '지금 이 일을 5년 더 했을 때, 내가 원하는 삶의 모습에 가까워질 것 같지 않다' },
      { idx: 4, label: '현재 역량이라면 지금 회사가 아닌 다른 곳에서도 충분히 일할 수 있다는 확신이 있다' },
      { idx: 5, label: '최근 3개월간 이직 또는 창업 관련 정보를 주도적으로 찾아본 적이 있다' },
      { idx: 6, label: '가까운 동료나 지인이 이직·창업 후 더 나은 상황에 있는 것을 목격한 적이 있다' },
    ],
  },
  {
    key: 'C',
    title: '창업 준비도',
    subtitle: '나는 창업할 준비가 됐는가?',
    max: 15,
    badgeClass: 'bg-[#FE4C1B]',
    subLabels: [
      { beforeIdx: 0, label: '시장·사업 검증' },
      { beforeIdx: 5, label: '재무 안전망' },
      { beforeIdx: 9, label: '역량·실행력' },
      { beforeIdx: 13, label: '동기·지속력' },
    ],
    questions: [
      { idx: 0, label: '내가 해결하려는 문제와 타깃 고객을 한 문장으로 구체적으로 설명할 수 있다' },
      { idx: 1, label: '잠재 고객과 직접 대화(인터뷰, 설문 등)를 최소 5회 이상 해봤다' },
      { idx: 2, label: '목표 시장의 주요 경쟁사·대체재를 파악하고, 내 차별화 포인트를 말할 수 있다' },
      { idx: 3, label: '지금 당장 돈을 낼 의향이 있는 고객을 최소 1명 이상 이름·연락처 수준으로 특정할 수 있다' },
      { idx: 4, label: '작은 규모라도 MVP(최소 기능 제품)나 시제품을 만들어본 경험이 있다' },
      { idx: 5, label: '현재 보유 현금(예금·비상금)으로 최소 6개월치 생활비를 충당할 수 있다' },
      { idx: 6, label: '매달 나가는 대출 상환액이 월급의 절반도 안 된다' },
      { idx: 7, label: '창업 초기에도 프리랜싱·컨설팅·부업 등으로 부분적 수입 창출이 가능하다' },
      { idx: 8, label: '배우자·파트너 등 가족 중 안정적 소득원이 있거나, 부양 부담이 낮은 편이다' },
      { idx: 9, label: '창업하려는 도메인에서 최소 2년 이상 실무 경험이 있다' },
      { idx: 10, label: '혼자 또는 소수로 무언가를 기획·실행하고 완료한 경험이 최근 3년 내 있다' },
      { idx: 11, label: '초기 고객을 직접 발굴하고 설득할 수 있는 네트워크나 채널이 있다' },
      { idx: 12, label: '기술·디자인·영업 중 최소 한 가지 영역에서 \'이것만큼은 자신 있다\'고 말할 수 있다' },
      { idx: 13, label: '창업 동기가 \'직장 탈출\'보다 \'이 문제를 반드시 내가 풀고 싶다\'에 더 가깝다' },
      { idx: 14, label: '6개월 이상 수입이 없어도 이 일을 지속할 수 있는 심리적 여유가 있다' },
    ],
  },
];

export const sources = [
  'CB Insights, McKinsey, Gallup, OECD 외 10건',
  '통계청, 고용노동부, 중소벤처기업부 외 8건',
  '사람인, 블라인드, 잡코리아, 원티드 외 5건',
  'HBR, Stanford GSB, Kauffman 외 4건',
  '한국노동연구원, KDI, 한국고용정보원 외 6건',
  '직장인·창업자 50명 대상 심층 인터뷰 등',
];
