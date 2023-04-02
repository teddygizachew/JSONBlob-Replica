const fs=require('fs');
const { json } = require('stream/consumers');
const url=require('url');

function POST(req, res) {
    // unique id with time
    const timestamp = new Date().getTime();
    const filename = `${timestamp}.json`;

    // Process the body of the request
    var body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        try {
            json_body = JSON.parse(body);
            console.log(json_body);
            fs.writeFileSync(`./data/${filename}`, JSON.stringify(json_body));
            res.writeHead(200, {'Content-Type': 'application/json', 'Current-timestamp': timestamp});
            res.end(JSON.stringify({ message: `file ${filename} created`,
            body: json_body }));
            
        } catch (e) {
            console.log('Invalid JSON format');
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
}
module.exports=POST