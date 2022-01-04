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
// SHOW SORT SETTINGS WINDOW BUTTON
const showSettings = document.querySelector(".showSettingsBtn");
// SORT SETTINGS WINDOW
const settingsWindow = document.querySelector(".settings");
// DATE SORT BUTTON (IN SORT SETTINGS WINDOW)
const settingsDate = document.querySelector(".settingsDate");
// PRIORITY SORT BUTTON (IN SORT SETTINGS WINDOW)
const settingsPrio = document.querySelector(".settubgsPrio");
// COMPLETION SORT BUTTON (IN SORT SETTINGS WINDOW)
const settingsComp = document.querySelector(".settingsComp");
// DONE BUTTON (IN SORT SETTINGS WINDOW)
const settingsDone = document.querySelector(".settingsDone");
// DELETE DONE BUTTON
const deleteDoneBtn = document.querySelector(".deleteDoneBtn");

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

// SORTING SETTINGS VARIABLES
// So apparently, in JS you can't pass numbers to function by reference.
// I need those variables to be passed by reference in changeSortSettings()
// so this will be an object.
//let dateSort = 1; // 0 - off, 1 - old to new, 2 - new to old
//let prioSort = 0; // 0 - off, 1 - low to high, 2 - high to low
//let compSort = 1; // 0 - off, 1 - undone to done, 2 - done to undone

let sortSettings =
{
    dateSort: 1, // 0 - off, 1 - old to new, 2 - new to old
    prioSort: 0, // 0 - off, 1 - low to high, 2 - high to low
    compSort: 1 // 0 - off, 1 - undone to done, 2 - done to undone
};



//---------------------------------------------------------------------
// EVENT LISTENERS
//---------------------------------------------------------------------

//---------------------------------------------------------------------
// IF SUBMIT FORM, CREATE OR EDIT TASK
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

        // SET ATTRIBUTES FOR NEW TASK
        newTask.setAttribute("data-priority", "prio" + String(currPriority));
        newTask.setAttribute("data-done", "false");
        newTask.setAttribute("data-id", taskID);
        taskID++;

        // APPEND NEW TASK TO TASKS LIST
        tasksDiv.insertBefore(newTask, clearDiv);

        // HIDE DROPDOWN MENU WHEN USER CLICKS ANYWHERE
        window.addEventListener("click", e =>
        {
            // UNSOLVED BUG: ACTIVE ELEMENT SOLUTION SUDDENLY STOPPED WORKING
            // WITHOUT THIS PART OF CODE EVER BEING TOUCHED
            // document.activeElement STARTED RETURNING <body> INSTEAD OF BUTTON
            
            // console.log("active: " + document.activeElement);
            // if(document.activeElement != newTaskMenu)
            // {
            //     newTaskMenu.nextSibling.style.display = "none";
            //     console.log(document.activeElement);
            // }
            if(e.target != newTaskMenu)
            {
                newTaskMenu.nextElementSibling.style.display = "none";
            }
        });
        
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
    
    // ADDING AND EDITING TASKS AFFECTS TASK LIST SO SORTING IS NEEDED
    allSorts();

    taskForm.reset();
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
// IF CLICK ON "Sorting" BUTTON, SHOW SORT SETTINGS WINDOW
showSettings.addEventListener("click", e =>
{
    settingsWindow.style.display = "block";
});
//---------------------------------------------------------------------
// IF CLICK ON "Delete Done" BUTTON, DELETE CROSSED (MARKED AS DONE) TASKS
deleteDoneBtn.addEventListener("click", e => {
    let tasks = tasksDiv.querySelectorAll(".task");

    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].getAttribute("data-done") == "true")
        {
            tasks[i].remove();
        }
    }
});
//---------------------------------------------------------------------
// CLICK EVENTS ON SORT SETTINGS WINDOW
settingsWindow.addEventListener("click", e =>
{
    // CLOSE WINDOW IF USER CLICKS ON BACKGROUND BEHIND THE WINDOW
    if(e.target == settingsWindow)
    {
        settingsWindow.style.display = "none";
    }

    if(e.target == settingsDate)
    {
        console.log("asd");
        changeSortSettings(settingsDate, "dateSort", "Old &#8594; New", "New &#8594; Old");
    }
    if(e.target == settingsPrio)
    {
        changeSortSettings(settingsPrio, "prioSort", "Low &#8594; High", "High &#8594; Low");
    }
    if(e.target == settingsComp)
    {
        changeSortSettings(settingsComp, "compSort", "Undone &#8594; Done", "Done &#8594; Undone")
    }

    if(e.target == settingsDone)
    {
        settingsWindow.style.display = "none";
        allSorts();
    }

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
    
    // MARKING TASKS AS DONE AFFECTS THE TASK LIST SO SORTING IS NEEDED
    allSorts();
});
//---------------------------------------------------------------------
// DISPLAY DROPDOWN MENU WHEN CLICK ON KEBAB ICON
tasksDiv.addEventListener("click", e =>
{
    if(e.target.classList.contains("taskMenu"))
    {
        e.target.nextElementSibling.style.display = "block";
    }
});

