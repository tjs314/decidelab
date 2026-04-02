'use client';

import { useState } from 'react';

const tocItems = [
  { num: '01', name: '점수 요약 + 포지션 진단', desc: '3개 영역 종합 스코어, 전체 응답자 중 내 위치', hot: false },
  { num: '02', name: '유형 심층 해설', desc: '반복 패턴 · 숨겨진 맹점 · 핵심 인사이트', hot: true, badge: '맞춤' },
  { num: '03', name: '리스크 레이더 차트', desc: '내 점수 시각화 + 평균 비교 분석', hot: false },
  { num: '04', name: '영역별 정밀 분석', desc: '직장 적합도 · 이탈 신호 · 창업 준비도 상세 해설', hot: false },
  { num: '05', name: '포지션 매트릭스', desc: '4가지 유형 중 나의 위치 2x2 시각화', hot: false },
  { num: '06', name: '4주 액션 플랜', desc: '주차별 태스크 + 체크포인트 30일 로드맵', hot: true, badge: '인기' },
  { num: '07', name: '핵심 메시지 + 마무리', desc: '지금 가장 중요한 한 가지', hot: false },
];

export default function ReportPreview() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div>
      {/* PDF 미리보기 */}
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

      {/* 접이식 목차 */}
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
              <div key={item.num} className="flex items-start gap-3 py-3 border-b border-[var(--line)] last:border-b-0">
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

      {/* 후기 */}
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
