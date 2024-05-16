import React from "react";
import Link from "next/link";
import { Button, Table } from "@radix-ui/themes";

export const IssuePageActions = () => {
  return (
    <div className="mb-3">
      <Link href={"/issues/new"}>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
};
