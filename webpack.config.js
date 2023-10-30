const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "gaming-table.js",
    path: path.resolve(__dirname, "dist"),
  },
};
