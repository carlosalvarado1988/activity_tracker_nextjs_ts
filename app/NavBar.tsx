"use client";

import { Skeleton } from "@/app/components";
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

/*
 Separate concenr approach, taking components into the same file to take care of specific sections.
 with this approach the NavBar cares only about the layout
*/

export const NavBar = () => {
  return (
    <nav className="border-b px-5 py-3  bg-slate-100">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <BsBugFill />
            </Link>
            <NavLinks />
          </Flex>
          <AuthSession />
        </Flex>
      </Container>
    </nav>
  );
};

/*
 instead of conditional rendering in the return statement, implement if statement to decide what to render.
*/
const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
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
  );
};

/* Remember to add the same styles to the NavBar links, in this login link
 */
const AuthSession = () => {
  const { status, data: session } = useSession();

  if (status === "unauthenticated")
    return (
      <Link
        className="mr-5 text-zinc-500 hover:text-zinc-800 transition-colors"
        href="/api/auth/signin"
      >
        Login
      </Link>
    );

  if (status === "loading") return <Skeleton width="2rem" height="1.5rem" />;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.name!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link className="ml-5" href="/api/auth/signout">
              Sign Out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
