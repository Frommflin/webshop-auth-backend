import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

import https from "https";
import fs from "fs";
import app from "./app.js";

const SECURE_PORT = process.env.SECURE_PORT || 5443;

const tlsOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

await connectDB();

if (process.env.NODE_ENV !== "test") {
  https.createServer(tlsOptions, app).listen(SECURE_PORT, () => {
    console.log(`HTTPS server running on https://localhost:${SECURE_PORT}`);
  });
}
