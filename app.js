var http = require('http');
var redis = require('redis');

var hostname = '0.0.0.0';
var port = 3000;

var client = redis.createClient(6379,'redis');

client.on('connect', () => {
    console.log('Connected');
    client.exists('count', (err, reply) => {
        if(reply===1) {
            console.log('count exists');
        } else {
            client.set('count', 0);
        }
    });
});

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        client.incr('count');
        client.get('count', (err, count) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hellooooo from node! I have been seen ' + count + ' times');
        });
    } else {

    }

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
