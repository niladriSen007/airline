import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import { router } from "./exports";
import "./index.css";
import { QueryClientProvider } from "./provider/tanstack/query-client-provider";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
