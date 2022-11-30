import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
// import { store } from "utils/redux/store";
// import { Provider } from "react-redux";
// import "styles/sass/global.scss";
import { AuthProvider } from "utils/authProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      {/* <Provider store={store}> */}
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      {/* </Provider> */}
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
