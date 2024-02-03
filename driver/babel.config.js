module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: 
    [
      'expo-router/babel',
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@": "./"
          },
        },
      ],
    ],
  };
};
