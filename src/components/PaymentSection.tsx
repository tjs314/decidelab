'use client';

import { useState, useCallback } from 'react';
import { ResultType } from '@/data/results';
import { createSession, notifyWebhook } from '@/lib/payment';

interface Props {
  result: ResultType;
  scores: { A: number; B: number; C: number };
  checked: Record<string, boolean>;
  onPaymentSuccess: (email: string) => void;
}

export default function PaymentSection({ result, scores, checked, onPaymentSuccess }: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [consentAll, setConsentAll] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentRefund, setConsentRefund] = useState(false);
  const [paying, setPaying] = useState(false);
  const [expandedConsent, setExpandedConsent] = useState<string | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canPay = emailValid && consentPrivacy && consentTerms && consentRefund;

  const handleAllConsent = useCallback((checked: boolean) => {
    setConsentAll(checked);
    setConsentPrivacy(checked);
    setConsentTerms(checked);
    setConsentRefund(checked);
  }, []);

  const updateIndividual = useCallback((privacy: boolean, terms: boolean, refund: boolean) => {
    setConsentAll(privacy && terms && refund);
  }, []);

  const handlePay = async () => {
    if (!canPay || paying) return;
    setPaying(true);

    try {
      const sessionId = await createSession(email.trim(), result.key, scores.A, scores.B, scores.C);

      const PortOne = (window as unknown as Record<string, unknown>).PortOne as {
        requestPayment: (opts: Record<string, unknown>) => Promise<{ code?: string; txId?: string; message?: string }>;
      };

      // 모바일 결제 리다이렉트를 위해 상태 저장
      localStorage.setItem('dl_payment', JSON.stringify({
        sessionId,
        email: email.trim(),
        resultKey: result.key,
        scores,
        checked,
      }));

      const response = await PortOne.requestPayment({
        storeId: 'store-a1b1e173-6f8f-4430-95c3-46e7af421a8a',
        channelKey: 'channel-key-5a514b54-7e42-4537-b174-828e95cce2f2',
        paymentId: sessionId,
        payMethod: 'CARD',
        orderName: 'decide.lab 정밀 분석 리포트',
        totalAmount: 9900,
        currency: 'KRW',
        redirectUrl: `${window.location.origin}?payment=complete`,
        customer: { email: email.trim(), phoneNumber: '01000000000', fullName: '구매자' },
      });

      if (response && !response.code) {
        await notifyWebhook(response.txId || sessionId, sessionId);
        onPaymentSuccess(email.trim());
      } else {
        alert('결제가 취소됐어요: ' + (response?.message || ''));
      }
    } catch {
      alert('서버 연결 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setPaying(false);
    }
  };

  const consentItems = [
    {
      id: 'privacy', label: '개인정보 수집·이용 동의', checked: consentPrivacy,
      onChange: (v: boolean) => { setConsentPrivacy(v); updateIndividual(v, consentTerms, consentRefund); },
      body: `수집 항목: 이메일 주소\n수집 목적: 정밀 분석 리포트 발송\n보유 기간: 리포트 발송 후 1년, 이후 즉시 파기\n제3자 제공: 없음\n처리 위탁: 이메일 발송 서비스 (수탁자: 이메일 발송 대행사, 목적: 리포트 전달)\n\n위 개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의 거부 시 서비스 이용이 제한됩니다.`,
    },
    {
      id: 'terms', label: '이용약관 동의', checked: consentTerms,
      onChange: (v: boolean) => { setConsentTerms(v); updateIndividual(consentPrivacy, v, consentRefund); },
      body: `본 서비스는 decide.lab이 제공하는 디지털 콘텐츠 서비스입니다.\n\n제1조 (목적) 본 약관은 decide.lab 정밀 분석 리포트 서비스 이용에 관한 조건을 규정합니다.\n\n제2조 (서비스 제공) 결제 완료 후 입력한 이메일로 리포트 PDF를 발송합니다.\n\n제3조 (환불) 결제 완료 후 콘텐츠가 전달된 시점부터 열람 여부와 관계없이 청약철회(환불)가 불가합니다.`,
    },
    {
      id: 'refund', label: '디지털 콘텐츠 환불 불가 동의', checked: consentRefund,
      onChange: (v: boolean) => { setConsentRefund(v); updateIndividual(consentPrivacy, consentTerms, v); },
      body: `결제 완료 후 콘텐츠가 전달된 시점부터 열람 여부와 관계없이 청약철회(환불)가 불가함에 동의합니다. 전자상거래 등에서의 소비자보호에 관한 법률 제17조 제2항 제5호에 따른 디지털 콘텐츠 특성상 공급이 개시된 경우 환불이 제한됩니다.`,
    },
  ];

  return (
    <div className="px-5 pb-5">
      <div>
        {!showEmail && (
          <button
            onClick={() => setShowEmail(true)}
            className="w-full py-4 bg-[var(--orange)] border-none rounded-xl text-white text-base font-bold cursor-pointer font-[inherit] tracking-tight hover:opacity-90 transition-opacity"
          >
            정밀 분석 받기
          </button>
        )}

        {showEmail && (
          <div className="border border-[var(--line)] rounded-2xl p-5">

            {/* 이메일 */}
            <div className="text-sm font-bold text-[var(--ink1)] mb-2.5 tracking-tight">결과 받을 이메일</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="decide@email.com"
              className="w-full px-4 py-3 border border-[var(--line)] rounded-[10px] text-sm font-[inherit] text-[var(--ink1)] bg-white outline-none mb-2 transition-colors focus:border-[var(--ink1)]"
            />
            <p className="text-xs text-[var(--orange)] mb-3 leading-normal font-medium">결제 후 10분 이내로 결과 리포트 PDF를 보내드려요</p>

            <div className="h-px bg-black/[.08] my-4" />

            {/* 약관 */}
            <div className="text-xs font-semibold text-[var(--ink2)] uppercase mb-4">약관 동의</div>

            {/* 전체 동의 */}
            <label className="flex items-center gap-2 py-2 px-1 cursor-pointer">
              <input type="checkbox" checked={consentAll} onChange={(e) => handleAllConsent(e.target.checked)} className="hidden" />
              <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-colors
                ${consentAll ? 'bg-[#FE4C1B] border-[#FE4C1B]' : 'bg-white border-[#CBD0E0]'}`}>
                {consentAll && <span className="block w-[5px] h-[8px] border-r-[1.5px] border-b-[1.5px] border-white rotate-45 translate-x-0 -translate-y-[1px]" />}
              </span>
              <span className="text-sm font-medium text-[var(--ink1)]">전체 동의</span>
            </label>

            {/* 개별 동의 */}
            <div className="flex flex-col mb-5">
              {consentItems.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between gap-2 py-2 px-1 cursor-pointer"
                       onClick={() => setExpandedConsent(expandedConsent === item.id ? null : item.id)}>
                    <label className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={item.checked} onChange={(e) => item.onChange(e.target.checked)} className="hidden" />
                      <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-colors
                        ${item.checked ? 'bg-[#FE4C1B] border-[#FE4C1B]' : 'bg-white border-[#CBD0E0]'}`}>
                        {item.checked && <span className="block w-[5px] h-[8px] border-r-[1.5px] border-b-[1.5px] border-white rotate-45 translate-x-0 -translate-y-[1px]" />}
                      </span>
                    </label>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-[10px] font-semibold text-[var(--orange)] bg-[rgba(254,76,27,.1)] px-[7px] py-0.5 rounded shrink-0">필수</span>
                      <span className="text-[13px] text-[var(--ink2)]">{item.label}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         className={`shrink-0 transition-transform ${expandedConsent === item.id ? 'rotate-180' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="#8B95A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {expandedConsent === item.id && (
                    <div className="text-[11px] text-[var(--ink2)] leading-relaxed px-1 py-2.5 border-t border-black/[.06] whitespace-pre-line">
                      {item.body}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 결제 버튼 */}
            <button
              onClick={handlePay}
              disabled={!canPay || paying}
              className="w-full py-4 bg-[var(--orange)] border-none rounded-[10px] text-white text-base font-bold cursor-pointer font-[inherit] tracking-tight hover:bg-[#e03916] disabled:opacity-50 disabled:cursor-default transition-colors"
            >
              {paying ? '처리 중...' : '정밀 분석 받기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
