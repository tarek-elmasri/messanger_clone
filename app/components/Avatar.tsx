"use client";

import Image from "next/image";
import { User } from "@prisma/client";

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className="relative">
      <div
        className="
    relative
    inline-block
    rounded-full
    overflow-hidden
    h-9
    w-9
    md:h-11
    md:w-11
    "
      >
        <Image
          alt="avatar"
          src={user.image || "/images/placeholder.jpg"}
          fill
          sizes="(max-width: 200px 100vw)"
        />
      </div>

      <span
        className="
        absolute
        block
        rounded-full
        bg-green-500
        ring-2
        ring-white
        top-0
        right-0
        h-2
        w-2
        md:h-3
        md:w-3
      "
      />
    </div>
  );
};

export default Avatar;
