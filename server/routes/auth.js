const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'jgaoac').toString(),
        profilePic: req.body.profile,
    });
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }  
})

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("email not registered!")
        const bytes  = CryptoJS.AES.decrypt(user.password, 'jgaoac');
        var password = bytes.toString(CryptoJS.enc.Utf8);

        if (password !== req.body.password) {
            res.status(401).json("wrong password!")
        } else {
            // not returning password for safety consideration
            const accessToken = jwt.sign({id: user._id}, "jgaoac", { expiresIn: "5d" });
            const { password, ...info } = user._doc
            res.status(200).json({ ...info, accessToken });
        }
        
    } catch (err) {
        res.status(500).json(err);
    } 
})

module.exports = router;