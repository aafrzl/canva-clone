"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  CrownIcon,
  HomeIcon,
  Loader,
  MessageCircleQuestion,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { usePaywall } from "@/app/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/app/features/subscriptions/api/use-checkout";
import { useBilling } from "@/app/features/subscriptions/api/use-billing";

export default function SidebarRoutes() {
  const mutation = useCheckout();
  const mutationBilling = useBilling();
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const pathname = usePathname();

  const handleBilling = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutationBilling.mutate();
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full rounded-xl border-none transition hover:opacity-75 hover:bg-white"
              variant={"outline"}
              size={"lg"}
            >
              {mutation.isPending ? (
                <Loader className="size-4 animate-spin mr-2" />
              ) : (
                <CrownIcon className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
              )}
              <span className="font-medium">Upgrade to Pro Plan</span>
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
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
          onClick={handleBilling}
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
