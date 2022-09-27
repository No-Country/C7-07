import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.json({
    greeting: "Hello world from 3001",
  });
});

app.listen(3001, () => {
  console.log("Initialized on 3001");
});
