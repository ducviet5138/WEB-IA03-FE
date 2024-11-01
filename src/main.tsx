import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TopAppBar from "./components/TopNavBar.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { Box } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TopAppBar />
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <RouterProvider router={router} />
    </Box>
  </StrictMode>
);
