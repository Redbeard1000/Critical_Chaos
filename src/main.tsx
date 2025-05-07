import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./DarkTheme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
