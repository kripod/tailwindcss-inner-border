# tailwindcss-inner-border

A plugin that provides utilities for creating inner borders with box-shadow.

## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-inner-border
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("tailwindcss-inner-border"),
    // ...
  ],
};
```

## Usage

Use the `inner-border-{n}` utilities to set the inner border width for all sides of an element:

<!-- prettier-ignore-start -->
```html
<input class="inner-border ...">
<input class="inner-border-2 ...">
```
<!-- prettier-ignore-end -->

Control the inner border color of an element using the `inner-border-{color}` utilities:

<!-- prettier-ignore-start -->
```html
<input class="inner-border-2 inner-border-rose-500 ...">
```
<!-- prettier-ignore-end -->

Variants and color opacity modifiers may also be used:

<!-- prettier-ignore-start -->
```html
<input class="inner-border-2 inner-border-rose-500/75 hover:inner-border-rose-500 ...">
```
<!-- prettier-ignore-end -->

## Configuration

You can configure which values and variants are generated by this plugin under the `borderWidth` and `borderColor` keys in your `tailwind.config.js` file.

> **Note**
>
> By default, Tailwind makes the entire default color palette available as border colors. You can customize your color palette by editing `theme.colors` or `theme.extend.colors` as shown below.

```diff
// tailwind.config.js
module.exports = {
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
+     3: "3px",
      4: "4px",
+     6: "6px",
-     8: "8px",
    },
    extend: {
+     colors: {
+       "regal-blue": "#243c5a",
+     },
    },
  },
};
```
