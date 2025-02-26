const express = require("express");
const { registerUser,loginUser,uploadResume,fetchJobs } = require("../controllers/userController.js");
const authUser = require('../middleware/authUser.js')


const upload = require("../config/multer.js");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/upload",authUser,upload.single("file"),uploadResume)
userRouter.post("/get-jobs",authUser,fetchJobs)
module.exports = userRouter;
