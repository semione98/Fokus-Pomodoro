const buttonOpenForm = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const buttonCloseForm = document.querySelector('.app__form-footer__button--cancel');
const buttonConfirmForm = document.querySelector('.app__form-footer__button--confirm');
const buttonDeleteForm = document.querySelector('.app__form-footer__button--delete');
const inputTask = document.querySelector('.app__form-textarea');
const sectionTaskList = document.querySelector('.app__section-task-list');

const taskList = [];

buttonOpenForm.addEventListener('click', () => {
    formAddTask.classList.toggle('show');
});