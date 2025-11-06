import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "text/plain" });
  res.end("QuickSOS server is running");
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
