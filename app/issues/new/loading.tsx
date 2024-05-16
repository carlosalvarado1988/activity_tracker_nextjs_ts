import { Button } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NewIssueLoadingPage = async () => {
  return (
    <section className="fu space-y-3">
      <h1>Create a New Issue</h1>

      <Skeleton height="2rem" className="mb-2" />

      <Skeleton height="20rem" />

      <Button>Submit New Issue</Button>
    </section>
  );
};

export default NewIssueLoadingPage;
