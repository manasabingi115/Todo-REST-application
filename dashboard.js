var listItems = document.getElementById('listItems');
var lodingIcon = document.getElementById('loding-icon');
var data = [];
var submit = document.getElementById('submit');
var API_URL = 'https://api-nodejs-todolist.herokuapp.com/task/';

function renderTasks() {
  apiCall(API_URL, 'GET').then((response) => {
    data = response.data.reverse();
    showTasks();
  });
}
renderTasks();
submit.addEventListener('click', (e) => {
  var input = document.getElementById('inputData');
  var inputValue = input.value;
  var newTaskBody = JSON.stringify({
    description: inputValue,
  });
  apiCall(API_URL, 'POST', newTaskBody).then((response) => {
    input.value = '';
    renderTasks();
  });
});

function showTasks() {
  var newList = '';
  data.forEach((element) => {
    newList += `<li class="${element.completed ? 'completed' : ''}" data-id="${
      element._id
    }">${element.description} 
    </li><br><button class="delete" data-id="${
      element._id
    }">delete</button><button class="edit" data-id="${
      element._id
    }">Edit</button>`;
  });

  listItems.innerHTML = newList;

  var list = document.querySelectorAll('li');
  list.forEach((li) => {
    li.addEventListener('click', (event) => {
      const taskId = event.target.dataset.id;
      const updateTaskBody = JSON.stringify({
        completed: !Array.from(event.target.classList).includes('completed'),
      });
      // console.log(event.target.classList);
      apiCall(API_URL + taskId, 'PUT', updateTaskBody).then((response) => {
        renderTasks();
      });
    });
  });
  var del = document.getElementsByClassName('delete');
  var edit = document.getElementsByClassName('edit');
  var update = document.querySelector('.update');
  Array.from(edit).forEach((ed) => {
    ed.addEventListener('click', (event) => {
      openPopup();
      const taskDescription =
        event.target.previousElementSibling.previousElementSibling
          .previousElementSibling.innerText;
      var popIn = document.querySelector('.popupInput');
      popIn.value = taskDescription;
      console.log(popIn.value);
      // var newTaskBodyUpdate = JSON.stringify({
      //   description: popIn.value,
      // });
      const taskId = event.target.dataset.id;
      // apiCall(API_URL + taskId, 'PUT', newTaskBodyUpdate).then((response) => {
      //   renderTasks();
      // });
    });
  });

  Array.from(del).forEach((el) => {
    el.addEventListener('click', (event) => {
      // console.log('hello name');
      const taskId = event.target.dataset.id;
      console.log(taskId);
      apiCall(API_URL + taskId, 'DELETE').then((response) => {
        renderTasks();
      });
    });
  });
}

async function apiCall(url, method, body) {
  lodingIcon.classList.add('lds-dual-ring');
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: body,
  });
  const data = await response.json();
  lodingIcon.classList.remove('lds-dual-ring');
  return data;
}

var cancel = document.querySelector('.cancel');
// console.log(cancel);
cancel.addEventListener('click', () => {
  // console.log('name');
  closePopup();
});
function openPopup() {
  var open = document.querySelector('.popup-container');
  open.style.display = 'flex';
}
function closePopup() {
  var close = document.querySelector('.popup-container');
  close.style.display = 'none';
}
