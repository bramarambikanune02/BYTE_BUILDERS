
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';

    const password =
      typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email or password is incorrect.' },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Email or password is incorrect.' },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      preferredLanguage: user.preferred_language,
    });

  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      { error: 'Unable to sign in. Please try again.' },
      { status: 500 }
    );
  }
}
