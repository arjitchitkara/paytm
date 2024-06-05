// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const jwt = require("jsonwebtoken");

const app = express();

app.use("/api/v1", rootRouter);
app.use(cors());
app.use(express.json());
