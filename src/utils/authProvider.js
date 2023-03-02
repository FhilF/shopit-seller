import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sessionedUserData, setSessionedUserData] = useState(null);

  const navigate = useNavigate();

  const getSessionedUser = (setIsPageLoading) => {
    axios
    .get(`auth/sessioned_user`, {
        withCredentials: true,
      })
      .then((res) => {
        const sessionedData = res.data.sessionedUser;
        if (sessionedData) {
          setSessionedUserData(sessionedData);
        }
        setIsPageLoading(false);
      })
      .catch((err) => {
        setIsPageLoading(false);
      });
  };

  const signIn = async (form) => {
    axios
      .post("auth/signin", form.values, {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.user;
        setSessionedUserData(user);
        showNotification({
          title: "Signed in!",
          color: "green",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          showNotification({
            title: "Error!",
            message: "Invalid username or password.",
            color: "red",
          });
          form.setFieldError(
            "username",
            "The username or password is incorrect."
          );
          return true;
        }
        showNotification({
          title: "Error!",
          message: "Sorry we can't process your request!",
          color: "red",
        });
      });
  };

  const signout = () => {
    axios
      .get("/auth/signout", {
        withCredentials: true,
      })
      .then((res) => {
        setSessionedUserData(null);
        showNotification({
          title: "Signed out!",
          color: "green",
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Error!",
          message: "Sorry we can't process your request!",
          color: "red",
        });
      });
  };

  const signoutExpiredSession = () => {
    axios
      .get("/auth/signout", {
        withCredentials: true,
      })
      .then((res) => {
        setSessionedUserData(null);
        showNotification({
          title: "Session Expired!",
          color: "yellow.8",
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Error!",
          message: "Sorry we can't process your request!",
          color: "red",
        });
      });
  };

  const value = useMemo(
    () => ({
      sessionedUserData,
      setSessionedUserData,
      signIn,
      signout,
      getSessionedUser,
      signoutExpiredSession,
    }),
    [sessionedUserData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
