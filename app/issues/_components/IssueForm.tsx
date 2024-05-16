"use client";

import { issueSchema } from "@/app/api/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import z from "zod";

import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { CallOutError, ErrorInlineMessage, Spinner } from "../../components";

type issueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue?.id) {
        await axios.patch(`/api/issues/${issue?.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error ocurred");
      console.log(error);
    }
  });

  return (
    <section className="max-w-xl space-y-3">
      {error && <CallOutError message={error} />}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        >
          <TextField.Slot />
        </TextField.Root>
        <ErrorInlineMessage>{errors.title?.message}</ErrorInlineMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE id="editor" placeholder="Description" {...field} />
          )}
        />
        <ErrorInlineMessage>{errors.description?.message}</ErrorInlineMessage>

        <Button disabled={isSubmitting}>
          {issue?.title ? `Edit Issue` : `Submit New Issue`}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </section>
  );
};

export default IssueForm;
