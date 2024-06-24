"use client";

import React from "react";
import NextLink from "next/link";
import useOrderByHook from "./useOrderByHook";
import { Issue } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: string; orderBy: keyof Issue; dir: string };
  value: string;
  label: string;
}

const ColumnSortCell = ({ searchParams, value, label }: Props) => {
  const { dir, toogle } = useOrderByHook();
  return (
    <>
      <NextLink
        onClick={toogle}
        href={{
          query: {
            ...searchParams,
            orderBy: value,
            dir,
          },
        }}
      >
        {label}
      </NextLink>
      {searchParams.orderBy === value &&
        (searchParams.dir === "desc" ? (
          <ArrowDownIcon className="inline ml-1" />
        ) : (
          <ArrowUpIcon className="inline ml-1" />
        ))}
    </>
  );
};

export default ColumnSortCell;
