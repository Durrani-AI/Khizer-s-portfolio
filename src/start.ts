import { createMiddleware, createStart } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

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

  setResponseHeader("Content-Security-Policy", contentSecurityPolicy);
  setResponseHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  setResponseHeader("X-Content-Type-Options", "nosniff");
  setResponseHeader("X-Frame-Options", "DENY");
  setResponseHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  setResponseHeader("Cross-Origin-Opener-Policy", "same-origin");
  setResponseHeader("Cross-Origin-Resource-Policy", "same-origin");

  if (!isLocalhost && url.protocol === "https:") {
    setResponseHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware],
}));