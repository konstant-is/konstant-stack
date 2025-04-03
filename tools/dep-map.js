export const depMap = {
  // These must be provided by the consuming project
  peer: [
    '@payloadcms/ui',
    '@payloadcms/next',
    'react',
    'react-dom',
    'next',
    'payload',
    'date-fns',
  ],

  // These are bundled with your library and needed at runtime
  runtime: ['deepmerge', 'qs-esm', 'slugify', 'url'],
};
