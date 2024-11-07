import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseDeleteTemplateUserType = InferResponseType<
  (typeof client.api.projects)[":id"]["$delete"],
  200
>;
type RequestDeleteTemplateUserType = InferRequestType<
  (typeof client.api.projects)[":id"]["$delete"]
>["param"];

export const useDeleteTemplateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseDeleteTemplateUserType,
    Error,
    RequestDeleteTemplateUserType
  >({
    mutationFn: async (param) => {
      const response = await client.api.projects["templates-user"][
        ":id"
      ].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error("Something went wrong while deleting your template");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templates-user"],
      });

      toast.success("Template deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
