const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/" || req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Home Page.</h1>");
    res.end();

  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About Page.</h1>");
    res.end();

  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Contact Page.</h1>");
    res.end();

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Invalid Request!</h1>");
    res.end();
  }

});

server.listen(5000, () => {
  console.log("The NodeJS server on port 5000 is now running....");
});
