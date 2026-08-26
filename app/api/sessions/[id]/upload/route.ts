import { CAPTURE_PAGE_ORIGIN } from '@/lib/config';
import { completeSession, getSession } from '@/lib/sessionStore';

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': CAPTURE_PAGE_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) {
    return new Response('Session not found or expired', { status: 404, headers: corsHeaders() });
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength === 0) {
    return new Response('Empty body', { status: 400, headers: corsHeaders() });
  }

  const contentType = request.headers.get('content-type') || 'image/jpeg';
  const base64 = Buffer.from(bytes).toString('base64');
  await completeSession(id, `data:${contentType};base64,${base64}`);

  return new Response(null, { status: 204, headers: corsHeaders() });
}

// Content-Type: image/jpeg no es "simple" para CORS -> el browser dispara OPTIONS antes del POST real.
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
