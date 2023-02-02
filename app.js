// selectors



const addTaskInput = document.querySelector('.add-task')
const tasksUL = document.querySelector('.tasks-ul')
const taskForm = document.querySelector('.task-form')
const tasksLeft = document.querySelector('.items-left')
const clearFinished = document.querySelector('.clear-completed')
const all = document.querySelector('.all')
const active = document.querySelector('.active')
const completed = document.querySelector('.completed')
const msg = document.querySelector('.msg')

const lightTheme = document.querySelector('.l-theme')
const darkTheme = document.querySelector('.d-theme')
const ulFooter = document.querySelector('.ul-footer')

lightTheme.addEventListener('click',()=>{
    document.querySelector('body').classList.toggle('light')
    lightTheme.classList.add('d-none')
    darkTheme.classList.remove('d-none')
    tasksUL.classList.add('light2')
    tasksUL.classList.remove('tasks-ul')
    ulFooter.classList.add('light2')
    ulFooter.classList.remove('ul-footer')
    addTaskInput.classList.add('light2')
    addTaskInput.classList.remove('add-task')
    document.querySelector('.attribution').classList.remove('text-white')
})
darkTheme.addEventListener('click',()=>{
    document.querySelector('body').classList.toggle('light')
    darkTheme.classList.add('d-none')
    lightTheme.classList.remove('d-none')
    tasksUL.classList.remove('light2')
    tasksUL.classList.add('tasks-ul')
    ulFooter.classList.remove('light2')
    ulFooter.classList.add('ul-footer')
    addTaskInput.classList.remove('light2')
    addTaskInput.classList.add('add-task')
    document.querySelector('.attribution').classList.add('text-white')

})


// filters - all
all.addEventListener('click',function(){
    const tasksArray = Array.from(tasksUL.children)
    all.style.color = 'blue'
    active.style.color = 'rgb(174, 174, 174)'
    completed.style.color = 'rgb(174, 174, 174)'
    tasksArray.forEach(task=>{
        task.style.display = 'block'
    })
// filters - active
})
active.addEventListener('click',function(){
    const tasksArray = Array.from(tasksUL.children)

    active.style.color = 'blue'
    all.style.color = 'rgb(174, 174, 174)'
    completed.style.color = 'rgb(174, 174, 174)'
    tasksArray.forEach(task=>{
        if(task.classList.contains('item')){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'

        }
    })
// filters - active
})
completed.addEventListener('click',function(){
    const tasksArray = Array.from(tasksUL.children)

    completed.style.color = 'blue'
    active.style.color = 'rgb(174, 174, 174)'
    all.style.color = 'rgb(174, 174, 174)'
    tasksArray.forEach(task=>{
        if(task.classList.contains('finish')){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
    })


// event Listeners
taskForm.addEventListener('submit',addTask)
tasksUL.addEventListener('click',removeTask)
tasksUL.addEventListener('click',finishTask)
clearFinished.addEventListener('click',clearCompleted)

// functions

function addTask(e){
    if(addTaskInput.value=='') {
        msg.innerHTML = 'You should add a task first...'
        msg.classList.remove('d-none')
        setTimeout(() => {
            msg.classList.add('d-none')
            
        }, 1500);

    } else {
        const taskName = addTaskInput.value
        const li = document.createElement('li')
    
        const i1 = document.createElement('i')
        const taskContent = document.createElement('span')
        taskContent.classList = 'li-span'
        i1.classList = 'fa-regular fa-circle me-1 finish'
        
        taskContent.textContent = taskName
        // li.textContent = `${taskName}`
        
        const i2 = document.createElement('i')
        i2.classList = 'fa-solid fa-x float-end mt-1 remove'
        
        
        li.classList = 'list-group-item item'
        li.insertAdjacentElement('afterbegin',i1)
        li.insertAdjacentElement('beforeend',taskContent)
        li.insertAdjacentElement('beforeend',i2)
        tasksUL.appendChild(li)
        addTaskInput.value=''
    }


    //tasks left
    tasksRemaining()

    e.preventDefault();
}

function removeTask(e){
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.remove()
    }
    tasksRemaining();
}

function finishTask(e){
    if(e.target.classList.contains('finish')) {
        // e.target.classList = ''
        e.target.classList = 'fa-sharp fa-solid fa-circle-check me-1'
        e.target.parentElement.classList.remove('item')
        e.target.parentElement.classList.add('finish')
        const a = e.target.parentElement
        a.style.textDecoration = 'line-through'
        a.firstChild.nextSibling.style.color = 'grey'

    tasksRemaining()
}}

function tasksRemaining(){
        // Tasks left

        let acc = 0
        const itemsLeft = Array.from(tasksUL.children).forEach(task=>{
            if(task.classList.contains('item')){
                acc ++
            }
        })   
        tasksLeft.textContent = acc
}

function clearCompleted(){
    const tasks = Array.from(tasksUL.children);
    tasks.forEach(task=>{
        if(task.classList.contains('finish')) {
            task.remove()
        }
    })
}