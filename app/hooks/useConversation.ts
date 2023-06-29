import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(
    () => (params?.conversationId as string) ?? "",
    [params?.conversationId]
  );

  const isOpen = useMemo(
    () => !!params?.conversationId,
    [params?.conversationId]
  );

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
