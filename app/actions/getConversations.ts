import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    return [];
  }
};

export const getConversationById = async (id: string) => {
  if (!id) return null;

  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: { users: true },
    });

    return conversation;
  } catch (error) {
    return null;
  }
};
