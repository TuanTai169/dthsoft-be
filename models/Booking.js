const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BookingSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "rooms",
      },
    ],
    checkInDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkOutDate: {
      type: Date,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "services",
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    deposit: {
      type: Number,
      default: 0,
    },
    roomCharge: {
      type: Number,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    VAT: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["BOOKING", "CHECK IN", "CHECK OUT", "CANCELLED"],
      default: "BOOKING",
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    updateBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("bookings", BookingSchema)
