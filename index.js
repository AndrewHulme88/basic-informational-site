const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = './';

  if (req.url === '/') {
    filePath += 'index.html';
  }
  else if (req.url === '/about') {
    filePath += 'about.html';
  }
  else if (req.url === '/contact-me') {
    filePath += 'contact-me.html';
  }
  else {
    filePath += '404.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain'});
      res.end('500 - Server Error');
    }
    else {
      const ext = path.extname(filePath);
      const contentType = ext === '.html' ? 'text/html' : 'text/plain';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost8080');
});
