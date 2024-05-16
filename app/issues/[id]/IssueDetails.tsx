import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Text, Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mb="3">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>

      <Link href={"/issues"}>
        <Button>Back</Button>
      </Link>
    </>
  );
};
