"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreditCardIcon, Loader, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function UserButton() {
  const session = useSession();

  if (session.status === "loading")
    return <Loader className="size-4 animate-spin text-muted-foreground" />;

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data.user?.name;
  const imageUrl = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            alt={name || ""}
            src={imageUrl || ""}
          />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {name?.charAt(0).toLowerCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        <DropdownMenuItem
          disabled={false}
          onClick={() => {}}
          className="h-10 cursor-pointer"
        >
          <CreditCardIcon className="size-4 mr-2" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={false}
          onClick={() => signOut()}
          className="h-10 text-destructive cursor-pointer"
        >
          <LogOutIcon className="size-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
