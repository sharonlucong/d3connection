var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var T = require("timbre");

app.use(express.static(__dirname+'/public'));

app.get('/static',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {

	socket.on('instrument', function(msg){
		
		var r = Math.floor(Math.random() * 30)+20;
		var j = Math.floor(Math.random() * 10);

		io.emit('instrument', r);
		io.emit('color option', j)
	});

	socket.on('sound type', function(fre){
		io.emit('sound type', fre);
	});

	socket.on('sine sound',function(timer){
		io.emit('sine sound',timer);
	});

});

http.listen(3000,function(){
	console.log('listening on *:3000');
});
