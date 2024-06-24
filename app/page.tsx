import { auth } from "@/auth";
import type { Metadata } from "next";
import { Container, Grid, Flex } from "@radix-ui/themes";
import { LatestIssues } from "./LatestIssues";
import { IssueSummary } from "./IssueSummary";
import { IssueCharts } from "./IssueCharts";

import prisma from "@/prisma/client";
import { Status } from "@prisma/client";

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <Container>
        <p>Not authenticated</p>
      </Container>
    );

  const openIssues = await prisma.issue.count({
    where: { status: Status.OPEN },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: Status.CLOSED },
  });

  return (
    <Container>
      <section>
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
          <Flex direction="column" gap="5">
            <IssueSummary
              open={openIssues}
              inProgress={inProgressIssues}
              closed={closedIssues}
            />
            <IssueCharts
              open={openIssues}
              inProgress={inProgressIssues}
              closed={closedIssues}
            />
          </Flex>
          <LatestIssues />
        </Grid>
      </section>
    </Container>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
