import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-3 rounded-xl bg-transparent hover:bg-white transition",
        isActive && "bg-white"
      )}
    >
      <Icon className="size-4 mr-2 stroke-2" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
