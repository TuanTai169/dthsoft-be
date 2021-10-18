const router = require("express").Router()
const Booking = require("../../models/Booking")
const verifyToken = require("../../middleware/authorization")
const toolRoom = require("../../tools/roomTool")
const toolService = require("../../tools/serviceTool")

// @route POST api/booking/
// @decs CREATE BOOKING/CHECK-IN
// @access Private
router.post("/:book", verifyToken, async (req, res) => {
  const {
    rooms,
    customer,
    checkInDate,
    checkOutDate,
    services,
    deposit,
    discount,
  } = req.body

  const userId = req.userId
  try {
    // Check status room
    const checkStatus = await toolRoom.checkStatusRoom(rooms)
    if (checkStatus === false)
      return res.status(400).json({
        success: false,
        message: "Room has been booked or occupied",
      })

    //Generate code
    const code = "DTH" + Date.now().toString()

    //Calculate diffInDays
    const diffInDays = toolRoom.getNumberOfDays(checkInDate, checkOutDate)

    // //Calculate room's price
    const roomCharge = await toolRoom.calculateRoomCharge(rooms)
    const totalRoomCharge = roomCharge * diffInDays
    // //Calculate service's price
    const serviceCharge = await toolService.calculateServiceCharge(services)

    //Change status
    let status = req.params.book === "check-in" ? "CHECK IN" : "BOOKING"

    //Price
    const VAT = 10
    const totalPrice = (
      (totalRoomCharge + serviceCharge) *
      (1 + VAT / 100)
    ).toFixed()

    const newBooking = new Booking({
      code,
      rooms,
      customer,
      checkInDate,
      checkOutDate,
      roomCharge: totalRoomCharge,
      services,
      serviceCharge: serviceCharge,
      deposit,
      discount,
      VAT,
      totalPrice,
      status,
      isActive: true,
      createBy: userId,
      updateBy: null,
    })
    await newBooking.save()

    //Change STATUS ROOM
    const statusOfRoom = status === "BOOKING" ? "BOOKING" : "OCCUPIED"
    await toolRoom.changeStatusArrayRooms(rooms, statusOfRoom, userId)

    res.json({
      success: true,
      message: `${status} successfully`,
      booking: newBooking,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/booking/
// @decs READ ALL BOOKING/CHECK-IN
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ isActive: true })
      .populate("customer")
      .populate("rooms")
    res.json({
      success: true,
      bookings,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/booking/
// @decs READ 1 BOOKING/CHECK-IN
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
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
  const {
    rooms,
    customer,
    checkInDate,
    checkOutDate,
    services,
    deposit,
    discount,
    status,
  } = req.body

  const userId = req.userId
  try {
    //Calculate diffInDays
    const diffInDays = toolRoom.getNumberOfDays(checkInDate, checkOutDate)

    // //Calculate room's price
    const roomCharge = await toolRoom.calculateRoomCharge(rooms)
    const totalRoomCharge = roomCharge * diffInDays

    // //Calculate service's price
    const serviceCharge = await toolService.calculateServiceCharge(services)

    //Price
    const VAT = 10
    const totalPrice = (
      (totalRoomCharge + serviceCharge) *
      (1 + VAT / 100)
    ).toFixed()

    //All good
    let updateBooking = {
      rooms,
      customer,
      checkInDate,
      checkOutDate,
      roomCharge: totalRoomCharge,
      services,
      serviceCharge: serviceCharge,
      deposit,
      discount,
      VAT,
      totalPrice,
      status,
      updateBy: userId,
    }

    const bookingUpdateCondition = { _id: req.params.id }

    let updatedBooking = await Booking.findOneAndUpdate(
      bookingUpdateCondition,
      updateBooking,
      {
        new: true,
      }
    )
    //Change STATUS ROOM
    await toolRoom.changeStatusArrayRooms(rooms, status, userId)

    res.json({
      success: true,
      message: "Booking updated successfully",
      updatedBooking,
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
// @decs DELETE booking
// @access Private
router.put(`/delete/:id`, verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const bookingID = req.params.id
    const booking = await Booking.findById(bookingID)

    const bookingDeleteCondition = { _id: bookingID }

    const deleted = {
      isActive: false,
      updateBy: userId,
      status: "CANCELLED",
    }

    let deletedBooking = await Booking.findOneAndUpdate(
      bookingDeleteCondition,
      deleted,
      {
        new: true,
      }
    )

    //Change STATUS ROOM
    await toolRoom.changeStatusArrayRooms(booking.rooms, "READY", userId)

    res.json({
      success: true,
      message: "Booking deleted successfully",
      deletedBooking,
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
// @decs CHANGE ROOM
// @access Private
router.put(
  `/change-room/:bookingID/:roomChooseID/:roomChangeID`,
  verifyToken,
  async (req, res) => {
    const userId = req.userId
    const bookingID = req.params.bookingID
    const roomChooseID = req.params.roomChooseID
    const roomChangeID = req.params.roomChangeID

    try {
      const booking = await Booking.findById(bookingID)
      const serviceCharge = booking.serviceCharge
      const checkInDate = booking.checkInDate
      const checkOutDate = booking.checkOutDate
      const newRooms = toolRoom.changeRoom(
        booking.rooms,
        roomChooseID,
        roomChangeID
      )

      //Calculate diffInDays
      const diffInDays = toolRoom.getNumberOfDays(checkInDate, checkOutDate)

      //Calculate room's price
      const roomCharge = await toolRoom.calculateRoomCharge(newRooms)
      const totalRoomCharge = roomCharge * diffInDays

      //Price
      const VAT = 10
      const totalPrice = (
        (totalRoomCharge + serviceCharge) *
        (1 + VAT / 100)
      ).toFixed(0)

      //UPDATE
      const bookingUpdateCondition = { _id: bookingID }

      let updateBooking = {
        rooms: newRooms,
        roomCharge: totalRoomCharge,
        totalPrice,
        updateBy: userId,
      }
      let updatedBooking = await Booking.findOneAndUpdate(
        bookingUpdateCondition,
        updateBooking,
        {
          new: true,
        }
      )
      //Change STATUS room
      await toolRoom.changeStatusArrayRooms(newRooms, "OCCUPIED", userId)
      await toolRoom.changeStatusOneRoom(roomChooseID, "READY", userId)
      res.json({
        success: true,
        message: "Booking updated successfully",
        updatedBooking,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  }
)

module.exports = router
