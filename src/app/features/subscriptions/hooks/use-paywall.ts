import { useSubscriptionModal } from "../store/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = true; //TODO: Implement logic to determine if the user should be blocked in this hook, fetch from API

  return {
    isLoading: false, //TODO: fetch loading state from react-query
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
