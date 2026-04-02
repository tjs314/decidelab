'use client';

import { useState } from 'react';
import { ResultType } from '@/data/results';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
}

export default function LockedSection({ result }: Props) {
  const [tocOpen, setTocOpen] = useState(false);

  // 유형별 티저 텍스트
  const teaserMap: Record<string, { badge: string; title: string; visible: string; blurred: string }> = {
    growth: {
      badge: '직장 성장형 분석 미리보기',
      title: '당신의 패턴에서 발견된 맹점',
      visible: '현재 직장에서의 안정감이 높지만, 이 안정감이 오히려 다음 단계로 나아가는 걸 막고 있을 수 있어요.',
      blurred: '직장 성장형의 68%가 "현재 위치에 만족한다"고 응답하지만, 실제로 연봉 협상이나 직무 전환을 시도한 비율은 12%에 불과해요. 이건 성장이 아니라 정체일 수 있습니다. 리포트에서 당신의 구체적인 정체 포인트와 돌파 전략을 확인하세요.',
    },
    burnout: {
      badge: '번아웃 경고형 분석 미리보기',
      title: '지금 느끼는 피로, 단순한 스트레스가 아닐 수 있어요',
      visible: '이탈 신호가 높다는 건 단순히 "힘들다"가 아니라, 이미 내면에서 결정이 시작됐다는 의미일 수 있어요.',
      blurred: '번아웃 경고형의 72%가 "6개월 내 이직을 고려한다"고 답했지만, 실제 행동으로 옮긴 비율은 18%에 불과해요. 대부분 타이밍을 놓치고 더 지친 상태에서 움직입니다. 리포트에서 당신의 최적 이탈 타이밍과 준비 전략을 확인하세요.',
    },
    startup: {
      badge: '창업 실행형 분석 미리보기',
      title: '준비된 것 같지만, 빠진 조각이 있어요',
      visible: '창업 준비도가 높다는 건 좋은 신호지만, 가장 위험한 건 "준비됐다는 착각"일 수 있어요.',
      blurred: '창업 실행형 중 실제로 6개월 내 런칭에 성공한 비율은 23%예요. 나머지 77%가 가장 많이 놓친 건 "시장 검증"이 아니라 "첫 고객 확보 채널"이었어요. 리포트에서 당신에게 가장 급한 준비 항목과 실행 순서를 확인하세요.',
    },
    transition: {
      badge: '전환 준비형 분석 미리보기',
      title: '떠나고 싶지만, 어디로 가야 할지 모를 때',
      visible: '직장 적합도와 창업 준비도가 모두 중간이라면, 가장 흔한 실수는 "일단 버티기"예요.',
      blurred: '전환 준비형의 65%가 "방향을 정하지 못한 채 1년 이상 현 직장에 머문다"고 답했어요. 이 시간이 길어질수록 기회비용이 커집니다. 리포트에서 당신에게 맞는 전환 경로와 우선순위를 확인하세요.',
    },
  };

  const teaser = teaserMap[result.key] || teaserMap.growth;

  const tocItems = [
    { num: '01', name: '점수 요약 + 포지션 진단', desc: '3개 영역 종합 스코어, 전체 응답자 중 내 위치', hot: false },
    { num: '02', name: '유형 심층 해설', desc: '반복 패턴 · 숨겨진 맹점 · 핵심 인사이트', hot: true, badge: '맞춤' },
    { num: '03', name: '리스크 레이더 차트', desc: '내 점수 시각화 + 평균 비교 분석', hot: false },
    { num: '04', name: '영역별 정밀 분석', desc: '직장 적합도 · 이탈 신호 · 창업 준비도 상세 해설', hot: false },
    { num: '05', name: '포지션 매트릭스', desc: '4가지 유형 중 나의 위치 2x2 시각화', hot: false },
    { num: '06', name: '4주 액션 플랜', desc: '주차별 태스크 + 체크포인트 30일 로드맵', hot: true, badge: '인기' },
    { num: '07', name: '핵심 메시지 + 마무리', desc: '지금 가장 중요한 한 가지', hot: false },
  ];

  return (
    <div>
      {/* ① 티저 */}
      <div className="px-[22px] pt-8 relative">
        <div className="inline-flex items-center gap-[5px] text-[11px] font-bold text-[var(--orange)] bg-[#FFF0EC] px-2.5 py-1 rounded-md mb-3.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1l1.2 2.4L9 3.8 7 5.8l.5 2.7L5 7.2 2.5 8.5 3 5.8 1 3.8l2.8-.4L5 1z" fill="#FE4C1B"/></svg>
          {teaser.badge}
        </div>
        <div className="text-[15px] font-bold text-[var(--ink1)] leading-[1.5] mb-2.5">{teaser.title}</div>
        <div className="text-sm text-[var(--ink2)] leading-[1.7] relative">
          <span className="block mb-1">{teaser.visible}</span>
          <span className="block [filter:blur(5px)] select-none pointer-events-none leading-[1.7]">{teaser.blurred}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-transparent to-white z-10" />
      </div>

      {/* ② 비교 카드 */}
      <div className="px-[22px] pt-6">
        <div className="grid grid-cols-2 gap-2.5">
          {/* 무료 */}
          <div className="rounded-[14px] p-[18px_16px] flex flex-col gap-3 bg-[#F7F8FA] border border-[var(--line)]">
            <div className="text-xs font-bold text-[var(--ink3)] text-center">무료 결과</div>
            {['유형 이름만 확인', '3개 영역 점수', '한줄 요약'].map((t) => (
              <div key={t} className="flex items-start gap-1.5 text-xs leading-[1.5] text-[var(--ink3)]">
                <svg className="shrink-0 mt-px" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#B0B8C1" strokeWidth="1.2"/><path d="M4.5 7h5" stroke="#B0B8C1" strokeWidth="1.2" strokeLinecap="round"/></svg>
                {t}
              </div>
            ))}
          </div>
          {/* 유료 */}
          <div className="rounded-[14px] p-[18px_16px] flex flex-col gap-3 border border-[rgba(254,76,27,0.2)]" style={{ background: 'linear-gradient(135deg, #FFF5F2 0%, #FFF0EC 100%)' }}>
            <div className="text-xs font-bold text-[var(--orange)] text-center">정밀 리포트</div>
            {['유형별 심층 해설', '숨겨진 맹점 분석', '리스크 레이더 차트', '4주 액션 플랜', '포지션 매트릭스'].map((t) => (
              <div key={t} className="flex items-start gap-1.5 text-xs leading-[1.5] text-[var(--ink2)]">
                <svg className="shrink-0 mt-px" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#FE4C1B" strokeWidth="1.2"/><path d="M4.5 7.2L6.2 8.8 9.5 5.5" stroke="#FE4C1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ③ CTA 헤드라인 + 가격 */}
      <div className="px-[22px] pt-5 text-center">
        <div className="text-xl font-extrabold text-[var(--ink1)] tracking-tight leading-[1.45]">
          정밀 분석으로<br/><span className="text-[var(--orange)]">나만의 돌파구</span>를 찾아보세요
        </div>
        <div className="text-[13px] text-[var(--ink3)] mt-1.5">20페이지 PDF · 결제 후 10분 이내 이메일 발송</div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="bg-[rgba(255,180,0,0.12)] text-[#CC8800] border border-[rgba(255,180,0,0.4)] text-[11px] font-bold px-2 py-[3px] rounded-md">얼리버드</span>
          <span className="text-sm text-black/25 line-through">46,000원</span>
          <span className="text-[22px] font-extrabold text-[var(--ink1)]">9,900원</span>
        </div>
      </div>

      {/* ④ PDF 미리보기 */}
      <div className="px-[22px] pt-7">
        <div className="text-xs font-bold text-[var(--ink3)] tracking-[0.04em] text-center mb-4">리포트 미리보기</div>
        <div className="flex gap-2.5 justify-center">
          {[
            { src: '/pdf-page-8.png', caption: '4주 액션 플랜', blur: true },
            { src: '/pdf-page-5.png', caption: '리스크 레이더', blur: false },
            { src: '/pdf-page-6.png', caption: '영역별 분석', blur: true },
          ].map((p) => (
            <div key={p.src} className="flex flex-col items-center">
              <div className="w-[110px] rounded-lg overflow-hidden border border-[#D8DCE2] bg-[#fafafa] shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ aspectRatio: '595/842' }}>
                <img src={p.src} alt={p.caption} className={`w-full h-full object-cover object-top ${p.blur ? '[filter:blur(2px)] opacity-75' : ''}`} />
              </div>
              <div className="text-[11px] text-[var(--ink4)] mt-2">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑤ 접이식 목차 */}
      <div className="px-[22px] pt-7">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="flex items-center justify-center gap-1 w-full bg-transparent border border-[var(--line)] rounded-[10px] p-3 cursor-pointer font-[inherit] text-[13px] font-semibold text-[var(--ink2)] hover:border-[var(--ink4)] transition-colors"
        >
          정밀 리포트에 담긴 전체 내용 보기
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`shrink-0 transition-transform ${tocOpen ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {tocOpen && (
          <div className="mt-4">
            {tocItems.map((item) => (
              <div key={item.num} className={`flex items-start gap-3 py-3 border-b border-[var(--line)] last:border-b-0`}>
                <div className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0 mt-px ${item.hot ? 'bg-[#FFF0EC] text-[var(--orange)]' : 'bg-[var(--bg)] text-[var(--ink3)]'}`}>
                  {item.num}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--ink1)] leading-[1.4]">
                    {item.name}
                    {item.badge && (
                      <span className="inline-flex text-[9px] font-bold text-[var(--orange)] bg-[#FFF0EC] px-1.5 py-px rounded-[3px] ml-1.5 align-middle">{item.badge}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-[var(--ink3)] mt-0.5 leading-[1.4]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ⑥ 후기 */}
      <div className="px-[22px] pt-7 pb-6">
        <div className="bg-[var(--bg)] rounded-xl p-[16px_18px]">
          <div className="text-[13px] text-[var(--ink2)] leading-[1.6] italic">
            &ldquo;솔직히 살까 말까 고민했는데, 9,900원이라 속는 셈 치고 결제했거든요. 근데 막상 받아보니 퀄리티가 생각보다 훨씬 좋아서 놀랐어요. 혼자 몇 달째 이직 고민만 했는데 리포트 보고 나서 머릿속이 정리됐습니다.&rdquo;
          </div>
          <div className="text-[11px] text-[var(--ink4)] mt-2">— 32세 IT 기획자, 번아웃 경고형</div>
        </div>
      </div>
    </div>
  );
}
