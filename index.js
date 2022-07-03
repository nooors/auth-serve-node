const express = require("express");
const cors = require("cors");
// use envoirement variables

require("dotenv").config();

// Create express server/app
const app = express();

// CORS really is another middleware
app.use(cors());

// Reading and parsing of the body
app.use(express.json());

// Routes
// midleware
app.use("/api/auth", require("./routes/auth.js"));

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
