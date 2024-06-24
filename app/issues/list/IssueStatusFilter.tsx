"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statuses: { label: string; value: Status | null }[] = [
    { label: "All", value: null },
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const onValueChange = (status: string) => {
    const params = new URLSearchParams();
    const orderBy = searchParams.get("orderBy");
    const dir = searchParams.get("dir");

    if (status) params.append("status", status);
    if (orderBy) params.append("orderBy", orderBy);
    if (dir) params.append("dir", dir);

    const searchString = params.size ? `?${params.toString()}` : ``;
    router.push(`/issues/list${searchString}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || undefined}
      onValueChange={onValueChange}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value!}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
