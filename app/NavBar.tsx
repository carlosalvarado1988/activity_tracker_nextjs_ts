"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsBugFill } from "react-icons/bs";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="bg-slate-200 mb-3 border-b px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <BsBugFill />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <div>Loading ...</div>}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.name!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout" className="ml-5">
                      Sign Out
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin" className="mr-5">
                Login
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
