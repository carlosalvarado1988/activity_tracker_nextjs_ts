"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// build a custom hook for the query call.
// if the application were to grow, I would move it to a separate file
// right now the implementation detail lives in this same file.
const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000 * 60 * 24, // 60s * 60 * 24 = 1day, as we dont plan to add many new users frequently
    retry: 3,
  });

export const AsigneeSelect = ({
  issueId,
  assignedToUserId,
}: {
  issueId: number;
  assignedToUserId?: string;
}) => {
  /* 
  Kept this here for visibility, a best practice is to use the useQuery with provider wrapper
  to leverage cache (staleTime) and retry options.

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>("/api/users");
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);
  */
  const { data: users, error, isLoading } = useGetUsers();

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const assignUser = (userId: string) => {
    // note: into a try catch, we need to await for it.
    // try {
    //   await axios.patch(`/api/issuesx/${issueId}`, {
    //     assignedToUserId: userId == "unassigned" ? null : userId,
    //   });
    // } catch (e) {
    //   toast.error("Changes could not be saved");
    //   console.error(e);
    // }
    // simpler option to just catch it in the promise
    axios
      .patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId == "unassigned" ? null : userId,
      })
      .catch((e) => {
        toast.error("Changes could not be saved");
        console.error(e);
      });
  };
  return (
    <>
      <Select.Root
        defaultValue={assignedToUserId || undefined}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
