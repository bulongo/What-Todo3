const portFind = (port) => {
  if(!port){
    console.log(`Port ${port} is in use. Switching ports.`)
  } else {
    console.log(`Connected succesfully.`)
  }
}
