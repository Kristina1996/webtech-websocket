var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
var username = document.getElementById('username');
var btnSend = document.getElementById('btn-send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

console.log(username.value)

btnSend.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		username: username.value
	});
});

message.addEventListener('keypress', function() {
	socket.emit('typing', username.value);
});

message.addEventListener('keyup', function() {
	socket.emit('notyping');
	feedback.innerHTML = ''
});

socket.on('chat', function(data) {
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>'
});

socket.on('typing', function(data) {
	feedback.innerHTML += '<p><em>' + data + 'is typing a message... </em></p>'
});

socket.on('notyping', function(data) {
	feedback.innerHTML = ''
});