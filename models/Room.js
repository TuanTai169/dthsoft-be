const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      enum: ["SINGLE", "DOUBLE", "DELUXE"],
      default: "DOUBLE",
    },
    status: {
      type: String,
      enum: ["READY", "OCCUPIED", "CLEANING", "FIXING", "BOOKING"],
      default: "READY",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    updateBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("rooms", RoomSchema)
