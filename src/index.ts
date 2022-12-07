import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import mongoose from "mongoose";
import {authRouter, usersRouter} from "./routes";
import {routes} from "./shared";
import bodyParser from "body-parser";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.koqzweg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}));
app.use(bodyParser.json({strict: false}))

app.use(routes.auth.baseUrl, authRouter)
app.use(routes.users.baseUrl, usersRouter)


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