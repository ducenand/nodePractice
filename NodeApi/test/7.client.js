const net = require('net');

const client = net.connect({port:'1337'},()=>{
   console.log(`client connected`);
   client.write('world!\r\n');
});

client.on('data',(data)=>{
    console.log(data.toString());
    client.end();
});

client.on('end',()=>{
   console.log('client disconnected');
});