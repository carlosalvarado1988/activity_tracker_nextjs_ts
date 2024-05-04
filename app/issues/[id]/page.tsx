import { IssueStatusBadge } from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link, Button } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import delay from "delay";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  if (typeof parseInt(params.id) !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <section className="max-w-xl">
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
    </section>
  );
};

export default IssueDetailsPage;
