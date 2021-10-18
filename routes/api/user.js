const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const { userValidation } = require("../../validation")
const { checkAdmin, checkManager } = require("../../middleware/authentication")
const verifyToken = require("../../middleware/authorization")
require("dotenv").config()

// @route GET api/user/
// @decs READ all user
// @access Private
router.get("/", verifyToken, checkManager, async (req, res) => {
  try {
    const users = await User.find({ isActive: true }, "-password")
    res.json({
      success: true,
      users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/user/
// @decs READ a user
// @access Private
router.get("/:id", verifyToken, checkManager, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password")
    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})
// @route POST api/user/
// @decs CREATE user
// @access Private
router.post("/", verifyToken, checkManager, async (req, res) => {
  const { name, email, password, phone, address, image, roles } = req.body

  //Validation
  const { error } = userValidation(req.body)
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    //Check for existing email
    const emailExist = await User.findOne({ email })
    if (emailExist)
      return res.status(400).json({
        success: false,
        message: "Email already taken",
      })
    //All good
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      address: address || "",
      image: image || "",
      roles: roles || "EMPLOYEE",
      createBy: req.userId,
      updateBy: null,
    })
    await newUser.save()

    //Return Token JWT
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    )
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
      user: newUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/user/
// @decs UPDATE user
// @access Private
router.put(`/update/:id`, verifyToken, checkManager, async (req, res) => {
  const { name, email, phone, address, image, isActive, roles } = req.body

  //Simple Validation
  if (!name || !email)
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    })

  try {
    let updateUser = {
      name: name,
      email: email,
      phone: phone || "",
      address: address || "",
      image: image || "",
      isActive: isActive,
      roles: roles || "EMPLOYEE",
      updateBy: req.userId,
    }

    const userUpdateCondition = { _id: req.params.id }

    updatedUser = await User.findOneAndUpdate(userUpdateCondition, updateUser, {
      new: true,
    })

    res.json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route DELETE api/user/
// @decs delete user
// @access Private
router.put(`/delete/:id`, verifyToken, checkAdmin, async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id }
    const deleted = { isActive: false, updateBy: req.userId }
    let deletedUser = await User.findOneAndUpdate(
      userDeleteCondition,
      deleted,
      {
        new: true,
      }
    )

    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

module.exports = router
