const elementsList = document.querySelector('#elements');
const textarea = document.getElementById('textarea');
const element = document.createElement('li');
const addBtn = document.querySelector('#addBtn');

addBtn.onclick = function () {
  element.setAttribute('id', textarea.value);
  elementsList.appendChild(element);
  textarea.value = '';
}