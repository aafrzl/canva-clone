import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface ShapesSidebarProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

export default function ShapeTool({
  onClick,
  icon: Icon,
  iconClassName,
}: ShapesSidebarProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square hover:border rounded-md p-2"
    >
      <Icon className={cn("h-full w-full text-[#d2d7d3]", iconClassName)} />
    </button>
  );
}
