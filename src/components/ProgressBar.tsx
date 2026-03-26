'use client';

interface ProgressBarProps {
  total: number;
  max: number;
}

export default function ProgressBar({ total, max }: ProgressBarProps) {
  const pct = (total / max) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-[var(--ink1)]">체크한 항목</span>
        <span className="text-sm font-bold text-[var(--ink1)]">{total} / {max}</span>
      </div>
      <div className="h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--ink1)] rounded-full transition-[width] duration-400 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={total}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label="체크 진행률"
        />
      </div>
    </div>
  );
}
