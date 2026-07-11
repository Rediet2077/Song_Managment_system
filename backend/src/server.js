const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/user.routes");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Song Management API is running");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const pool = require("./config/database");
pool.query("SELECT NOW()")
.then(result=>{
    console.log(result.rows);
})
.catch(error=>{
    console.log(error);
});