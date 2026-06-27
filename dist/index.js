var k=process.env.SUPABASE_URL||"",m=process.env.SUPABASE_ANON_KEY||"",v=process.env.STRIPE_PRICE_ID||"",g=process.env.APP_PORT||3000;if(typeof Bun<"u")Bun.serve({port:g,async fetch(j){let b=new URL(j.url);if(b.pathname==="/")return new Response(`<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Deltametrician</title>
              <style>body { background: #0f172a; margin: 0; font-family: system-ui, sans-serif; }</style>
              <script>
                window.process = { env: { 
                  SUPABASE_URL: "${k}", 
                  SUPABASE_ANON_KEY: "${m}", 
                  STRIPE_PRICE_ID: "${v}" 
                }};
              </script>
            </head>
            <body>
              <div id="root"></div>
              <!-- \uD83C\uDF1F Points directly to your compiled client bundle route -->
              <script type="module" src="/index.cli.js"></script>
            </body>
          </html>`,{headers:{"Content-Type":"text/html"}});if(b.pathname==="/index.cli.js")return new Response(Bun.file("/app/dist/index.cli.js"),{headers:{"Content-Type":"application/javascript"}});return new Response("Not Found",{status:404})}}),console.log(`\uD83D\uDE80 Production Orchestration Server successfully live on port ${g}`);
