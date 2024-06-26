// TODOS
// make one task shrink when another one is clicked but avoid shifting content
// start working on the add task button and pop up
// make the app such that even if it isn't able to connect to the mongodb server
// so that it still has the other last saved tasks in local storage
// add a total number of todos deleted and completed

const header = document.querySelector(".header")
const search = document.querySelector(".search")
const footer = document.querySelector(".footer")
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
  let hour = day.getHours()
  let minutes = day.getMinutes()
  const seconds = day.getSeconds()
  let time = `${hour}:${minutes}`

  // if(today)
  // console.log(time.length - 1)
  // if (time.length < 5 && time.split("")[time.length - 1] > 0) {
  //   minutes = `0${minutes}`
  // } else if (time.split("")[1] >= 0) {
  //   hour = `${hour}`
  // }

  time = `${hour}:${minutes}`
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

const handleCheckBoxClick = (e) => {
  if (e.target.className === "checkbox-unselected") {
    e.target.className = "checkbox-selected"
  } else if (e.target.className === "checkbox-selected") {
    e.target.className = "checkbox-unselected"
  }
}

// EDIT SECTION

const editTask = (taskData) => {
  console.log(taskData)
}

// DELETE SECTION
const deletingTask = (task) => {
  const thisTask = task.target.parentElement.parentElement
  thisTask.className = "deleting-task"
}

const closeDelete = (task) => {
  //this below is to get the <li> element
  const thisTask = task.target.parentElement.parentElement.parentElement
  thisTask.className = "task-closed"
  //console.log(thisTask)
}

const confirmDelete = async (task) => {
  const thisTask = task.target.parentElement.parentElement.parentElement
  const id = thisTask.dataset.id
  await axios.delete(`/api/v1/tasks/${id}`)
  thisTask.className = "task-deleted"
  getData()
  //console.log(thisTask)
}

// this little part here makes it so that when user creates new task
// the task immediately shows up on the home screen without needing a reload
// it works like a react and next component.
// <div>${task.details}</div>

 //You cannot call showAllTasks directly, use getData() instead
const showAllTasks = (data) => {
  let allTasks = []
  data.forEach((task) => {
    allTasks = data.map((task) => {
      return `<li class="task-closed" data-id="${task._id}">
            <span class="checkbox-unselected"></span>
            <h2 class="task-heading">${task.title}</h2>
            <div class="options">
              <img class="icon edit" src="/edit.png"></a>
              <img class="icon delete" src="/delete.png" >
            </div>
            <div class="delete-options">
              <div class="cancel delete-option"><span class="nix">x</span></div>
              <div class="confirm delete-option"><span class="check"></span></div>
            </div>
          </li>`
      })
    }
  )

  ul.innerHTML = allTasks.join(" ")

  const deleteBtns = document.querySelectorAll(".delete")
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click",(e) => {
      deletingTask(e)
    })
  });

  const cancelDeletes = document.querySelectorAll(".cancel")
  cancelDeletes.forEach((cancelDelete) => {
    cancelDelete.addEventListener("click",(e) => {
      closeDelete(e)
    })
  });

  const checks = document.querySelectorAll(".confirm")
  checks.forEach((check) => {
    check.addEventListener("click",(e) => {
      confirmDelete(e)
    })
  });

  
  const editBtns = document.querySelectorAll(".edit")
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click",() => {
      editTask(data)
    })
  })

  //  task.children[3].children[0].addEventListener("click",closeDelete)

  const checkboxes = document.querySelectorAll(".checkbox-unselected")
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", handleCheckBoxClick)
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

// CREATE TASK SECTION

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

//editBtn.addEventListener("click",editTask("Something here"))

// CLOSE THE FORM IF ANY OTHER ITEM OUTSIDE OF IT CLOSES THE FORM
//


const closeForm = () => {
  if(addTaskForm.className == "add-task-form_active"){
    addTaskForm.className = "add-task-form_inactive"
    addTaskIcon.className = "add-task-icon_inactive"
  }
  // console.log("what is going on")
}

header.addEventListener("click",closeForm)
search.addEventListener("click",closeForm)
footer.addEventListener("click",closeForm)


 //THE SEARCH SECTION
 search.addEventListener("input", (e) => {
   if(numberOfTasks.innerText === String(0)){
     //alert("You have no tasks")
     search[0].value = ""
     ul.innerText = "You have no tasks right now"
     e.target.disabled = true
     setTimeout(() => {
       ul.innerText = ""
       e.target.disabled = false
     }, 3000);
     //console.log("You have no tasks")
     // make it search the recycle bin too
   } else {
     let sentence = search[0].value
     //console.log(sentence)
   }

   //if (e.target.value.length >= 35) {
   //  // console.log("yeah we are at 10 now")
   //  console.log(e.target.value.length)
   //}
  //console.log(numberOfTasks)
 })

 //window.addEventListener("keydown", (e) => {
 //  if (e.key === "Backspace") {
 //    taskTitleInput.disabled = false
 //  }
 //})
