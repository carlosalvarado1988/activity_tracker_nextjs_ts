import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Container, Flex } from "@radix-ui/themes";
import { Pagination } from "../../components";
import { IssuePageActions } from "./IssuePageActions";
import { columnNames, IssueQuery, IssueTable } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const PAGE_SIZE = 10;

// eslint-disable-next-line @next/next/no-async-client-component
const IssuesPage = async ({ searchParams }: Props) => {
  const currentPage = parseInt(searchParams.page) || 1;

  const status = Object.values(Status).toString().includes(searchParams.status) // isValidStatus
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy) // isValidOrderBy
    ? {
        [searchParams.orderBy]: ["asc", "desc"].includes(searchParams.dir)
          ? searchParams.dir
          : undefined, // this ensures the key is not included in prisma call
      }
    : undefined; // this ensures the key is not included in prisma call

  const issues = await prisma.issue.findMany({
    where: { status: status as Status },
    orderBy,
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const issueCount = await prisma.issue.count({
    where: { status: status as Status },
  });

  return (
    <Container>
      <section>
        <Flex direction="column" gap="3">
          <IssuePageActions />
          <IssueTable searchParams={searchParams} issues={issues} />
          <Pagination
            itemCount={issueCount}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
          />
        </Flex>
      </section>
    </Container>
  );
};

// a server cache feature to force dynamic updates
export const dynamic = "force-dynamic";

export default IssuesPage;
