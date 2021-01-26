const server = require("http").createServer((req, resp) => {
  resp.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  });
  resp.end("hey there!");
});

const socketIO = require("socket.io");

const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("join-room", (roomId, userId) => {
    // adicionando usuários em uma mesma sala, pelo ID
    console.log("roomId", roomId, "userId", userId);
    socket.join(roomId);

    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      console.log("disconnected", roomId, userId);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const startServer = () => {
  const { address, port } = server.address();
  console.log(`app runing at ${address}:${port}`);
};

server.listen(process.env.PORT || 3000, startServer);
