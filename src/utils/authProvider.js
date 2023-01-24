import axios from "axios";
import { userSessionStorageName } from "config";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sessionedUser, setSessionedUser] = useLocalStorage(
    userSessionStorageName,
    null
  );

  const navigate = useNavigate();

  const updateSessionedUser = (data) => {
    setSessionedUser({ ...sessionedUser, ...data });
  };

  // call this function when you want to authenticate the sessionedUser
  const signIn = async (form) => {
    axios
      .post("auth/signin", form.values, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        // credentials: "same-origin",
      })
      .then((res) => {
        const user = res.data.user;
        setSessionedUser({
          provider: user.provider,
          username: user.username,
          avatar: user.avatar,
          shop: user.Shop?._id,
        });
        showNotification({
          title: "Signed in!",
          // message: "Sorry we can't process your request!",
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

  // call this function to sign out logged in sessionedUser
  const signout = () => {
    axios
      .get("/auth/signout", {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem(userSessionStorageName);
        setSessionedUser(null);
        showNotification({
          title: "Signed out!",
          // message: "Sorry we can't process your request!",
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
        localStorage.removeItem(userSessionStorageName);
        setSessionedUser(null);
        showNotification({
          title: "Session Expired!",
          // message: "Sorry we can't process your request!",
          color: "yellow",
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
      sessionedUser,
      signIn,
      signout,
      updateSessionedUser,
      signoutExpiredSession,
    }),
    [sessionedUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
