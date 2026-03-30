'use client';

interface CheckItemProps {
  section: string;
  idx: number;
  label: string;
  checked: boolean;
  disabled: boolean;
  hideBorder?: boolean;
  onToggle: (section: string, idx: number) => void;
}

export default function CheckItem({ section, idx, label, checked, disabled, hideBorder, onToggle }: CheckItemProps) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      className={`flex items-start gap-3.5 px-5 py-4 cursor-pointer select-none transition-colors
        ${disabled ? 'pointer-events-none' : ''}
        ${checked ? '' : ''}
        active:bg-[var(--bg)]`}
      style={hideBorder ? undefined : { backgroundImage: 'linear-gradient(var(--bg), var(--bg))', backgroundSize: 'calc(100% - 40px) 1px', backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat' }}
      onClick={() => !disabled && onToggle(section, idx)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!disabled) onToggle(section, idx);
        }
      }}
    >
      <div
        className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex-shrink-0 mt-[1px]
          flex items-center justify-center transition-all duration-200
          ${checked ? 'bg-[var(--ink1)] border-[var(--ink1)]' : 'bg-white border-[var(--line)]'}`}
      >
        <svg
          width="11" height="8" viewBox="0 0 11 8" fill="none"
          className={`transition-all duration-200 ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        >
          <path d="M1.5 4L4 6.5L9.5 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className={`text-sm leading-relaxed flex-1 pt-[1px] transition-colors
        ${checked ? 'text-[var(--ink1)] font-medium' : 'text-[var(--ink2)] font-normal'}`}>
        {label}
      </span>
    </div>
  );
}
