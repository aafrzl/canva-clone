import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType, InferRequestType } from "hono";

export type ResponseTemplatesType = InferResponseType<
  (typeof client.api.projects.templates)["$get"],
  200
>;
export type RequestTemplatesType = InferRequestType<
  (typeof client.api.projects.templates)["$get"]
>["query"];

export const useGetTemplates = (apiQuery: RequestTemplatesType) => {
  const query = useQuery({
    queryKey: [
      "templates",
      {
        page: apiQuery.page,
        limit: apiQuery.limit,
      },
    ],
    queryFn: async () => {
      const response = await client.api.projects.templates.$get({
        query: apiQuery,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
