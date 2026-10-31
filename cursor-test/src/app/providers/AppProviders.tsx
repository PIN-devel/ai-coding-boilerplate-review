import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider.tsx";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
