export type PluginConfig = {
  basePath: string;
  paths: {
    client: string;
    fields: string;
  };
  settings: {
    defaultLocale: string;
    enableLogging: boolean;
  };
  getPath: (type: keyof PluginConfig["paths"], subPath?: string) => string;
};

const pluginPath = "@konstant/stack/plugin-localized-navigation";
export const pluginConfig: PluginConfig = {
  basePath: pluginPath, // Base path for the plugin
  paths: {
    client: `${pluginPath}/client`,
    fields: `${pluginPath}/fields`,
  },
  settings: {
    defaultLocale: "en", // Default locale for the plugin
    enableLogging: true, // Toggle logging for debugging
  },
  // Helper function to generate a path dynamically
  getPath: (type: keyof typeof pluginConfig.paths, subPath = ""): string => {
    const base = pluginConfig.paths[type];
    if (!base) {
      throw new Error(`Invalid path type: ${type}`);
    }
    return `${base}${subPath}`;
  },
};
