import { auth } from "@/auth";
import { Container } from "@radix-ui/themes";
import { LatestIssues } from "./LatestIssues";

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <Container>
        <p>Not authenticated</p>
      </Container>
    );

  return (
    <Container>
      <section>
        <LatestIssues />
      </section>
    </Container>
  );
}
