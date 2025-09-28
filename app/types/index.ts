// Type definitions for the application
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress: number;
}

export interface LoadingContextType {
  loading: LoadingState;
  setLoading: (loading: LoadingState) => void;
  startLoading: (text?: string) => void;
  stopLoading: () => void;
}

export interface LoadingBarProps {
  className?: string;
  duration?: number;
}