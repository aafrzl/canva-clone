import { ChevronsLeft } from "lucide-react";
import React from "react";

interface Props {
  onClick: () => void;
}

export default function ToolSidebarClose({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center -right-[2rem] top-1/2 h-[68px] bg-white transform -translate-y-1/2 pr-2 px-1 rounded-r-2xl border-r border-y group"
    >
      <ChevronsLeft className="size-5 text-black group-hover:opacity-75 transition" />
    </button>
  );
}
