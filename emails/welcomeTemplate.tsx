import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";

interface Props {
  name: string;
}
const WelcomeEmail = ({ name }: Props) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Tailwind>
        <Body style={body}>
          <Container>
            <Text className="font-bold text-2xl">Hello {name}</Text>
            <Link href="https://carlos-alvarado-portfolio.vercel.app/">
              Visit our page
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// one way of styling an email, or Tailwing above
const body: CSSProperties = {
  background: "#fff",
};

export default WelcomeEmail;
