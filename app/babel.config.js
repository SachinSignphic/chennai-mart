module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "expo-router/babel",
            "nativewind/babel",
            [
                "module-resolver",
                {
                    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
                    root: ["."],
                    alias: {
                        // "@api": "./src/api",
                        "@assets": "./assets",
                        "@components": "./components",
                        // "@scenes": "./src/scenes",
                        // "@theme": "./src/theme",
                        // "@utils": "./src/utils",
                    },
                },
            ],
        ],
    };
};
