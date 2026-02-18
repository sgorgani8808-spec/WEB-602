const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  if (req.url === "/home") {
    fs.readFile("home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });

  } else if (req.url === "/about") {
    fs.readFile("about.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });

  } else if (req.url === "/contact") {
    fs.readFile("contact.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });

  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Invalid Request!</h1>");
    res.end();
  }

});

server.listen(5000, () => {
  console.log("The NodeJS server on port 5000 is now running....");
});
