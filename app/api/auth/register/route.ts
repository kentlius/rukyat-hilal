import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const {
    name,
    email,
    password,
    yearOfBirth,
    gender,
    phoneNumber,
    institution,
  } = await request.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return new Response("User already exists");
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
        phoneNumber,
        institution,
        yearOfBirth: Number(yearOfBirth),
        gender,
      },
    });
    return new Response(JSON.stringify(user));
  }
}
