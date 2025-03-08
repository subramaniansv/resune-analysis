const express = require("express");
const { registerUser,loginUser,googleAuth, googleAuthCallback,uploadResume,fetchJobs,searchJobs,fetchSkill,fetchUser } = require("../controllers/userController.js");
const authUser = require('../middleware/authUser.js')


const upload = require("../config/multer.js");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/google", googleAuth);
userRouter.get("/google/callback", googleAuthCallback);
userRouter.post("/upload",authUser,upload.single("file"),uploadResume)
userRouter.post("/get-jobs",authUser,fetchJobs)
userRouter.get("/search-jobs",searchJobs)
userRouter.post("/profile/:id/skills",fetchSkill)
userRouter.get("/profile/:id",fetchUser)
module.exports = userRouter;
