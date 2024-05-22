const mongoose = require("mongoose")
// const password = encodeURIComponent("newPassword")

const connectDB = (url) => {
  return mongoose
    .connect(url)
}

module.exports = connectDB

