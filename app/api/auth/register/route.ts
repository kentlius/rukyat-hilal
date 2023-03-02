import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password, year_of_birth, gender, phone_number, institution } =
    await request.json();
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
        year_of_birth: parseInt(year_of_birth, 10),
        gender,
        phone_number,
        institution,
      },
    });
    return new Response(JSON.stringify(user));
  }
}
