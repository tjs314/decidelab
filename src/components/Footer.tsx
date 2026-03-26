'use client';

import { useState } from 'react';

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="text-center py-6 px-5 pb-8 bg-[var(--bg)]">
      <button
        onClick={() => setOpen(!open)}
        className="block w-full bg-none border-none text-xs text-[#6B7280] cursor-pointer mb-1"
      >
        사업자 정보 <span className={`inline-block transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="text-[11px] text-[#6B7280] leading-loose mb-3">
          상호: 빛이랑 (decide.lab) &nbsp;|&nbsp; 대표자: 사공선<br/>
          사업자등록번호: 576-37-00764 &nbsp;|&nbsp; 통신판매업 신고번호: 제2020-성남분당에이-1536호<br/>
          주소: (우 16873) 경기도 용인시 수지구 대지로 36 신흥빌딩 3동 302호<br/>
          고객센터: sun314.studio@gmail.com &nbsp;|&nbsp; 전화: 070-8058-8767
        </div>
      )}
      <div className="text-xs text-[#B0B0CC] font-normal tracking-tight">© 2026 decide.lab</div>
    </footer>
  );
}
