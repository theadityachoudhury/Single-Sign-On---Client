"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { LoadingContextType, LoadingState } from "~/types";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    loadingText: undefined,
  });

  const setLoading = useCallback((newLoading: LoadingState) => {
    setLoadingState(newLoading);
  }, []);

  const startLoading = useCallback((text?: string) => {
    setLoadingState({
      isLoading: true,
      loadingText: text,
    });
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      loadingText: undefined,
    });
  }, []);

  const value: LoadingContextType = {
    loading,
    setLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
}