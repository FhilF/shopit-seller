export const nodeEnv = process.env.NODE_ENV;
export const apiServer =
  nodeEnv === "development"
    ? process.env.REACT_APP_API_URL_DEVELOPMENT_SERVER
    : process.env.REACT_APP_API_URL_PRODUCTION_SERVER;

export const userSessionStorageName = "yetiSessionedUser";
