"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
