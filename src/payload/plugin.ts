import { Config, Plugin } from "payload";

export const konstantFieldsPlugin: Plugin = async (
  config: Config,
): Promise<Config> => {
  // You can extend the Payload config here if needed

  // Modify the incomingConfig as needed
  return config;
};
