module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }]
    ],
    plugins: [
      // Reanimated debe ser el último plugin
      ["react-native-reanimated/plugin"],
    ],
  };
};
