require("dotenv").config();

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addGlobalData(
    "mapboxAccessToken",
    process.env.MAPBOX_ACCESS_TOKEN || "",
  );

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
  };
};
