export type RolPersona = 'apoderado' | 'poderdante';

export interface Persona {
  id: string;
  rol: RolPersona;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  fechaNacimiento: string; // "DD/MM/AAAA"
  estadoCivil: 'soltero/a' | 'casado/a' | 'divorciado/a' | 'viudo/a';
  dni: string; // "28.456.789"
  cuit: string; // "20-28456789-4"
  domicilio: string;
}

export interface DatosDocumento {
  ciudad: string;
  provincia: string;
  dia: string;
  mes: string;
  anio: string;
  bien: {
    tipo: 'inmueble' | 'automotor';
    inmueble?: {
      direccion: string;
      nomenclaturaCatastral: string;
      matricula: string;
      provinciaRegistro: string;
    };
    automotor?: {
      marca: string;
      modelo: string;
      anio: string;
      dominio: string;
      motor: string;
      chasis: string;
      seccional: string;
    };
  };
}
