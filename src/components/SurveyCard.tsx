'use client';

import { useState } from 'react';
import { submitSurvey } from '@/lib/supabase';

interface Props {
  resultKey: string | null;
}

export default function SurveyCard({ resultKey }: Props) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim() || sending) return;
    setSending(true);
    try {
      await submitSurvey(value.trim(), resultKey);
    } catch (e) {
      console.error('[survey]', e);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 mt-6">
        <div className="text-center py-5 text-[15px] font-semibold text-[var(--ink2)] leading-relaxed">
          소중한 의견 감사합니다!<br/>다음 체크리스트에 반영할게요
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 mt-6">
      <div className="text-base font-bold text-[var(--ink1)] tracking-tight mb-1">
        다음엔 어떤 진단을 해보고 싶으세요?
      </div>
      <div className="text-[13px] text-[var(--ink3)] mb-4 leading-normal">
        여러분의 의견이 다음 체크리스트를 만드는 데 반영돼요
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="예) 결혼vs독신, 딩크vs출산, 주거유형 진단"
        className="w-full px-4 py-3 border-[1.5px] border-[var(--line)] rounded-[10px] text-sm font-[inherit] text-[var(--ink1)] bg-white outline-none mb-3 transition-colors focus:border-[var(--ink1)] placeholder:text-[var(--ink3)]"
      />
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-transparent border-[1.5px] border-[#0A0D2D] rounded-xl text-[var(--ink2)] text-base font-semibold cursor-pointer font-[inherit] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
      >
        {sending ? '보내는 중...' : '의견 보내기'}
      </button>
    </div>
  );
}
