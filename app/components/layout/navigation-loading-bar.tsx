"use client";

import { LoadingBar } from "~/components/ui/loading-bar";
import { useCombinedLoading } from "~/hooks/use-loading";

export function NavigationLoadingBar() {
  const { isLoading, progress } = useCombinedLoading();

  return (
    <LoadingBar
      isVisible={isLoading}
      progress={progress}
      className="bg-gradient-to-r from-blue-500 to-purple-600"
    />
  );
}