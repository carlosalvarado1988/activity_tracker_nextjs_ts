import prisma from "@/prisma/client";
import { Container, Box, Grid, Flex } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import { DeleteIssueButton } from "./DeleteIssueButton";

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
    <Container>
      <section>
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
          <Box>
            <IssueDetails issue={issue} />
          </Box>
          <Box>
            <Flex direction="column" gap="3">
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        </Grid>
      </section>
    </Container>
  );
};

export default IssueDetailsPage;
