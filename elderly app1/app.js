const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve static files from the public directory

const PORT = process.env.PORT || 3092;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("A user connected");

    // When a user joins a room
    socket.on("join", (data) => {
        socket.join(data.room);
        socket.to(data.room).emit("user-connected", socket.id);
    });

    // When a user disconnects
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        socket.to("myRoom").emit("user-disconnected", socket.id); // Notify others
    });
});
