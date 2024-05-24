import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchema/users';
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  // 400 bad request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  // 409 Conflict
  if (duplicate) {
    return NextResponse.json({ message: 'Duplicate Username' }, { status: 409 });
  }

  const hashPassword = await bcrypt.hash(body.password, 1);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  // 201 Created
  return NextResponse.json(newUser, { status: 201 });
}
