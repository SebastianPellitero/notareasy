'use client';

import { Persona, RolPersona } from '@/lib/tipos';

interface Props {
  personas: Persona[];
  seleccionadaId: string | null;
  onSeleccionar: (id: string) => void;
  onCambiarRol: (id: string, rol: RolPersona) => void;
  onAgregar: () => void;
  puedeAgregar: boolean;
}

export default function PersonaTabs({
  personas,
  seleccionadaId,
  onSeleccionar,
  onCambiarRol,
  onAgregar,
  puedeAgregar,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {personas.map((persona) => {
        const activa = persona.id === seleccionadaId;
        return (
          <button
            key={persona.id}
            type="button"
            onClick={() => onSeleccionar(persona.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${
              activa
                ? 'border-neutral-800 bg-neutral-800 text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
            }`}
          >
            <span>
              {persona.nombre} {persona.apellido}
            </span>
            <select
              value={persona.rol}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onCambiarRol(persona.id, e.target.value as RolPersona)}
              className={`rounded border-0 text-xs ${
                activa ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              <option value="poderdante">poderdante</option>
              <option value="apoderado">apoderado</option>
            </select>
          </button>
        );
      })}
      <button
        type="button"
        onClick={onAgregar}
        disabled={!puedeAgregar}
        title={puedeAgregar ? 'Agregar persona' : 'No quedan personas disponibles en el pool'}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-lg font-semibold text-neutral-700 hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
