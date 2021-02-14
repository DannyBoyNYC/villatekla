module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  return {
    // NEW
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    //
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
  };
};
