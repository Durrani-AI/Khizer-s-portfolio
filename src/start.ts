import { createMiddleware, createStart } from "@tanstack/react-start";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https: wss: ws:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeadersMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";

  if (!isLocalhost && url.protocol === "http:") {
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();
  const headers = new Headers(response.headers);

  headers.set("Content-Security-Policy", contentSecurityPolicy);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");

  if (!isLocalhost && url.protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware],
}));