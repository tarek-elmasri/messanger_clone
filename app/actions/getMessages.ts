import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export const getMessages = async (conversationId: string) => {
  try {
    if (!conversationId) return [];
    const currentUser = getCurrentUser();
    if (!currentUser) return [];

    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        conversationId,
      },
      include: { seen: true, sender: true },
    });

    return messages;
  } catch (error) {
    return [];
  }
};
