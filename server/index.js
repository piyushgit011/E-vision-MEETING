import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
import UserRoute from './routes/UserRoute.js'
import workRoute from './routes/workRoute.js'
import mlRoute from './routes/mlRoute.js'

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/user', UserRoute);
app.use('/work', workRoute);
app.use('/mlData', mlRoute);

app.listen(process.env.PORT, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});
