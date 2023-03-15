import prisma from "@/lib/prisma";

// @ts-ignore
export async function GET(request: Request, { params }) {
  const id = params.id;
  const data = await prisma.hilal.findUnique({
    where: {
      id: Number(id),
    },
  });
  return new Response(JSON.stringify(data));
}

// @ts-ignore
export async function DELETE(request: Request, { params }) {
  const id = params.id;
  const data = await prisma.hilal.delete({
    where: {
      id: Number(id),
    },
  });
  return new Response(JSON.stringify(data));
}

// @ts-ignore
export async function PUT(request: Request, { params }) {
  const id = params.id;
  const { url, description, status } = await request.json();
  const data = await prisma.hilal.update({
    where: {
      id: Number(id),
    },
    data: {
      url,
      description,
      status,
    },
  });
  return new Response(JSON.stringify(data));
}
