import { createProxyMiddleware } from "http-proxy-middleware";

export default function foo(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4040",
      changeOrigin: true,
    })
  );
}
