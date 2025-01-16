import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middelware/sendmail.js";

// New User Registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Email Already Exists" });
        }

        // Convert raw password to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(Math.random() * 10000);

        // Create New User data
        user = new User({ name, email, password: hashedPassword, contact });

        // Save the user
        await user.save();

        // Create signed Activation token
        const activationToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });

        // Send Email
        const message = `Please verify your account using this OTP: ${otp}`;
        await sendMail(email, "Welcome to PICKNOW", message);

        return res.status(200).json({
            message: "OTP sent to your email",
            activationToken,
        });
    } catch (error) {
        console.error("Error during user registration:", error); // Improved error logging
        return res.status(500).json({ message: error.message });
    }
};

//verify OTP
export const verifyUser=async(req, res)=>{
    try{
        const {otp, activationToken}=req.body;
        const verify=jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
        if(!verify){
            return res.json({message:"OTP Expired",});
        }
        if(verify.otp !== otp){
            return res.json({message: "Wrong OTP",});
        }

        await user.creat({name:verify.user.name,email: verify.user.email,password: verify.user.hashpassword,contact: verify.user.contact,});
        return res.status(200).jason({message: "User Registration Success",});
    } catch(error){
        return res.status(500).json({
            message: error.message,
        });

    }
};

//Login User
export const loginUser = async (req, res) =>{
    try {
        const {email, password } = req.body;
        
        //Check user email address
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalide Credentials",
            });
        }

//Check password
const matchPassword=await bcrypt.compare(password,user.password);
if(!matchPassword){
    return res.status(400).json({
        message: "Invalide Credentials",
    });
}

//Generate signed token
const token=jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"15d"});

//Exclude the password field before sending the response
const{password: userPassword, ...userDetails }=user.toObject();
return res.status(200).json({message: `Welcome ${user.name}`,token , user: userDetails,});
    } catch (error) {
        return res.status(500).json({message: error.message,});
    }
};

//User Profile
export const myProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

//User Change password
export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
        
        return res.status(200).json({
            message: "Password changed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Add the updateUser function
export const updateUser = async (req, res) => {
    try {
        const { name, email, contact } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, email, contact }, { new: true });
        
        return res.status(200).json({
            message: "User details updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};