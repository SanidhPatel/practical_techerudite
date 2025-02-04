import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import routes from './routes/index.js'
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 51000;

app.use(routes)

app.listen(PORT,()=>{
    console.log(`Application is running on port: ${PORT}`)
})