import "dotenv/config";

import express from "express";
import { supabase } from "./db/supabase.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Senitel running on http://localhost:${port}`);
});
