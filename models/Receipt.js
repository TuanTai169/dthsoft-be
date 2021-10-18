const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReceiptSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "bookings",
    },
    paidOut: {
      type: Number,
      required: true,
      default: 0,
    },
    refund: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: "PAID",
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

module.exports = mongoose.model("receipts", ReceiptSchema)
