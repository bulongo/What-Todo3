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
const myData = []
let dayTaskCreated;

const getData = async (arg) => {
  const res = await axios.get("/api/v1/tasks")
  // const data = await res.json()
  showAllTasks(res.data.tasks)
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
  dayTaskCreated = today
  //remember to change to show the 0 if the time is before 10 minutes. eg. 15:4 to 15:04
}

const interval = setInterval(() => {
  getDateTime()
  clearInterval(interval)
}, 1000);

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

const showAllTasks = (data) => {
  data.forEach((task) => {
    //  just remember that each task is a number above itself.
    //  e.g. Task four is actually five in the list of tasks.

    // console.log(task)
    //
  const allTasks = data.map((task) => {
      return `
        <li>
          <h2 class="task-heading">${task.title}</h2>
          <span class="span-closed"></span>
          <div class="div-closed">${task.description}</div>
          <span class="checkbox-unselected">checkbox-selected</span>
        </li>
      `
    })

    ul.innerHTML = allTasks
   // 
   //  const li = document.createElement("li")
   //  const h2 = document.createElement("h2")
   //  const span = document.createElement("span")
   //  const div = document.createElement("div")
   //  const timeDiv = document.createElement("div")
   //  const checkBox = document.createElement("span")
   //
   //  h2.className = "task-heading"
   //  span.className = "span-closed"
   //  div.className = "div-closed"
   //  div.addEventListener("click", handleTaskState)
   //  checkBox.className = "checkbox-unselected"
    // checkBox.addEventListener("click", handleCheckBoxClick)

    // myData.push(task)

    // h2.innerText = task.title
    // div.innerText = task.description
    // li.className = "task-closed"
    // li.addEventListener("click", handleTaskState)
    // li.appendChild(h2)
    // li.appendChild(span)
    // li.appendChild(div)
    // li.appendChild(checkBox)
    // ul.appendChild(li)
  })



  // data.forEach((task) => {
  // });
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
    title:`${taskTitle}`,
    completed:false,
    targetDate: `${dayTaskCreated}` ,
    place: `${placePicker}`,
// include the option to add new places.
    category: `${category}`,
  }

  const jesusData = await axios.post("/api/v1/tasks", newData)

  formState() 
  for(let i = 0;i < 5;i++){
    addTaskForm[i].value = ""
  }

  getData()
  // okey, here we have to make sure to check if the item is already showing on the screen before updating it.
  // getData()

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
