"use client";

import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  // Log into loggin service like SENTRY
  console.error(error);

  return (
    <section>
      <div>An unexpected error ocurred</div>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </section>
  );
};

export default ErrorPage;
