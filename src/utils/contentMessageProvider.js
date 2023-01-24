import axios from "axios";
import { userSessionStorageName } from "config";
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
import { Box } from "@mantine/core";
import ContentMessageComponent from "components/ContentMessage";
const ContentMessageContext = createContext();

export const ContentMessageProvider = ({ children }) => {
  const [errorType, setErrorType] = useState(null);

  const navigate = useNavigate();
  const value = useMemo(
    () => ({ errorType, setErrorType }),
    [errorType]
  );
  return (
    <ContentMessageContext.Provider value={value}>
      <Box sx={{ position: "relative" }}>
        {errorType ? (
          <ContentMessageComponent
            errorType={errorType}
            setErrorType={setErrorType}
          />
        ) : (
          children
        )}
      </Box>
    </ContentMessageContext.Provider>
  );
};

export const useContentMessage = () => {
  return useContext(ContentMessageContext);
};
