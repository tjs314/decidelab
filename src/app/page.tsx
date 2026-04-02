'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { drawShareCard } from '@/components/drawShareCard';
import { sections, sources } from '@/data/questions';
import { getResult, getResultByKey } from '@/data/results';
import type { ResultType } from '@/data/results';
import { notifyWebhook } from '@/lib/payment';
import { submitReminder } from '@/lib/supabase';
import CheckItem from '@/components/CheckItem';
import ProgressBar from '@/components/ProgressBar';
import ResultDarkCard from '@/components/ResultDarkCard';
import LockedSection from '@/components/LockedSection';
import PaymentSection from '@/components/PaymentSection';
import SurveyCard from '@/components/SurveyCard';
import Footer from '@/components/Footer';
import { getIconByKey } from '@/components/ResultIcons';

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [resultShown, setResultShown] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [busy, setBusy] = useState(false);
  const [paidEmail, setPaidEmail] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderEmail, setReminderEmail] = useState('');
  const [reminderDone, setReminderDone] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // 모바일 결제 리다이렉트 복귀 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'complete') return;

    const paymentId = params.get('paymentId');
    const code = params.get('code'); // 에러 시에만 존재

    // URL 정리
    window.history.replaceState({}, '', window.location.pathname);

    // localStorage에서 결제 정보 복원
    const saved = localStorage.getItem('dl_payment');
    if (!saved) return;

    try {
      const { sessionId, email, resultKey, checked: savedChecked } = JSON.parse(saved);
      localStorage.removeItem('dl_payment');

      // 결과 복원
      const savedResult = getResultByKey(resultKey);
      if (!savedResult) return;

      setResult(savedResult);
      setResultShown(true);

      // 체크 상태 복원
      if (savedChecked) {
        setChecked(savedChecked);
      }

      if (code) {
        alert('결제가 취소됐어요: ' + (params.get('message') || ''));
        return;
      }

      // 웹훅 호출 후 결제 완료 처리
      notifyWebhook(paymentId || sessionId, sessionId)
        .then(() => setPaidEmail(email))
        .catch(() => setPaidEmail(email)); // 웹훅 실패해도 결제는 완료 처리
    } catch {
      // 파싱 실패 시 무시
    }
  }, []);

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
    if (!result || result.key === 'explore') return;
    try {
      const dataUrl = await drawShareCard(result, scores);
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
            <svg width="36" height="36" viewBox="0 0 32 30" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
              <path d="M24.5366 17.0275C24.5366 17.965 24.4116 18.8579 24.1616 19.7061C23.9116 20.5454 23.5589 21.3222 23.1036 22.0364C22.6571 22.7507 22.1214 23.398 21.4964 23.9784C20.8714 24.5498 20.1795 25.0364 19.4205 25.4382C18.6705 25.84 17.8625 26.1525 16.9964 26.3757C16.1393 26.59 15.2554 26.6972 14.3446 26.6972H5.84018V7.41144H14.3446C15.2554 7.41144 16.1393 7.51858 16.9964 7.73287C17.8536 7.94715 18.6571 8.25519 19.4071 8.65697C20.1661 9.04983 20.858 9.53197 21.483 10.1034C22.117 10.6748 22.6571 11.3177 23.1036 12.032C23.5589 12.7373 23.9116 13.5141 24.1616 14.3623C24.4116 15.2016 24.5366 16.09 24.5366 17.0275ZM19.1393 17.0275C19.1393 15.9829 19.0098 14.9918 18.7509 14.0543C18.5009 13.1079 18.108 12.2775 17.5723 11.5632C17.0366 10.8489 16.3536 10.282 15.5232 9.86233C14.7018 9.44269 13.7152 9.23287 12.5634 9.23287H11.1571V24.8222H12.5634C13.6973 24.8222 14.675 24.6123 15.4964 24.1927C16.3268 23.7641 17.0098 23.1927 17.5455 22.4784C18.0902 21.7552 18.492 20.9248 18.7509 19.9873C19.0098 19.0498 19.1393 18.0632 19.1393 17.0275Z" fill="#FF481F"/>
              <path d="M27.8779 5.15936C28.0581 4.88508 28.4265 4.80883 28.7008 4.989C28.9751 5.16921 29.0515 5.53772 28.8713 5.81204C28.6902 6.08772 28.5283 6.30111 26.5687 8.39883C24.5866 10.5206 20.8857 14.4402 18.9615 16.5048C17.8637 17.8016 17.2372 18.612 16.8322 19.1071C16.643 19.3384 16.4716 19.5401 16.3196 19.666C16.2454 19.7273 16.1138 19.8247 15.9357 19.8617C15.709 19.9088 15.4991 19.8415 15.3455 19.7154C15.2569 19.6428 15.1669 19.5391 15.0955 19.4528C15.0148 19.3554 14.9219 19.2357 14.8222 19.1027C14.6224 18.836 14.3821 18.4988 14.134 18.1431C13.6372 17.4311 13.097 16.6282 12.7643 16.1344C12.5809 15.8622 12.6529 15.4929 12.9251 15.3095C13.1973 15.1261 13.5666 15.198 13.75 15.4702C14.084 15.9659 14.6186 16.7604 15.1088 17.463C15.3542 17.8147 15.5855 18.1392 15.7733 18.3898C15.7913 18.4138 15.8088 18.4369 15.8257 18.4592C15.8522 18.4275 15.881 18.3928 15.9122 18.3546C16.2952 17.8865 16.9536 17.0368 18.0633 15.7263L18.0724 15.7155L18.0821 15.7053C19.9945 13.6532 23.7319 9.69431 25.7001 7.5874C27.6942 5.45281 27.7666 5.32879 27.8779 5.15936Z" fill="white"/>
            </svg>
            <span className="translate-y-[2px]">decide.lab</span>
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

          {/* 신뢰 뱃지 */}
          <div className="mt-6 bg-[#E8EAFF] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#D6DEFF] rounded-[10px] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1.5L3 5v4.5c0 4.5 3 8.2 7 9.5 4-1.3 7-5 7-9.5V5l-7-3.5z" stroke="#4B5EAA" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  <path d="M7 10.5l2 2 4-4" stroke="#4B5EAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#0A0D2D] leading-snug">50개 이상의 공신력 있는 데이터 기반</div>
                <div className="text-[13px] text-[#4E5968]">이 문항은 실제 데이터를 바탕으로 만들었어요</div>
              </div>
            </div>
            <div className="mt-3.5 pt-3.5 border-t border-[#D4D7E5]">
              <button
                onClick={() => setSourcesOpen(!sourcesOpen)}
                className="flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-[#8B95A1] hover:text-[#4E5968] transition-colors"
              >
                전체 출처 보기
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                     className={`shrink-0 transition-transform ${sourcesOpen ? 'rotate-180' : ''}`}>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {sourcesOpen && (
                <ul className="list-none p-0 mt-2.5">
                  {sources.map((s, i) => (
                    <li key={i} className="text-xs text-[#4E5968] leading-[1.9] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1 before:h-1 before:rounded-full before:bg-[#B0B8C1]">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* RESULT */}
          {resultShown && result && (
            <div ref={resultRef} className="animate-[fadeUp_.4s_ease] mb-12">
              {result.key === 'explore' ? (
                /* 탐색 중 */
                <div>
                  {/* Dark Card */}
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

                  {/* Tip + Steps */}
                  {result.tip && result.steps && (
                    <div className="bg-white rounded-2xl overflow-hidden mt-3">
                      <div className="px-[22px] pt-6 pb-5">
                        <div className="inline-flex items-center gap-[5px] bg-[#FFF5F2] text-[var(--orange)] text-[11px] font-bold px-2.5 py-[5px] rounded-md mb-3 tracking-wide">
                          <svg className="shrink-0 -translate-y-px" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#FF4B1A"/></svg>
                          지금 단계에서의 핵심
                        </div>
                        <div className="text-[15px] font-semibold text-[var(--ink1)] leading-[1.65] tracking-tight">
                          {result.tip}
                        </div>
                      </div>
                      <div className="px-[22px] pt-5 pb-6">
                        <div className="text-xs font-bold text-[#8B95A1] tracking-widest uppercase mb-4">지금 해볼 수 있는 3가지</div>
                        {result.steps.map((step, i) => (
                          <div key={i} className={`flex gap-3.5 py-3 ${i < result.steps!.length - 1 ? 'border-b border-[#E5E8EB]' : ''}`}>
                            <div className="w-6 h-6 rounded-full bg-[#0A0D2D] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-px">{i + 1}</div>
                            <div className="text-sm text-[#4E5968] leading-[1.65] [&_strong]:text-[var(--ink1)] [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: step }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Encouragement */}
                  <div className="bg-white rounded-2xl px-[22px] py-7 text-center mt-3">
                    <span className="text-[32px] block mb-3">🧭</span>
                    <p className="text-sm text-[#4E5968] leading-[1.75]">
                      아직 방향이 안 보이는 것도<br/>
                      <strong className="text-[var(--ink1)]">완전히 정상이에요.</strong><br/><br/>
                      대부분의 사람들은 고민의 한가운데에서<br/>
                      체크리스트를 해보거든요.<br/>
                      기록하고, 관찰하고, 다시 와주세요.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2.5 pt-6 pb-5">
                    <button
                      onClick={() => location.reload()}
                      className="w-full py-3.5 bg-[#0A0D2D] rounded-xl text-white text-base font-semibold cursor-pointer font-[inherit] transition-opacity hover:opacity-85"
                    >
                      다시 테스트 해보기
                    </button>
                    <button
                      onClick={() => setReminderOpen(true)}
                      className="w-full py-[13px] bg-transparent border border-[#0A0D2D] rounded-xl text-[#0A0D2D] text-base font-semibold cursor-pointer font-[inherit] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
                    >
                      1개월 뒤 리마인더 받기
                    </button>
                  </div>

                  {/* Reminder Modal */}
                  {reminderOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-5" onClick={() => setReminderOpen(false)}>
                      <div className="bg-white rounded-2xl p-8 pb-6 w-full max-w-[340px] text-center relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setReminderOpen(false)} className="absolute top-4 right-[18px] bg-transparent border-none text-[22px] text-[#B0B8C1] cursor-pointer font-[inherit]">&times;</button>
                        {reminderDone ? (
                          <div className="py-4">
                            <span className="text-[32px] block mb-3">✅</span>
                            <div className="text-[17px] font-extrabold text-[var(--ink1)] mb-2">등록 완료!</div>
                            <div className="text-sm text-[#8B95A1] leading-relaxed">1개월 뒤 리마인더를<br/>보내드릴게요.</div>
                          </div>
                        ) : (
                          <>
                            <span className="text-[36px] block mb-3.5">💌</span>
                            <div className="text-[18px] font-extrabold text-[var(--ink1)] tracking-tight mb-2">1개월 뒤 다시 알려드릴게요</div>
                            <p className="text-sm text-[#8B95A1] leading-[1.65] mb-5">이메일을 남겨주시면,<br/>1개월 뒤 체크리스트 리마인더를 보내드려요.</p>
                            <input
                              type="email"
                              value={reminderEmail}
                              onChange={(e) => setReminderEmail(e.target.value)}
                              placeholder="이메일 주소를 입력하세요"
                              className="w-full py-3.5 px-4 border border-[#E5E8EB] rounded-xl text-[15px] font-[inherit] text-[var(--ink1)] outline-none mb-3 focus:border-[#0A0D2D] placeholder:text-[#B0B8C1] transition-colors"
                            />
                            <button
                              onClick={async () => {
                                if (!reminderEmail) return;
                                try {
                                  await submitReminder(reminderEmail, 'explore');
                                } catch { /* ignore */ }
                                setReminderDone(true);
                              }}
                              className="w-full py-3.5 bg-transparent border border-[#0A0D2D] rounded-xl text-[#0A0D2D] text-[15px] font-semibold cursor-pointer font-[inherit] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
                            >
                              리마인더 등록하기
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
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
                      <PaymentSection result={result} scores={scores} checked={checked} onPaymentSuccess={handlePaymentSuccess} />
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

    </>
  );
}
