import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/section/header";
import Footer from "./components/section/footer";
import Typography from "./components/ui/typography";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html role="main" lang="en">
      <head role="head">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="icon" href="/logo.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Tam Thai (B)log RSS Feed"
          href="/rss.xml"
        />
        <Links />
        <script
          defer
          src="https://umami-fs.tamthai.de/script.js"
          data-website-id="cd8b2767-003c-487d-b46b-cefca5e57130"
        ></script>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <ScrollRestoration />
        <ScrollToHash />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]); // Runs every time the # part of the URL changes

  return null;
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page not found :<" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-12 md:mx-42 lg:mx-60">
      <div className="h-20"></div>
      <Typography variant={"h1"}>{message}</Typography>
      <Typography variant={"p"}>{details}</Typography>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
