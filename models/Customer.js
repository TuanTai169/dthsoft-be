const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    cmnd: {
      type: String,
      min: 12,
      unique: true,
    },
    gender: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    note: {
      type: String,
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

module.exports = mongoose.model("customers", CustomerSchema)
