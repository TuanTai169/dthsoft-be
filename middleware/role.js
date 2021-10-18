const User = require("../models/User")

const ROLES = {
  Admin: "ADMIN",
  Manager: "MANAGER",
  Employee: "EMPLOYEE",
}

const checkRole =
  (...roles) =>
  async (req, res, next) => {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        })
      }
      const hasRole = roles.find((role) => user.roles === role)

      if (!hasRole) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to make this request.",
        })
      }
      return next()
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  }

const role = { ROLES, checkRole }
module.exports = role
