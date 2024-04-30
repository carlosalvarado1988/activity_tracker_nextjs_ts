import React from "react";
import { Callout } from "@radix-ui/themes";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  message: string;
}

export const CallOutError = ({ message }: Props) => {
  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <AiOutlineInfoCircle />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};
