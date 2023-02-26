import axios from "axios";
import { apiServer } from "config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const instance = axios;

instance.defaults.baseURL = apiServer;

const AxiosInterceptor = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const { signoutExpiredSession } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    setIsSet(true);
  }, []);

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      if (error.response?.status === 401) {
        signoutExpiredSession();
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [navigate]);

  return isSet && children;
};

export default instance;
export { AxiosInterceptor };
