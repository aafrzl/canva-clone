import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type CheckoutResponseType = InferResponseType<
  (typeof client.api.subscription.checkout)["$post"],
  200
>;

export const useCheckout = () => {
  const mutation = useMutation<CheckoutResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscription.checkout.$post();

      if (!response.ok) throw new Error(await response.text());

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
