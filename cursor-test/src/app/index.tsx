import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./providers/index.ts";
import { AppRouter } from "./routes/index.ts";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("root 엘리먼트를 찾을 수 없습니다");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
