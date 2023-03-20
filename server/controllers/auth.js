import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { password, ...data } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      password: passwordHash,
      ...data,
    });

    const existingUserName = await User.findOne({ username: data.username });
    if (existingUserName) return res.status(401).json("Username already exist");

    const existingUserMail = await User.findOne({ email: data.email });
    if (existingUserMail) return res.status(401).json("Email already exist");

    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({
      picturePath: user.picturePath,
      username: user.username,
      city: user.city,
      location: user.location,
      token: token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User is not found");
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_LOGIN,
      to: user.email,
      subject: "Reset password",
      html: `
        <p>To reset your password, follow the link:</p>
        <a href="http://localhost:3000/reset-password/${resetToken}">reset password</a>
        <p>Link is valid for one hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json("Password reset link has been sent to your email");
  } catch (error) {
    res.status(500).json("Unknown error");
  }
};

export const resetPass = async (req, res) => {
  const { password, token } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json("Password reset link is invalid or has expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json("Password changed successfully");
  } catch (error) {
    res.status(500).json("Unknown error");
  }
};
