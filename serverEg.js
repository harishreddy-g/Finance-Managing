console.log("Hello World!");

const http = require("http");
const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("my first server");
    res.end();
});

server.listen(3000, function () {
    console.log("server is running on port 3000");
});
