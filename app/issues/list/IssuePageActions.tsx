import React from "react";
import Link from "next/link";
import { Button, Flex, Table } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

export const IssuePageActions = () => {
  return (
    <Flex className="mb-3" justify="between">
      <IssueStatusFilter />
      <Link href={"/issues/new"}>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};
