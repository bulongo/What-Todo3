// TODOS
// make one task shrink when another one is clicked but avoid shifting content

const ul = document.querySelector(".all-tasks")
const dateToday = document.querySelector(".today")
const timeNow = document.querySelector(".time")
const addTaskBtn = document.querySelector(".add-btn")

const getData = async () => {
  const res = await axios.get("/api/v1/tasks")
  // const data = await res.json()
  showTasks(res.data.tasks)
  // console.log(res.data.tasks)
}

getData()

const getDateTime = () => {
  const day = new Date()
  const today = day.toDateString()
  const hour = day.getHours()
  const minutes = day.getMinutes()
  const time = `${hour}:${minutes}`
  dateToday.innerText = today
  timeNow.innerText = time
}

const interval = setInterval(() => {
  getDateTime()
  clearInterval(interval)
}, 1000);

const handleTaskOpen = (e) => {
  if (e.target.className === "task-closed") {
    e.target.className = "task-open"
    e.target.children[1].className = "span-open"
    e.target.children[2].className = "div-open"
  } else if (e.target.className === "task-open") {
    e.target.className = "task-closed"
    e.target.children[1].className = "span-closed"
    e.target.children[2].className = "div-closed"
  }
}

const handleCheckBoxClick = (e) => {
  if (e.target.className === "checkbox-unselected") {
    e.target.className = "checkbox-selected"
  } else if (e.target.className === "checkbox-selected") {
    e.target.className = "checkbox-unselected"
  }
  console.log(e.target)
}

const showTasks = (data) => {
  data.forEach((task) => {
    //  just remember that each task is a number above itself.
    //  e.g. Task four is actually five in the list of tasks.
    //

    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const span = document.createElement("span")
    const div = document.createElement("div")
    const timeDiv = document.createElement("div")
    const checkBox = document.createElement("span")

    h2.className = "task-heading"
    span.className = "span-closed"
    div.className = "div-closed"
    div.addEventListener("click", handleClick)
    checkBox.className = "checkbox-unselected"
    checkBox.addEventListener("click", handleCheckBoxClick)


    h2.innerText = task.title
    div.innerText = task.description
    li.className = "task-closed"
    li.addEventListener("click", handleTaskOpen)
    li.appendChild(h2)
    li.appendChild(span)
    li.appendChild(div)
    li.appendChild(checkBox)
    ul.appendChild(li)
  })
}

const addNewTask = (e) => {
  console.log(e.target.innerText)
}

addTaskBtn.addEventListener("click",addNewTask)
