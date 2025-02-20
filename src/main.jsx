import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flowbite } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Firebase/Authentication/AuthProvider.jsx";
import "./index.css";
import routes from "./Routes/Routes.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Flowbite>
        <AuthProvider>
          {" "}
          <RouterProvider router={routes} />
        </AuthProvider>
      </Flowbite>
    </QueryClientProvider>
  </StrictMode>
);
