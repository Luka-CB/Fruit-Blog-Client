const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://fruit-blog-api.onrender.com",
      },
    },
  },
};
