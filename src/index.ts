import "dotenv/config";

import express from "express";
import userRouter from "./routes/user.routes.js";
import projectRoute from "./routes/project.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Senitel running on http://localhost:${port}`);
});
