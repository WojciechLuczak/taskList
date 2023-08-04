{
    const focus = () => {
        const submitButton = document.querySelector(".section__button");
        const inputField = document.querySelector(".section__input");
        submitButton.addEventListener("click", function () {
            inputField.focus();
        });
    }
    const tasks = [];
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
            <li class="section__taskRow" ${task.done ? " style=\"text-decoration: line-through\"" : ""} >
                
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