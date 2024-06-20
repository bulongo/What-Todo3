// TODOS
// make one task shrink when another one is clicked but avoid shifting content
// start working on the add task button and pop up
// make the app such that even if it isn't able to connect to the mongodb server
// so that it still has the other last saved tasks in local storage


const ul = document.querySelector(".all-tasks")
const dateToday = document.querySelector(".today")
const timeNow = document.querySelector(".time")
const addTaskBtn = document.querySelector(".add-task-btn")
const addTaskForm = document.querySelector(".add-task-form_inactive")
const taskTitleInput = document.querySelector(".title-input")
const addTaskIcon = document.querySelector(".add-task-icon_inactive")
const createTaskBtn = document.querySelector(".create-task-btn")
const alertInactive = document.querySelector(".alert_inactive")
const numberOfTasks = document.querySelector(".number-of-tasks")
const myData = []
let dayTaskCreated;

const getData = async (arg) => {
  const res = await axios.get("/api/v1/tasks")
  // const data = await res.json()
  showAllTasks(res.data.tasks)
  numberOfTasks.innerText = res.data.tasks.length
}

getData()

const getDateTime = () => {
  const day = new Date()
  const today = day.toDateString()
  const hour = day.getHours()
  const minutes = day.getMinutes()
  const seconds = day.getSeconds()
  const time = `${hour}:${minutes}`

  // if(today)
  // console.log(time.split("")[4])
  if (!time.split("")[4]) {
    time = `${hour}:0${minutes}`
  }
  dateToday.innerText = today
  timeNow.innerText = time
  dayTaskCreated = today
  //remember to change to show the 0 if the time is before 10 minutes. eg. 15:4 to 15:04
}

const timeInterval = setInterval(() => {
  getDateTime()
}, 1000);

// run below code if app is exited
// clearInterval(timeInterval)

const handleTaskState = (e) => {
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


// this little part here makes it so that when user creates new task
// the task immediately shows up on the home screen without needing a reload
const showAllTasks = (data) => {
  let allTasks = []
  data.forEach((task) => {
    allTasks = data.map((task) => {
      return `<li class="task-closed">
            <h2 class="task-heading">${task.title}</h2>
            <span class="span-closed"></span>
            <div class="div-closed">${task.targetDate}</div>
            <span class="checkbox-unselected"></span>
          </li>`
    })
  }
  )
  console.log(allTasks)
  ul.innerHTML = allTasks.join(" ")

  const checkboxes = document.querySelectorAll(".checkbox-unselected")
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", handleCheckBoxClick)
  })

  const taskClosed = document.querySelectorAll(".task-closed")
  taskClosed.forEach((closedTask) => {
    closedTask.addEventListener("click", handleTaskState)
  })
}


const formState = (e) => {
  if (addTaskForm.className === "add-task-form_active") {
    addTaskForm.className = "add-task-form_inactive"
    addTaskIcon.className = "add-task-icon_inactive"
    // addTaskForm.autofocus = false
  } else if (addTaskForm.className === "add-task-form_inactive") {
    addTaskForm.className = "add-task-form_active"
    addTaskIcon.className = "add-task-icon_active"
    // console.log(addTaskForm.autofocus)
  }
  // console.log(myData)
}

addTaskBtn.addEventListener("click", formState)

const createTask = async (e) => {
  e.preventDefault()
  const taskTitle = addTaskForm[0].value
  const finishTaskDay = addTaskForm[1].value
  const placePicker = addTaskForm[2].value
  const category = addTaskForm[3].value

  const newData = {
    taskCreationDate: `${dayTaskCreated}`,
    title: `${taskTitle}`,
    completed: false,
    targetDate: `${finishTaskDay}`,
    place: `${placePicker}`,
    // include the option to add new places.
    category: `${category}`,
  }


  if (taskTitleInput.value == "") {
    console.log('there is nothing in the input field')
    alertInactive.className = "alert_active"
    setTimeout(() => {
      alertInactive.className = "alert_inactive"
    }, 2000)
    // lets add a little pop up that shows up if task title is empty
  }
  await axios.post("/api/v1/tasks", newData)


  formState()
  for (let i = 0; i < 5; i++) {
    addTaskForm[i].value = ""
  }

  getData()
  // console.log(jesusData)
}


createTaskBtn.addEventListener("click", (e) => createTask(e))

// THE SEARCH SECTION
// taskTitleInput.addEventListener("input", (e) => {
//   if (e.target.value.length >= 35) {
//     // console.log("yeah we are at 10 now")
//     console.log(e.target.value.length)
//     e.target.disabled = true
//   }
// })
//
// window.addEventListener("keydown", (e) => {
//   if (e.key === "Backspace") {
//
//     taskTitleInput.disabled = false
//   }
// })
