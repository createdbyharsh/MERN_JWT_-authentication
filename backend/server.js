import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
