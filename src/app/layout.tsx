import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const GA_ID = 'G-CVZ9581W45';

export const metadata: Metadata = {
  title: '직장 vs 창업, 나는 어떤 사람인가? | decide.lab',
  description: '30개 체크리스트로 알아보는 나의 커리어 방향. 직장 적합도, 이탈 신호, 창업 준비도를 한눈에 확인하세요.',
  openGraph: {
    title: '직장 vs 창업, 나는 어떤 사람인가?',
    description: '30개 체크리스트로 알아보는 나의 커리어 방향',
    url: 'https://decidelab.co.kr',
    siteName: 'decide.lab',
    images: [
      {
        url: 'https://decidelab.co.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'decide.lab — 직장 vs 창업, 나는 어떤 사람인가?',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '직장 vs 창업, 나는 어떤 사람인가?',
    description: '30개 체크리스트로 알아보는 나의 커리어 방향',
    images: ['https://decidelab.co.kr/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://decidelab.co.kr'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script src="https://cdn.portone.io/v2/browser-sdk.js" defer />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
