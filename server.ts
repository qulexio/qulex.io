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
        <body style="background: #09090b; color: #fff; font-family: sans-serif; display: flex; items-center; justify-content: center; height: 100vh; margin: 0;">
          <div style="text-align: center;">
            <p>Authentication successful!</p>
            <p style="font-size: 0.8rem; color: #71717a;">Closing window...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'SUPABASE_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
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
