var http = require("http");




var server = http.createServer(function(request, response) {
		    response.writeHead(200, {"Content-Type": "text/html"});
			response.write("<html>");
			response.write("<head>");
			response.write("<title>FontEvolver</title>");
			response.write("</head>");
			response.write("<body>");
			response.write("FontEvolver");
			response.write("</body>");
			response.write("</html>");
			response.end();
});

server.listen(8080);
//console.log("Server is listening");