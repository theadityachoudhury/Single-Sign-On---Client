"use client";

import { useCallback } from "react";
import { useNavigation } from "react-router";
import { useLoadingContext } from "~/contexts/loading-context";

export function useLoading() {
  const { loading, setLoading, startLoading, stopLoading } = useLoadingContext();
  
  // Create a wrapper for async operations
  const withLoading = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      loadingText?: string
    ): Promise<T> => {
      try {
        startLoading(loadingText);
        const result = await operation();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
    isLoading: loading.isLoading,
    loadingText: loading.loadingText,
    progress: loading.progress,
  };
}

export function useNavigationLoading() {
  const navigation = useNavigation();
  
  return {
    isNavigating: navigation.state === "loading" || navigation.state === "submitting",
    navigationState: navigation.state,
    formData: navigation.formData,
    location: navigation.location,
  };
}

export function useCombinedLoading() {
  const { isLoading, loadingText, progress } = useLoading();
  const { isNavigating } = useNavigationLoading();
  
  return {
    isLoading: isLoading || isNavigating,
    loadingText: isNavigating ? "Navigating..." : loadingText,
    isNavigating,
    isCustomLoading: isLoading,
    progress: isLoading ? progress : undefined,
  };
}