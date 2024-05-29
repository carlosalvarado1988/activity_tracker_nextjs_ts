import prisma from "@/prisma/client";
import { Container, Box, Grid, Flex } from "@radix-ui/themes";
import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import { DeleteIssueButton } from "./DeleteIssueButton";
import { AsigneeSelect } from "./AsigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await auth();
  if (typeof parseInt(params.id) !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Container>
      <section>
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <Box className="md:col-span-4">
            <IssueDetails issue={issue} />
          </Box>
          {session && (
            <Box>
              <Flex direction="column" gap="4">
                <AsigneeSelect />
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
              </Flex>
            </Box>
          )}
        </Grid>
      </section>
    </Container>
  );
};

export default IssueDetailsPage;
