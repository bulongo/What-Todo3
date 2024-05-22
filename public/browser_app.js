const ul = document.querySelector(".all-tasks")
const dateToday = document.querySelector(".today")
const timeNow = document.querySelector(".time")

const tasks = [
  {
    title: "That one time you started acting like a bitch",
    // completed: false,
    // time: `08:30 - 11:00`
  }, {
    title: "task two"
  }, {
    title: "task three"
  }, {
    title: "task three"
  }, {
    title: "task four"
  }, {
    title: "task five"
  }, {
    title: "task six"
  }, {
    title: "task seven"
  }, {
    title: "task eight"
  }, {
    title: "task nine"
  }
]

const getData = async () => {
  const res = await axios.get("/api/v1/tasks")
  // const data = await res.json()
  showTasks(res.data.tasks)
  // console.log(res.data.tasks)
}

// const allMyData = getData()
getData()
// console.log(allMyData.value)



const getDateTime = () => {
  const day = new Date()
  const today = day.toDateString()
  const hour = day.getHours()
  const minutes = day.getMinutes()
  const time = `${hour}:${minutes}`
  dateToday.innerText = today
  timeNow.innerText = time
  // console.log(time)
}

const interval = setInterval(() => {
  // let interval = getDateTime()
  getDateTime()
  clearInterval(interval)
}, 1000);

const handleClick = (e) => {
  if (e.target.className === "task-closed") {
    e.target.className = "task-open"
    e.target.children[1].className = "span-open"
    e.target.children[2].className = "div-open"
    // console.log(e.target.children)
    // e.target
    // console.log(e.target.children[1])
  } else if (e.target.className === "task-open") {
    e.target.className = "task-closed"
    e.target.children[1].className = "span-closed"
    e.target.children[2].className = "div-closed"
    // e.target
    // console.log(e.target.children[0])
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
    li.addEventListener("click", handleClick)
    li.appendChild(h2)
    li.appendChild(span)
    li.appendChild(div)
    li.appendChild(checkBox)
    ul.appendChild(li)
    // console.log(li.innerText)
  })
  // console.log(ul)
}
