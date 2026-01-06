// eslint.config.mjs
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(
    // Your custom configs go here
    [
        eslintPluginPrettierRecommended,
        {
            rules: {
                "vue/multi-word-component-names": "off",
                // Correct rule name to allow 'any'
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
    ]
);
