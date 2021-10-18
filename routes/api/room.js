const router = require("express").Router()
const { checkManager, checkAdmin } = require("../../middleware/authentication")
const verifyToken = require("../../middleware/authorization")
const Room = require("../../models/Room")
const { roomValidation } = require("../../validation")

// @route POST api/room/
// @decs CREATE room
// @access Private
router.post("/", verifyToken, checkAdmin, async (req, res) => {
  const { roomNumber, floor, price, roomType, status } = req.body

  //Validation
  const { error } = roomValidation(req.body)
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  try {
    //Check for existing email
    const roomExist = await Room.findOne({ roomNumber })
    if (roomExist)
      return res.status(400).json({
        success: false,
        message: "Room already taken",
      })
    //All good
    const newRoom = new Room({
      roomNumber,
      floor,
      price,
      roomType,
      status,
      createBy: req.userId,
      updateBy: null,
    })

    await newRoom.save()
    res.json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/room/
// @decs READ ALL room
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true })
    res.json({
      success: true,
      rooms,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/room/:floor
// @decs SORT room by floor
// @access Private
router.get("/allByFloor/:floor", verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true, floor: req.params.floor })
    res.json({
      success: true,
      rooms,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route GET api/room/:id
// @decs READ 1 ROOM
// @access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room)
      res.json({
        success: false,
        message: "Room not found",
      })
    res.json({
      success: true,
      room,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/room/
// @decs UPDATE room by ID
// @access Private
router.put("/update/:id", verifyToken, async (req, res) => {
  const { roomNumber, floor, price, roomType, status, isActive } = req.body

  //Validation
  if (!roomNumber || !price)
    return res.status(400).json({
      success: false,
      message: "RoomNumber and price are required",
    })

  try {
    //All good
    let updateRoom = {
      roomNumber: roomNumber,
      floor: floor,
      price: price,
      roomType: roomType,
      status: status,
      isActive: isActive,
      updateBy: req.userId,
    }

    const roomUpdatedCondition = { _id: req.params.id }

    updatedRoom = await Room.findOneAndUpdate(
      roomUpdatedCondition,
      updateRoom,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Room updated successfully",
      updatedRoom,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/room/
// @decs DELETE room
// @access Private
router.put(`/delete/:id`, verifyToken, checkAdmin, async (req, res) => {
  try {
    const roomDeleteCondition = { _id: req.params.id }
    const deleted = { isActive: false, updateBy: req.userId }
    let deletedRoom = await Room.findOneAndUpdate(
      roomDeleteCondition,
      deleted,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Room deleted successfully",
      deletedRoom,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route PUT api/room/
// @decs UPDATE STATUS ROOM
// @access Private
router.put(`/changeStatus/:id`, verifyToken, async (req, res) => {
  const { status } = req.body
  try {
    const roomUpdateCondition = { _id: req.params.id }
    const updated = { status: status, updateBy: req.userId }
    let updatedRoom = await Room.findOneAndUpdate(
      roomUpdateCondition,
      updated,
      {
        new: true,
      }
    )
    res.json({
      success: true,
      message: "Room status updated successfully",
      updatedRoom,
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
