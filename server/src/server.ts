import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db_config.js";
import authRouter from "./routes/auth_route.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const port = Number(process.env.PORT) || 4000;

app.get('/api', (req, res) => {
    res.send('API is working...');
});
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
});