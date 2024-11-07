import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects.template)["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects.template)["$post"]
>["json"];

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.template.$post({ json });

      if (!response.ok) {
        throw new Error("An error occurred while creating the template");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templates-user"],
      });
      toast.success("Template created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
