const http = require("http");
const chalk = require("chalk");
const app = require("./app");

const PORT = process.env["PORT"] ?? 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Get your routine on!")
<<<<<<< HEAD
  )
})

//do not use
=======
    );
  });

  
>>>>>>> 5cf364e8fc625af81ce2efc5b93b7239e8a0b39a
