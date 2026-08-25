'use client';

import { useState } from 'react';
import { Persona, DatosDocumento, RolPersona } from '@/lib/tipos';
import { mockPersonas } from '@/lib/mockPersonas';
import DatosGeneralesForm from '@/components/DatosGeneralesForm';
import PersonaTabs from '@/components/PersonaTabs';
import PersonaPreviewJSON from '@/components/PersonaPreviewJSON';
import DocumentoPreview from '@/components/DocumentoPreview';

const datosDocumentoInicial: DatosDocumento = {
  ciudad: 'Ciudad Autónoma de Buenos Aires',
  provincia: 'Buenos Aires',
  dia: '25',
  mes: 'agosto',
  anio: '2026',
  bien: {
    tipo: 'inmueble',
    inmueble: {
      direccion: 'Av. Corrientes 1234, CABA',
      nomenclaturaCatastral: 'Circ. 1, Secc. 2, Manz. 34, Parc. 5',
      matricula: '12.345',
      provinciaRegistro: 'Ciudad Autónoma de Buenos Aires',
    },
  },
};

export default function Home() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [datosDocumento, setDatosDocumento] = useState<DatosDocumento>(datosDocumentoInicial);
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<string | null>(null);

  const dniUsados = new Set(personas.map((p) => p.dni));
  const puedeAgregar = mockPersonas.some((p) => !dniUsados.has(p.dni));

  function agregarPersona() {
    const disponible = mockPersonas.find((p) => !dniUsados.has(p.dni));
    if (!disponible) return;
    const nueva: Persona = {
      ...disponible,
      id: crypto.randomUUID(),
      rol: 'poderdante',
    };
    setPersonas((prev) => [...prev, nueva]);
    setPersonaSeleccionadaId(nueva.id);
  }

  function cambiarRol(id: string, rol: RolPersona) {
    setPersonas((prev) => prev.map((p) => (p.id === id ? { ...p, rol } : p)));
  }

  const personaSeleccionada = personas.find((p) => p.id === personaSeleccionadaId) ?? null;

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-4">
          <DatosGeneralesForm datosDocumento={datosDocumento} onChange={setDatosDocumento} />
          <PersonaTabs
            personas={personas}
            seleccionadaId={personaSeleccionadaId}
            onSeleccionar={setPersonaSeleccionadaId}
            onCambiarRol={cambiarRol}
            onAgregar={agregarPersona}
            puedeAgregar={puedeAgregar}
          />
          <PersonaPreviewJSON persona={personaSeleccionada} />
        </div>

        <div className="flex flex-col gap-3 lg:sticky lg:top-8">
          <div className="text-right">
            <h1 className="text-lg font-bold text-neutral-800">MODELO – PODER ESPECIAL</h1>
            <p className="text-sm text-neutral-500">PARA VENDER (Inmueble o Automotor)</p>
          </div>
          <DocumentoPreview personas={personas} datosDocumento={datosDocumento} />
        </div>
      </div>
    </div>
  );
}
