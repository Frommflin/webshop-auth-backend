import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import helmet from "helmet";

const app = express();

const isProd = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: isProd ? undefined : false,
    hsts: isProd, // TODO: ändra till true vid produktion när vi använder https (kräver https)
  })
);

app.use(helmet.referrerPolicy({ policy: "no-referrer" }));
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: "none" }));

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

export default app;
