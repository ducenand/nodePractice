// 7.1构建TCP服务

// 全名为传输控制协议
// 创建TCP服务器端
/**
 const net = require('net');

 const server = net.createServer((socket)=>{
   socket.on('data',(data)=>{
       socket.write('你好');
   });
   socket.on('end',()=>{
       console.log('链接断开');
   });
   socket.write(`欢迎光临《深入浅出Node.js》实例：\n`);
});


 server.listen(8123,()=>{
   console.log(`server bound`);
});

 */

// telnet 127.0.0.1 8123
// 使用telnet 进行简单的会话交流
// 通过net模块自行构建客户端进行会话 ../test/7.client.js
// 利用pipe()方法实现管道操作
/**
 const net = require('net');
 const server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});
 server.listen(1337, '127.0.0.1');
 */


// 7.2 构建UDP服务

// 用户数据包协议，UDP与TCP最大的不同是UDP不是面向连接的。

// 创建UDP服务器端
/**
 const dgram = require('dgram');
 const server = dgram.createSocket('udp4');
 server.on('message',(msg,rinfo) => {
    console.log(`server got:${msg} from ${rinfo.address} : ${rinfo.port}`);
});


 server.on('listening',()=>{
    let address = server.address();
    console.log(`server listening ${address.address} : ${address.port}`);
});
 server.bind(3421);

 //接下来创建一个客户端与服务端进行会话 ../test/7.dgram.js

 */


// 7.3构建http服务
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello world\n');
}).listen(1337,'127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');

/**
 curl -v http://127.0.0.1:1337
    * Rebuilt URL to: http://127.0.0.1:1337/
    *   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 1337 (#0)
 三次握手

> GET / HTTP/1.1
> Host: 127.0.0.1:1337
> User-Agent: curl/7.54.0
> Accept: *\/*
>
握手完成后，客户端向服务端发送请求报文


< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Wed, 04 Apr 2018 01:44:25 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
Hello world
 服务端完成处理后，向客户端发送相应内容，包括相应头和相应体

* Connection #0 to host 127.0.0.1 left intact
结束会话的信息

*/




