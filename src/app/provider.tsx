import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "../components/errors/main-error-fallback";
import { AuthLoader } from "../lib/auth";
import LoadingIndicator from "../components/ui/loading-indicator";
import { queryConfig } from "../lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthLoader renderLoading={() => <LoadingIndicator />}>
            {children}
          </AuthLoader>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
