var NSHAREDATAFILE = 'nsharedata.json';
NSHARE_API_PORT = 12340
UDPSERVER_PORT = 12345;
var trim = require('trim');
var fs = require('fs');

var restify = require('restify');
var server = restify.createServer({
	name: 'nshare',
	version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//UDP-SERVER--------------------------------------------------------------START
var dgram = require("dgram");
var udpServer = dgram.createSocket("udp4");
udpServer.on("message", function (msg, rinfo) {
	console.log("[udp-server] got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    var fromip = rinfo.address;
    var url = trim(msg.toString());
    if(fromip.length > 0 && url.length > 0){	
		fs.readFile(NSHAREDATAFILE, 'utf8', function(err, olddata){
			if(err) console.log(err);
			else {
				var olddataJson = JSON.parse(olddata);
				olddataJson.push({
					created: new Date(),
					fromip: fromip,
					url: url
				});
				var olddataOrderetString = JSON.stringify(olddataJson.reverse());
				fs.writeFile(NSHAREDATAFILE, olddataOrderetString, function(err, newdata){
					if(err) console.log(err);
					else console.log('[udp-server] new-packet is save in json-file!');
				});
			}
		});
	} else {
		console.log('THIS PACKET LOOK EMPTY!!');
	}
});
udpServer.on("listening", function () {
	var address = udpServer.address();
	console.log("PacketServer is running on port " +
	address.address + ":" + address.port);
});
udpServer.bind(UDPSERVER_PORT);
//UDP-SERVER------------------------------------------------------------END


server.get('/help', function(req, res, next){
	fs.readFile('howto.html', 'utf8', function(err, data){
		if(err) res.send(500);
		else res.send(data);
	});
});

//load a packet from json file
server.get('/nshare/packets', function(req, res, next){
	fs.readFile(NSHAREDATAFILE, 'utf8', function(err, data){
		if(err) {
			console.log(err);
			res.send(500);
		}
		else {
			res.send(JSON.parse(data));
		}
	});
});
//create a new packet then save it to json in root
server.post('/nshare/packets', function(req, res, next){		
	var fromip = req.params.fromip;
	var url = req.params.url;
	if(fromip.length > 0 && url.length > 0){	
		fs.readFile(NSHAREDATAFILE, 'utf8', function(err, olddata){
			if(err) console.log(err);
			else {
				var olddataJson = JSON.parse(olddata);
				olddataJson.push({
					created: new Date(),
					fromip: fromip,
					url: url
				});
				var olddataOrderetString = JSON.stringify(olddataJson.reverse());
				fs.writeFile(NSHAREDATAFILE, olddataOrderetString, function(err, newdata){
					if(err) console.log(err);
					else {
						console.log(JSON.parse(newdata));
						res.send(JSON.parse(newdata));
					}
				});
			}
		});
	} else {
		res.send(404);
	}
});
//clear or delete all packets from the json-file
server.post('/nshare/clear', function(req, res, next){		
	fs.writeFile(NSHAREDATAFILE, '[]', function(err, newdata){
		if(err){ 
			console.log(err);
			res.send(500);
		}
		else {
			res.send(200);
			next();
		}
	});
});

server.listen(NSHARE_API_PORT, function(){
	console.log('%s running at %s', server.name, server.url);
});	


//kill app
process.on('SIGTERM', function(){
	sock.close();
	server.close(function(){
		console.log('Killing Nshare!');
		process.exit(0);
	});
});