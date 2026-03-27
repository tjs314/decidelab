import { ResultType } from '@/data/results';
import { getIconSvgString } from './ResultIcons';

const W = 1080;
const H = 1920;
const PAD = 80;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function loadSvgAsImage(svgString: string): Promise<HTMLImageElement> {
  // xmlns 속성 추가 (독립 SVG 이미지로 렌더링 시 필수)
  const withNs = svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(withNs)));
  });
}

export async function drawShareCard(
  result: ResultType,
  scores: { A: number; B: number; C: number },
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // 배경
  ctx.fillStyle = '#0A0D2D';
  ctx.fillRect(0, 0, W, H);

  const font = (weight: number, size: number) => `${weight} ${size}px Pretendard, sans-serif`;

  // ── 헤더 ──
  ctx.font = font(400, 34);
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText('decide.lab', PAD, PAD + 17);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'right';
  ctx.fillText('결정의 순간을 돕다', W - PAD, PAD + 17);
  ctx.textAlign = 'left';

  // ── 콘텐츠 블록 높이 계산 → 수직 중앙 배치 ──
  const iconSize = 300;
  const gapIconTitle = 50;
  const titleH = 80;
  const gapTitleDesc = 24;
  const descLines = result.desc.split('. ').map((s, i, a) => i < a.length - 1 ? s + '.' : s);
  const descH = descLines.length * 64;
  const gapDescPanel = 60;
  const panelH = 340;

  const contentH = iconSize + gapIconTitle + titleH + gapTitleDesc + descH + gapDescPanel + panelH;

  // 헤더 아래 ~ 푸터 위 가용 공간
  const headerBottom = PAD + 50;
  const footerTop = H - PAD - 100;
  const availH = footerTop - headerBottom;
  const contentStartY = headerBottom + (availH - contentH) / 2;

  // ── 아이콘 ──
  const iconX = (W - iconSize) / 2;
  const iconY = contentStartY;
  try {
    const svgStr = getIconSvgString(result.key, iconSize);
    if (svgStr) {
      const iconImg = await loadSvgAsImage(svgStr);
      ctx.drawImage(iconImg, iconX, iconY, iconSize, iconSize);
    }
  } catch { /* icon load fail - skip */ }

  // ── 유형 이름 ──
  const titleY = iconY + iconSize + gapIconTitle + titleH / 2;
  ctx.font = font(600, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(result.type, W / 2, titleY);

  // ── 설명 ──
  ctx.font = font(400, 38);
  ctx.fillStyle = '#BCBECC';
  let descY = titleY + titleH / 2 + gapTitleDesc + 32;
  for (const line of descLines) {
    ctx.fillText(line.trim(), W / 2, descY);
    descY += 64;
  }

  // ── 점수 패널 ──
  const panelX = PAD;
  const panelY = descY - 32 + gapDescPanel;
  const panelW = W - PAD * 2;
  const panelR = 28;

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  roundRect(ctx, panelX, panelY, panelW, panelH, panelR);
  ctx.fill();

  const rows = [
    { badge: 'A', label: '직장 적합도', score: scores.A, max: 8 },
    { badge: 'B', label: '이탈 신호', score: scores.B, max: 7 },
    { badge: 'C', label: '창업 준비도', score: scores.C, max: 15 },
  ];

  const rowStartX = panelX + 56;
  const rowEndX = panelX + panelW - 56;
  const badgeSize = 40;
  const barW = 240;
  const barH = 20;
  const rowGap = 90;

  rows.forEach((row, i) => {
    const cy = panelY + 80 + i * rowGap; // 행 중심 Y

    // 배지 (정사각형, 30% 라운드)
    const badgeX = rowStartX;
    const badgeY = cy - badgeSize / 2;
    const badgeR = badgeSize * 0.3;
    ctx.fillStyle = '#676B82';
    roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeR);
    ctx.fill();

    // 배지 텍스트 — 정확히 중앙
    ctx.font = font(700, 26);
    ctx.fillStyle = '#0A0D2D';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(row.badge, badgeX + badgeSize / 2, cy);

    // 라벨
    ctx.font = font(400, 38);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(row.label, badgeX + badgeSize + 16, cy);

    // 점수 텍스트 (오른쪽 끝)
    ctx.font = font(400, 38);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${row.score} / ${row.max}`, rowEndX, cy);

    // 프로그레스 바 (점수 왼쪽)
    const scoreTextW = 130;
    const barX = rowEndX - scoreTextW - 10 - barW;
    const barY = cy - barH / 2;

    // 바 배경
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    roundRect(ctx, barX, barY, barW, barH, barH / 2);
    ctx.fill();

    // 바 값
    const pct = Math.round((row.score / row.max) * 100);
    if (pct > 0) {
      const fillW = Math.max(barH, (barW * pct) / 100);
      ctx.fillStyle = result.color;
      roundRect(ctx, barX, barY, fillW, barH, barH / 2);
      ctx.fill();
    }
  });

  // ── 푸터 ──
  const footerY = H - PAD - 30;
  ctx.font = font(400, 32);
  ctx.fillStyle = '#FE4C1B';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('decidelab.co.kr', W / 2, footerY);

  ctx.font = font(400, 34);
  ctx.textBaseline = 'middle';
  const q1 = '당신의 유형은? ';
  const q2 = '무료로 진단해보세요';
  const q1w = ctx.measureText(q1).width;
  const q2w = ctx.measureText(q2).width;
  const totalW = q1w + q2w;
  const startX = (W - totalW) / 2;

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.textAlign = 'left';
  ctx.fillText(q1, startX, footerY - 50);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(q2, startX + q1w, footerY - 50);

  return canvas.toDataURL('image/jpeg', 0.92);
}
