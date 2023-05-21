import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  if (!email || !code) {
    return new Response("Invalid request");
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return new Response("User does not exist");
  }
  if (user.verificationCode === code) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    });
    return new Response("Email verified");
  } else {
    return new Response("Invalid verification code");
  }
}
