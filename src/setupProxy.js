const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v3',
    createProxyMiddleware({
      target: 'https://api.binance.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/market/history',
    createProxyMiddleware({
      target: 'https://api.huobi.pro/',
      changeOrigin: true,
    })
  );

  app.use(
    '/0/public',
    createProxyMiddleware({
      target: 'https://api.kraken.com',
      changeOrigin: true,
    })
  );
};