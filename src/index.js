import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthProvider } from "utils/authProvider";
import { AxiosInterceptor } from "utils/axiosDefault";
import theme from "styles/mantineTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <AxiosInterceptor>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </AxiosInterceptor>
    </AuthProvider>
  </BrowserRouter>
);
