const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const mongoose = require("mongoose");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(process.env.DATABASE_URL)
  .then(() => console.log(`MongoDB connected: ${mongoose.connection.host}`));

// Route filer
const bootcamps = require("./router/bootcampsRouter");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
