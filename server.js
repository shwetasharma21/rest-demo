const express = require("express");
require("dotenv").config();

const apiRouter = require("./api");

const app = express();

app.use("/api", apiRouter); //can use middleware using use() : can also use routers using this method

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening at port ${port}`));
