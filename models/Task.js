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
  completed: {
    type: Boolean,
    default: false
  },
  targetDate: {
    type: String,
  },
  place: {
    type: String,
  },
  category: {
    type: String,
  }
})

module.exports = mongoose.model("Task", TaskSchema)
