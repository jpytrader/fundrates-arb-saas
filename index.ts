// Inside index.ts (At project root)
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || '';
const APP_PORT = process.env.APP_PORT || 3000;

if (typeof Bun !== 'undefined') {
  Bun.serve({
    port: APP_PORT,
    async fetch(req) {
      const url = new URL(req.url);

      // A. Serve the base HTML layout on the root URI path
      if (url.pathname === '/') {
        return new Response(
          `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Deltametrician</title>
              <style>body { background: #0f172a; margin: 0; font-family: system-ui, sans-serif; }</style>
              <script>
                window.process = { env: { 
                  SUPABASE_URL: "${SUPABASE_URL}", 
                  SUPABASE_ANON_KEY: "${SUPABASE_ANON_KEY}", 
                  STRIPE_PRICE_ID: "${STRIPE_PRICE_ID}" 
                }};
              </script>
            </head>
            <body>
              <div id="root"></div>
              <!-- 🌟 Points directly to your compiled client bundle route -->
              <script type="module" src="/index.cli.js"></script>
            </body>
          </html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      }

      // B. Serve your compiled client-init.js bundle file over HTTP
      if (url.pathname === '/index.cli.js') {
        // Maps cleanly to the file's exact location inside your production directory
        const prodBundlePath = '/app/dist/index.cli.js';
        return new Response(Bun.file(prodBundlePath), {
          headers: { 'Content-Type': 'application/javascript' }
        });
      }

      return new Response('Not Found', { status: 404 });
    }
  });
  console.log(`🚀 Production Orchestration Server successfully live on port ${APP_PORT}`);
}