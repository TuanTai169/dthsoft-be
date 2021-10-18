const router = require("express").Router()
const verifyToken = require("../../middleware/authorization")
const Booking = require("../../models/Booking")
const Receipt = require("../../models/Receipt")
const toolRoom = require("../../tools/roomTool")
const toolReceipt = require("../../tools/receiptTool")

// @route POST api/receipt/
// @decs CREATE RECEIPT / PAYMENT
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { booking, paidOut, refund } = req.body
  const userId = req.userId

  try {
    const bookingItem = await Booking.findById(booking)
    if (!bookingItem)
      return res.status(400).json({
        success: false,
        message: "Booking not found",
      })

    //ALL GOOD
    const newReceipt = new Receipt({
      booking,
      paidOut,
      refund,
      status: "PAID",
      isActive: true,
      createBy: userId,
      updateBy: null,
    })
    await newReceipt.save()

    //Change STATUS ROOM
    await toolRoom.changeStatusArrayRooms(bookingItem.rooms, "CLEANING", userId)

    //Change STATUS RECEIPT
    await toolReceipt.changeStatusBooking(booking, "CHECK OUT", userId)

    res.json({
      success: true,
      message: `Receipt created successfully`,
      receipt: newReceipt,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route POST api/receipt/
// @decs READ ALL RECEIPT / PAYMENT
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const receipts = await Receipt.find({ isActive: true }).populate("booking")
    res.json({
      success: true,
      receipts,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route POST api/receipt/
// @decs READ 1 RECEIPT / PAYMENT
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Receipt.findById(req.params.id).populate("booking")
    res.json({
      success: true,
      booking,
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
