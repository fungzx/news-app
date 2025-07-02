const express = require("express");
const path = require("path");
require("dotenv").config();

const newsRoutes = require("./routes/news");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/news", newsRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
