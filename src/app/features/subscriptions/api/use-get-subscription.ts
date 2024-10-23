import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await client.api.subscription.current.$get();

      if (!response.ok) throw new Error(await response.text());

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
