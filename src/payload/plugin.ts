import { Config } from "payload";

type PluginOptions = {};

export const konstantFieldsPlugin = (
  pluginOptions?: PluginOptions,
): ((incomingConfig: Config) => Promise<Config>) => {
  // You can extend the Payload config here if needed

  return async (incomingConfig: Config): Promise<Config> => {
    // Modify the incomingConfig as needed
    return incomingConfig;
  };
};
