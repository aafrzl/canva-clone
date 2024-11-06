import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type ResponseTemplatesUserType = InferResponseType<
  (typeof client.api.projects)["templates-user"]["$get"],
  200
>;

export const useGetTemplatesUser = () => {
  const query = useInfiniteQuery<ResponseTemplatesUserType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects["templates-user"]["$get"]({
        query: {
          page: (pageParam as number).toString(),
          limit: "4",
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
  });

  return query;
};
