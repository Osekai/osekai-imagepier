const http = require("http");

const templater = require("./templater");

const host = 'localhost';
const port = 8000;
const requestListener = async function (req, res) {
    var data = await templater.load("medals_embed_png", 21);
    res.setHeader("Content-Type", data.headers);
    res.writeHead(200);
    res.end(data.text);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
