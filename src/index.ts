import "dotenv/config";

import express from "express";
import { supabase } from "./db/supabase.js";

const app = express();

app.use(express.json());

app.get("/health", async (req, res) => {
    const { error } = await supabase
        .from("users")
        .select("id")
        .limit(1);

    if (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }

    return res.json({
        status: "OK",
        message: "Senitel + Supabase working"
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Senitel running on http://localhost:${port}`);
});