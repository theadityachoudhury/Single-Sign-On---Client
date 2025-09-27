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
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
