import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import { AsigneeSelect } from "./AsigneeSelect";
import { DeleteIssueButton } from "./DeleteIssueButton";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";

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
                <AsigneeSelect
                  issueId={issue.id}
                  assignedToUserId={issue.assignedToUserId!}
                />
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

// a server cache feature to force dynamic updates
// currently not working
export const dynamic = "force-dynamic";

export default IssueDetailsPage;
