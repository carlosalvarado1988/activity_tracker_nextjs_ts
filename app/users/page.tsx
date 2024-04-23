import React from "react";
import UserTable from "./UserTable";
import Link from "next/link";

export interface SortUsersBy {
  sortOrder: "name" | "email";
}

interface Props {
  searchParams: SortUsersBy;
}

const UsersPage = ({ searchParams: { sortOrder } }: Props) => {
  return (
    <section>
      <h1>Users</h1>
      <Link href="users/new" className="btn">
        New User
      </Link>
      <UserTable sortOrder={sortOrder} />
    </section>
  );
};

export default UsersPage;
