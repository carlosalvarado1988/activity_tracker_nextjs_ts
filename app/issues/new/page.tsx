"use client";

import React, { useState } from "react";
// import axios from "axios";
import z from "zod";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });
import { createIssueSchema } from "@/app/api/utils";
import { Button, TextField } from "@radix-ui/themes";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { CallOutError } from "../../../components/CallOutError";
// import { ErrorInlineMessage } from "../../../components/ErrorInlineMessage";
// import { Spinner } from "../../../components/Spinner";

// import "easymde/dist/easymde.min.css";

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  //   const router = useRouter();
  //   const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const {
  //     register,
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<issueForm>({
  //     resolver: zodResolver(createIssueSchema),
  //   });
  const onSubmit = () => {};
  //   const onSubmit = handleSubmit(async (data) => {
  //     // try {
  //     //   setIsSubmitting(true);
  //     //   await axios.post("/api/issues", data);
  //     //   router.push("/issue-tracker/issues");
  //     // } catch (error) {
  //     //   setIsSubmitting(false);
  //     //   setError("An unexpected error ocurred");
  //     //   console.log(error);
  //     // }
  //   });

  return (
    <section className="max-w-xl space-y-3">
      {/* {error && <CallOutError message={error} />} */}

      <h1>Create a New Issue</h1>

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title">
          {/* <TextField.Slot placeholder="Title" {...register("title")} /> */}
          <TextField.Slot />
        </TextField.Root>
        {/* <ErrorInlineMessage>{errors.title?.message}</ErrorInlineMessage> */}

        {/* <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE id="editor" placeholder="Description" {...field} />
          )}
        />
        <ErrorInlineMessage>{errors.description?.message}</ErrorInlineMessage> */}

        <Button disabled={isSubmitting}>
          {/* Submit New Issue {isSubmitting && <Spinner />} */}
          Submit New Issue
        </Button>
      </form>
    </section>
  );
};

export default NewIssuePage;
