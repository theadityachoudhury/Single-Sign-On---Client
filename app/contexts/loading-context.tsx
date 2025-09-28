"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import type { LoadingContextType, LoadingState } from "~/types";

const MIN_VISIBLE_DURATION = 500;
const COMPLETION_VISIBILITY_DURATION = 150;
const PROGRESS_INCREMENT = 8;
const PROGRESS_INTERVAL = 120;
const PRE_COMPLETE_PROGRESS = 80;

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    loadingText: undefined,
    progress: 0,
  });

  const startTimeRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const minVisibilityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const clearMinVisibilityTimeout = useCallback(() => {
    if (minVisibilityTimeoutRef.current) {
      clearTimeout(minVisibilityTimeoutRef.current);
      minVisibilityTimeoutRef.current = null;
    }
  }, []);

  const clearResetTimeout = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  const beginProgressLoop = useCallback(() => {
    clearProgressInterval();
    progressIntervalRef.current = setInterval(() => {
      setLoadingState((prev) => {
        if (!prev.isLoading) {
          return prev;
        }

        const nextProgress = Math.min(
          prev.progress + PROGRESS_INCREMENT,
          PRE_COMPLETE_PROGRESS
        );

        if (nextProgress === prev.progress) {
          clearProgressInterval();
          return prev;
        }

        return {
          ...prev,
          progress: nextProgress,
        };
      });
    }, PROGRESS_INTERVAL);
  }, [clearProgressInterval]);

  const setLoading = useCallback((newLoading: LoadingState) => {
    clearProgressInterval();
    clearMinVisibilityTimeout();
    clearResetTimeout();

    if (newLoading.isLoading) {
      startTimeRef.current = Date.now();
      setLoadingState({
        isLoading: true,
        loadingText: newLoading.loadingText,
        progress: Math.min(
          newLoading.progress ?? PROGRESS_INCREMENT,
          PRE_COMPLETE_PROGRESS
        ),
      });
      beginProgressLoop();
    } else {
      startTimeRef.current = null;
      setLoadingState({
        isLoading: false,
        loadingText: undefined,
        progress: 0,
      });
    }
  }, [beginProgressLoop, clearMinVisibilityTimeout, clearProgressInterval, clearResetTimeout]);

  const startLoading = useCallback((text?: string) => {
    clearProgressInterval();
    clearMinVisibilityTimeout();
    clearResetTimeout();

    startTimeRef.current = Date.now();

    setLoadingState({
      isLoading: true,
      loadingText: text,
      progress: Math.min(PROGRESS_INCREMENT, PRE_COMPLETE_PROGRESS),
    });

    beginProgressLoop();
  }, [beginProgressLoop, clearMinVisibilityTimeout, clearProgressInterval, clearResetTimeout]);

  const stopLoading = useCallback(() => {
    const complete = () => {
      clearProgressInterval();
      minVisibilityTimeoutRef.current = null;

      setLoadingState((prev) => {
        if (!prev.isLoading) {
          return prev;
        }

        return {
          ...prev,
          progress: 100,
        };
      });

      clearResetTimeout();
      resetTimeoutRef.current = setTimeout(() => {
        startTimeRef.current = null;
        clearProgressInterval();
        setLoadingState({
          isLoading: false,
          loadingText: undefined,
          progress: 0,
        });
        resetTimeoutRef.current = null;
      }, COMPLETION_VISIBILITY_DURATION);
    };

    const startTime = startTimeRef.current;
    const elapsed = startTime ? Date.now() - startTime : MIN_VISIBLE_DURATION;
    const remaining = Math.max(MIN_VISIBLE_DURATION - elapsed, 0);

    clearMinVisibilityTimeout();

    if (remaining > 0) {
      minVisibilityTimeoutRef.current = setTimeout(complete, remaining);
    } else {
      complete();
    }
  }, [clearMinVisibilityTimeout, clearProgressInterval, clearResetTimeout]);

  const value: LoadingContextType = {
    loading,
    setLoading,
    startLoading,
    stopLoading,
  };

  useEffect(() => {
    return () => {
      clearProgressInterval();
      clearMinVisibilityTimeout();
      clearResetTimeout();
    };
  }, [clearMinVisibilityTimeout, clearProgressInterval, clearResetTimeout]);

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