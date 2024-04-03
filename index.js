const express = require("express");
const dbConnection = require("./connection/db");
const cors = require("cors");
const apis = require("./apis/router");
const cookieParser = require("cookie-parser");
const session = require('express-session');
// const admin = require('./admin/routes');
const serverless = require('serverless-http');

const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: ['exp://10.10.17.192:8081'],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  }));
} else {
  app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000','exp://10.10.17.192:8081','http://localhost:3001','https://www.admin.chcommune.com/','https://admin.chcommune.com/','http://www.admin.chcommune.com/','http://admin.chcommune.com/',],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  }));
}
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );
dbConnection();

app.use("/apis",apis);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

module.exports.server = serverless(app);
