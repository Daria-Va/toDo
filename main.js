(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem({name, done}) {

        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (done) {
            item.classList.add('list-group-item-success');
        }

        return {
            item,
            doneButton,
            deleteButton,
        };
        
    }

    let tasks = [];

    function generateId() {
        return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    }

    function addTaskToArray(task) {
        tasks.push({
            id: generateId(),
            name: task.name,
            done: task.done || false
        });
    }

    function updateDoneStatusInTasks(id, status) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks[index].done = status;
        }
    }
    
    function removeTaskFromArray(id) {
        tasks = tasks.filter(task => task.id !== id);
    }

    document.addEventListener('DOMContentLoaded', function() {
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.input.addEventListener('input', function() {
            todoItemForm.button.disabled = !this.value.trim();
        });

        todoItemForm.button.disabled = true;

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let newTask = {
                name: todoItemForm.input.value,
                done: false
            };

            addTaskToArray(newTask);

            let todoItem = createTodoItem(newTask);

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                updateDoneStatusInTasks(newTask.id, !newTask.done);
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    removeTaskFromArray(newTask.id);
                }
            });

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
        });
    });
})();