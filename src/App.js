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
// import ProfilePage from "pages/User/Account";
// import AddressPage from "pages/User/Account/Address";
// import OrderPage from "pages/User/Order";

function App() {
  const { sessionedUser, signout } = useAuth();
  const [sessionedUserShop, setSessionedUserShop] = useState();

  // useEffect(() => {
  //     axios
  //       .get("test", {
  //         withCredentials: true,
  //         // headers: { "Content-Type": "application/json" },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         // setSessionedUserShop(res.data.Shop);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // if (err.response?.status === 404) {
  //         // }
  //       });
  // }, []);

  useEffect(() => {
    if (sessionedUser) {
      axios
        .get("api/shop", {
          withCredentials: true,
          // headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          setSessionedUserShop(res.data.Shop);
        })
        .catch((err) => {
          console.log(err);
          // if (err.response?.status === 404) {
          // }
        });
    }
  }, [sessionedUser]);

  return (
    <div className="App">
      <GlobalLayout sessionedUser={sessionedUser} signout={signout}>
        <Routes>
          {sessionedUser ? (
            <>
              <Route path="/sign-in" element={<Navigate to="/" />}></Route>
              <Route
                path="/create-account"
                element={<Navigate to="/" />}
              ></Route>
              {sessionedUser.shop ? (
                <>
                  <Route path="/" element={<Navigate to="/portal" />}></Route>
                  <Route
                    path="/portal/*"
                    element={
                      sessionedUserShop ? (
                        <PortalLayout>
                          <Routes>
                            <Route
                              path="/"
                              element={
                                <HomePage
                                  sessionedUserShop={sessionedUserShop}
                                  setSessionedUserShop={setSessionedUserShop}
                                />
                              }
                            />
                            <Route path="/product" element={<ProductPage />} />
                            <Route
                              path="/product/add"
                              element={<AddProductPage />}
                            />
                            <Route
                              path="/product/:id"
                              element={<ViewProductPage />}
                            />
                          </Routes>
                        </PortalLayout>
                      ) : (
                        <></>
                      )
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
                      <SetupShop setSessionedUserShop={setSessionedUserShop} />
                    }
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/sign-in" />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/create-account" element={<CreateAccount />}></Route>
            </>
          )}
        </Routes>
      </GlobalLayout>
    </div>
  );
}

export default App;
