
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === 'string' ? body.name.trim() : '';

    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';

    const password =
      typeof body.password === 'string' ? body.password : '';

    if (!name || name.length > 80) {
      return NextResponse.json(
        { error: 'Enter a valid name (maximum 80 characters).' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters and no more than 72 UTF-8 bytes.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        preferred_language: true,
      },
    });

    await createSession(user.id);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      preferredLanguage: user.preferred_language,
    }, { status: 201 });

  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    console.error('Signup error:', error);

    return NextResponse.json(
      { error: 'Unable to create account. Please try again.' },
      { status: 500 }
    );
  }
}
