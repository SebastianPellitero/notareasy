'use client';

import { Persona } from '@/lib/tipos';

interface Props {
  persona: Persona | null;
}

export default function PersonaPreviewJSON({ persona }: Props) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-white">
      <div className="border-b border-neutral-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Persona seleccionada
      </div>
      {persona ? (
        <pre className="max-h-72 overflow-auto p-3 text-xs text-neutral-800">
          {JSON.stringify(persona, null, 2)}
        </pre>
      ) : (
        <p className="p-3 text-sm text-neutral-500">Seleccioná una persona para ver sus datos.</p>
      )}
    </div>
  );
}
