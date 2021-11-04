const Room = require("../models/Room")
const _ = require("lodash")
exports.changeStatusArrayRooms = async (rooms, status, userId) => {
  try {
    for (const room of rooms) {
      const filter = { _id: room }
      const update = { status: status, updateBy: userId }
      updatedRoom = await Room.findByIdAndUpdate(filter, update, {
        new: true,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
exports.changeStatusOneRoom = async (room, status, userId) => {
  try {
    const filter = { _id: room }
    const update = { status: status, updateBy: userId }
    updatedRoom = await Room.findByIdAndUpdate(filter, update, {
      new: true,
    })
    return updatedRoom
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
exports.calculateRoomCharge = async (rooms) => {
  const listRoom = await getAllInfoRoom(rooms)
  return _.sumBy(listRoom, (item) => item.price)
}

exports.checkStatusRoom = async (rooms) => {
  let check = true
  const listRoom = await getAllInfoRoom(rooms)
  for (const room of listRoom) {
    if (room.status === "BOOKING" || room.status === "OCCUPIED") check = false
  }
  return check
}

exports.changeRoom = (rooms, roomChooseID, roomChangeID) => {
  const index = rooms.findIndex((item) => (item = roomChooseID))
  rooms[index] = roomChangeID
  return rooms
}

exports.getNumberOfDays = (start, end) => {
  const date1 = new Date(start)
  const date2 = new Date(end)

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime()

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}

const getAllInfoRoom = async (rooms) => {
  const promise = rooms.map((room) => {
    return Room.findById(room)
  })
  return await Promise.all(promise)
}
