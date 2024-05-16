import { Issue } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@react-email/components";
import Link from "next/link";

export const EditIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <Link href={`issues/${issue.id}/edit`}>
      <Button>
        <Pencil1Icon />
        Edit Issue
      </Button>
    </Link>
  );
};
