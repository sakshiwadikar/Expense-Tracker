const express = require("express");
const {protect}= require("../middleware/authMiddleware");
const multer = require("multer");


const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router=express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);


// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), (req, res)=>{
    if (!req.file) {
        return res.status(400).json({message: "No file uploaded"});
    }

    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({imageUrl});


});

module.exports=router;
