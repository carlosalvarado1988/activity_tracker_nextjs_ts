import { useState } from "react";

function useOrderByHook() {
  const [asc, setAsc] = useState<boolean>(true);

  return {
    dir: asc ? "asc" : "desc",
    toogle: () => {
      setAsc(!asc);
    },
  };
}

export default useOrderByHook;
