// FORM
const taskForm = document.forms["editorForm"];
// TASKS DIV (WHERE TASKS ARE LISTED)
const tasksDiv = document.getElementsByClassName("tasksDiv")[0];
// PRIORITY BUTTON (UNDER INPUT FIELD)
const taskPriority = document.getElementsByClassName("priorityButton")[0];
// PRIORITY CIRCLE (PART OF PRIORITY BUTTON)
const priorityCircle = document.getElementsByClassName("priorityCircle")[0];
// PRIORITY DESCRIPTION (PART OF PRIORITY BUTTON)
const priorityDescription = document.getElementsByClassName("priorityDescription")[0];
// TASK MENU BUTTON (KEBAB ICON)
// const taskMenuButton = document.getElementsByClassName("taskMenu")[0];
// TASK DROPDOWN MENU
// const taskDropdownMenu = document.getElementsByClassName("taskMenuDropdown")[0];

// PRIORITY COLORS AND DESCRIPTIONS
const levelOnePriorityColor = "rgb(34, 177, 76)";
const levelOnePriorityDescription = "Can wait";
const levelTwoPriorityColor = "rgb(255, 242, 0)";
const levelTwoPriorityDescription = "To do soon";
const levelThreePriorityColor = "rgb(237, 28, 36)";
const levelThreePriorityDescription = "Urgent";



// CLEAR DIV (USED TO MAKE MAIN DIV COVER THE WHOLE TASKS LIST)
const clearDiv = document.getElementById("clearDiv");

// CURRENT PRIORITY (FOR THE INPUT SECTION)
let currPriority = 2;
// EDIT MODE BOOLEAN (USED IN FORM SUBMIT EV LISTENER)
let editMode = false;
// HANDLE FOR THE CURRENTLY EDITED ELEMENT
let currEdited;
// TASK COUNTER
let taskID = 1;

