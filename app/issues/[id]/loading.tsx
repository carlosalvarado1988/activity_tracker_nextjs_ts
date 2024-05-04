import { Button, Card, Flex, Link } from "@radix-ui/themes";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDeatilsPage = () => {
  return (
    <section className="max-w-xl">
      <Skeleton />

      <Flex className="max-w-xl" gap="3" my="3">
        <Skeleton width={"4rem"} />
        <Skeleton width={"7rem"} />
      </Flex>
      <Card className="prose " mb="4">
        <Skeleton />
      </Card>
      <Link href={"/issues"}>
        <Button>Back</Button>
      </Link>
    </section>
  );
};

export default LoadingIssueDeatilsPage;
