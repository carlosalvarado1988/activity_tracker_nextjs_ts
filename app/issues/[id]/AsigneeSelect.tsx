"use client";

import React from "react";
import { Select } from "@radix-ui/themes";

export const AsigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Carlos Alvarado</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
