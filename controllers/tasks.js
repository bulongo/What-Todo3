const asyncWrapper = require("../middleware/async")

const createTask = asyncWrapper((req,res) => {
  res.send(`Let us now edit this file`)
})


const getTasks = asyncWrapper((req,res) => {
  res.send(`We are getting all routes right now`)
})

const getSingleTask = asyncWrapper((req,res) => {
  res.send(`You have gotten one task`)
})

const editTask = asyncWrapper((req,res) => {
  res.send(`Let us now edit this file`)
})

const deleteTask = asyncWrapper((req,res) => {
  res.send(`Let us now edit this file`)
})


module.exports = { createTask,getTasks,getSingleTask,editTask,deleteTask }
