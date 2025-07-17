// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/attribute-hyphenation": "off",
    "vue/attributes-order": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: 1,
      },
    ],
  },
});
