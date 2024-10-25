import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

export type BillingResponseType = InferResponseType<
  (typeof client.api.subscription.billing)["$post"],
  200
>;

export const useBilling = () => {
  const mutation = useMutation<BillingResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscription.billing.$post();

      if (!response.ok) {
        throw new Error("Failed to create billing portal");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
