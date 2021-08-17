const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running");
});
io.on("connection", (socket) => {
  socket.emit("self", socket.id);

  socket.on("callUser", ({ id, message, name }) => {
    io.to(id).emit("callUser", { name: name, message: message });
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
