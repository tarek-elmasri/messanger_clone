import React, { use } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversations } from "../actions/getConversations";

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  const conversations = use(getConversations());

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
