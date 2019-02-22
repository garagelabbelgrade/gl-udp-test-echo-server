let dgram = require('dgram');

let PORT = 2222; // this will be server's port
let HOST = '0.0.0.0';  // bind to this host; set to 0.0.0.0 for all IPv4 addresses(gateways), or to a specific IP (local)


let server = dgram.createSocket('udp4');


server.on("listening", () => {
  let address = server.address();
  let port = address.port;
  let addrFamily = address.family;
  let ipAddress = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipAddress);
  console.log('Server is IP4/IP6 : ' + addrFamily);
});


server.on("close", () => {
  console.log('Socket is gracefully closed !');
});

server.on("message", (msg, info) => {
  console.log('SERVER - Data received from client : ' + msg.toString());
  console.log('SERVER - Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

  server.send(msg, info.port, info.address, (error) => {
    if (error) {
      console.error("Error during reply");
      // optionally close client socket
    } else {
      console.log('Data sent !!!');
    }
  });


});

server.bind(PORT, HOST);  // initialize listening (starts server)