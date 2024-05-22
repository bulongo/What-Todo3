const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")

const createTask = asyncWrapper(async (req, res) => {
  // console.log(res)
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find()
  res.status(201).json({ tasks, amount: tasks.length })
})

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return res.status(404).send(`No task with that ID has been found`)
  }
  res.status(201).json({ task })
})

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  })
  res.status(201).json({ task })
})


const updateTask = asyncWrapper(async (req, res) => {
  // res.json({ id: req.params.id })
  // console.log(req.body)
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `The task with id ${taskID} has been deleted.` })
  }
  res.status(201).json({ task })
})


module.exports = { createTask, getTasks, getSingleTask, editTask, deleteTask }
