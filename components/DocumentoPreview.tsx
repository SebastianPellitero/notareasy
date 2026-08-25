'use client';

import { useMemo } from 'react';
import { Persona, DatosDocumento } from '@/lib/tipos';
import { generarTextoPoder } from '@/lib/generarTextoPoder';

interface Props {
  personas: Persona[];
  datosDocumento: DatosDocumento;
}

export default function DocumentoPreview({ personas, datosDocumento }: Props) {
  const texto = useMemo(
    () => generarTextoPoder(personas, datosDocumento),
    [personas, datosDocumento]
  );

  return (
    <div className="rounded-lg border border-neutral-300 bg-white p-6 shadow-sm">
      <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-neutral-900">
        {texto}
      </p>
    </div>
  );
}
