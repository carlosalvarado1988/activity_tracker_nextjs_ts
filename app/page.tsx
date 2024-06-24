import { auth } from "@/auth";
import { Container } from "@radix-ui/themes";
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
        <LatestIssues />
      </section>
    </Container>
  );
}
