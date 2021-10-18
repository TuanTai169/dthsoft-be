const mongoose = require("mongoose")
const Schema = mongoose.Schema

const WishlistSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "rooms",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("wishlists", WishlistSchema)
