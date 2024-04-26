import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <section>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </section>
  );
};

export default IssuesPage;
