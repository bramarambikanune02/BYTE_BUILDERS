
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUserId } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        preferred_language: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      preferredLanguage: user.preferred_language,
    });

  } catch (error) {
    console.error('Session verification error:', error);

    return NextResponse.json(
      { error: 'Unable to verify session.' },
      { status: 500 }
    );
  }
}
