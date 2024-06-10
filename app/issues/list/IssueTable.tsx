import { IssueStatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ColumnSortCell from "./ColumnSortCell";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: string;
  orderBy: keyof Issue;
  dir: string;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

export const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
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
  );
};

// as a good practive we dont export the entire object with all properties.
// the implementation deatils should live only here, we violate the encapsulation principle.
// so we prepare an exportable const only with the data is needed
const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Name", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Date", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
