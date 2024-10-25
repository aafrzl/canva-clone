"use client";

import FailedModal from "@/app/features/subscriptions/components/failed-modal";
import SubscriptionModal from "@/app/features/subscriptions/components/subscription-modal";
import SuccessModal from "@/app/features/subscriptions/components/success-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <FailedModal />
      <SuccessModal />
      <SubscriptionModal />
    </>
  );
};
