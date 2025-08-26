import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`App is listening at port ${PORT}`);
});
