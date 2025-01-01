import { Config } from "payload/config";

export const payloadFieldsPlugin = (): ((config: Config) => Config) => {
  return (config) => {
    // You can extend the Payload config here if needed
    console.log("Payload Fields Plugin Loaded");
    return config;
  };
};
