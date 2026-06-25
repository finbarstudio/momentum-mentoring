import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const securityHeaders = [
  // force HTTPS for 2 years incl. subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // clickjacking protection (Studio is same-origin so still works)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // stop MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // don't leak full URLs to other origins
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // disable powerful APIs the site doesn't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig = {
  outputFileTracingRoot: __dirname,
  poweredByHeader: false, // hide "X-Powered-By: Next.js"
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
