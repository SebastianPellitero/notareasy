/**
 * Origen permitido para el endpoint de upload (CORS) y default para armar
 * el link mobile/QR. TODO: cuando se hostee /capture-page en serio, setear
 * NEXT_PUBLIC_CAPTURE_PAGE_ORIGIN en .env.local. Hasta entonces cae en "*",
 * aceptable para POC local, no para más allá de eso.
 */
export const CAPTURE_PAGE_ORIGIN =
  process.env.NEXT_PUBLIC_CAPTURE_PAGE_ORIGIN?.trim() || '*';
