'use client';

import { useEffect, useState } from 'react';

export type PollStatus = 'pending' | 'completed' | 'expired';

interface StatusResponse {
  status: PollStatus;
  photoDataUrl: string | null;
}

export function useSessionStatus(sessionId: string | null, intervalMs = 1500) {
  const [status, setStatus] = useState<PollStatus>('pending');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    setStatus('pending');
    setPhotoDataUrl(null);

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    async function tick() {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/sessions/${sessionId}/status`, { cache: 'no-store' });
        if (cancelled) return;

        if (!res.ok) {
          setStatus('expired');
          if (intervalId) clearInterval(intervalId);
          return;
        }

        const data: StatusResponse = await res.json();
        if (cancelled) return;

        setStatus(data.status);
        if (data.photoDataUrl) setPhotoDataUrl(data.photoDataUrl);
        if (data.status !== 'pending' && intervalId) clearInterval(intervalId);
      } catch {
        // hiccup de red durante el polling: se reintenta en el próximo tick
      }
    }

    tick();
    intervalId = setInterval(tick, intervalMs);

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [sessionId, intervalMs]);

  return { status, photoDataUrl };
}
