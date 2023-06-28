import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId: string;
}
export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: { users: true },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("SERVER ERROR", { status: 500 });
  }
};
