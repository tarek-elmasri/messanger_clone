import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;
    if (!channel) {
      channel = pusherClient.subscribe("presence-messanger");
      setActiveChannel(channel);
    }

    const handleSubscription = (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    };

    const handleAddMember = (member: Record<string, any>) => {
      add(member.id);
    };

    const handleRemoveMember = (member: Record<string, any>) => {
      remove(member.id);
    };

    channel.bind("pusher:subscription_succeeded", handleSubscription);
    channel.bind("pusher:member_added", handleAddMember);
    channel.bind("pusher:member_removed", handleRemoveMember);

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messanger");
        pusherClient.unbind(
          "pusher:subscription_succeeded",
          handleSubscription
        );
        pusherClient.unbind("pusher:member_added", handleAddMember);
        pusherClient.unbind("pusher:member_removed", handleRemoveMember);

        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
