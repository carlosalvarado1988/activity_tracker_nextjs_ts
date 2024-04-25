import { auth } from "@/auth";
import ProductCard from "./components/ProductCard";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <section>
        <p>Not authenticated</p>
      </section>
    );

  return (
    <section>
      <h1>Tracking app</h1>
      <p>{session.user.name}</p>
      <Link href="/api/server_logout">Logout from server</Link>
      <ProductCard />
    </section>
  );
}
