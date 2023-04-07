import express, { Express, json } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import routers from "./router/index.js";

const server: Express = express();
server.use(cors()).use(json()).use(routers);

server.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
