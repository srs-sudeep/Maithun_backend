const express = require("express");
const dbConnection = require("./connection/db");
const cors = require("cors");
const apis = require("./apis/router");

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'exp://10.10.17.192:8081',
  'http://localhost:3001'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
}));
require('dotenv').config()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/apis", apis);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
