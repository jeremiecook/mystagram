// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Mystagram",
  icon: "./src/favicon.svg",
  templates: {
    Photo: "/:year/:title/:order/",
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/photos/**/*.md",
        typeName: "Photo",
      },
    },
  ],
};
