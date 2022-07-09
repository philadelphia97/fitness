require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env
const cors = require("cors");

// Setup your Middleware and API Router here

app.use(express.json());
app.use(cors());

const apiRouter = require("./api");
const { Pool } = require("pg/lib");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  const client = new Pool(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev');
  client.connect();
  console.log(`Listening on port ${PORT}`);
})
.on("error", () => {
  process.once("SIGUSR2", function () {
    process.kill(process.pid, "SIGUSR2");
  });
  process.on("SIGINT", function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, "SIGINT");
  });
});

module.exports = app;
