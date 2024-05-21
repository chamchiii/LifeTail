import { createProxyMiddleware } from "http-proxy-middleware";

// /api 로 요청을 보내게 되면 설정한 타겟으로 요청을 전송한다.
export default function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
}
