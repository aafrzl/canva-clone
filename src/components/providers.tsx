"use client";

import { QueryProviders } from "@/components/query-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
  return (
    <QueryProviders>
      {children}
    </QueryProviders>
  );
}