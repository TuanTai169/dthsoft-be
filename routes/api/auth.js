const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../../models/User")
const sendEmail = require("../../utils/mailer")

require("dotenv").config()

// @route POST api/auth/register
// @decs Register user
// @access public
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body

//   //Simple validation
//   if (!name || !email || !password)
//     return res.status(400).json({
//       success: false,
//       message: "Please fill all mandatory fields",
//     })
//   try {
//     //Check for existing email
//     const user = await User.findOne({ email })
//     if (user)
//       return res.status(400).json({
//         success: false,
//         message: "Email already taken",
//       })

//     //All good
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     })
//     await newUser.save()
//     //Return Token JWT
//     const accessToken = jwt.sign(
//       { userId: newUser._id },
//       process.env.ACCESS_TOKEN_SECRET
//     )
//     res.json({
//       success: true,
//       message: "User created successfully",
//       accessToken,
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     })
//   }
// })

// @route POST api/auth/login
// @decs Login user
// @access public
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    // Check for existing email
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(409)
        .json({ success: false, message: "Incorrect email or password" })

    // Email found
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" })

    //All good
    //Return Token JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.roles,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
})

// // @route POST api/auth
// // @decs Forgot Password
// // @access public
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body
  try {
    // Check for existing email
    const user = await User.findOne({ email })
    if (!user)
      return res.status(404).json({
        success: false,
        message:
          "Your request could not be processed as entered. Please try again.",
      })

    // Generate the random reset token
    const buffer = crypto.randomBytes(48)
    const resetToken = buffer.toString("hex")

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000

    user.save(async (err) => {
      if (err)
        return res.status(400).json({
          success: false,
          message: "Your request could not be processed. Please try again.",
        })
    })

    // Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`

    const message =
      `${
        "You are receiving this because you have requested to reset your password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n"
      }${resetURL}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`

    await sendEmail({
      email: user.email,
      subject: `YOUR PASSWORD RESET TOKEN (valid for 10 min)`,
      message,
    })

    res.json({
      success: true,
      message: "Please check your email for the link to reset your password.",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
})

// // @route POST api/auth
// // @decs Reset Password
// // @access public
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body
  const token = req.params.token

  // Validate simple
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "You must enter a password." })
  }
  try {
    const resetUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!resetUser)
      return res.status(400).json({
        success: false,
        message:
          "Your token has expired. Please attempt to reset your password again.",
      })

    // ALL GOOD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    resetUser.password = hashedPassword
    resetUser.resetPasswordToken = ""
    resetUser.resetPasswordExpires = null

    await resetUser.save()

    res.json({
      success: true,
      message:
        "Password changed successfully. Please login with your new password.",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
})
module.exports = router
