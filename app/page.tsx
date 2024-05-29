import { auth } from "@/auth";
import { ProductCard } from "./components";
import Link from "next/link";
import { Container } from "@radix-ui/themes";

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
        <h1>Tracking app</h1>
        <p>{session.user.name}</p>
        <Link href="/api/server_logout">Logout from server</Link>
        <ProductCard />
      </section>
    </Container>
  );
}
