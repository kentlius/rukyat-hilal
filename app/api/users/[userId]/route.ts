import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || parseInt(params.userId) !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await request.json();

    // Update the user.
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: body.name,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
