'use client';

import { ResultType } from '@/data/results';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
}

function gradeColor(val: number) {
  if (val <= 35) return '#F04452';
  if (val <= 55) return '#F4C506';
  if (val <= 70) return '#3182F6';
  return '#1EC33F';
}

function gradeColorB(val: number) {
  if (val >= 70) return '#F04452';
  if (val >= 50) return '#F4C506';
  if (val >= 35) return '#3182F6';
  return '#1EC33F';
}

function RiskDonut({ label, val, color }: { label: string; val: number; color: string }) {
  const CIRC = 2 * Math.PI * 30;
  const offset = CIRC * (1 - val / 100);

  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      <div className="text-xs text-[var(--ink2)] font-semibold text-center">{label}</div>
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r="30" fill="none" stroke="#ECEDF2" strokeWidth="8"/>
          <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={CIRC.toFixed(1)} strokeDashoffset={offset.toFixed(1)}
            strokeLinecap="round"/>
        </svg>
        <div className="text-xl font-extrabold tracking-tight relative z-10" style={{ color }}>{val}</div>
      </div>
    </div>
  );
}

export default function LockedSection({ result, scores }: Props) {
  const pA = Math.round((scores.A / 8) * 100);
  const pB = Math.round((scores.B / 7) * 100);
  const pC = Math.round((scores.C / 15) * 100);

  // 점수 조합 기반 소폭 변동 (base ± ~2.5%)
  const seed = (scores.A * 7 + scores.B * 13 + scores.C * 3) % 50;
  const offset = (seed - 25) / 10; // -2.5 ~ +2.4
  const base = result.rarity ?? 10;
  const rarityPct = (base + offset).toFixed(1);

  const risks = [
    { label: '직장 적합도', val: pA, color: gradeColor(pA) },
    { label: '이탈 위험도', val: pB, color: gradeColorB(pB) },
    { label: '창업 준비도', val: pC, color: gradeColor(pC) },
  ];

  return (
    <div>
      <div className="relative">
        {/* 블러 영역: 리스크 분석 */}
        <div className="relative">
          <div className="[filter:blur(5px)] select-none pointer-events-none">
            <div className="pt-8 px-5">
              <div className="text-xs font-bold text-[var(--ink3)] tracking-wider pb-6">영역별 리스크 분석</div>
              <div className="flex gap-2.5 mb-5">
                {risks.map((r) => (
                  <RiskDonut key={r.label} {...r} />
                ))}
              </div>
              <div className="h-6" />
            </div>
          </div>

          {/* 행동 3단계 */}
          <div className="px-5">
            <div className="text-xs font-bold text-[var(--ink3)] tracking-wider mt-2">지금 당장 해야 할 행동 3가지</div>
            {result.steps && (
              <>
                <div className="flex gap-3.5 py-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-[var(--ink1)] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                  <div className="text-sm text-[var(--ink2)] leading-relaxed" dangerouslySetInnerHTML={{ __html: result.steps[0] }} />
                </div>
                <div className="[filter:blur(5px)] select-none pointer-events-none">
                  {result.steps.slice(1).map((step, i) => (
                    <div key={i} className="flex gap-3.5 py-3.5 border-b border-[var(--line)] last:border-b-0 items-start">
                      <div className="w-5 h-5 rounded-full bg-[var(--ink1)] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 2}</div>
                      <div className="text-sm text-[var(--ink2)] leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
                    </div>
                  ))}
                  <div className="h-6" />
                </div>
              </>
            )}
          </div>

          {/* 그라데이션 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
        </div>

        {/* 타이틀 카피 */}
        <div className="flex justify-center pt-4 pb-2 px-5">
          <div className="flex flex-col items-center gap-1">
            <div className="text-xl font-bold text-[var(--ink1)] tracking-tight">나만을 위한 <span className="text-[var(--orange)]">정밀 맞춤</span> 분석</div>
            <div className="text-sm text-[var(--ink3)]">(PDF로 제공해드려요)</div>
          </div>
        </div>

        {/* PDF 프리뷰 스택 */}
        <div className="pb-8 px-5">
          <div className="relative w-full" style={{ aspectRatio: '100/58' }}>
            {/* blank 1 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)] bg-white" style={{ width: '28%', aspectRatio: '180/254', bottom: '-4%', right: '7%' }} />
            {/* blank 2 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)] bg-white" style={{ width: '28%', aspectRatio: '180/254', bottom: '-3%', right: '36%' }} />
            {/* blank 3 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)] bg-white" style={{ width: '28%', aspectRatio: '180/254', bottom: '-5%', right: '54%' }} />
            {/* 5: page 8 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)]" style={{ width: '28%', aspectRatio: '180/254', bottom: 0, right: 0 }}>
              <img src="/pdf-page-8.png" alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* 4: page 7 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)]" style={{ width: '28%', aspectRatio: '180/254', bottom: '8%', right: '18%' }}>
              <img src="/pdf-page-7.png" alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* 3: page 6 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)]" style={{ width: '28%', aspectRatio: '180/254', bottom: '1%', right: '36%' }}>
              <img src="/pdf-page-6.png" alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* 2: page 5 */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-sm border border-[#E5E8EB] [filter:blur(1px)]" style={{ width: '28%', aspectRatio: '180/254', bottom: '10%', right: '54%' }}>
              <img src="/pdf-page-5.png" alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* 1: 커버 (맨 앞) */}
            <div className="absolute rounded-[4px] overflow-hidden shadow-xl" style={{ width: '28%', aspectRatio: '180/254', bottom: '3%', right: '72%', transform: 'rotate(-3deg)' }}>
              <img src="/pdf-cover.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* 잠금 배너 */}
        <div className="flex flex-col items-center gap-1.5 px-5 pt-6 pb-5 text-center">
          <div className="w-20 h-20 bg-[var(--bg)] rounded-full flex items-center justify-center text-2xl mb-4">
            🔒
          </div>
          <div className="text-xl font-bold text-[var(--ink1)] tracking-tight mb-2 leading-normal">
            정밀 분석 리포트를 확인해 보세요
          </div>
          <div className="text-sm text-[var(--ink3)] leading-5">
            당신의 점수 조합은 전체 응답자의 약 <strong className="text-[var(--orange)]">{rarityPct}</strong>%에만<br/>해당해요. 어떤 의미인지 확인해 보세요
          </div>
        </div>
      </div>
    </div>
  );
}
