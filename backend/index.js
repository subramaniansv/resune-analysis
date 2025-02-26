const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/Database.js");
const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDb();

app.use(express.json());
app.use(cors(
  {origin:"http://localhost:5173",
    credentials:true,
  }
));

// API Endpoint
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running successfully!" });
  });
app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
