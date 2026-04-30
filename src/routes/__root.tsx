import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://example.com").replace(/\/$/, "");
const ogImageUrl = import.meta.env.VITE_OG_IMAGE_URL || `${siteUrl}/og-image.png`;
const pageTitle = "Khizer Durrani - Full Stack Developer";
const pageDescription =
  "Khizer Durrani is a full-stack developer and CS student at Middlesex University London, building production-grade systems across backend, AI integration, and modern web development.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { name: "keywords", content: "Khizer Durrani, full-stack developer, portfolio, React, TypeScript, backend, AI integration" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Khizer Durrani" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: "Khizer Durrani Portfolio" },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:alt", content: "Khizer Durrani portfolio preview" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const noFlash = `(()=>{try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.add('light');d.classList.remove('dark');}else{d.classList.add('dark');d.classList.remove('light');}}catch(e){}})();`;
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
