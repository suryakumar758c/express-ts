import http from "http";

import express from "express";

import dotenv from "dotenv";

dotenv.config();

import ApiRouter from "./server/routes/api.router";

import type { Server } from "http";

import type { Express, Request, Response } from "express";

const { APP_PORT } = process.env;

const app: Express = express();

app.use(express.json());

app.use("/api", ApiRouter);

const server: Server = http.createServer(app);

// 404 handler
app.use((_: Request, response: Response): void => {
  response.status(404).json({ code: 404, message: "Not found", data: null });
});

server.listen(APP_PORT, (): void => {
  console.log(`server listening on port ${APP_PORT}`);
});
