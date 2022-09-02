import express from "express";
import { server } from "../src/server";

const app = express();

app.use("/api", server);

export default app;