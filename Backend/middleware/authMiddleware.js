const jwt= require("jsonwebtoken");
const User= require("../models/User");

// exports.protect= async (req, res, next)=>{

//     console.log("AUTH HEADER:", req.headers.authorization);

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     }


//     // let token= req.headers.authorization?.split(" ")[1];
//     if(!token){
//         return res.status(401).json({message: "Not authorized, no token"});
//     }

//     try{
//         const decoded=jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select("-password");
//         next();
//     } catch (e){
//         res.status(401).json({message: "Not authorized, token failed", error: e.message});
// }
// };

exports.protect = async (req, res, next) => {
    console.log("STEP 1 - Start");

    try {
        const authHeader = req.headers.authorization;
        console.log("HEADER:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];
        console.log("STEP 2 - Token:", token);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("STEP 3 - Decoded:", decoded);
        } catch (err) {
            console.log("JWT ERROR:", err.message);
            return res.status(401).json({ message: "Invalid token" });
        }

        // 🔥 THIS IS WHERE CRASH USUALLY HAPPENS
        const user = await User.findById(decoded.id);
        console.log("STEP 4 - User:", user);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        console.log("STEP 5 - Success");
        next();

    } catch (err) {
        console.log("🔥 FINAL ERROR:", err);
        return res.status(500).json({
            message: "Server crashed",
            error: err.message
        });
    }
};