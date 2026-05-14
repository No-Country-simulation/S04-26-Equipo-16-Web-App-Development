import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Backend funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});