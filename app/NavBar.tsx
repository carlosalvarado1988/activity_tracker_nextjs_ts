import Link from "next/link";
import React from "react";

const NavBar = () => {
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
    </nav>
  );
};

export default NavBar;
