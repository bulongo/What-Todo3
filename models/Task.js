const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task requires a title."],
    trim: true,
    maxlength: [30, "Title should only be 30 letters long."]
  },
  completed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model("Task", TaskSchema)
