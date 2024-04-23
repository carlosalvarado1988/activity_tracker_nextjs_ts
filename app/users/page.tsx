import React, { Suspense } from "react";
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
      <Link href="users/new" className="btn mb-3">
        New User
      </Link>
      <Suspense
        fallback={
          <div>
            <span className="loading loading-bars loading-sm"></span>
          </div>
        }
      >
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </section>
  );
};

export default UsersPage;
