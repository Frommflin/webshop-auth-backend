import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import helmet from "helmet";

const app = express();

const isProd = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);
app.use((req, res, next) => {
  if (!req.secure && isProd) {
    const securePort = process.env.SECURE_PORT || 5443;
    const host = req.hostname;
    return res.redirect(`https://${host}:${securePort}${req.originalUrl}`);
  }
  next();
});

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: isProd ? undefined : false,
    hsts: isProd, // TODO: ändra till true vid produktion när vi använder https (kräver https) ändras med production i env
  })
);

app.use(helmet.referrerPolicy({ policy: "no-referrer" }));
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: "none" }));

const devOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://localhost:5000",
  "https://localhost:5443",
];

app.use(
  cors({
    origin: isProd ? true : devOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", authRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

export default app;
