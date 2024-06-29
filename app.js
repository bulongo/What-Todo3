// TODO
// Need to load the app even if it does not connect to mongo but
// it should check for connectivity and connect to mongo and should check for updates

const express = require("express")
const app = express()
const connectDB = require("./db/connect")
require("dotenv").config()
const tasks = require("./routes/tasks")
const port = 3001

app.use(express.json())
app.use(express.static("./public/"))
app.use(express.static("./public/images"))

app.use("/api/v1/tasks", tasks)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, (req, res) => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
