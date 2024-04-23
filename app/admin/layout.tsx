import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="p-3 mr-2 bg-slate-200">Sidebar</aside>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
