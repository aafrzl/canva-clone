"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreditCardIcon, CrownIcon, Loader, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePaywall } from "../../subscriptions/hooks/use-paywall";
import { useBilling } from "../../subscriptions/api/use-billing";

export default function UserButton() {
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const session = useSession();
  const mutation = useBilling();

  const handleBilling = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate();
  };

  if (session.status === "loading")
    return <Loader className="size-4 animate-spin text-muted-foreground" />;

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data.user?.name;
  const imageUrl = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -left-1 -top-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-md">
              <CrownIcon className="size-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}
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
          disabled={mutation.isPending}
          onClick={handleBilling}
          className="h-10 cursor-pointer"
        >
          {mutation.isPending ? (
            <Loader className="size-4 animate-spin mr-2" />
          ) : (
            <CreditCardIcon className="size-4 mr-2" />
          )}
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
