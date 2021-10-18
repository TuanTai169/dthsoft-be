const router = require("express").Router()
const key = require("../config/key")
const { apiURL } = key.app
const api = `/${apiURL}`

// IMPORT ROUTE
const roomRouter = require("./api/room")
const authRouter = require("./api/auth")
const userRouter = require("./api/user")
const customerRouter = require("./api/customer")
const serviceRouter = require("./api/service")
const bookingRouter = require("./api/booking")
const receiptRouter = require("./api/receipt")

//API ROUTES
router.use(`${api}/auth`, authRouter)
router.use(`${api}/user`, userRouter)
router.use(`${api}/customer`, customerRouter)
router.use(`${api}/room`, roomRouter)
router.use(`${api}/service`, serviceRouter)
router.use(`${api}/booking`, bookingRouter)
router.use(`${api}/receipt`, receiptRouter)
router.use(api, (req, res) =>
  res.status(404).json({
    success: false,
    message: "No API route found",
  })
)

module.exports = router
