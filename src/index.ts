import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from "mongoose";
import {Routes} from "./shared/";
import {authRouter} from "./routes";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.koqzweg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyparser.json());



// app.use('/', (req, res) => {
//   res.status(200).json({message: 'it works'})
// })
app.use('/api/auth', authRouter)

// app.use('/api/sessions', authRouter)
// app.use('/api/sessions', () => {
//   console.log('Routes.AUTH')
// })

const start = async () => {

  try{
    await mongoose.connect(DB_URL)

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start();