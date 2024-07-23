const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const secretKey = 'HiteshBho$@le';  // Secret key to generate token for verification

// Route 1:  Hit on the post endpoint /api/auth/createuser to create a user(No login required)

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password length should be minimum 6 characters').isLength({ min: 6 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    let success = false;
    // console.log(req.body);
    const errors = validationResult(req);
    // Checks whether the error is there or not
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }

    try {
        // Check whether the user with the entered email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success:success,error: "Sorry the user with this email already exist !!" });
        }

        // Create the hash of the password using bcryptjs and adding salt to the password for more security
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Signs the user data to authenticate the original user
        const data = {
            userinfo: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, secretKey);
        res.json({ success:true,message: `Welcome, ${user.name}`,authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }

});


// Route 2: Hit on the post endpoint /api/auth/login to login (No login required)
router.post('/login', [
    body('password', 'Password field cannot be empty').exists(),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    let success = false;
    // console.log(req.body);
    const errors = validationResult(req);
    // Checks whether the error is there or not
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }

    // Destructing the entered credentials
    const {email,password}=req.body; 
    try {
        // Check whether the user with the entered email exists
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success:success, error: "Please! Enter the valid login Credentials" });
        }

        // Comparing with the password stored in the database
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success:success, error: "Please! Enter the valid login Credentials" });
        }

        // Signs the user data to authenticate the original user
        const data = {
            userinfo: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, secretKey);
        res.json({success:true, message: `Welcome, ${user.name}`, authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }

});


// Route 3: Hit on the post endpoint /api/auth/getuser to get the user information(login required)
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId=req.info.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error Occurred");
    }

});

module.exports = router;