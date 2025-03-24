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
    formAddTask.classList.toggle('show');
});

buttonConfirmForm.addEventListener('click', (event) => {
    event.preventDefault();
    const task = {
        descricao: inputTask.value,
        concluida: false
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

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    idTask++;
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



    const taskName = document.createElement('p');
    taskName.textContent = tarefa.descricao;
    taskName.classList.add('app__section-task-list-item-description');

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('app_button-edit');

    const buttonImg = document.createElement('img');
    buttonImg.src = 'assets/icons/edit.png';
    buttonEdit.appendChild(buttonImg);

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




    li.appendChild(checkBox);
    li.appendChild(taskName);
    li.appendChild(buttonEdit);

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
            console.log(taskList);
    }else{
        const todasTasks = document.querySelectorAll('.app__section-task-list-item');
        todasTasks.forEach(element => {
            sectionTaskList.removeChild(element);
            
        }) 
        taskList = [];
        atualizaLocalStorage();
        console.log(taskList);
    }
}

buttonRemoveConcluidas.addEventListener('click', () => {
    removeTasks(true);
});

buttonRemoveTodas.addEventListener('click', () => { 
    removeTasks(false);
});