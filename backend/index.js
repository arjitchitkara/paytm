const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", rootRouter);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:Lauriston%401@cluster0.bonmh1l.mongodb.net/paytm"
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
