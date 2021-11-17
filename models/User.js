const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgd99lsii/image/upload/v1637135199/avatar/male_avatar_bvpfgh.png",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: String,
      enum: ["EMPLOYEE", "MANAGER", "ADMIN"],
      default: "EMPLOYEE",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
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

module.exports = mongoose.model("users", UserSchema)
