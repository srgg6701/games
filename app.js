var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888,
	serverUrl = "127.0.0.1";

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {
  
	/* 	// Test 1 - write it down:
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello, sweety! What about Node?");
	res.end();*/

	/*	// Test 2 - get the file content:
	fs.readFile('index.html',function (err, data){
		res.writeHead( 200, {'Content-Type': 'text/html','Content-Length':data.length});
		res.write(data);
		res.end();
	});*/
  
	// Test 3
	
	var uri = url.parse(req.url).pathname, filename = path.join(process.cwd(), uri);

	path.exists(filename, function(exists) {
	if(!exists) {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
		return;
	}

	if (fs.statSync(filename).isDirectory()) filename += '/index.html';

	fs.readFile(filename, "binary", function(err, file) {
		if(err) {        
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
			return;
		}
		res.writeHead(200);
		res.write(file, "binary");
		res.end();
		});
	});
  
}).listen(port,serverUrl);