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
    <table style="width:100%; background:rgba(255,255,255,0.05); border-radius:28px; padding:48px 56px; border-collapse:separate; border-spacing:0 25px;">
      <tr>
        <td style="width:40px; height:40px; border-radius:30%; background:#676B82; text-align:center; vertical-align:middle; font-size:26px; font-weight:700; color:#0A0D2D;">A</td>
        <td style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; vertical-align:middle; padding-left:16px;">직장 적합도</td>
        <td style="vertical-align:middle; padding-left:40px;"><div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px;"><div style="height:20px; border-radius:100px; width:${pA}%; background:${result.color};"></div></div></td>
        <td style="font-size:38px; font-weight:400; text-align:right; vertical-align:middle; color:rgba(255,255,255,0.85); padding-left:40px; white-space:nowrap;">${scores.A} / 8</td>
      </tr>
      <tr>
        <td style="width:40px; height:40px; border-radius:30%; background:#676B82; text-align:center; vertical-align:middle; font-size:26px; font-weight:700; color:#0A0D2D;">B</td>
        <td style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; vertical-align:middle; padding-left:16px;">이탈 신호</td>
        <td style="vertical-align:middle; padding-left:40px;"><div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px;"><div style="height:20px; border-radius:100px; width:${pB}%; background:${result.color};"></div></div></td>
        <td style="font-size:38px; font-weight:400; text-align:right; vertical-align:middle; color:rgba(255,255,255,0.85); padding-left:40px; white-space:nowrap;">${scores.B} / 7</td>
      </tr>
      <tr>
        <td style="width:40px; height:40px; border-radius:30%; background:#676B82; text-align:center; vertical-align:middle; font-size:26px; font-weight:700; color:#0A0D2D;">C</td>
        <td style="font-size:38px; color:rgba(255,255,255,0.5); font-weight:400; vertical-align:middle; padding-left:16px;">창업 준비도</td>
        <td style="vertical-align:middle; padding-left:40px;"><div style="width:240px; height:20px; background:rgba(255,255,255,0.1); border-radius:100px;"><div style="height:20px; border-radius:100px; width:${pC}%; background:${result.color};"></div></div></td>
        <td style="font-size:38px; font-weight:400; text-align:right; vertical-align:middle; color:rgba(255,255,255,0.85); padding-left:40px; white-space:nowrap;">${scores.C} / 15</td>
      </tr>
    </table>
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
