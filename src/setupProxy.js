const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('api.binance.com/api/v3/', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive'
      }
    })
  );
  
  app.use(
    createProxyMiddleware('api-pub.bitfinex.com/v2**', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive'
      }
    })
  );

  app.use(
    createProxyMiddleware('api.huobi.pro/', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive'
      }
    })
  );

  app.use(
    createProxyMiddleware('api.kraken.com/0/public/Ticker', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive'
      }
    })
  );

  app.use(
    createProxyMiddleware('api.kraken.com/0/public/Trades', {
      target: 'localhost:3000/',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive'
      }
    })
  );
}
