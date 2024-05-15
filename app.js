const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const port = 3000


app.use(express.static("./public/"))

app.use("/api/v1/tasks", tasks)

app.listen(port, (req, res) => {
  console.log(`Server listening at port ${port}`)
})
