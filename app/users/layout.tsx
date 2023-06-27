import { use } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  const users = use(getUsers());

  return (
    <Sidebar>
      <div className="h-full">
        <UserList list={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
