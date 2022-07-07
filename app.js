require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

// Setup your Middleware and API Router here

app.use(express.json());
app.use(cors());

const apiRouter = require("./api");
app.use("/api", apiRouter);


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
    const client  = require('./db/client');
    client.connect();
});

process.on("error", () => {
process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});
process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
});

module.exports = app;
