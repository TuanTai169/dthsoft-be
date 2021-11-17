const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../../models/User")
const sendEmail = require("../../utils/mailer")
const verifyToken = require("../../middleware/authorization")
require("dotenv").config()

//@route GET api/auth
//@desc Check if user is logged in
//@success Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password -updatedAt -createdAt")
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal sever error",
    })
  }
})

// @route POST api/auth/login
// @decs Login user
// @access public
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    // Check for existing email
    const user = await User.findOne({ email, isActive: true })
    if (!user)
      return res
        .status(400)
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
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
})

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

    const txt = "Reset your password"

    const message = `
    <div style="max-width: 700px; margin:auto; border: 4px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DTHSOFT</h2>
    <p>Just click the button below to reset your password !</p>
    
    <a href=${resetURL} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${resetURL}</div>
    </div>
`

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
