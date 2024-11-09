import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TopAppBar from "./components/TopNavBar.tsx";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import store from "./stores";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TopAppBar />
        <Box sx={{ height: "calc(100vh - 64px)" }}>
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
