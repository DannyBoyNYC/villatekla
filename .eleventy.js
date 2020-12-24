module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  return {
    dir: {
      input: "./",
      output: "./_site",
    },
    passthroughFileCopy: true,
  };
};
