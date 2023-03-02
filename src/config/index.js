export const nodeEnv = process.env.NODE_ENV;

export const isProduction = nodeEnv === "production";
export const apiServer = isProduction
  ? process.env.REACT_APP_API_URL_PRODUCTION_SERVER
  : process.env.REACT_APP_API_URL_DEVELOPMENT_SERVER;
