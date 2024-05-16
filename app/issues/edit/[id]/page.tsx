import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { IssueLoadingForm } from "@/app/issues/_components";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingForm />,
});

const EditIssue = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssue;
