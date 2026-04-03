'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Props {
  resultKey: string;
}

const bonusDescByType: Record<string, string> = {
  growth: '연봉 협상 스크립트 · 사내 포지셔닝 전략 · 승진 루트맵 · 성과 어필법 · 커리어 레버리지 설계',
  burnout: '번아웃 회복 루틴 · 퇴사 타이밍 판단법 · 이직 준비 체크리스트 · 면접 전략 · 연봉 협상법',
  startup: '시장 검증 5단계 · 첫 고객 확보 채널 · MVP 로드맵 · 재무 안전망 설계 · 퇴사 타이밍 판단',
  transition: '이력서 전략 · 연봉 협상법 · 네트워킹 · 사이드 프로젝트 · 의사결정 트리',
};

const getTocItems = (resultKey: string) => [
  { num: '01', name: '내 점수는 상위 몇 %?', desc: '3개 영역 종합 스코어 + 전체 응답자 중 내 위치', hot: false },
  { num: '02', name: '나도 몰랐던 반복 패턴', desc: '내 유형이 빠지기 쉬운 함정 · 숨겨진 맹점 분석', hot: true, badge: '맞춤' },
  { num: '03', name: '한눈에 보는 리스크 레이더', desc: '내 점수 시각화 + 평균 대비 어디가 위험한지', hot: false },
  { num: '04', name: '지금 회사, 계속 다녀도 될까?', desc: '직장 적합도 · 이탈 신호 · 창업 준비도 정밀 해부', hot: false },
  { num: '05', name: '나는 4가지 유형 중 어디?', desc: '포지션 매트릭스 2x2 — 같은 유형의 실제 행동 패턴', hot: false },
  { num: '06', name: '이번 달부터 바로 실행하는 4주 플랜', desc: '주차별 할 일 + 완료 기준이 있는 30일 로드맵', hot: true, badge: '인기' },
  { num: 'BONUS', name: '유형별 맞춤 실전 가이드', desc: bonusDescByType[resultKey] || bonusDescByType.growth, hot: true, badge: '+10p' },
  { num: '07', name: '지금 가장 먼저 해야 할 한 가지', desc: '읽고 바로 움직일 수 있는 핵심 메시지', hot: false },
];

