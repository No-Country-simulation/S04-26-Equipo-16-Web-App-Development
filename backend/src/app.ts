import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend funcionando");
});

export default app;