import prisma from "@/prisma/client";
import { Container, Table } from "@radix-ui/themes";
import { IssuePageActions } from "./IssuePageActions";
import { Link, IssueStatusBadge } from "../../components";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  // validating the string is valid to the Status type values.
  const isValid = Object.values(Status)
    .toString()
    .includes(searchParams.status);

  const status = isValid ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: status as Status,
    },
  });

  return (
    <Container>
      <section>
        <IssuePageActions />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Date
              </Table.ColumnHeaderCell>
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
