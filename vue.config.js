module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Movie search app";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/movie-search/" : "/"
};