const reviewsByType: Record<string, { text: string; author: string }[]> = {
  growth: [
    { text: '승진도 하고 연봉도 나쁘지 않은데 왜 자꾸 불안한지 모르겠어서 속는 셈 치고 결제했어요. \'성장이 아니라 정체였다\'는 말에 소름 돋았습니다 ㅜㅜ', author: '34세 마케터' },
    { text: '솔직히 만원도 안 되길래 별 기대 없이 샀는데 퀄리티 실화인가요 ㅋㅋ 제가 왜 이직을 못 하는지 정확히 짚어줘서 좀 무서웠어요', author: '30세 UX 디자이너' },
    { text: '주변에서 다 괜찮은 직장이라고 하는데 나만 답답했거든요. 리포트 읽고 나서 그 답답함의 정체를 알게 됐어요. 사길 잘했다 :)', author: '33세 데이터 분석가' },
    { text: '4주 액션 플랜이 진짜 좋았어요. 막연하게 \'뭔가 해야 하는데...\' 였는데 이번 주부터 바로 실행할 게 생겼습니다 ㅋㅋ', author: '28세 PM' },
    { text: '연봉 협상 한 번도 못 해본 게 정체의 신호라는 거 처음 알았어요 ㅜㅜ 9,900원에 이 정도 인사이트면 진짜 가성비 미쳤습니다', author: '31세 백엔드 개발자' },
  ],
  burnout: [
    { text: '솔직히 살까 말까 고민했는데 9,900원이라 속는 셈 치고 결제했거든요. 근데 퀄리티 생각보다 훨씬 좋아서 놀랐어요 ㅋㅋ 몇 달째 이직 고민만 했는데 머릿속 정리됐습니다', author: '32세 IT 기획자' },
    { text: '월요일마다 출근이 무서운 게 번아웃이 아니라 \'이탈 신호\'라는 거 처음 알았어요. 리포트 읽고 울었습니다 ㅜㅜ 사길 잘했어요', author: '29세 간호사' },
    { text: '퇴사하고 싶다고 매일 생각했는데 막상 왜 떠나야 하는지 정리가 안 됐거든요. 리포트가 그걸 대신 정리해줬어요. 만원도 안 되는 가격에 이 정도면 감사하죠 :)', author: '35세 회계사' },
    { text: '동료한테 추천받아서 샀는데 생각보다 너무 잘 만들어져 있어서 놀랐어요 ㅋㅋ 특히 맹점 분석이 찔렸습니다', author: '27세 디자이너' },
    { text: '3년째 같은 고민 반복하고 있었는데 리포트 보고 \'아 이러다 5년째 같은 자리겠구나\' 깨달았어요 ㅜㅜ 액션 플랜대로 이력서 업데이트 시작했습니다', author: '33세 영업 매니저' },
  ],
  startup: [
    { text: '창업 준비한다면서 1년째 공부만 하고 있었거든요 ㅋㅋ \'준비된 사람이 계속 준비만 한다\'는 말에 뜨끔했어요. 4주 플랜 따라 바로 첫 미팅 잡았습니다', author: '29세 개발자' },
    { text: '만원도 안 해서 기대 안 했는데 솔직히 유료 코칭보다 낫다고 느꼈어요 ㅜㅜ 내가 뭘 놓치고 있는지 정확히 짚어줘서 소름', author: '31세 프리랜서' },
    { text: '아이디어는 있는데 첫 발을 못 떼고 있었어요. 리포트에서 \'지금 당장 돈 낼 고객 1명 특정하기\'가 나와서 바로 실행했더니 진짜 됐어요 :) 가성비 미쳤습니다', author: '34세 컨설턴트' },
    { text: '속는 셈 치고 샀는데 MVP 만들기 전에 해야 할 것들이 정리돼서 좋았어요 ㅋㅋ 쓸데없이 개발부터 하려던 나 반성합니다', author: '28세 풀스택 개발자' },
    { text: '퇴사 전에 이 리포트 봤으면 준비가 훨씬 빨랐을 거예요 ㅜㅜ 재무 안전망 부분이 특히 현실적이었습니다. 9,900원이 아깝지 않아요', author: '36세 전직 PD' },
  ],
  transition: [
    { text: '이직할지 창업할지 반년째 결론을 못 내리고 있었는데, 제가 뭘 두려워하는지 정확히 짚어주더라고요. 방향 잡히니까 불안이 확 줄었어요 :)', author: '31세 콘텐츠 디렉터' },
    { text: '남들 다 이직하는데 나만 갈팡질팡하는 것 같아서 답답했거든요 ㅜㅜ 리포트 보고 \'지금 안 움직이면 1년 후에도 똑같다\'는 거 깨달았어요. 속는 셈 치고 사봤는데 사길 잘했습니다', author: '30세 마케터' },
    { text: '솔직히 만원짜리가 뭐 해줄 수 있나 했는데 ㅋㅋ 포지션 매트릭스 보니까 제가 어디에 있는지 한눈에 보여서 좋았어요. 이제 뭘 해야 하는지 알겠습니다', author: '33세 인사담당자' },
    { text: '직장도 애매하고 창업도 애매한 상태가 제일 괴로운 건데 리포트가 그 애매함을 숫자로 보여줘서 오히려 속이 시원했어요 ㅜㅜ', author: '27세 스타트업 주니어' },
    { text: '4주 플랜이 진짜 실행 가능한 수준이라 좋았어요. \'일단 해보기\' 리스트가 아니라 순서가 있어서 바로 시작할 수 있었습니다 :) 강추합니다', author: '35세 교육 기획자' },
  ],
};

