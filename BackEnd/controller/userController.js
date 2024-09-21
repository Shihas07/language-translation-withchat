const User = require("../model/user");
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
require('dotenv').config();
const Message = require('../model/message');


const signup = async (req, res) => {
  const { email, phone, name, password } = req.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user instance
    const newUser = new User({
      email,
      phone,
      name,
      password:hashedPassword, // Consider hashing the password before saving
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    console.log(savedUser);
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is blocked
    if (user.isBlocked === true) {
      return res.status(400).json({ message: "User is blocked, contact admin" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a single JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration, adjust as needed
    });

    // Set the token in a cookie (httpOnly, secure in production)
    res.cookie("token", token, {
               // Strict policy to prevent CSRF
      maxAge: 60 * 60 * 1000,      // 1 hour expiry time for the cookie
    });

     const data={
        id:user._id,
        name:user.name
     }

    // Send a success message without the token in the response body (since it's in the cookie)
    res.status(200).json({
      message: "Login successful",data
       
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const logout = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(req.body);

    // Find the user by the provided ID
    const existingUser = await User.findById(id);
    
    // Check if the user exists
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    // console.log("User ID:", id);

    // Clear the cookie, assuming the cookie name is 'token' or similar
    res.clearCookie('token');

    res.status(200).json({ message: "Logout successful, cookie cleared" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error logging out", error });
  }
};

// Adjust the path to your User model

const profile = async (req, res) => {
  try {
    const { userId, language, rating } = req.body;
    
    console.log(req.body);

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's language and rating
    user.language = language;
    user.rating = rating;

    // Save the updated user information
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};


 
const search = async (req, res) => {
  try {
    // Extract the language from the request body
    const { language } = req.body.language;
    
    // Validate that the language is provided
    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }
    
    // Find users with the specified language
    const users = await User.find({ language });

    console.log("Users found:", users);

    // Return the found users as a response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({ message: "Error finding users", error });
  }
};

const fetchMessage = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    // Fetch receiver details
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    
    const receiverName = receiver.name; // Assuming 'name' is the field in User schema

    // Query the database for messages between sender and receiver
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sort by the created timestamp

    // Send the messages along with the receiver's name
    res.status(200).json({ messages, receiverName });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};






 
module.exports = { signup,login,logout,profile,search ,fetchMessage};
