var http = require('http');
var path = require('path');
var fs = require('fs');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (req, res) {
  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method === 'GET') {
    let fileUrl = req.url;

    if (fileUrl === '/') {
      fileUrl = '/index.html';
    }

    const filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);

    // Check if the requested file is an HTML file
    if (fileExt === '.html') {
      fs.access(filePath, fs.constants.F_OK, function (err) {
        if (err) {
          // File does not exist
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
          return;
        }

        // File exists → load it
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      // Not an HTML file
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
    }
  } else {
    // Method not supported
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
  }
});

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
