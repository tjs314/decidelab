'use client';

import { forwardRef } from 'react';
import { ResultType } from '@/data/results';
import { getIconSvgString } from './ResultIcons';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
}

const ShareCard = forwardRef<HTMLDivElement, Props>(({ result, scores }, ref) => {
  const pA = Math.round((scores.A / 8) * 100);
  const pB = Math.round((scores.B / 7) * 100);
  const pC = Math.round((scores.C / 15) * 100);

  const html = `
  <div style="width:100%; display:flex; align-items:center; justify-content:space-between;">
    <div style="font-size:34px; font-weight:400; color:white; letter-spacing:0;">decide.lab</div>
    <div style="font-size:34px; color:rgba(255,255,255,0.4); font-weight:400;">결정의 순간을 돕다</div>
  </div>
  <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:84px; width:100%;">
    <div style="width:300px; height:300px; display:flex; align-items:center; justify-content:center;">${getIconSvgString(result.key, 300)}</div>
    <div style="display:flex; flex-direction:column; align-items:center; gap:24px; width:100%;">
      <div style="font-size:80px; font-weight:550; color:white; letter-spacing:0; text-align:center; line-height:1.1;">${result.type}</div>
      <div style="font-size:38px; color:#BCBECC; text-align:center; line-height:1.7; font-weight:400; max-width:800px;">${result.desc.replace(/\. /g, '.<br>')}</div>
    </div>
    <div style="width:100%; display:flex; flex-direction:column; gap:50px; background:rgba(255,255,255,0.05); border-radius:28px; padding:48px 56px;">
      <div style="display:flex; align-items:center;">
        <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
          <div style="width:40px; height:40px; border-radius:30%; background:#676B82; display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:700; color:#0A0D2D; flex-shrink:0;">A</div>
          <div style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; width:200px; flex-shrink:0;">직장 적합도</div>
        </div>
        <div style="flex:1;"></div>
        <div style="display:flex; align-items:center; gap:40px; flex-shrink:0;">
          <div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px; flex-shrink:0;"><div style="height:20px; border-radius:100px; width:${pA}%; background:${result.color};"></div></div>
          <div style="font-size:38px; font-weight:400; width:130px; text-align:right; flex-shrink:0; color:rgba(255,255,255,0.85);">${scores.A} / 8</div>
        </div>
      </div>
      <div style="display:flex; align-items:center;">
        <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
          <div style="width:40px; height:40px; border-radius:30%; background:#676B82; display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:700; color:#0A0D2D; flex-shrink:0;">B</div>
          <div style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; width:200px; flex-shrink:0;">이탈 신호</div>
        </div>
        <div style="flex:1;"></div>
        <div style="display:flex; align-items:center; gap:40px; flex-shrink:0;">
          <div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px; flex-shrink:0;"><div style="height:20px; border-radius:100px; width:${pB}%; background:${result.color};"></div></div>
          <div style="font-size:38px; font-weight:400; width:130px; text-align:right; flex-shrink:0; color:rgba(255,255,255,0.85);">${scores.B} / 7</div>
        </div>
      </div>
      <div style="display:flex; align-items:center;">
        <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
          <div style="width:40px; height:40px; border-radius:30%; background:#676B82; display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:700; color:#0A0D2D; flex-shrink:0;">C</div>
          <div style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; width:200px; flex-shrink:0;">창업 준비도</div>
        </div>
        <div style="flex:1;"></div>
        <div style="display:flex; align-items:center; gap:40px; flex-shrink:0;">
          <div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px; flex-shrink:0;"><div style="height:20px; border-radius:100px; width:${pC}%; background:${result.color};"></div></div>
          <div style="font-size:38px; font-weight:400; width:130px; text-align:right; flex-shrink:0; color:rgba(255,255,255,0.85);">${scores.C} / 15</div>
        </div>
      </div>
    </div>
  </div>
  <div style="width:100%; display:flex; flex-direction:column; align-items:center; gap:16px;">
    <div style="font-size:34px; text-align:center; font-weight:400;"><span style="color:rgba(255,255,255,0.5);">당신의 유형은?</span> <span style="color:white;">무료로 진단해보세요</span></div>
    <div style="font-size:32px; font-weight:400; color:#FE4C1B; letter-spacing:0;">decidelab.co.kr</div>
  </div>`;

  return (
    <div
      ref={ref}
      id="share-card-root"
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
        padding: '80px 80px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

ShareCard.displayName = 'ShareCard';

export default ShareCard;
