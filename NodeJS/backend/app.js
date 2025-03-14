require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const treeRoutes = require("./routes/treeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middleware
app.use(cors()); // Cho phép frontend truy cập API
app.use(express.static("public")); // Cho phép truy cập ảnh
app.use(bodyParser.json());
app.use("/api/trees", treeRoutes);

// Khởi động server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
