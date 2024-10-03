"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  CrownIcon,
  HomeIcon,
  MessageCircleQuestion,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

export default function SidebarRoutes() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="px-4">
        <Button
          onClick={() => {}}
          className="w-full rounded-xl border-none transition hover:opacity-75 hover:bg-white"
          variant={"outline"}
          size={"lg"}
        >
          <CrownIcon className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          <span className="font-medium">Upgrade to Pro Plan</span>
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCardIcon}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href="mailto:afrizal.mufriz25@gmail.com"
          icon={MessageCircleQuestion}
          label="Contact Support"
        />
      </ul>
    </div>
  );
}
