const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  dayTaskCreated: {
    type: String,
    default: new Date().toDateString()
  },
  title: {
    type: String,
    required: [true, "Task requires a title."],
    trim: true,
    // maxlength: [30, "Title should only be 30 letters long."]
  },
  state: {
    type: String,
    // other states include pending and complete.
    default: "incomplete"
  },
  targetDate: {
    type: Date,
    default: new Date().toDateString(),
  },
  place: {
    type: String,
  },
  category: {
    type: String,
  }
})

module.exports = mongoose.model("Task", TaskSchema)
