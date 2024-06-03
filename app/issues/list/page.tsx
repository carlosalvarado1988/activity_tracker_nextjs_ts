import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Container, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../../components";
import { IssuePageActions } from "./IssuePageActions";
import ColumnSortCell from "./ColumnSortCell";
interface Props {
  searchParams: { status: string; orderBy: keyof Issue; dir: string };
}

// eslint-disable-next-line @next/next/no-async-client-component
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Name", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Date", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const status = Object.values(Status).toString().includes(searchParams.status) // isValidStatus
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy) // isValidOrderBy
    ? {
        [searchParams.orderBy]: ["asc", "desc"].includes(searchParams.dir)
          ? searchParams.dir
          : undefined, // this ensures the key is not included in prisma call
      }
    : undefined; // this ensures the key is not included in prisma call

  const issues = await prisma.issue.findMany({
    where: {
      status: status as Status,
    },
    orderBy,
  });

  return (
    <Container>
      <section>
        <IssuePageActions />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.label}
                  className={column.className}
                >
                  <ColumnSortCell
                    searchParams={searchParams}
                    value={column.value}
                    label={column.label}
                  />
                </Table.ColumnHeaderCell>
              ))}
              {/* a good practice is to dinamically generate repetitive elements
              <Table.ColumnHeaderCell>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: "title" },
                  }}
                >
                  Name
                </NextLink>
                {searchParams.orderBy === "title" && (
                  <ArrowUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: "status" },
                  }}
                >
                  Status
                </NextLink>
                {searchParams.orderBy === "status" && (
                  <ArrowUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: "createdAt" },
                  }}
                >
                  Date
                </NextLink>
                {searchParams.orderBy === "createdAt" && (
                  <ArrowUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </section>
    </Container>
  );
};

// a server cache feature to force dynamic updates
export const dynamic = "force-dynamic";

export default IssuesPage;
