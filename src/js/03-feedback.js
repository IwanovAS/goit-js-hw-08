import { throttle } from 'lodash';

function saveToLocalStorage(data) {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function getFromLocalStorage() {
  const savedData = localStorage.getItem('feedback-form-state');
  return savedData ? JSON.parse(savedData) : {};
}

function fillFormFields(data) {
  const { email, message } = data;
  document.querySelector('input[name="email"]').value = email || '';
  document.querySelector('textarea[name="message"]').value = message || '';
}

function handleInputEvent(event) {
  const data = {
    email: event.target.name === 'email' ? event.target.value : getFromLocalStorage().email,
    message: event.target.name === 'message' ? event.target.value : getFromLocalStorage().message,
  };

  saveToLocalStorage(data);
}

const inputElements = document.querySelectorAll('.feedback-form input, .feedback-form textarea');
inputElements.forEach((element) => {
  element.addEventListener('input', throttle(handleInputEvent, 500));
});

function clearLocalStorage() {
  localStorage.removeItem('feedback-form-state');
}

function handleSubmit(event) {
  event.preventDefault();

  clearLocalStorage();

  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  const data = {
    email,
    message,
  };
  console.log(data);

  document.querySelector('input[name="email"]').value = '';
  document.querySelector('textarea[name="message"]').value = '';
}

const feedbackForm = document.querySelector('.feedback-form');
feedbackForm.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', () => {
  const savedData = getFromLocalStorage();
  fillFormFields(savedData);
});
