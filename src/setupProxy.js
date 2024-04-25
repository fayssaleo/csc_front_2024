const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = process.env.REACT_APP_MODE === 'preprod' ? process.env.REACT_APP_PREPROD_API_BACKEND : process.env.REACT_APP_LOCAL_API_BACKEND;
module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: API_URL,changeOrigin: true }));
};