export default function ReportPreview({ resultKey }: Props) {
  const [tocOpen, setTocOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reviews = reviewsByType[resultKey] || reviewsByType.growth;
  const tocItems = getTocItems(resultKey);

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTimeout(() => {
      setReviewIdx(idx);
      setFade(true);
    }, 200);
  }, []);

  const goNext = useCallback(() => {
    goTo((reviewIdx + 1) % reviews.length);
  }, [reviewIdx, reviews.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((reviewIdx - 1 + reviews.length) % reviews.length);
  }, [reviewIdx, reviews.length, goTo]);

  // 자동 롤링
  useEffect(() => {
    autoTimer.current = setInterval(goNext, 5000);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [goNext]);

  // 스와이프 시 자동 롤링 리셋
  const resetAutoTimer = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(goNext, 5000);
  }, [goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 40) {
      if (touchDelta.current < 0) goNext(); else goPrev();
      resetAutoTimer();
    }
  };

  const currentReview = reviews[reviewIdx];

  return (
    <div>
      {/* PDF 미리보기 — 반응형 */}
      <div className="px-[22px] pt-7">
        <div className="text-[13px] font-bold text-[var(--ink3)] tracking-[0.04em] text-center mb-4">리포트 미리보기</div>
        <div className="flex gap-2.5 sm:gap-4 justify-center">
          {[
            { src: '/pdf-page-8.png', caption: '4주 액션 플랜', blur: true },
            { src: '/pdf-page-5.png', caption: '리스크 레이더', blur: false },
            { src: '/pdf-page-6.png', caption: '영역별 분석', blur: true },
          ].map((p) => (
            <div key={p.src} className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="w-full rounded-lg overflow-hidden border border-[#D8DCE2] bg-[#fafafa] shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ aspectRatio: '595/842' }}>
                <img src={p.src} alt={p.caption} className={`w-full h-full object-cover object-top ${p.blur ? '[filter:blur(2px)] opacity-75' : ''}`} />
              </div>
              <div className="text-xs text-[var(--ink4)] mt-2">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 접이식 목차 */}
      <div className="px-[22px] pt-7">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="flex items-center justify-center gap-1 w-full bg-transparent border border-[var(--line)] rounded-[10px] p-3 cursor-pointer font-[inherit] text-sm font-semibold text-[var(--ink2)] hover:border-[var(--ink4)] transition-colors"
        >
          정밀 리포트에 담긴 전체 내용 보기
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`shrink-0 transition-transform ${tocOpen ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {tocOpen && (
          <div className="mt-4">
            {tocItems.map((item) => (
              <div key={item.num} className="flex items-start gap-3 py-3 border-b border-[var(--line)] last:border-b-0">
                <div className={`min-w-[28px] h-7 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-px px-1 ${item.hot ? 'bg-[#FFF0EC] text-[var(--orange)]' : 'bg-[var(--bg)] text-[var(--ink3)]'}`}>
                  {item.num}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[var(--ink1)] leading-[1.4]">
                    {item.name}
                    {item.badge && (
                      <span className="inline-flex text-[10px] font-bold text-[var(--orange)] bg-[#FFF0EC] px-1.5 py-px rounded-[3px] ml-1.5 align-middle">{item.badge}</span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--ink3)] mt-0.5 leading-[1.4]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 롤링 후기 — 스와이프 가능 */}
      <div className="px-[22px] pt-7 pb-6">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`bg-[var(--bg)] rounded-xl p-[16px_18px] transition-opacity duration-200 cursor-grab active:cursor-grabbing select-none ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-sm text-[var(--ink2)] leading-[1.6]">
            &ldquo;{currentReview.text}&rdquo;
          </div>
          <div className="text-xs text-[var(--ink4)] mt-2">— {currentReview.author}</div>
        </div>
        {/* 인디케이터 — 클릭 가능 */}
        <div className="flex justify-center gap-1.5 mt-3">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetAutoTimer(); }}
              className={`w-1.5 h-1.5 rounded-full transition-colors border-none p-0 cursor-pointer ${i === reviewIdx ? 'bg-[var(--orange)]' : 'bg-[var(--ink4)]/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
