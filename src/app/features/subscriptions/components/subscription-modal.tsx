"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSubscriptionModal } from "../store/use-subscription-modal";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { LuBadgeCheck } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CrownIcon, Loader } from "lucide-react";
import { useCheckout } from "../api/use-checkout";

export default function SubscriptionModal() {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader className="flex items-center space-y-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
          />
          <DialogTitle className="text-center">Upgrade to premium</DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to a premium plan to unlock all features and get access to
            all templates.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-4">
          <li className="flex items-center gap-x-2">
            <LuBadgeCheck className="size-5 text-green-500" />
            <p className="text-muted-foreground text-sm">Unlimited projects</p>
          </li>
          <li className="flex items-center gap-x-2">
            <LuBadgeCheck className="size-5 text-green-500" />
            <p className="text-muted-foreground text-sm">Unlimited templates</p>
          </li>
          <li className="flex items-center gap-x-2">
            <LuBadgeCheck className="size-5 text-green-500" />
            <p className="text-muted-foreground text-sm">
              Access to AI Image generation
            </p>
          </li>
        </ul>
        <DialogFooter className="mt-4 pt-2">
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            size={"lg"}
            className="w-full"
          >
            {mutation.isPending ? (
              <Loader className="mr-2 size-5 animate-spin" />
            ) : (
              <CrownIcon className="size-5 fill-yellow-500 text-yellow-500 mr-2" />
            )}
            Upgrade to premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
