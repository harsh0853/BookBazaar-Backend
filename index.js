const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const bookRoutes = require("./routes/bookRoute");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
