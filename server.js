require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const PORT = process.env.PORT;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
