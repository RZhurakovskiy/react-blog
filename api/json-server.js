import { createProxyMiddleware } from 'http-proxy-middleware';

const jsonServerURL = 'https://rzhurakovskiy-react-blog.vercel.app/api';

export default function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: jsonServerURL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  });

  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      res.status(500).send('Ошибка проксирования');
    }
  });
}
