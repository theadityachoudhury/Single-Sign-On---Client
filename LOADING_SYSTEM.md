# Loading System Documentation

## Overview

This project includes a comprehensive loading system that provides visual feedback during navigation and async operations. The system is built with React Router v7, Tailwind CSS, and Framer Motion.

## Components

### Loading Bar Components (`app/components/ui/loading-bar.tsx`)

- **LoadingBar**: A configurable loading bar with progress support
- **SimpleLoadingBar**: A simple loading bar that scales from left to right
- **PulseLoadingBar**: An animated loading bar with a pulsing gradient effect

### Navigation Loading Bar (`app/components/layout/navigation-loading-bar.tsx`)

Automatically displays during React Router navigation events.

## Hooks

### `useLoading()` (`app/hooks/use-loading.tsx`)

Main hook for managing custom loading states:

```tsx
const { 
  isLoading, 
  startLoading, 
  stopLoading, 
  withLoading 
} = useLoading();

// Wrap async operations
await withLoading(async () => {
  // Your async operation
}, "Loading message...");

// Manual control
startLoading("Processing...");
// ... your operation
stopLoading();
```

### `useNavigationLoading()`

Hook for accessing React Router navigation state:

```tsx
const { 
  isNavigating, 
  navigationState 
} = useNavigationLoading();
```

### `useCombinedLoading()`

Combines custom and navigation loading states:

```tsx
const { 
  isLoading, // true if either custom or navigation loading
  loadingText,
  isNavigating,
  isCustomLoading 
} = useCombinedLoading();
```

## Context

### `LoadingProvider` (`app/contexts/loading-context.tsx`)

Provides loading state management throughout the app. Already integrated in `root.tsx`.

## Usage Examples

### Basic Async Operation

```tsx
import { useLoading } from "~/hooks/use-loading";

function MyComponent() {
  const { withLoading } = useLoading();

  const handleSubmit = async () => {
    await withLoading(async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      // Process data
    }, "Saving data...");
  };

  return (
    <button onClick={handleSubmit}>
      Submit
    </button>
  );
}
```

### Custom Loading Bar

```tsx
import { LoadingBar } from "~/components/ui/loading-bar";
import { useState } from "react";

function UploadComponent() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setUploading(false);
  };

  return (
    <div>
      <LoadingBar 
        isVisible={uploading} 
        progress={progress}
        className="mb-4"
      />
      <button onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
}
```

### Manual Loading Control

```tsx
import { useLoading } from "~/hooks/use-loading";

function DataComponent() {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const processData = () => {
    startLoading("Processing data...");
    
    setTimeout(() => {
      // Process complete
      stopLoading();
    }, 3000);
  };

  return (
    <button 
      onClick={processData}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Process Data"}
    </button>
  );
}
```

## Customization

### Loading Bar Styles

All loading bars accept a `className` prop for custom styling:

```tsx
<SimpleLoadingBar 
  isVisible={isLoading}
  className="bg-gradient-to-r from-red-500 to-orange-500 h-2"
/>
```

### Loading Messages

Custom loading messages can be displayed:

```tsx
const { loadingText } = useCombinedLoading();

// Display the loading message in your UI
{loadingText && (
  <div className="text-center text-gray-600">
    {loadingText}
  </div>
)}
```

## Features

- ✅ Automatic navigation loading detection
- ✅ Custom async operation loading
- ✅ Progress-based loading bars
- ✅ Multiple loading bar styles
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Framer Motion animations
- ✅ Accessible loading states

## File Structure

```
app/
├── components/
│   ├── ui/
│   │   ├── loading-bar.tsx     # Loading bar components
│   │   └── index.ts
│   ├── layout/
│   │   ├── navigation-loading-bar.tsx
│   │   └── index.ts
│   └── examples/
│       └── loading-demo.tsx    # Demo implementation
├── contexts/
│   ├── loading-context.tsx     # Loading state management
│   └── index.ts
├── hooks/
│   ├── use-loading.tsx         # Loading hooks
│   └── index.ts
├── types/
│   └── index.ts               # TypeScript definitions
└── root.tsx                   # Integration point
```