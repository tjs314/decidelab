'use client';

import { forwardRef } from 'react';
import { ResultType } from '@/data/results';
import { getIconByKey } from './ResultIcons';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
}

const ShareCard = forwardRef<HTMLDivElement, Props>(({ result, scores }, ref) => {
  const pA = Math.round((scores.A / 8) * 100);
  const pB = Math.round((scores.B / 7) * 100);
  const pC = Math.round((scores.C / 15) * 100);

  const rows = [
    { badge: 'A', label: '직장 적합도', pct: pA, val: `${scores.A} / 8` },
    { badge: 'B', label: '이탈 신호', pct: pB, val: `${scores.B} / 7` },
    { badge: 'C', label: '창업 준비도', pct: pC, val: `${scores.C} / 15` },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        width: '1080px',
        height: '1920px',
        background: '#0A0D2D',
        fontFamily: "'Pretendard', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* 헤더 */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '34px', fontWeight: 400, color: 'white', letterSpacing: 0 }}>decide.lab</div>
        <div style={{ fontSize: '34px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>결정의 순간을 돕다</div>
      </div>

      {/* 본문 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '84px', width: '100%' }}>
        {/* 아이콘 */}
        <div style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getIconByKey(result.key, 300)}
        </div>

        {/* 유형 + 설명 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
          <div style={{ fontSize: '80px', fontWeight: 550, color: 'white', letterSpacing: 0, textAlign: 'center', lineHeight: 1.1 }}>
            {result.type}
          </div>
          <div style={{ fontSize: '38px', color: '#BCBECC', textAlign: 'center', lineHeight: 1.7, fontWeight: 400, maxWidth: '800px' }}>
            {result.desc}
          </div>
        </div>

        {/* 점수 패널 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '28px', padding: '48px 56px' }}>
          {rows.map((row) => (
            <div key={row.badge} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '30%', background: '#676B82', textAlign: 'center', lineHeight: '40px', fontSize: '26px', fontWeight: 700, color: '#0A0D2D', fontFamily: 'Arial, Helvetica, sans-serif', flexShrink: 0, overflow: 'hidden' }}>
                  {row.badge}
                </div>
                <div style={{ fontSize: '38px', color: 'rgba(255,255,255,0.5)', fontWeight: 400, width: '200px', flexShrink: 0 }}>
                  {row.label}
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexShrink: 0 }}>
                <div style={{ width: '240px', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', flexShrink: 0 }}>
                  <div style={{ height: '20px', borderRadius: '100px', width: `${row.pct}%`, background: result.color }} />
                </div>
                <div style={{ fontSize: '38px', fontWeight: 400, width: '130px', textAlign: 'right', flexShrink: 0, color: 'rgba(255,255,255,0.85)' }}>
                  {row.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '34px', textAlign: 'center', fontWeight: 400 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>당신의 유형은?</span>{' '}
          <span style={{ color: 'white' }}>무료로 진단해보세요</span>
        </div>
        <div style={{ fontSize: '32px', fontWeight: 400, color: '#FE4C1B', letterSpacing: 0 }}>decidelab.co.kr</div>
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';

export default ShareCard;
