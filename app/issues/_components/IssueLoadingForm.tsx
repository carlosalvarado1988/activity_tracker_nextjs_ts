import React from "react";
import { Skeleton } from "@/app/components";
import { Container } from "@radix-ui/themes";

export const IssueLoadingForm = () => {
  return (
    <Container>
      <section className="fu space-y-3 max-w-xl">
        <Skeleton height="2rem" className="mb-2" />
        <Skeleton height="23rem" />
      </section>
    </Container>
  );
};
