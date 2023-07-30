const http = require("http");

const templater = require("./templater");

const host = 'localhost';
const port = 8000;
var count = 0;
const requestListener = async function (req, res) {
    count++;
    var thiscount = count;
    console.log("rendering " + thiscount);
    var data = await templater.load("test", 21);
    console.log("finished " + thiscount);
    res.setHeader("Content-Type", data.headers);
    res.writeHead(200);
    res.end(data.text);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
