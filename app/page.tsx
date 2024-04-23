import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <section>
      <h1>Tracking app</h1>
      <ProductCard />
    </section>
  );
}
