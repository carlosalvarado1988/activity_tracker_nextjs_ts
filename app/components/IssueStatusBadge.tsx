import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface badgeStatus {
  label: string;
  color: "red" | "violet" | "green";
}
const statusMap: Record<Status, badgeStatus> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

// the old school way
// const getStatusObj = (status: string) => {
//   if (Status.OPEN === status) return { label: "Open", color: "red" };
//   if (Status.IN_PROGRESS === status)
//     return { label: "In Progress", color: "violet" };
//   if (Status.CLOSED === status) return { label: "Closed", color: "green" };
//   return { label: "Unknown", color: "red" };
// };

export const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
