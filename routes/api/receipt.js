const router = require("express").Router()
const moment = require("moment")
const verifyToken = require("../../middleware/authorization")
const Booking = require("../../models/Booking")
const Receipt = require("../../models/Receipt")
const Customer = require("../../models/Customer")
const toolRoom = require("../../tools/roomTool")
const toolReceipt = require("../../tools/receiptTool")
const sendEmail = require("../../utils/mailer")
const { receiptValidation } = require("../../tools/validation")
const _ = require("lodash")

// @route POST api/receipt/
// @decs CREATE RECEIPT / CHECKOUT
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { booking, paidOut, refund, modeOfPayment } = req.body
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
      modeOfPayment,
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

    //Send to customer email
    const customer = await Customer.findById(bookingItem.customer)

    const message = `
            <div style="max-width: 700px; margin:auto; border: 8px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase; color: teal;">Thank to customer</h2>
            <p> Dear <strong> ${customer.name}</strong>!</p>
            <p>Congratulations on your successful payment ! Have a beautiful day! </p>
            <p>Thank you for using our service! See you again on the closest day!</p>
            </div>
          `

    await sendEmail({
      email: customer.email,
      subject: `THANK YOU !`,
      message,
    })

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

// @route GET api/receipt/
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
          {
            path: "services",
            select: "name price",
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
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const booking = await Receipt.findById(req.params.id)
//       .populate({
//         path: "booking",
//         select: "-isActive -createBy -updateBy -createdAt -updatedAt",
//         populate: { path: "customer", select: "name email phone" },
//         populate: [
//           { path: "customer", select: "name email phone" },
//           {
//             path: "rooms",
//             select: "roomNumber floor price roomType status",
//           },
//         ],
//       })
//       .populate({ path: "createBy", select: "name" })
//       .populate({ path: "updateBy", select: "name" })

//     res.json({
//       success: true,
//       booking,
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     })
//   }
// })

// @route PUT api/receipt/
// @decs UPDATE receipt
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

// @route GET api/receipt/
// @decs STATISTIC
// @access Private
router.get("/statistic", verifyToken, async (req, res) => {
  try {
    // RECEIPTS
    const receipts = await Receipt.find({ isActive: true }).populate({
      path: "booking",
      select: " -createdAt -updatedAt",
      populate: [
        { path: "customer", select: "name email phone" },
        {
          path: "rooms",
          select: "roomNumber floor price roomType status",
        },
        {
          path: "services",
          select: "name price",
        },
      ],
    })

    // BOOKING
    const bookings = await Booking.find({ status: "CHECK OUT" })
      .populate({ path: "customer", select: "name email phone" })
      .populate({
        path: "rooms",
        select: "roomNumber floor price roomType status",
      })
      .populate({
        path: "services",
        select: "name price",
      })

    let map_month = []
    let map_day = []
    let map_service = []
    let map_user = []
    let map_room = []
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]

    let totalRevenue = _.sumBy(receipts, (item) => item.booking.totalPrice)

    // Group
    const groupByMonth = _.groupBy(receipts, (instance) => {
      return moment(new Date(instance.booking.checkOutDate)).format("MMM")
    })

    const groupByDay = _.groupBy(receipts, (instance) => {
      return moment(new Date(instance.booking.checkOutDate)).format("dddd")
    })

    // FOREACH
    _.forEach(monthNames, (value) => {
      if (groupByMonth[value] !== undefined) {
        let newItem = { month: value, amount: groupByMonth[value].length }
        map_month.push(newItem)
      }
    })

    _.forEach(dayNames, (value) => {
      if (groupByDay[value] !== undefined) {
        let newItem = { day: value, amount: groupByDay[value].length }
        map_day.push(newItem)
      }
    })

    // USER
    _.forEach(bookings, (item) => {
      let newItem = {
        name: item.customer.name,
        total: item.totalPrice + item.deposit,
      }
      map_user.push(newItem)
    })

    const users = map_user.reduce((acc, item) => {
      let existItem = acc.find(({ name }) => item.name === name)
      if (existItem) {
        existItem.total += item.total
      } else {
        acc.push(item)
      }
      return acc
    }, [])

    // ROOMS
    _.forEach(receipts, (instance) => {
      let rooms = []
      let dayDiff = toolRoom.getNumberOfDays(
        instance.booking.checkInDate,
        instance.booking.checkOutDate
      )
      _.forEach(instance.booking.rooms, (item) => {
        let newRoom = {
          room: item.roomNumber,
          type: item.roomType,
          price: item.price * dayDiff,
        }
        rooms.push(newRoom)
      })
      _.forEach(rooms, (item) => map_room.push(item))
    })

    const rooms = Object.values(
      map_room.reduce((r, { room, price, type }) => {
        if (r[room] !== undefined) {
          r[room].count++
          r[room].totalPrice += price
        } else r[room] = { room, type, count: 1, totalPrice: price }

        return r
      }, {})
    )

    // SERVICE
    _.forEach(receipts, (instance) => {
      let services = []
      _.forEach(instance.booking.services, (item) => {
        let newService = {
          service: item.name,
          price: item.price,
        }
        services.push(newService)
      })
      _.forEach(services, (item) => map_service.push(item))
    })

    const services = Object.values(
      map_service.reduce((r, { service, price }) => {
        if (r[service] !== undefined) {
          r[service].count++
          r[service].totalPrice += price
        } else r[service] = { service, count: 1, totalPrice: price }
        return r
      }, {})
    )

    const statistic = {
      totalRevenue: totalRevenue,
      map_day: map_day,
      map_month: map_month,
      users: users,
      rooms: rooms,
      services: services,
    }

    res.json({
      success: true,
      statistic,
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
