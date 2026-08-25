import { Persona } from './tipos';

export const mockPersonas: Omit<Persona, 'id' | 'rol'>[] = [
  { nombre: 'Juan Martín', apellido: 'Pérez', nacionalidad: 'Argentina', fechaNacimiento: '14/03/1985', estadoCivil: 'soltero/a', dni: '28.456.789', cuit: '20-28456789-4', domicilio: 'Av. Rivadavia 4521, CABA' },
  { nombre: 'María Laura', apellido: 'Gómez', nacionalidad: 'Argentina', fechaNacimiento: '22/07/1990', estadoCivil: 'casado/a', dni: '25.789.123', cuit: '27-25789123-5', domicilio: 'San Martín 812, Rosario, Santa Fe' },
  { nombre: 'Carlos Alberto', apellido: 'Fernández', nacionalidad: 'Argentina', fechaNacimiento: '05/11/1972', estadoCivil: 'divorciado/a', dni: '22.345.678', cuit: '20-22345678-9', domicilio: 'Belgrano 1345, Córdoba' },
  { nombre: 'Lucía Belén', apellido: 'Rodríguez', nacionalidad: 'Argentina', fechaNacimiento: '30/01/1995', estadoCivil: 'soltero/a', dni: '31.234.567', cuit: '27-31234567-0', domicilio: 'Mitre 2200, La Plata, Buenos Aires' },
  { nombre: 'Ricardo Daniel', apellido: 'Suárez', nacionalidad: 'Argentina', fechaNacimiento: '17/09/1958', estadoCivil: 'viudo/a', dni: '18.987.654', cuit: '20-18987654-3', domicilio: '9 de Julio 456, Mendoza' },
  { nombre: 'Valentina', apellido: 'Acosta', nacionalidad: 'Argentina', fechaNacimiento: '08/12/2000', estadoCivil: 'soltero/a', dni: '40.112.334', cuit: '27-40112334-2', domicilio: 'Sarmiento 678, Neuquén' },
  { nombre: 'Roberto Hugo', apellido: 'Martínez', nacionalidad: 'Argentina', fechaNacimiento: '11/06/1963', estadoCivil: 'casado/a', dni: '16.789.345', cuit: '20-16789345-7', domicilio: 'Av. Colón 2100, Córdoba' },
  { nombre: 'Ana Sofía', apellido: 'Díaz', nacionalidad: 'Argentina', fechaNacimiento: '25/04/1998', estadoCivil: 'soltero/a', dni: '38.567.912', cuit: '27-38567912-6', domicilio: 'Alberdi 345, Salta' },
  { nombre: 'Miguel Ángel', apellido: 'Torres', nacionalidad: 'Argentina', fechaNacimiento: '19/02/1980', estadoCivil: 'divorciado/a', dni: '27.890.456', cuit: '20-27890456-1', domicilio: 'Av. Pellegrini 1890, Rosario, Santa Fe' },
  { nombre: 'Florencia', apellido: 'Ramírez', nacionalidad: 'Argentina', fechaNacimiento: '03/09/1992', estadoCivil: 'casado/a', dni: '29.678.123', cuit: '27-29678123-8', domicilio: 'Av. Alem 567, Bahía Blanca, Buenos Aires' },
  { nombre: 'Gustavo Adolfo', apellido: 'Sosa', nacionalidad: 'Argentina', fechaNacimiento: '27/10/1955', estadoCivil: 'viudo/a', dni: '13.456.789', cuit: '20-13456789-0', domicilio: 'España 234, Paraná, Entre Ríos' },
  { nombre: 'Camila Antonella', apellido: 'Herrera', nacionalidad: 'Argentina', fechaNacimiento: '16/05/2002', estadoCivil: 'soltero/a', dni: '42.345.678', cuit: '27-42345678-3', domicilio: 'Av. Sáenz Peña 890, Resistencia, Chaco' },
  { nombre: 'Fernando Javier', apellido: 'Castro', nacionalidad: 'Argentina', fechaNacimiento: '09/01/1976', estadoCivil: 'casado/a', dni: '24.567.890', cuit: '20-24567890-5', domicilio: 'Av. Roca 1200, San Miguel de Tucumán, Tucumán' },
  { nombre: 'Patricia Mabel', apellido: 'Ortiz', nacionalidad: 'Argentina', fechaNacimiento: '21/08/1968', estadoCivil: 'divorciado/a', dni: '20.123.456', cuit: '27-20123456-9', domicilio: 'Moreno 456, San Rafael, Mendoza' },
  { nombre: 'Diego Sebastián', apellido: 'Molina', nacionalidad: 'Argentina', fechaNacimiento: '02/03/1988', estadoCivil: 'soltero/a', dni: '33.789.012', cuit: '20-33789012-4', domicilio: 'Av. Hipólito Yrigoyen 3400, CABA' },
  { nombre: 'Silvina Karina', apellido: 'Vega', nacionalidad: 'Argentina', fechaNacimiento: '13/07/1983', estadoCivil: 'casado/a', dni: '30.456.123', cuit: '27-30456123-1', domicilio: 'San Lorenzo 789, Santa Fe' },
  { nombre: 'Alejandro Nicolás', apellido: 'Ibáñez', nacionalidad: 'Argentina', fechaNacimiento: '28/12/1950', estadoCivil: 'viudo/a', dni: '10.234.567', cuit: '20-10234567-6', domicilio: 'Av. San Martín 100, Posadas, Misiones' },
];
