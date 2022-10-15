const plugin = require("tailwindcss/plugin");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import("tailwindcss/plugin")} */
const innerBorderPlugin = plugin(({ addDefaults, matchUtilities, theme }) => {
  addDefaults("inner-border", {
    "--tw-inner-border-color": theme("borderColor.DEFAULT", "currentColor"),
  });
  matchUtilities(
    {
      "inner-border": (value) => ({
        "@defaults inner-border": {},
        "--tw-inner-border-width": value,
        "--tw-inner-border-shadow":
          "inset 0 0 0 var(--tw-inner-border-width) var(--tw-inner-border-color)",
        "box-shadow": [
          "var(--tw-ring-offset-shadow, 0 0 #0000)",
          "var(--tw-ring-shadow, 0 0 #0000)",
          "var(--tw-inner-border-shadow)",
          "var(--tw-shadow, 0 0 #0000)",
        ].join(", "),
      }),
    },
    {
      type: ["line-width", "length"],
      values: theme("borderWidth"),
    },
  );
  matchUtilities(
    {
      "inner-border": (value) => ({
        "--tw-inner-border-color": value,
      }),
    },
    {
      type: ["color", "any"],
      values: (({ DEFAULT: _, ...colors }) => colors)(
        flattenColorPalette(theme("borderColor")),
      ),
    },
  );
});

module.exports = innerBorderPlugin;
