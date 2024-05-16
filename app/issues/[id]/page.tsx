import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { Pencil1Icon } from "@radix-ui/react-icons";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
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
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
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
        </Box>
        <Box>
          <Link href={`issues/${issue.id}/edit`}>
            <Button>
              <Pencil1Icon />
              Edit Issue
            </Button>
          </Link>
        </Box>
      </Grid>
    </section>
  );
};

export default IssueDetailsPage;
