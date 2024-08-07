const express = require("express");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Set view engine
app.set("view engine", "pug");

// Routes
app.use("/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
