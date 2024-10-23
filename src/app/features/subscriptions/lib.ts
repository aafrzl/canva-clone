import { subscriptions } from "@/db/schema";

const DAY_IN_MS = 86_400_000;

export const checkIsActive = (
  subscription: typeof subscriptions.$inferInsert
) => {
  let active = false;

  if (subscription && subscription.currentPeriodEnd) {
    active = subscription.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now();
  }

  return active;
};
