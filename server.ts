import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes can be added here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OAuth Callback Handler
  app.get("/auth/callback", (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Authenticating...</title>
          <style>
            body { 
              background: #09090b; 
              color: #fff; 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              overflow: hidden;
            }
            .container { text-align: center; padding: 2rem; }
            .spinner {
              width: 40px;
              height: 40px;
              border: 3px solid rgba(16, 185, 129, 0.1);
              border-top-color: #10b981;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 1.5rem;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
            h1 { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; }
            p { font-size: 0.875rem; color: #71717a; margin: 0 0 1.5rem; }
            button {
              background: #10b981;
              color: #000;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              cursor: pointer;
              font-size: 0.875rem;
              transition: background 0.2s;
            }
            button:hover { background: #059669; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>Authentication Successful</h1>
            <p>We're closing this window and taking you back to the app.</p>
            <button id="close-btn" style="display: none;" onclick="window.close()">Close Window</button>
          </div>
          <script>
            function finishAuth() {
              if (window.opener) {
                try {
                  window.opener.postMessage({ type: 'SUPABASE_AUTH_SUCCESS' }, window.location.origin);
                  console.log('Message sent to opener');
                } catch (e) {
                  console.error('Failed to postMessage:', e);
                  // Fallback to wildcard if origin check fails during postMessage
                  window.opener.postMessage({ type: 'SUPABASE_AUTH_SUCCESS' }, '*');
                }
                
                // Give it a moment to ensure message is sent
                setTimeout(() => {
                  window.close();
                  // If window.close() failed (e.g. blocked), show the button
                  setTimeout(() => {
                    document.getElementById('close-btn').style.display = 'inline-block';
                    document.querySelector('.spinner').style.display = 'none';
                  }, 500);
                }, 100);
              } else {
                // No opener, maybe redirected in same window?
                console.log('No opener found, redirecting to home');
                window.location.href = '/';
              }
            }
            
            // Run on load
            window.onload = finishAuth;
            // Fallback if onload doesn't fire or takes too long
            setTimeout(finishAuth, 2000);
          </script>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        hmr: false // HMR is disabled in AI Studio
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
