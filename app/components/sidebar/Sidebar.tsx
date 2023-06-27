import React, { use } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const currentUser = use(getCurrentUser());

  return (
    <div className="h-full">
      <DesktopSidebar user={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
