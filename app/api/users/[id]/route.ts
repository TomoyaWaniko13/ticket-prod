import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/ValidationSchema/users';
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  // 400 bad request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  // 404 Not Found
  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
  }

  // If the password field is present and not empty in the request body
  // (= a user is either creating a new account or updating their existing password),
  // the password is hashed using bcrypt.
  if (body?.password && body.password != '') {
    body.password = await bcrypt.hash(body.password, 0);
  } else {
    // delete is a JavaScript keyword that is used to remove a property from an object.

    // if the password field is present in the request body but is empty
    // (= the user does not want to change their password),
    // delete the password field.
    delete body.password;
  }

  console.log(body);

  // if a user is trying to change the password, check for the duplicate.
  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.usernames },
    });
    // 409 Conflict
    if (duplicateUsername) {
      return NextResponse.json({ message: 'Duplicate Username' }, { status: 409 });
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateUser);
}
