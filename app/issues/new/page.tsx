import dynamic from "next/dynamic";
import { IssueLoadingForm } from "@/app/issues/_components";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingForm />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
