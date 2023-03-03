import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const data = await prisma.hilal.findMany();
  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const { url, description } = await request.json();
  const hilal = await prisma.hilal.create({
    data: {
      url,
      description,
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  });
  return new Response(JSON.stringify(hilal));
}
