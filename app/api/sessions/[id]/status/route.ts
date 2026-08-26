import { NextResponse } from 'next/server';
import { getSession } from '@/lib/sessionStore';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(id);

  if (!session) {
    return NextResponse.json({ status: 'expired' }, { status: 404 });
  }

  return NextResponse.json({
    status: session.status,
    photoDataUrl: session.status === 'completed' ? session.photoDataUrl : null,
  });
}
