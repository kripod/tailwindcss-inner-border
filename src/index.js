const plugin = require("tailwindcss/plugin");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const defaultBoxShadow = [
  "var(--tw-ring-offset-shadow, 0 0 #0000)",
  "var(--tw-ring-shadow, 0 0 #0000)",
  "var(--tw-inner-border-shadow, 0 0 #0000)",
  "var(--tw-shadow, 0 0 #0000)",
].join(", ");

/** @type {import("tailwindcss/plugin")} */
const innerBorderPlugin = plugin(
  ({ addDefaults, matchUtilities, theme, corePlugins }) => {
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
          "box-shadow": defaultBoxShadow,
        }),
      },
      {
        type: ["line-width", "length"],
        values: theme("borderWidth"),
      },
    );
    const directions = ["top", "bottom", "left", "right"];
    directions.forEach((direction) => {
      matchUtilities(
        {
          [`inner-border-${direction}`]: (value) => ({
            "--tw-inner-border-color": theme("borderColor.DEFAULT", "currentColor"),
            "--tw-inner-border-width": value,
            "--tw-inner-border-shadow": getInnerBorderShadow(direction),
            "box-shadow": defaultBoxShadow,
          }),
        },
        {
          type: ["line-width", "length"],
          values: theme("borderWidth"),
        }
      );
    });
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

    /* Overrides to mitigate precedence issues */
    if (corePlugins("boxShadow")) {
      matchUtilities(
        { shadow: () => ({ "box-shadow": defaultBoxShadow }) },
        { values: theme("boxShadow"), type: ["shadow"] },
      );
    }
    if (corePlugins("ringWidth")) {
      matchUtilities(
        { ring: () => ({ "box-shadow": defaultBoxShadow }) },
        { values: theme("ringWidth"), type: "length" },
      );
    }

    // Helper function to generate inner border shadow based on direction
    function getInnerBorderShadow(direction) {
      const shadows = {
        top: "inset 0 var(--tw-inner-border-width) 0 var(--tw-inner-border-color)",
        bottom: "inset 0 calc(-1 * var(--tw-inner-border-width)) 0 var(--tw-inner-border-color)",
        left: "inset var(--tw-inner-border-width) 0 0 var(--tw-inner-border-color)",
        right: "inset calc(-1 * var(--tw-inner-border-width)) 0 0 var(--tw-inner-border-color)",
      };
      return shadows[direction] || shadows["bottom"]; // Default to bottom
    }
  },
);

module.exports = innerBorderPlugin;
