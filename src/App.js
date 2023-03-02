import { useEffect, useState } from "react";
import SignIn from "pages/SignIn";
import CreateAccount from "pages/CreateAccount";

import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { useAuth } from "utils/authProvider";
import { Box } from "@mantine/core";
import GlobalLayout from "layouts/Global";
import PortalLayout from "layouts/Portal";

// import "./utils/axiosDefault";
import axios from "axios";
import SetupShop from "pages/SetupShop";
import HomePage from "pages/Portal/Home";
import ProductPage from "pages/Portal/Product";
import AddProductPage from "pages/Portal/Product/Add";
import ViewProductPage from "pages/Portal/Product/View";
import Order from "pages/Portal/Order";
import View from "pages/Portal/Order/View";
import Guide from "pages/Guide";
import NavigateUser from "components/NavigateUser";
// import ProfilePage from "pages/User/Account";
// import AddressPage from "pages/User/Account/Address";
// import OrderPage from "pages/User/Order";

function App() {
  const { getSessionedUser, sessionedUserData, signout } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    console.log(sessionedUserData);
  }, [sessionedUserData]);

  useEffect(() => {
    getSessionedUser(setIsPageLoading);
  }, []);

  return (
    <div className="App">
      {!isPageLoading && (
        <GlobalLayout sessionedUserData={sessionedUserData} signout={signout}>
          <Routes>
            <Route path="/guide" element={<Guide />} />
            {sessionedUserData ? (
              <>
                <Route path="/sign-in" element={<Navigate to="/" />}></Route>
                {
                  //session
                  !sessionedUserData.isEmailVerified ||
                  !sessionedUserData.isUserUpdated ? (
                    <Route
                      path="/"
                      element={
                        <NavigateUser message="main website to verify your account..." />
                      }
                    />
                  ) : sessionedUserData.Shop ? (
                    <>
                      <Route
                        path="/"
                        element={<Navigate to="/portal" />}
                      ></Route>
                      <Route
                        path="/portal/*"
                        element={
                          <PortalLayout>
                            <Routes>
                              <Route path="/" element={<HomePage />} />
                              <Route
                                path="/product"
                                element={<ProductPage />}
                              />
                              <Route
                                path="/product/add"
                                element={<AddProductPage />}
                              />
                              <Route
                                path="/product/:id"
                                element={<ViewProductPage />}
                              />
                              <Route path="/order/:id" element={<View />} />
                              <Route path="/order" element={<Order />} />
                            </Routes>
                          </PortalLayout>
                        }
                      ></Route>
                    </>
                  ) : (
                    <>
                      <Route
                        path="/"
                        element={<Navigate to="/portal/setup-shop" />}
                      ></Route>
                      <Route
                        path="/portal/setup-shop"
                        element={
                          <SetupShop
                          />
                        }
                      />
                    </>
                  )
                }
              </>
            ) : (
              //no session
              <>
                <Route path="/" element={<Navigate to="/sign-in" />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route
                  path="/create-account"
                  element={<CreateAccount />}
                ></Route>
              </>
            )}
          </Routes>
        </GlobalLayout>
      )}
    </div>
  );
}

export default App;
