import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { LoadingProvider } from "~/contexts/loading-context";
import { ThemeProvider } from "~/contexts/theme-context";
import { NavigationLoadingBar } from "~/components/layout/navigation-loading-bar";
import { getErrorMessage } from "./lib/errorMessages";
import Error from "./components/layout/Error";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // SEO and security related links
  { rel: "canonical", href: typeof window !== 'undefined' ? window.location.href : '' },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Security Headers via Meta Tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* SEO Meta Tags */}
        <meta name="author" content="HeapMind" />
        <meta name="publisher" content="HeapMind" />
        <meta name="application-name" content="HeapMind SSO" />
        <meta name="apple-mobile-web-app-title" content="HeapMind" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* DNS Prefetching for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        <Meta />
        <Links />
        
        {/* Theme Detection Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const actualTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(actualTheme);
                document.documentElement.style.colorScheme = actualTheme;
              })()
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <LoadingProvider>
        <NavigationLoadingBar />
        <Outlet />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status.toString() || "Error";
    details =
      getErrorMessage(error.status) || details;
    stack = error.data
    console.log(error);
  } else if (import.meta.env.DEV && error instanceof Error) {
    const devError = error as Error;
    details = devError.message;
    stack = devError.stack;
  }

  return <Error message={message} details={details} stack={stack} statusCode={message} />;
}
