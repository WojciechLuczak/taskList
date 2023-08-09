{
   //jesli lista zadan jest pusta - przyciski nie pokazuja sie
   //jesli wszystkie zadania sa ukonczone - przycisk do ukonczenia wszystkich jest wyłączony
    let tasks = [];
    let hideDoneTasks = false;

    const toggleHidingDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render(); 
    };
    // funkcja do przełączania powyższego bool z false na true i odwrotnie      TO DO!!

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
        //tasks.splice(taskIndex, 1);
        const newTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
        tasks = newTasks;

        render();
    }
    const toggleTaskDone = (taskIndex) => {
       // tasks = tasks.map     TO DO
       const newTasks = tasks.map((task, index) =>
        index === taskIndex ? { ...task, done: !task.done } : task
        );
        tasks = newTasks;

        //tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const toggleAllTasksDone = () => {
        const newTasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
    
        tasks = newTasks;
        render();
    }; 


    const hideAllTasksDone = () => {
        console.log("ukrywam zrobione");
     
        let htmlString = "";
        for (const task of tasks) {
            if(task.done===false){
                htmlString += `
            <li class="section__taskRow js-itemHidden" ${task.done ? " style=\"text-decoration: line-through\"" : ""} >    
                
                    <button class="js-done section__done">
                        <img class="section__iconCheck" src="${task.done ? 'img/checked.png' : 'img/unchecked.png'}" alt="Done Icon">
                    </button>
                    <span class="section__individualTask"> ${task.content} </span>
                    <button class="js-remove section__remove">
                        <img class="section__iconRemove" src="img/remove.png" alt="Remove Icon">
                    </button>
            </li>
            `;
            }
            
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        toggleHidingDoneTasks;
        bindEvents();

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
//              W li dodalem klase js-itemHidden do ukrywania przyciskow w CSS przez .js-itemHidden {display: none};
//              wyłączonemu przyciskowi dodajemy atrybut disabled, a nie jakies ukrywajace klasy - w funkcji renderującej przyciski
    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="section__taskRow js-itemHidden" ${task.done ? " style=\"text-decoration: line-through\"" : ""} >    
                
                    <button class="js-done section__done">
                        <img class="section__iconCheck" src="${task.done ? 'img/checked.png' : 'img/unchecked.png'}" alt="Done Icon">
                    </button>
                    <span class="section__individualTask"> ${task.content} </span>
                    <button class="js-remove section__remove">
                        <img class="section__iconRemove" src="img/remove.png" alt="Remove Icon">
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
            <button class="section__toggleTasksDone">${hideDoneTasks ? 'Pokaż ukończone' : 'Ukryj ukończone'}</button>
            <button class="section__allDoneButton">Ukończ wszystkie</button>
            `;
            buttonsTaskList.innerHTML = htmlString;    
            bindButtonsEvents();
        } else {
        buttonsTaskList.innerHTML = ''; // Clear the buttons if no tasks
        }
    };

    const bindButtonsEvents = () => {
        const allDoneButton = document.querySelector(".section__allDoneButton");
        allDoneButton.addEventListener("click", () => {
            toggleAllTasksDone();
        });

        const hideAllDone = document.querySelector(".section__toggleTasksDone");
        hideAllDone.addEventListener("click", () => {
            hideAllTasksDone();
        });
       
    };
        
    const render = () => {
        renderTasks();
        renderButtons();

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