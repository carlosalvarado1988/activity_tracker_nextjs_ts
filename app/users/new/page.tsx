"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();
  return (
    <section>
      <h1>New User Page</h1>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/users")}
        >
          Create
        </button>
      </div>
    </section>
  );
};

export default NewUserPage;
