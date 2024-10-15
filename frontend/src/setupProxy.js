const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiServer = process.env.REACT_APP_API_SERVER;
  // const apiServer = process.env.REACT_APP_LOCAL_URL;

  app.use(
    createProxyMiddleware(["/api", "/auth", "/image"], {
      target: `${apiServer}`,
      changeOrigin: true,
    })
  );
};
