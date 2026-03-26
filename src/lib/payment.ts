const SERVER = 'https://decide-workbot-production.up.railway.app';

export async function createSession(email: string, type: string, a: number, b: number, c: number) {
  const res = await fetch(`${SERVER}/api/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, type, a, b, c }),
  });
  const data = await res.json();
  return data.session_id as string;
}

export async function notifyWebhook(txId: string, sessionId: string) {
  return fetch(`${SERVER}/api/payment/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imp_uid: txId, merchant_uid: sessionId }),
  }).catch(() => {});
}
