import { Persona, DatosDocumento, RolPersona } from './tipos';

function conjugar(cantidad: number, singular: string, plural: string): string {
  return cantidad === 1 ? singular : plural;
}

function terminoRol(cantidad: number, rol: RolPersona): string {
  if (rol === 'apoderado') {
    return cantidad <= 1 ? 'el/la apoderado/a' : 'los/las apoderados/as';
  }
  return cantidad <= 1 ? 'el/la poderdante' : 'los/las poderdantes';
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function detallePersona(p: Persona): string {
  return `${p.nombre} ${p.apellido}, de nacionalidad ${p.nacionalidad}, nacido/a el ${p.fechaNacimiento}, de estado civil ${p.estadoCivil}, titular del Documento Nacional de Identidad (D.N.I.) N.º ${p.dni}, CUIT/CUIL N.º ${p.cuit}, con domicilio real en ${p.domicilio}`;
}

function detallePersonas(personas: Persona[]): string {
  return personas.map(detallePersona).join('; y ');
}

const PLACEHOLDER_PODERDANTE = '[Falta agregar poderdante/s]';
const PLACEHOLDER_APODERADO = '[Falta agregar apoderado/s]';

function bloqueObjeto(bien: DatosDocumento['bien']): string {
  if (bien.tipo === 'inmueble' && bien.inmueble) {
    const { direccion, nomenclaturaCatastral, matricula, provinciaRegistro } = bien.inmueble;
    return `Venta de inmueble, ubicado en ${direccion || '[dirección]'}, Nomenclatura Catastral ${nomenclaturaCatastral || '[nomenclatura catastral]'}, Matrícula/Partida N.º ${matricula || '[matrícula]'}, inscripto en el Registro de la Propiedad Inmueble de ${provinciaRegistro || '[provincia]'}.`;
  }
  if (bien.tipo === 'automotor' && bien.automotor) {
    const { marca, modelo, anio, dominio, motor, chasis, seccional } = bien.automotor;
    return `Venta de automotor, marca ${marca || '[marca]'}, modelo ${modelo || '[modelo]'}, año ${anio || '[año]'}, dominio (patente) ${dominio || '[dominio]'}, motor N.º ${motor || '[motor]'}, chasis N.º ${chasis || '[chasis]'}, inscripto en el Registro Nacional de la Propiedad Automotor, Seccional N.º ${seccional || '[seccional]'}.`;
  }
  return '[Falta completar datos del bien]';
}

export function generarTextoPoder(personas: Persona[], datos: DatosDocumento): string {
  const poderdantes = personas.filter((p) => p.rol === 'poderdante');
  const apoderados = personas.filter((p) => p.rol === 'apoderado');
  const nPod = poderdantes.length;
  const nApo = apoderados.length;

  const encabezado = `PODER ESPECIAL\n\nEn la ciudad de ${datos.ciudad || '[ciudad]'}, ${datos.provincia || '[provincia]'}, República Argentina, a los ${datos.dia || '[día]'} días del mes de ${datos.mes || '[mes]'} de ${datos.anio || '[año]'}, ${conjugar(nPod || 1, 'comparece', 'comparecen')}:`;

  const comparecencia =
    nPod === 0
      ? PLACEHOLDER_PODERDANTE
      : `${detallePersonas(poderdantes)}; ${conjugar(
          nPod,
          'persona mayor de edad y hábil para este acto, quien dice y',
          'personas mayores de edad y hábiles para este acto, quienes dicen y'
        )}`;

  const manifiesta = `${conjugar(nPod || 1, 'MANIFIESTA', 'MANIFIESTAN')}:`;

  const otorgamiento = `Que por el presente instrumento ${conjugar(nPod || 1, 'otorga', 'otorgan')} PODER ESPECIAL a favor de:`;

  const detalleApoderados = nApo === 0 ? PLACEHOLDER_APODERADO : `${detallePersonas(apoderados)};`;

  const finalidad = `para que, en ${conjugar(
    nPod || 1,
    'su nombre y representación',
    'sus nombres y representación'
  )}, ${conjugar(nApo || 1, 'realice', 'realicen')} lo siguiente:`;

  const objeto = `OBJETO DEL PODER:\n\n${bloqueObjeto(datos.bien)}`;

  const facultades = `FACULTADES:\n\nA tal efecto, ${terminoRol(nApo, 'apoderado')} ${conjugar(
    nApo || 1,
    'queda especialmente facultado/a',
    'quedan especialmente facultados/as'
  )} para:\na) Fijar el precio, forma de pago, plazos y demás condiciones de la venta;\nb) Suscribir el boleto de compraventa y/o la escritura traslativa de dominio (o el formulario de transferencia, en caso de automotor);\nc) Percibir el precio, total o parcial, en la forma y moneda que se pacte, y otorgar los recibos correspondientes;\nd) Solicitar y retirar certificados de dominio, inhibición, deudas e informes ante los registros y organismos que correspondan;\ne) Cancelar hipotecas, prendas o cualquier otro gravamen que pesara sobre el bien, si lo hubiera;\nf) Abonar impuestos, tasas, expensas, multas e infracciones vinculadas al bien;\ng) Realizar los trámites necesarios ante ARCA (ex AFIP), Rentas de la Provincia, la Municipalidad, el Registro de la Propiedad Inmueble o el Registro Nacional de la Propiedad Automotor (DNRPA), según corresponda;\nh) Firmar toda la documentación pública o privada necesaria para cumplir este mandato.`;

  const alcance = `ALCANCE:\n\nEste es un poder especial, limitado exclusivamente a los actos aquí detallados. ${capitalizar(terminoRol(
    nApo,
    'apoderado'
  ))} ${conjugar(nApo || 1, 'no podrá usarlo', 'no podrán usarlo')} para fines distintos a los expresamente conferidos. ${capitalizar(terminoRol(
    nPod,
    'poderdante'
  ))} ${conjugar(nPod || 1, 'ratifica', 'ratifican')} desde ya todo lo actuado por ${terminoRol(
    nApo,
    'apoderado'
  )}, y ${conjugar(nPod || 1, 'podrá revocarlo', 'podrán revocarlo')} en cualquier momento mediante instrumento de igual naturaleza.`;

  const cierre = 'Leída que le fue la presente, la ratifica y firma por ante mí, de todo lo cual doy fe.';

  const firmas = [
    ...(poderdantes.length > 0
      ? poderdantes.map((p) => `Firma poderdante (${p.nombre} ${p.apellido}): _______________`)
      : ['Firma poderdante: _______________']),
    ...(apoderados.length > 0
      ? apoderados.map((p) => `Firma apoderado/a (opcional) (${p.nombre} ${p.apellido}): _______________`)
      : ['Firma apoderado/a (opcional): _______________']),
  ].join('\n');

  return [
    encabezado,
    comparecencia,
    manifiesta,
    otorgamiento,
    detalleApoderados,
    finalidad,
    objeto,
    facultades,
    alcance,
    cierre,
    firmas,
  ].join('\n\n');
}
