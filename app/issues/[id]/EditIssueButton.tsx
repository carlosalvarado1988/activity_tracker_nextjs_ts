import { Issue } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export const EditIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <Link href={`/issues/${issue.id}/edit`}>
      <Button>
        <Pencil1Icon />
        Edit Issue
      </Button>
    </Link>
  );
};
