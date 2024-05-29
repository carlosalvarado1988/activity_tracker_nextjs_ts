"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import axios from "axios";

export const AsigneeSelect = () => {
  /* 
  Kept this here for visibility, a best practice is to use the useQuery with provider wrapper
  to leverage cache (staleTime) and retry options.

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>("/api/users");
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);
  */
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
