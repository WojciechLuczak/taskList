{
    let tasks = [];
    let hideDoneTasks = false;
    let allAreDone = false;

    const toggleHidingDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render(); 
    };

    const focus = () => {
        const submitButton = document.querySelector(".section__button");
        const inputField = document.querySelector(".section__input");
        submitButton.addEventListener("click", function () {
            inputField.focus();
        });
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent }
        ];
        render();
    }
    const removeTask = (taskIndex) => {

        const newTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
        tasks = newTasks;
        render();
    }
    const toggleTaskDone = (taskIndex) => {

       const newTasks = tasks.map((task, index) =>
        index === taskIndex ? { ...task, done: !task.done } : task
        );
        tasks = newTasks;
        render();
    }

    const checkIfAllAreDone = () => {
        if (tasks.length > 0) {
            const allTasksAreDone = tasks.every(task => task.done === true);
            if (allTasksAreDone) {
                return false;
            } else {
                return true;
            }
        }
        return false; 
    }

    const toggleAllTasksDone = () => {
        const newTasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
    
        tasks = newTasks;
        render();
    }; 
    

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    }
    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="${hideDoneTasks===true&&task.done ? "section__hiddenItem " : ""}section__taskRow ">    
                
                    <button class="js-done section__done">
                    ${task.done ? "✔" : ""}
                    </button>
                    <span class="section__individualTask ${task.done ? " section__lineThrough" : ""} "> ${task.content} </span>
                    <button class="js-remove section__remove">
                    🗑
                    </button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    }

    const renderButtons = () => {
        const buttonsTaskList = document.querySelector(".js-buttonsTaskList");

        if (tasks.length > 0) {
            const htmlString = `
            
            <button class="section__toggleTasksDone ">${hideDoneTasks ? 'Pokaż ukończone' : 'Ukryj ukończone'}</button>
            <button class="section__allDoneButton" ${checkIfAllAreDone() ? '' : 'disabled'}>Ukończ wszystkie</button>
            `;
            buttonsTaskList.innerHTML = htmlString;    
            bindButtonsEvents();
        } 
        
        else {
        buttonsTaskList.innerHTML = ''; 
        }
    };

    
    const bindButtonsEvents = () => {
        const allDoneButton = document.querySelector(".section__allDoneButton");
        allDoneButton.addEventListener("click", () => {
            toggleAllTasksDone();
        });

        const hideAllDone = document.querySelector(".section__toggleTasksDone");
        hideAllDone.addEventListener("click", () => {
            toggleHidingDoneTasks();
        });
       
    };
        
    const render = () => {
        renderTasks();
        renderButtons();
        console.log(checkIfAllAreDone());
        //bindRemoveEvents();
        //bindToggleEvents();
        //bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const inputField = document.querySelector(".section__input");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        inputField.value = "";
    }
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        focus();
    };
    init();

}