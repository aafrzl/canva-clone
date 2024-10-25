"use client";

import { useFailedModal } from "@/app/features/subscriptions/store/use-failed-modal";
import { useSuccessModal } from "@/app/features/subscriptions/store/use-success-modal";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const SubscriptionAlert = () => {
  const { onOpen: isOpenSuccess } = useSuccessModal();
  const { onOpen: isOpenFailed } = useFailedModal();

  const success = useSearchParams().get("success");
  const failed = useSearchParams().get("canceled");

  useEffect(() => {
    if (success) {
      isOpenSuccess();
    }

    if (failed) {
      isOpenFailed();
    }
  }, [failed, isOpenFailed, isOpenSuccess, success]);

  return null;
};
