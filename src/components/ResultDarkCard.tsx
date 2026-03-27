'use client';

import { ResultType } from '@/data/results';
import { getIconByKey } from './ResultIcons';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
  onSave?: () => void;
}

export default function ResultDarkCard({ result, scores, onSave }: Props) {
  const pA = Math.round((scores.A / 8) * 100);
  const pB = Math.round((scores.B / 7) * 100);
  const pC = Math.round((scores.C / 15) * 100);

  const rows = [
    { badge: 'A', label: '직장 적합도', pct: pA, val: `${scores.A} / 8` },
    { badge: 'B', label: '이탈 신호', pct: pB, val: `${scores.B} / 7` },
    { badge: 'C', label: '창업 준비도', pct: pC, val: `${scores.C} / 15` },
  ];

  return (
    <div className="bg-[#0A0D2D] rounded-2xl overflow-hidden mb-6 pb-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center px-6 pt-5">
        <div className="text-xs font-semibold text-white tracking-tight">decide.lab</div>
        <div className="text-xs text-white/60">결정의 순간을 돕다</div>
      </div>

      {/* 아이콘 */}
      <div className="flex flex-col items-center pt-12 [&_svg]:animate-[iconFloat_3.2s_ease-in-out_infinite]">
        {getIconByKey(result.key)}
      </div>

      {/* 유형 + 설명 */}
      <div className="text-[28px] font-extrabold text-white text-center tracking-tight px-6 pt-4 leading-tight">
        {result.type}
      </div>
      <p className="text-sm text-white/55 text-center px-8 pt-2 leading-relaxed"
         dangerouslySetInnerHTML={{ __html: result.desc.replace(/\. /g, '.<br>') }} />

      {/* 점수 패널 */}
      <div className="mx-5 mt-5 bg-[#1C1F40] rounded-xl px-5 py-4">
        {rows.map((row) => (
          <div key={row.badge} className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 rounded-md relative text-[10px] font-extrabold text-[var(--ink1)] bg-[#676B82] shrink-0">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{row.badge}</span>
            </div>
            <span className="text-sm text-white/60 flex-1 font-medium">{row.label}</span>
            <div className="w-20 h-1.5 bg-[#282B4E] rounded-full overflow-hidden shrink-0">
              <div
                className="h-full rounded-full transition-[width] duration-600 ease-[cubic-bezier(.4,0,.2,1)]"
                style={{ width: `${row.pct}%`, background: result.color }}
              />
            </div>
            <span className="text-xs font-bold text-white/75 min-w-[36px] text-right">{row.val}</span>
          </div>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={onSave}
        className="flex items-center justify-center gap-1.5 w-[calc(100%-48px)] mx-6 mt-10 py-3.5 bg-transparent border border-[#676B82] rounded-[10px] text-white/65 text-base font-semibold cursor-pointer font-[inherit] transition-colors hover:border-white/50 hover:text-white"
      >
        내 유형 저장하기
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="block opacity-70" aria-hidden="true">
          <path d="M12 3v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 17v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
