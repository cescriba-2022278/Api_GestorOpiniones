import { config } from "dotenv";
config();
import Server from "./configs/server";

const server = new Server();

server.listen();