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
    default: "complete"
  },
  targetDate: {
    type: Date,
    // add the ability a user to type today in input and then it gets the days date.
    // a nice little easter egg
    default: new Date(),
  },
  place: {
    type: String,
  },
  category: {
    type: String,
  }
})

module.exports = mongoose.model("Task", TaskSchema)
