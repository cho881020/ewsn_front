"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQuery = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQuery;
