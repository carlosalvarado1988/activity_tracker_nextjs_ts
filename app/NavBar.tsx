"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex p-3 bg-slate-200">
      <Link href="/" className="mr-10">
        Logo
      </Link>
      <Link href="/admin" className="mr-5">
        Admin
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      {status === "loading" && <div>Loading ...</div>}
      {status === "authenticated" && (
        <div>
          {session.user?.name}
          <Link href="/api/auth/signout" className="ml-5">
            Sign Out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" className="mr-5">
          Login
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
