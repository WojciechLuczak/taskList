{
    const inputField = document.querySelector(".addNewTask__input");
    const submitButton = document.querySelector(".addNewTask__button");

    submitButton.addEventListener("click", function () {
        inputField.focus();

    });

    const tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            
            <li class="taskList__taskRow" ${task.done ? " style=\"text-decoration: line-through\"" : ""} >
            
            
            <div class="taskList__taskRowLeft">
            <button class="js-done taskList__done">
            <img class="taskList__iconCheck" src="${task.done ? 'img/checked.png' : 'img/unchecked.png'}" alt="Done Icon">
            </button>
            
            <span class="taskList__individualTask"> ${task.content} </span>
            </div>

            <div class="taskList__taskRowRight"><button class="js-remove taskList__remove">
            <img class="taskList__iconRemove" src="img/remove.png" alt="Remove Icon">
            </button>
            </div>
            
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;



        bindEvents();
    };



    const onFormSubmit = (event) => {
        event.preventDefault();

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
    };

    init();
}