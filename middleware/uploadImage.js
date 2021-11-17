const fs = require("fs")

const uploadImage = async function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No files were uploaded." })

    const file = req.files.file

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res
        .status(400)
        .json({ success: false, message: "Size too large." })
    } // 1mb

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath)
      return res
        .status(400)
        .json({ success: false, message: "File format is incorrect." })
    }

    next()
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

module.exports = uploadImage