//---------------------------------------------------------------------
// FORM SUBMIT EVENT LISTENER
taskForm.addEventListener("submit", e =>
{
    e.preventDefault();
    
    // CHECK IF INPUT ISN'T EMPTY
    if(taskForm["formInput"].value == "")
    {
        alert("Input field can't be empty!");
        return;
    }
    
    if(!editMode)
    {
        // TEXT INPUT VALUE
        let taskInput = taskForm["formInput"].value;
        // HIDDEN INPUT VALUE (USED FOR PRIORITY COLOR)
        const taskPriority = taskForm["formPriority"].value;


        // CREATING NEW TASK ELEMENT
        // CONTAINER
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        // TEXT CONTENT
        const newTaskContent = document.createElement("button");
        newTaskContent.classList.add("taskContent");
        newTaskContent.textContent = taskInput;
        // DROPDOWN MENU CONTAINER
        const newTaskDropdownContainer = document.createElement("div");
        newTaskDropdownContainer.classList.add("taskMenuDiv");
        // KEBAB MENU ICON
        const newTaskMenu = document.createElement("button");
        newTaskMenu.classList.add("taskMenu");
        newTaskMenu.innerHTML = "&vellip;";
        // UNORDERED LIST (DROPDOWN MENU)
        const newTaskDropdownMenu = document.createElement("ul");
        newTaskDropdownMenu.classList.add("taskMenuDropdown");
        // DROPDOWM MENU LIST ITEMS
        const newTaskDropdownListItem1 = document.createElement("li");
        const newTaskDropdownListItem2 = document.createElement("li");
        // LIST ITEM'S BUTTONS
        const newTaskDropdownButton1 = document.createElement("button");
        newTaskDropdownButton1.classList.add("dropdownButton");
        newTaskDropdownButton1.classList.add("deleteBtn");
        newTaskDropdownButton1.textContent = "Delete";
        const newTaskDropdownButton2 = document.createElement("button");
        newTaskDropdownButton2.classList.add("dropdownButton");
        newTaskDropdownButton2.classList.add("editBtn");
        newTaskDropdownButton2.textContent = "Edit";
        // DESKTOP BUTTONS
        const newTaskDesktopButton1 = document.createElement("button");
        newTaskDesktopButton1.classList.add("desktopButton");
        newTaskDesktopButton1.classList.add("editBtn");
        newTaskDesktopButton1.textContent = "EDIT";
        const newTaskDesktopButton2 = document.createElement("button");
        newTaskDesktopButton2.classList.add("desktopButton");
        newTaskDesktopButton2.classList.add("deleteBtn");
        newTaskDesktopButton2.classList.add("leftButt");
        newTaskDesktopButton2.textContent = "DELETE";
        // PRIORITY CIRCLE
        const newTaskPriority = document.createElement("span");
        newTaskPriority.classList.add("taskPriority");
        newTaskPriority.style.backgroundColor = getColor(currPriority)[0];

        newTask.setAttribute("data-priority", "prio" + String(currPriority));
        newTask.setAttribute("data-done", "false");
        newTask.setAttribute("data-id", taskID);
        taskID++;
       
        // HIDE DROPDOWN MENU WHEN USER CLICKS ANYWHERE
        window.addEventListener("click", e =>
        {
            if(document.activeElement != newTaskMenu)
            newTaskMenu.nextSibling.style.display = "none";
        });
        // ADDING EVENT LISTENER TO DELETE BUTTON
        newTaskDropdownButton1.addEventListener("click", e =>
        {
            newTask.remove(); 

        });
        newTaskDesktopButton2.addEventListener("click", e =>
        {
            newTask.remove(); 

        });
        // ADDING EVENT TO EDIT BUTTON
        newTaskDropdownButton2.addEventListener("click", e =>
        {  
            taskForm["formInput"].value = newTaskContent.textContent;
            taskForm["formSubmit"].value = "Upd";
            
            let prio = newTask.getAttribute("data-priority");
            prio = prio[prio.length - 1];
            // console.log(prio);
            currPriority = Number(prio);
            // console.log(currPriority);
            
            let prioAndDesc = getColor(prio);
            priorityCircle.style.backgroundColor = prioAndDesc[0];
            priorityDescription.style.color = prioAndDesc[0];
            priorityDescription.textContent = prioAndDesc[1];
            
            currEdited = newTask;
            editMode = true;
            taskForm["formInput"].focus();
        });
        newTaskDesktopButton1.addEventListener("click", e =>
        {  
            taskForm["formInput"].value = newTaskContent.textContent;
            taskForm["formSubmit"].value = "Upd";
            
            let prio = newTask.getAttribute("data-priority");
            prio = prio[prio.length - 1];
            console.log(prio);
            currPriority = Number(prio);
            console.log(currPriority);
            
            let prioAndDesc = getColor(prio);
            priorityCircle.style.backgroundColor = prioAndDesc[0];
            priorityDescription.style.color = prioAndDesc[0];
            priorityDescription.textContent = prioAndDesc[1];
            
            currEdited = newTask;
            editMode = true;
            taskForm["formInput"].focus();
        });
        // ADD BUTTONS TO LIs
        newTaskDropdownListItem1.appendChild(newTaskDropdownButton1);
        newTaskDropdownListItem2.appendChild(newTaskDropdownButton2);
        // ADD LIs TO UL
        newTaskDropdownMenu.appendChild(newTaskDropdownListItem1);
        newTaskDropdownMenu.appendChild(newTaskDropdownListItem2);
        // ADD KEBAB BUTTON AND UL TO TASK MENU DIV
        newTaskDropdownContainer.appendChild(newTaskMenu);
        newTaskDropdownContainer.appendChild(newTaskDropdownMenu);
        // APPEND EVERYTHING TO NEW TASK
        newTask.appendChild(newTaskContent);
        newTask.appendChild(newTaskDropdownContainer);
        newTask.appendChild(newTaskDesktopButton1);
        newTask.appendChild(newTaskDesktopButton2);
        newTask.appendChild(newTaskPriority);

        tasksDiv.insertBefore(newTask, clearDiv);
    }
    else if(editMode)
    {
        let colorAndDesc = getColor(currPriority);

        // RISKY IMPLEMENTATION, SHOULD CHANGE TO TARGETING ELEMENTS WITH CONSTs
        currEdited.firstChild.textContent = taskForm["formInput"].value;
        taskForm["formSubmit"].value = "Add";
        currEdited.lastChild.style.backgroundColor = colorAndDesc[0];
        currEdited.setAttribute("data-priority", "prio" + currPriority);
        priorityCircle.style.backgroundColor = colorAndDesc[0];
        priorityDescription.style.color = colorAndDesc[0];
        priorityDescription.textContent = colorAndDesc[1];
        editMode = false;
    }

    

    taskForm.reset();
});


