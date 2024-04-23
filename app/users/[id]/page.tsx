import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const UserDetailsPage = ({ params: { id } }: Props) => {
  if (Number(id) > 10) return notFound();
  return <section>User ID: {id}</section>;
};

export default UserDetailsPage;
