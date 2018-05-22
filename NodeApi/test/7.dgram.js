var dgram = require('dgram');
var message = new Buffer("深入浅出Node.js");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 3421, "localhost", function(err, bytes) {
    client.close();
});

// socket.send(buf, offset, length, port, address, [callback])
// 发送的buf,buf的偏移，buf的长度，目标端口，目标地址，发送完成的回调



