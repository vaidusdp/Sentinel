import "dotenv/config";

import express from "express";
import { supabase } from "./db/supabase.js";

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    return res.json({
        status: "OK",
        message: "Working"
    });
});

app.listen(port, () => {
    console.log(`Senitel running on http://localhost:${port}`);
});