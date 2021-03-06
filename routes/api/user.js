const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary")
const fs = require("fs")
const User = require("../../models/User")
const { userValidation } = require("../../tools/validation")
const { checkAdmin, checkManager } = require("../../middleware/authentication")
const verifyToken = require("../../middleware/authorization")
const uploadImage = require("../../middleware/uploadImage")
require("dotenv").config()
const _ = require("lodash")

// @route GET api/user/
// @decs READ all user
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({ isActive: true }, "-password")
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    res.json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/user/
// @decs READ a user
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password")
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
    res.json({
      success: true,
      user,
    })
  } catch (error) {
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
  const { name, email, password, phone, address, roles } = req.body

  //Validation
  const { error } = userValidation(req.body)
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    //Check for existing email
    const emailExist = await User.findOne({ email, isActive: true })
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
      roles: roles || "EMPLOYEE",
      createBy: req.userId,
      updateBy: null,
      resetPasswordToken: "",
      resetPasswordExpires: null,
    })
    await newUser.save()

    // //Return Token JWT
    // const accessToken = jwt.sign(
    //   { userId: newUser._id },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES_IN }
    // )
    res.json({
      success: true,
      message: "User created successfully",
      newUser: newUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/user/
// @decs UPDATE PROFILE
// @access Private
router.put(`/update-profile/:id`, verifyToken, async (req, res) => {
  const { name, phone, address } = req.body

  //Simple Validation
  if (!name)
    return res.status(400).json({
      success: false,
      message: "Name are required",
    })

  try {
    let updateUser = {
      name: name,
      phone: phone,
      address: address,
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

// @route PUT api/user/
// @decs CHANGE PASSWORD
// @access Private
router.put(`/change-password/:id`, verifyToken, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body

  const userId = req.params.id

  try {
    const user = await User.findById(userId)
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found !" })

    const passwordValid = await bcrypt.compare(oldPassword, user.password)
    if (!passwordValid)
      return res.status(400).json({
        success: false,
        message:
          "Incorrect old password ! Please check configuration parameters !",
      })

    if (_.size(newPassword) < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      })

    if (_.isEqual(newPassword, confirmPassword) === false)
      return res.status(400).json({
        success: false,
        message: "Password did not match",
      })

    //All good
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    let updateUser = {
      password: hashedPassword,
    }

    const userUpdateCondition = { _id: userId }

    updatedUser = await User.findOneAndUpdate(userUpdateCondition, updateUser, {
      new: true,
    })

    res.json({
      success: true,
      message: "Password changed successfully.",
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

// @route PUT api/user/
// @decs UPDATE user
// @access Private
router.put(`/update/:id`, verifyToken, checkManager, async (req, res) => {
  const { name, email, phone, address, image, roles } = req.body

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
      image:
        image ||
        "https://res.cloudinary.com/dgd99lsii/image/upload/v1637135199/avatar/male_avatar_bvpfgh.png",
      roles: roles,
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route DELETE api/user/
// @decs delete user
// @access Private
router.put(`/delete/:id`, verifyToken, checkManager, async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// // @route UPDATE api/user/
// // @decs change ROLES
// // @access Private
// router.put(`/change-role/:id`, verifyToken, checkAdmin, async (req, res) => {
//   const { role } = req.body
//   try {
//     const userUpdateCondition = { _id: req.params.id }
//     const updated = { roles: role, updateBy: req.userId }
//     let updatedUser = await User.findOneAndUpdate(
//       userUpdateCondition,
//       updated,
//       {
//         new: true,
//       }
//     )
//     res.json({
//       success: true,
//       message: "User updated successfully",
//       updatedUser,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     })
//   }
// })

// @route UPDATE api/user/
// @decs UPDATE FILE AVATAR
// @access Private

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

router.post(
  `/upload-avatar/:id`,
  uploadImage,
  verifyToken,
  async (req, res) => {
    try {
      const file = req.files.file

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err

          removeTmp(file.tempFilePath)

          const pathImage = result.secure_url
          const userUpdateCondition = { _id: req.params.id }
          const updated = { image: pathImage, updateBy: req.userId }
          await User.findOneAndUpdate(userUpdateCondition, updated, {
            new: true,
          })
          res.json({
            success: true,
            message: "Upload file successfully !",
            url: pathImage,
          })
        }
      )
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  }
)

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}
module.exports = router
