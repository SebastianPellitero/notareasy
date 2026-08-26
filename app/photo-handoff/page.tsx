'use client';

import { useState } from 'react';
import SessionQRCode from '@/components/SessionQRCode';
import { useSessionStatus } from '@/hooks/useSessionStatus';

export default function PhotoHandoffPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturePageOrigin, setCapturePageOrigin] = useState('http://localhost:8080');

  const { status, photoDataUrl } = useSessionStatus(sessionId);

  async function startSession() {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/sessions', { method: 'POST' });
      if (!res.ok) throw new Error('No se pudo crear la sesión');
      const data = await res.json();
      setSessionId(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setCreating(false);
    }
  }

  const apiOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const mobileUrl = sessionId
    ? `${capturePageOrigin}/?session=${sessionId}&api=${encodeURIComponent(apiOrigin)}`
    : null;

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="text-2xl font-semibold text-neutral-900">Captura por celular (demo)</h1>
      <p className="mt-2 text-sm text-neutral-600">
        POC del patrón cross-device: escaneá el QR con tu celular, sacá una foto, y esta
        página la va a detectar automáticamente por polling.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4">
        <label className="text-sm text-neutral-700">
          Origen de la capture page (dónde vas a servir /capture-page)
          <input
            type="text"
            value={capturePageOrigin}
            onChange={(e) => setCapturePageOrigin(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-sm"
          />
        </label>

        {!sessionId && (
          <button
            onClick={startSession}
            disabled={creating}
            className="self-start rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {creating ? 'Creando sesión…' : 'Generar QR'}
          </button>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {sessionId && mobileUrl && (
          <div className="flex flex-col items-start gap-3">
            <SessionQRCode value={mobileUrl} />
            <p className="break-all text-xs text-neutral-500">{mobileUrl}</p>
            <p className="text-sm text-neutral-700">
              Estado: <span className="font-medium">{status}</span>
            </p>
            {status === 'completed' && photoDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- data URL en memoria, no aplica next/image
              <img
                src={photoDataUrl}
                alt="Foto capturada desde el celular"
                className="max-w-xs rounded border border-neutral-200"
              />
            )}
            {status === 'expired' && (
              <p className="text-sm text-red-600">
                La sesión expiró (TTL ~10 min). Generá una nueva.
              </p>
            )}
            <button
              onClick={() => setSessionId(null)}
              className="text-xs text-neutral-500 underline"
            >
              Empezar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
