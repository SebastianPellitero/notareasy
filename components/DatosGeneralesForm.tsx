'use client';

import { DatosDocumento } from '@/lib/tipos';

interface Props {
  datosDocumento: DatosDocumento;
  onChange: (datos: DatosDocumento) => void;
}

const inputClass =
  'w-full rounded border border-neutral-300 px-2 py-1 text-sm focus:border-neutral-500 focus:outline-none';
const labelClass = 'text-xs font-medium text-neutral-600';

export default function DatosGeneralesForm({ datosDocumento, onChange }: Props) {
  function setCampo<K extends keyof DatosDocumento>(campo: K, valor: DatosDocumento[K]) {
    onChange({ ...datosDocumento, [campo]: valor });
  }

  function setInmuebleCampo(campo: keyof NonNullable<DatosDocumento['bien']['inmueble']>, valor: string) {
    onChange({
      ...datosDocumento,
      bien: {
        ...datosDocumento.bien,
        inmueble: {
          direccion: '',
          nomenclaturaCatastral: '',
          matricula: '',
          provinciaRegistro: '',
          ...datosDocumento.bien.inmueble,
          [campo]: valor,
        },
      },
    });
  }

  function setAutomotorCampo(campo: keyof NonNullable<DatosDocumento['bien']['automotor']>, valor: string) {
    onChange({
      ...datosDocumento,
      bien: {
        ...datosDocumento.bien,
        automotor: {
          marca: '',
          modelo: '',
          anio: '',
          dominio: '',
          motor: '',
          chasis: '',
          seccional: '',
          ...datosDocumento.bien.automotor,
          [campo]: valor,
        },
      },
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Lugar (ciudad)</label>
          <input
            className={inputClass}
            value={datosDocumento.ciudad}
            onChange={(e) => setCampo('ciudad', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Provincia</label>
          <input
            className={inputClass}
            value={datosDocumento.provincia}
            onChange={(e) => setCampo('provincia', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Día</label>
          <input
            className={inputClass}
            value={datosDocumento.dia}
            onChange={(e) => setCampo('dia', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Mes</label>
          <input
            className={inputClass}
            value={datosDocumento.mes}
            onChange={(e) => setCampo('mes', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Año</label>
          <input
            className={inputClass}
            value={datosDocumento.anio}
            onChange={(e) => setCampo('anio', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tipo de bien</label>
        <select
          className={inputClass}
          value={datosDocumento.bien.tipo}
          onChange={(e) => setCampo('bien', { ...datosDocumento.bien, tipo: e.target.value as 'inmueble' | 'automotor' })}
        >
          <option value="inmueble">Inmueble</option>
          <option value="automotor">Automotor</option>
        </select>
      </div>

      {datosDocumento.bien.tipo === 'inmueble' ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Dirección</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.inmueble?.direccion ?? ''}
              onChange={(e) => setInmuebleCampo('direccion', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Nomenclatura catastral</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.inmueble?.nomenclaturaCatastral ?? ''}
              onChange={(e) => setInmuebleCampo('nomenclaturaCatastral', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Matrícula</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.inmueble?.matricula ?? ''}
              onChange={(e) => setInmuebleCampo('matricula', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Provincia del registro</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.inmueble?.provinciaRegistro ?? ''}
              onChange={(e) => setInmuebleCampo('provinciaRegistro', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Marca</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.marca ?? ''}
              onChange={(e) => setAutomotorCampo('marca', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Modelo</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.modelo ?? ''}
              onChange={(e) => setAutomotorCampo('modelo', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Año</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.anio ?? ''}
              onChange={(e) => setAutomotorCampo('anio', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Dominio</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.dominio ?? ''}
              onChange={(e) => setAutomotorCampo('dominio', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Motor</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.motor ?? ''}
              onChange={(e) => setAutomotorCampo('motor', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Chasis</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.chasis ?? ''}
              onChange={(e) => setAutomotorCampo('chasis', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Seccional</label>
            <input
              className={inputClass}
              value={datosDocumento.bien.automotor?.seccional ?? ''}
              onChange={(e) => setAutomotorCampo('seccional', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
