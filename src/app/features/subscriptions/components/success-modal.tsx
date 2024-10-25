"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSuccessModal } from "../store/use-success-modal";

export default function SuccessModal() {
  const router = useRouter();
  const { isOpen, onClose } = useSuccessModal();

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="mb-4"
          />
          <DialogTitle className="text-center">
            Payment Successful 🎉
          </DialogTitle>
          <DialogDescription className="text-center">
            Your payment was successful. You can now access all the features of
            our platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 mt-4">
          <Button
            onClick={handleClose}
            className="w-full"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
