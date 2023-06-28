import React, { use } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversations } from "../actions/getConversations";
import getUsers from "../actions/getUsers";

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  const conversations = use(getConversations());
  const users = use(getUsers());
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
