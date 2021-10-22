const router = require("express").Router()
const verifyToken = require("../../middleware/authorization")
const Booking = require("../../models/Booking")
const Receipt = require("../../models/Receipt")
const toolRoom = require("../../tools/roomTool")
const toolReceipt = require("../../tools/receiptTool")
const { receiptValidation } = require("../../tools/validation")

// @route POST api/receipt/
// @decs CREATE RECEIPT / PAYMENT
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { booking, paidOut, refund } = req.body
  const userId = req.userId

  //Validation
  const { error } = receiptValidation(req.body)
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    const bookingItem = await Booking.findById(booking)
    if (!bookingItem)
      return res.status(400).json({
        success: false,
        message: "Booking not found",
      })

    // Check for existing receipt
    const receiptExist = await Receipt.findOne({ booking })
    if (receiptExist)
      return res.status(400).json({
        success: false,
        message: "Receipt already taken",
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
    const receipts = await Receipt.find({ isActive: true })
      .populate({
        path: "booking",
        select: "-isActive -createBy -updateBy -createdAt -updatedAt",
        populate: [
          { path: "customer", select: "name email phone" },
          {
            path: "rooms",
            select: "roomNumber floor price roomType status",
          },
        ],
      })
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
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
    const booking = await Receipt.findById(req.params.id)
      .populate({
        path: "booking",
        select: "-isActive -createBy -updateBy -createdAt -updatedAt",
        populate: [
          { path: "customer", select: "name email phone" },
          {
            path: "rooms",
            select: "roomNumber floor price roomType status",
          },
        ],
      })
      .populate({ path: "createBy", select: "name" })
      .populate({ path: "updateBy", select: "name" })
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

// @route PUT api/booking/
// @decs UPDATE booking
// @access Private
router.put(`/update/:id`, verifyToken, async (req, res) => {
  const { booking, paidOut, refund } = req.body
  const userId = req.userId

  try {
    // All good
    let updateReceipt = {
      booking,
      paidOut,
      refund,
      status: "PAID",
      updateBy: userId,
    }

    const receiptUpdateCondition = { _id: req.params.id }

    let updatedReceipt = await Receipt.findByIdAndUpdate(
      receiptUpdateCondition,
      updateReceipt,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Receipt updated successfully",
      updatedReceipt,
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
