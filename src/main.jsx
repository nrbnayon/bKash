import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./Routers/Routers";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="max-w-screen-xl mx-auto">
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <RouterProvider router={router} />
            </HelmetProvider>
          </QueryClientProvider>
        </Provider>
      </PersistGate>
    </div>
  </React.StrictMode>
);