//---------------------------------------------------------------------
// IF CLICK ON TASK BUT NOT ON BUTTON, PUT LINE THROUGH TASK TEXT
tasksDiv.addEventListener("click", e =>
{
    // CHECKS IF BUTTON OR PRIO CIRCLE WASNT CLICKED
    if(e.target.classList.contains("task") || 
       e.target.classList.contains("taskContent"))
    {
        let taskEdited;

        // ESTABLISHES taskEdited AS .task (parent) ELEMENT
        if(e.target.classList.contains("task"))
        {
            taskEdited = e.target;
        }
        else if(e.target.classList.contains("taskContent"))
        {
            taskEdited = e.target.parentElement;
        }

        if(taskEdited.getAttribute("data-done") == "false")
        {
            taskEdited.setAttribute("data-done", "true");
            taskEdited.firstElementChild.style.textDecoration = "line-through";
            taskEdited.style.backgroundColor = "rgba(17, 24, 39, 0.7)";
            taskEdited.firstElementChild.style.backgroundColor = "rgba(17, 24, 39, 0)";
            taskEdited.firstElementChild.style.color = "rgba(238, 238, 238, 0.3)";
            taskEdited.lastElementChild.style.opacity = "0.7";

        }
        else if(taskEdited.getAttribute("data-done") == "true")
        {
            taskEdited.setAttribute("data-done", "false");
            taskEdited.firstElementChild.style.textDecoration = "none";
            taskEdited.style.backgroundColor = "rgba(17, 24, 39, 1)";
            taskEdited.firstElementChild.style.backgroundColor = "rgba(17, 24, 39, 1)";
            taskEdited.firstElementChild.style.color = "rgba(238, 238, 238, 1)";
            taskEdited.lastElementChild.style.opacity = "1";
        }
    }
    
});
//---------------------------------------------------------------------
// DISPLAY DROPDOWN MENU WHEN CLICK ON KEBAB ICON
tasksDiv.addEventListener("click", e =>
{
    if(e.target.classList.contains("taskMenu"))
    {
        console.log("asdas");
        e.target.nextElementSibling.style.display = "block";
    }
});

//---------------------------------------------------------------------
// PRIORITY BUTTON CLICK EVENT LISTENER
taskPriority.addEventListener("click", e =>
{
    currPriority++;
    if(currPriority > 3) 
    {
        currPriority = 1;
    }

    // CHANGE PRIORIITY BUTTON'S COLORS AND DESCRIPTION
    let newColorAndDesc = getColor(currPriority);
    priorityCircle.style.backgroundColor = newColorAndDesc[0];
    priorityDescription.style.color = newColorAndDesc[0];
    priorityDescription.textContent = newColorAndDesc[1];

    // CHANGE HIDDEN INPUT'S VALUE (IN FORM)
    taskForm["formPriority"].value = currPriority;

    taskForm["formInput"].focus();
});
//---------------------------------------------------------------------
// FUNCTION RETURNS A COLOR (RGB) AND DESCRIPTION DEPENDING ON ARGUMENT (NUMBER 1-3)
function getColor(number)
{
    let color = "";
    let desc = "";
    if(number == 1)
    {
        color = levelOnePriorityColor;
        desc = levelOnePriorityDescription;
    }
    else if(number == 2)
    {
        color = levelTwoPriorityColor;
        desc = levelTwoPriorityDescription;
    }
    else if(number == 3)
    {
        color = levelThreePriorityColor;
        desc = levelThreePriorityDescription;
    }

    return [color, desc];
}
//---------------------------------------------------------------------




// OLD IMPLEMENTATION FOR EDIT EVENT LISTENER, BAD (I THINK)
    // TAKS'S CONSTS
    // const taskTextArea = newTaskDropdownButton2.parentElement.parentElement.parentElement.previousSibling;
    // TASK'S MAIN PARENT DIV
    // const taskParent = newTaskDropdownButton2.parentElement.parentElement.parentElement.parentElement;
    // TASK'S PRIORITY ATTRIBUTE
    // const taskPriorityAttr = taskParent.getAttribute("data-priority");

    // taskForm["formInput"].value = taskTextArea.textContent;
    // taskForm["formSubmit"].value = "Upd";

    // let prio = taskPriorityAttr[taskPriorityAttr.length - 1];
    // currPriority = prio;
    // let prioAndDesc = getColor(prio);
    // priorityCircle.style.backgroundColor = prioAndDesc[0];
    // priorityDescription.style.color = prioAndDesc[0];
    // priorityDescription.textContent = prioAndDesc[1];


    // currEdited = taskTextArea.parentElement;
    // editMode = true;
    // taskForm["formInput"].focus();

    // console.log("sdsfsd");
    // console.log(taskPriorityAttr);
    // console.log(newTask.getAttribute("data-priority"));