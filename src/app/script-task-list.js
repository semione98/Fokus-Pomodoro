const buttonOpenForm = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const buttonCloseForm = document.querySelector('.app__form-footer__button--cancel');
const buttonConfirmForm = document.querySelector('.app__form-footer__button--confirm');
const buttonDeleteForm = document.querySelector('.app__form-footer__button--delete');
const inputTask = document.querySelector('.app__form-textarea');
const sectionTaskList = document.querySelector('.app__section-task-list');
const taskNameActive = document.querySelector('.app__section-active-task-description');
const buttonRemoveTodas = document.getElementById('btn-remover-todas');
const buttonRemoveConcluidas = document.getElementById('btn-remover-concluidas');

let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
let idTask = taskList.length || 0;



function atualizaLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

buttonOpenForm.addEventListener('click', () => {
    formAddTask.classList.add('show');
});

buttonConfirmForm.addEventListener('click', (event) => {
    event.preventDefault();
    const dataAtual = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const dataFormatada = dataAtual.toLocaleString('pt-BR', options);

    const task = {
        id: idTask,
        descricao: inputTask.value,
        concluida: false,
        dataTask: dataFormatada
    };

    taskList.push(task);
    atualizaLocalStorage();

    const elementoTarefa = criarElementoTarefa(task);

    sectionTaskList.appendChild(elementoTarefa);

    inputTask.value = '';
    formAddTask.classList.remove('show');

});

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const divItemNav = document.createElement('div');
    divItemNav.classList.add('app__section-task-list-item-nav');


    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.id = idTask;

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            tarefa.concluida = true;
            li.classList.add('app__section-task-list-item-complete');
            buttonEdit.setAttribute('disabled', true);
            atualizaLocalStorage();

        }else{
            tarefa.concluida = false;
            li.classList.remove('app__section-task-list-item-complete');
            atualizaLocalStorage();
            buttonEdit.removeAttribute('disabled');
        }
    });

    divItemNav.appendChild(checkBox);

    const divItemText = document.createElement('div');
    divItemText.classList.add('app__section-task-list-item-text');

    const taskName = document.createElement('p');
    taskName.textContent = tarefa.descricao;
    taskName.classList.add('app__section-task-list-item-description');

    const taskDate = document.createElement('p');
    taskDate.textContent = tarefa.dataTask;
    taskDate.classList.add('app__section-task-list-item-date'); 

    divItemText.appendChild(taskName);
    divItemText.appendChild(taskDate);
    divItemNav.appendChild(divItemText);

    const divItemButton = document.createElement('div');
    divItemButton.classList.add('app__section-task-list-item-button');

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('app_button-delete');
    const buttonDeleteImg = document.createElement('img');
    buttonDeleteImg.src = 'assets/icons/delete.png';
    buttonDelete.appendChild(buttonDeleteImg);
    buttonDelete.onclick = () => {
        let idCheck = checkBox.id;
        taskList = taskList.filter(task => task.id != idCheck);
        
        atualizaLocalStorage();
        sectionTaskList.removeChild(li);
        
    }
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('app_button-edit');
    const buttonEditImg = document.createElement('img');
    buttonEditImg.src = 'assets/icons/edit.png';
    buttonEdit.appendChild(buttonEditImg);

    buttonEdit.onclick = ()=>{
        const inputEdit = prompt('Digite a nova tarefa')
        if(inputEdit){
            taskName.textContent = inputEdit;
            tarefa.descricao = inputEdit;
            atualizaLocalStorage();
        }else{
            alert('Tarefa não alterada, digite algo.')
        }
    }

    divItemButton.appendChild(buttonEdit);
    divItemButton.appendChild(buttonDelete);

    li.appendChild(divItemNav);
    li.appendChild(divItemButton);


    if(tarefa.concluida){
        li.classList.add('app__section-task-list-item-complete');
        checkBox.checked = true;
        buttonEdit.setAttribute('disabled', true);
    }else{

        li.onclick = (event) => {
            if(event.target.tagName != 'INPUT'){
                const todasTaks = document.querySelectorAll('.app__section-task-list-item');
    
           
    
                todasTaks.forEach(element => {
        
                    if(element.classList.contains('app__section-task-list-item-active')){
                        element.classList.remove('app__section-task-list-item-active');
                    }
        
                });
        
        
                if(taskName.textContent === taskNameActive.textContent){
                    taskNameActive.textContent = '';
                    li.classList.remove('app__section-task-list-item-active');
                }else{
                    taskNameActive.textContent = tarefa.descricao;
                    li.classList.add('app__section-task-list-item-active');
                }
            }
           
    
            
        }
    }




    idTask++;
    return li;
    
}

taskList.forEach(element => {
    const elementoTarefa = criarElementoTarefa(element);
    sectionTaskList.appendChild(elementoTarefa);
    
});

function removeTasks(x){
    if(x == true){
        const tasksConcluidas = document.querySelectorAll('.app__section-task-list-item-complete');
        tasksConcluidas.forEach(element => {
            sectionTaskList.removeChild(element);
            
        

        });

        taskList = taskList.filter(tarefa => tarefa.concluida == false);
            atualizaLocalStorage();
            
    }else{
        const todasTasks = document.querySelectorAll('.app__section-task-list-item');
        todasTasks.forEach(element => {
            sectionTaskList.removeChild(element);
            
        }) 
        taskList = [];
        atualizaLocalStorage();
        
    }
}

buttonRemoveConcluidas.addEventListener('click', () => {
    removeTasks(true);
});

buttonRemoveTodas.addEventListener('click', () => { 
    removeTasks(false);
});

buttonCloseForm.addEventListener('click', () => {
    formAddTask.classList.remove('show');
});

buttonDeleteForm.addEventListener('click', () => {
    inputTask.value = '';
});