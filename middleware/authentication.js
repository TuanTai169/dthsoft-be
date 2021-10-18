const User = require("../models/User")

// ADMIN
const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (user.roles === "EMPLOYEE" || user.roles === "MANAGER")
      return res.status(200).json({
        success: false,
        message: "You are not allowed to make this request",
      })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

//MANAGER
const checkManager = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (user.roles === "EMPLOYEE")
      return res.status(200).json({
        success: false,
        message: "User permission",
      })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
module.exports.checkAdmin = checkAdmin
module.exports.checkManager = checkManager
