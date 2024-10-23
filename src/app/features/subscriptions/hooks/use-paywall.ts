import { useGetSubscription } from "../api/use-get-subscription";
import { useSubscriptionModal } from "../store/use-subscription-modal";

export const usePaywall = () => {
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = !isLoadingSubscription && !subscription?.isActive;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