//---------------------------------------------------------------------
// DELETE TASK WHEN DELETE BUTTON CLICKED
tasksDiv.addEventListener("click", e =>
{
    if(e.target.classList.contains("deleteBtn"))
    {
        if(e.target.classList.contains("desktopButton"))
        {
            e.target.parentElement.remove();
        }
        else if(e.target.classList.contains("dropdownButton"))
        {
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
});
//---------------------------------------------------------------------
// START EDIT MODE WHEN EDIT BUTTON CLICKED
tasksDiv.addEventListener("click", e =>
{
    if(e.target.classList.contains("editBtn"))
    {
        let taskClicked;
        if(e.target.classList.contains("desktopButton"))
        {
            taskClicked = e.target.parentElement;
        }
        else if(e.target.classList.contains("dropdownButton"))
        {
            taskClicked = e.target.parentElement.parentElement.parentElement.parentElement;
        }
        
        taskForm["formInput"].value = taskClicked.firstElementChild.textContent;
        taskForm["formSubmit"].value = "Upd";
        
        let prio = taskClicked.getAttribute("data-priority");
        prio = prio[prio.length - 1];
        currPriority = Number(prio);
        
        let prioAndDesc = getColor(prio);
        priorityCircle.style.backgroundColor = prioAndDesc[0];
        priorityDescription.style.color = prioAndDesc[0];
        priorityDescription.textContent = prioAndDesc[1];
        
        currEdited = taskClicked;
        editMode = true;
        taskForm["formInput"].focus();
    }
});

//---------------------------------------------------------------------
// FUNCTIONS
//---------------------------------------------------------------------

// DELETE ALL TASKS AND RETURN ARRAY OF DELETED TASKS
function deleteTasks()
{
    let tasks = document.querySelectorAll(".task");
    let retArray = [];
    
    for(let i = 0; i < tasks.length; i++)
    {
        retArray.push(tasks[i]);
        tasks[i].remove();
    }
    
    return retArray;
}
// DO STUFF
function doStuffOne()
{
    displayTasks(sortbyPriority(deleteTasks(), true));
}
function doStuffTwo()
{
    let dic = makeDictionary();
    deleteTasks();
    displayTasks(dicToArr(sortByID(dic)));
}
// SORT ARRAY BY COMPLETION
function sortByCompletion(arr, undoneToDone)
{
    let done = [];
    let undone = [];
    let retArr;
    
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].getAttribute("data-done") == "true")
        {
            done.push(arr[i]);
        }
        if(arr[i].getAttribute("data-done") == "false")
        {
            undone.push(arr[i]);
        }
    }
    
    if(undoneToDone)
    {
        retArr = undone.concat(done);
    }
    else if(!undoneToDone)
    {
        retArr = done.concat(undone);
    }
    
    return retArr;
}
// SORT ARRAY BY PRIORITY
function sortbyPriority(arr, highToLow)
{
    let prio1 = [];
    let prio2 = [];
    let prio3 = [];
    let retArr;
    
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].getAttribute("data-priority") == "prio1")
        {
            console.log("asd");
            prio1.push(arr[i]);
        }
        else if(arr[i].getAttribute("data-priority") == "prio2")
        {
            prio2.push(arr[i]);
        }
        else if(arr[i].getAttribute("data-priority") == "prio3")
        {
            prio3.push(arr[i]);
        }
    }
    
    if(highToLow)
    {
        retArr = prio3.concat(prio2);
        retArr = retArr.concat(prio1);
    }
    else if(!highToLow)
    {
        retArr = prio1.concat(prio2);
        retArr = retArr.concat(prio3);
    }
    
    return retArr;
}
// SORTS ARRAY OF TASKS BY data-id (MERGE SORT)
function sortByID(array)
{
    if(array.length == 1)
    return array;
    
    let divIndex = Math.floor(array.length / 2);
    
    let left = array.slice(0, divIndex);
    let right = array.slice(divIndex, array.length);
    
    return sortTwo(sortByID(left), sortByID(right));
    
}
// MAKES ONE SORTED ARRAY FROM TWO SORTED ARRAYS
// USED IN sortByID
function sortTwo(left, right)
{
    // THIS IS WHAT ELEMENTS OF left AND right ARRAYS LOOK LIKE:
    // [HTML element (task), data-id]
    let pointLeft = 0;
    let pointRight = 0;
    let sortedArr = [];
    
    while(pointLeft < left.length && pointRight < right.length)
    {
        if(left[pointLeft][1] <= right[pointRight][1])
        {
            sortedArr.push(left[pointLeft]);
            pointLeft++;
        }
        else if(left[pointLeft][1] > right[pointRight][1])
        {
            sortedArr.push(right[pointRight]);
            pointRight++;
        }
    }
    if(pointLeft == left.length)
    {
        while(pointRight < right.length)
        {
            sortedArr.push(right[pointRight]);
            pointRight++;
        }
    }
    else if(pointRight == right.length)
    {
        while(pointLeft < left.length)
        {
            sortedArr.push(left[pointLeft]);
            pointLeft++;
        }
    }
    
    return sortedArr;
}
// MAKES A DICTIONARY (KIND OF)
// sortByID REQUIRES AN ARRAY (AS ARGUMENT) WHICH ELEMENTS LOOK LIKE THIS:
// [HTML element, data-id]
function makeDictionary(tasks)
{
    let retDic = [];
    for(let i = 0; i < tasks.length; i++)
    {
        let dataID = Number(tasks[i].getAttribute("data-id"));
        retDic.push([tasks[i], dataID]);
    }
    return retDic;
}
// EXTRACTS A LIST OF HTML ELEMENTS FROM DICTIONARY (MADE BY makeDictionary())
// NEEDED FOR displayTasks (after sortByID)
function dicToArr(dic)
{
    let retArr = [];
    
    for(let i = 0; i < dic.length; i++)
    {
        retArr.push(dic[i][0]);
    }
    
    return retArr;
}
// PRINT LIST OF TASKS FROM ARRAY
function displayTasks(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        tasksDiv.insertBefore(arr[i], clearDiv);
    }
}
//---------------------------------------------------------------------
// USED IN settingsWindow EVENT LISTENER. CHENGES SORT SETTINGS WHEN USER CLICKS ONE OF SETTINGS BUTTON
function changeSortSettings(handle, sortSettingName, oneState, twoState)
{
    sortSettings[sortSettingName]++;
    if(sortSettings[sortSettingName] >= 3)
    {
        sortSettings[sortSettingName] = 0;
    }
    
    console.log(sortSettings[sortSettingName]);

    if(sortSettings[sortSettingName] == 0)
    {
        handle.querySelector(".settingsBtnToggle").innerHTML = "Off";
    }
    if(sortSettings[sortSettingName] == 1)
    {
        handle.querySelector(".settingsBtnToggle").innerHTML = oneState;
    }
    if(sortSettings[sortSettingName] == 2)
    {
        handle.querySelector(".settingsBtnToggle").innerHTML = twoState;
    }
}
//---------------------------------------------------------------------
// SORTS TASKS BASED ON sortSettings
function allSorts()
{
    let tasks = deleteTasks();

    // SORT BY ID
    if(sortSettings.dateSort == 1 || sortSettings.dateSort == 2)
    {
        tasks = makeDictionary(tasks);
        tasks = sortByID(tasks);
        tasks = dicToArr(tasks);
        
        if(sortSettings.dateSort == 1)
        {
            // already sorted, do nothing
        }
        if(sortSettings.dateSort == 2)
        {
            tasks = tasks.reverse();
        }
    }
    // SORT BY PRIORITY
    if(sortSettings.prioSort == 1)
    {
        // console.log("low to high");
        tasks = sortbyPriority(tasks, false)
    }
    if(sortSettings.prioSort == 2)
    {
        // console.log("high to low");
        tasks = sortbyPriority(tasks, true);
    }
    // SORT BY COMPLETION
    if(sortSettings.compSort == 1)
    {
        tasks = sortByCompletion(tasks, true);
    }
    if(sortSettings.compSort == 2)
    {
        tasks = sortByCompletion(tasks, false);
    }


    displayTasks(tasks);
}
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
