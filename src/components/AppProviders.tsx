"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-right" reverseOrder={false} />
    {children}
  </QueryClientProvider>
);
