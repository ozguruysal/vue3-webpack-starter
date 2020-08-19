// Sources for PostCSS config
// https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475
// https://github.com/ky-is/vue-cli-plugin-tailwind/blob/master/generator/templates/postcss.config.js
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.js",
    "./src/**/*.ts",
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => {
    const contentWithoutStyleBlocks = content.replace(
      /<style[^]+?<\/style>/gi,
      ""
    );

    return (
      contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
    );
  },
  whitelist: [],
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
    /^router-link(|-exact)-active$/,
  ],
});

const cssnano = require("cssnano")({ preset: ["default"] });

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : []),
  ],
};
