import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.json({
    greeting: "Hello world from 8080",
  });
});

app.listen(8080, () => {
  console.log("Initialized on 8080");
});
