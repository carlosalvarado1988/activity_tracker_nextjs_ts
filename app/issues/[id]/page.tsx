import { IssueStatusBadge } from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <section>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mb="3">
        <p>{issue.description}</p>
      </Card>
      <Link href={"/issues"}>
        <Button>Back</Button>
      </Link>
    </section>
  );
};

export default IssueDetailsPage;
