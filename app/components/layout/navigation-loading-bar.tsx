"use client";

import { SimpleLoadingBar } from "~/components/ui/loading-bar";
import { useCombinedLoading } from "~/hooks/use-loading";

export function NavigationLoadingBar() {
  const { isLoading } = useCombinedLoading();

  return (
    <SimpleLoadingBar 
      isVisible={isLoading} 
      className="bg-gradient-to-r from-blue-500 to-purple-600"
    />
  );
}