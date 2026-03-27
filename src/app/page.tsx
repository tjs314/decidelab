'use client';

import { useState, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { sections, sources } from '@/data/questions';
import { getResult } from '@/data/results';
import type { ResultType } from '@/data/results';
import CheckItem from '@/components/CheckItem';
import ProgressBar from '@/components/ProgressBar';
import ResultDarkCard from '@/components/ResultDarkCard';
import LockedSection from '@/components/LockedSection';
import PaymentSection from '@/components/PaymentSection';
import SurveyCard from '@/components/SurveyCard';
import ShareCard from '@/components/ShareCard';
import Footer from '@/components/Footer';
import { getIconByKey } from '@/components/ResultIcons';

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [resultShown, setResultShown] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [busy, setBusy] = useState(false);
  const [paidEmail, setPaidEmail] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const scores = {
    A: Object.entries(checked).filter(([k, v]) => k.startsWith('A-') && v).length,
    B: Object.entries(checked).filter(([k, v]) => k.startsWith('B-') && v).length,
    C: Object.entries(checked).filter(([k, v]) => k.startsWith('C-') && v).length,
  };
  const total = scores.A + scores.B + scores.C;

  const toggleItem = useCallback((section: string, idx: number) => {
    const key = `${section}-${idx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSubmit = () => {
    if (busy) return;
    setBusy(true);
    setTimeout(() => {
      const r = getResult(scores.A, scores.B, scores.C);
      setResult(r);
      setResultShown(true);
      setBusy(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 700);
  };

  const handlePaymentSuccess = (email: string) => {
    setPaidEmail(email);
  };

  const handleSave = async () => {
    if (!shareCardRef.current || !result || result.key === 'explore') return;
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        width: 1080,
        height: 1920,
        scale: 1,
        backgroundColor: '#0A0D2D',
        onclone: (doc: Document) => {
          const root = doc.getElementById('share-card-root');
          if (root) {
            root.style.lineHeight = 'normal';
            root.style.boxSizing = 'content-box';
            root.querySelectorAll('*').forEach((el) => {
              (el as HTMLElement).style.boxSizing = 'content-box';
              (el as HTMLElement).style.lineHeight = (el as HTMLElement).style.lineHeight || 'normal';
            });
          }
        },
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const filename = `decide_lab_${result.key}.jpg`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth < 768;

      if (isMobile) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.85);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.cssText = 'max-width:85%;max-height:75vh;border-radius:12px;';
        overlay.appendChild(img);
        const topBar = document.createElement('div');
        topBar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;width:85%;margin-top:16px;';
        const hint = document.createElement('div');
        hint.style.cssText = 'color:#fff;font-size:15px;font-weight:600;line-height:1.6;';
        hint.textContent = '이미지를 꾹 눌러서 저장하세요';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '닫기';
        closeBtn.style.cssText = 'padding:6px 20px;border:1px solid rgba(255,255,255,.4);background:transparent;color:#fff;border-radius:8px;font-size:14px;flex-shrink:0;';
        closeBtn.onclick = () => document.body.removeChild(overlay);
        topBar.appendChild(hint);
        topBar.appendChild(closeBtn);
        overlay.appendChild(topBar);
        document.body.appendChild(overlay);
      } else {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      alert('저장 실패: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <>
    <div className="h-dvh flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* HEADER */}
        <header className="bg-[#0A0D2D] px-5 py-9 text-center">
          <div className="inline-flex items-center gap-0 text-xs font-semibold text-[var(--orange)] tracking-tight mb-6">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M24.5366 17.0275C24.5366 17.965 24.4116 18.8579 24.1616 19.7061C23.9116 20.5454 23.5589 21.3222 23.1036 22.0364C22.6571 22.7507 22.1214 23.398 21.4964 23.9784C20.8714 24.5498 20.1795 25.0364 19.4205 25.4382C18.6705 25.84 17.8625 26.1525 16.9964 26.3757C16.1393 26.59 15.2554 26.6972 14.3446 26.6972H5.84018V7.41144H14.3446C15.2554 7.41144 16.1393 7.51858 16.9964 7.73287C17.8536 7.94715 18.6571 8.25519 19.4071 8.65697C20.1661 9.04983 20.858 9.53197 21.483 10.1034C22.117 10.6748 22.6571 11.3177 23.1036 12.032C23.5589 12.7373 23.9116 13.5141 24.1616 14.3623C24.4116 15.2016 24.5366 16.09 24.5366 17.0275ZM19.1393 17.0275C19.1393 15.9829 19.0098 14.9918 18.7509 14.0543C18.5009 13.1079 18.108 12.2775 17.5723 11.5632C17.0366 10.8489 16.3536 10.282 15.5232 9.86233C14.7018 9.44269 13.7152 9.23287 12.5634 9.23287H11.1571V24.8222H12.5634C13.6973 24.8222 14.675 24.6123 15.4964 24.1927C16.3268 23.7641 17.0098 23.1927 17.5455 22.4784C18.0902 21.7552 18.492 20.9248 18.7509 19.9873C19.0098 19.0498 19.1393 18.0632 19.1393 17.0275Z" fill="#FF481F"/>
              <path d="M27.8779 5.15936C28.0581 4.88508 28.4265 4.80883 28.7008 4.989C28.9751 5.16921 29.0515 5.53772 28.8713 5.81204C28.6902 6.08772 28.5283 6.30111 26.5687 8.39883C24.5866 10.5206 20.8857 14.4402 18.9615 16.5048C17.8637 17.8016 17.2372 18.612 16.8322 19.1071C16.643 19.3384 16.4716 19.5401 16.3196 19.666C16.2454 19.7273 16.1138 19.8247 15.9357 19.8617C15.709 19.9088 15.4991 19.8415 15.3455 19.7154C15.2569 19.6428 15.1669 19.5391 15.0955 19.4528C15.0148 19.3554 14.9219 19.2357 14.8222 19.1027C14.6224 18.836 14.3821 18.4988 14.134 18.1431C13.6372 17.4311 13.097 16.6282 12.7643 16.1344C12.5809 15.8622 12.6529 15.4929 12.9251 15.3095C13.1973 15.1261 13.5666 15.198 13.75 15.4702C14.084 15.9659 14.6186 16.7604 15.1088 17.463C15.3542 17.8147 15.5855 18.1392 15.7733 18.3898C15.7913 18.4138 15.8088 18.4369 15.8257 18.4592C15.8522 18.4275 15.881 18.3928 15.9122 18.3546C16.2952 17.8865 16.9536 17.0368 18.0633 15.7263L18.0724 15.7155L18.0821 15.7053C19.9945 13.6532 23.7319 9.69431 25.7001 7.5874C27.6942 5.45281 27.7666 5.32879 27.8779 5.15936Z" fill="white"/>
            </svg>
            Decide.Lab
          </div>
          <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight mb-3">
            직장 vs 창업<br/>나는 어떤 사람인가?
          </h1>
          <p className="text-sm text-white/65 mb-8">30문항 · 약 5분</p>
          <div className="flex flex-wrap gap-2 max-w-[480px] mx-auto justify-center">
            {[
              { color: '#1EC33F', label: '직장 적합도', score: `${scores.A}/8` },
              { color: '#F4C506', label: '이탈 신호', score: `${scores.B}/7` },
              { color: '#FE4C1B', label: '창업 준비도', score: `${scores.C}/15` },
            ].map((pill) => (
              <div key={pill.label} className="inline-flex items-center gap-1 bg-white/[.08] border border-white/[.12] rounded-full px-4 py-2 text-xs font-semibold text-white/75 whitespace-nowrap">
                <div className="w-2.5 h-2.5 rounded shrink-0" style={{ background: pill.color }} />
                {pill.label}&nbsp;<span className="font-extrabold text-white ml-0.5">{pill.score}</span>
              </div>
            ))}
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-[600px] mx-auto px-5 pt-8">
          {sections.map((section) => (
            <section key={section.key} className="mb-6">
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="flex items-start gap-2.5 px-5 pt-5 pb-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0 ${section.badgeClass}`}>
                    {section.key}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--ink1)] flex items-center gap-2">
                      {section.title} <span className="text-sm font-medium text-[var(--ink4)]">{scores[section.key]} / {section.max}</span>
                    </h2>
                    <div className="text-sm text-[var(--ink1)] mt-1">{section.subtitle}</div>
                  </div>
                </div>
                {section.questions.map((q, i) => {
                  const subLabel = section.subLabels?.find((s) => s.beforeIdx === q.idx);
                  const isLast = i === section.questions.length - 1;
                  const nextQ = section.questions[i + 1];
                  const beforeSubLabel = nextQ && section.subLabels?.some((s) => s.beforeIdx === nextQ.idx);
                  return (
                    <div key={`${section.key}-${q.idx}`}>
                      {subLabel && (
                        <div className="px-5 pt-4 pb-2 text-[15px] font-bold text-[var(--ink1)] tracking-tight bg-white">
                          {subLabel.label}
                        </div>
                      )}
                      <CheckItem
                        section={section.key}
                        idx={q.idx}
                        label={q.label}
                        checked={!!checked[`${section.key}-${q.idx}`]}
                        disabled={resultShown}
                        hideBorder={isLast || !!beforeSubLabel}
                        onToggle={toggleItem}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* 출처 아코디언 */}
          <div className="mt-6 bg-[#E8EAFF] rounded-2xl px-5 py-4 mb-6">
            <button
              onClick={() => setSourcesOpen(!sourcesOpen)}
              className="w-full flex justify-between items-center bg-none border-none p-0 cursor-pointer"
            >
              <span className="text-[13px] font-semibold text-[#AAAECB] text-left">
                📊 이 문항은 실제 데이터를 바탕으로 만들었어요
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                   className={`shrink-0 transition-transform ${sourcesOpen ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="#AAAECB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {sourcesOpen && (
              <ul className="list-none p-0 mt-3 text-xs text-[#AAAECB] leading-loose">
                {sources.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-[0.75em] shrink-0">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RESULT */}
          {resultShown && result && (
            <div ref={resultRef} className="animate-[fadeUp_.4s_ease] mb-12">
              {result.key === 'explore' ? (
                /* 탐색 중 */
                <div>
                  <div className="bg-[#0A0D2D] rounded-2xl overflow-hidden">
                    <div className="flex justify-between items-center px-6 pt-5">
                      <div className="text-xs font-semibold text-white">decide.lab</div>
                      <div className="text-xs text-white/60">결정의 순간을 돕다</div>
                    </div>
                    <div className="flex flex-col items-center pt-12 [&_svg]:animate-[iconFloat_3.2s_ease-in-out_infinite]">
                      {getIconByKey('explore')}
                    </div>
                    <div className="text-[28px] font-extrabold text-white text-center tracking-tight px-6 pt-4 leading-tight">
                      {result.type}
                    </div>
                    <p className="text-sm text-white/55 text-center px-8 pt-2 pb-6 leading-relaxed"
                       dangerouslySetInnerHTML={{ __html: result.desc.replace(/\. /g, '.<br>') }} />
                  </div>
                  <div className="pt-6 pb-5">
                    <button
                      onClick={() => location.reload()}
                      className="w-full py-3.5 bg-transparent border-[1.5px] border-[#0A0D2D] rounded-xl text-[#0A0D2D] text-base font-semibold cursor-pointer font-[inherit] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
                    >
                      다시 테스트 해보기
                    </button>
                  </div>
                </div>
              ) : (
                /* 일반 결과 */
                <>
                  <ResultDarkCard result={result} scores={scores} onSave={handleSave} />

                  {paidEmail ? (
                    /* 결제 완료 */
                    <div className="bg-white rounded-2xl overflow-hidden mb-3">
                      <div className="flex flex-col items-center gap-1.5 px-5 py-8 text-center">
                        <div className="w-20 h-20 bg-[var(--bg)] rounded-full flex items-center justify-center text-2xl mb-4">
                          💌
                        </div>
                        <div className="text-xl font-bold text-[var(--ink1)] tracking-tight mb-2 leading-normal">
                          <span className="text-[var(--orange)]">{paidEmail}</span>로<br/>정밀 분석 리포트를 보내드렸어요
                        </div>
                        <div className="text-sm text-[var(--ink3)] leading-relaxed">
                          스팸함도 꼭 확인해 주세요.<br/><br/>
                          리포트를 꼼꼼히 읽어보고,<br/>
                          오늘 자신에게 솔직했던 것처럼<br/>
                          앞으로의 선택도 그렇게 해주세요.<br/>
                          응원합니다!
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 미결제: 잠금 섹션 + 결제 (하나의 흰색 카드 안) */
                    <div className="bg-white rounded-2xl overflow-hidden mb-3">
                      <LockedSection result={result} scores={scores} />
                      <PaymentSection result={result} scores={scores} onPaymentSuccess={handlePaymentSuccess} />
                    </div>
                  )}

                  <SurveyCard resultKey={result.key} />
                </>
              )}
            </div>
          )}
        </main>

        <Footer />
        <div className="h-8" />
      </div>

      {/* FLOATING BAR */}
      {!resultShown && (
        <div className="bg-white px-5 py-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))] shadow-[0_-1px_0_var(--line),0_-8px_24px_rgba(0,0,0,.06)] z-50 shrink-0">
          <div className="max-w-[600px] w-full mx-auto">
            <ProgressBar total={total} max={30} />
            <button
              onClick={handleSubmit}
              disabled={busy}
              className="w-full py-[17px] bg-[var(--orange)] border-none rounded-xl text-white text-base font-bold cursor-pointer font-[inherit] tracking-tight transition-all hover:bg-[#e03916] active:scale-[.99] disabled:opacity-65 disabled:cursor-default"
            >
              {busy ? '분석 중...' : '결과 확인하기'}
            </button>
          </div>
        </div>
      )}
    </div>

    {/* 공유 카드 (off-screen, html2canvas용) */}
    {result && result.key !== 'explore' && (
      <ShareCard ref={shareCardRef} result={result} scores={scores} />
    )}
    </>
  );
}
