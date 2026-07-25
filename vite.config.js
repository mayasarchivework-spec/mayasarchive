import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const sourceAssetsDir = path.join(projectRoot, 'assets');
const distAssetsDir = path.join(projectRoot, 'dist', 'assets');

const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
};

function sendAsset(req, res, filePath, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const range = req.headers.range;

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) {
      res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
      res.end();
      return;
    }

    let start = match[1] ? Number(match[1]) : 0;
    let end = match[2] ? Number(match[2]) : stats.size - 1;

    if (!match[1] && match[2]) {
      const suffixLength = Number(match[2]);
      start = Math.max(stats.size - suffixLength, 0);
      end = stats.size - 1;
    }

    end = Math.min(end, stats.size - 1);

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= stats.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
      res.end();
      return;
    }

    res.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Type': contentType,
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, {
    'Accept-Ranges': 'bytes',
    'Content-Length': stats.size,
    'Content-Type': contentType,
  });
  fs.createReadStream(filePath).pipe(res);
}

function archiveAssetsPlugin() {
  return {
    name: 'archive-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/assets/')) {
          next();
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        const relativePath = decodeURIComponent(url.pathname.slice('/assets/'.length));
        const filePath = path.resolve(sourceAssetsDir, relativePath);

        if (!filePath.startsWith(sourceAssetsDir + path.sep)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        fs.stat(filePath, (error, stats) => {
          if (error || !stats.isFile()) {
            next();
            return;
          }

          sendAsset(req, res, filePath, stats);
        });
      });
    },
    writeBundle() {
      if (fs.existsSync(sourceAssetsDir)) {
        fs.cpSync(sourceAssetsDir, distAssetsDir, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  publicDir: false,
  plugins: [react(), archiveAssetsPlugin()],
});
