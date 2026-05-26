import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend funcionando");
});

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;