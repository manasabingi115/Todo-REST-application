var listItems = document.getElementById('listItems');
var lodingIcon = document.getElementById('loding-icon');
var data = [];
var submit = document.getElementById('submit');
var API_URL = 'https://api-nodejs-todolist.herokuapp.com/task/';
var selectedTaskId = '';
var filter = ' ';
var all = document.getElementById('all');
var completed = document.getElementById('completed');
var uncompleted = document.getElementById('uncompleted');
var logout = document.getElementById('logout');
var logoutURL = 'https://api-nodejs-todolist.herokuapp.com/user/logout';
var count = 0;
 
logout.addEventListener('click', () => {
  console.log('logout');
  apiCall(logoutURL, 'POST').then((response) => {
    alert('Are you sure to logUot...');
    window.location.href = 'index.html';
  });
});

all.addEventListener('click', () => {
  filter = 'all';
  renderTasks();
});

completed.addEventListener('click', () => {
  filter = 'COMPLETED';
  renderTasks();
});

uncompleted.addEventListener('click', () => {
  filter = 'NOT_COMPLETED';
  renderTasks();
});
function renderTasks() {
  var queryParam = '';
  if (filter === 'COMPLETED') {
    queryParam = '?completed=true';
  }
  if (filter === 'NOT_COMPLETED') {
    queryParam = '?completed=false';
  }
  apiCall(API_URL + queryParam, 'GET').then((response) => {
    data = response.data.reverse();
    count = response.count;
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
      apiCall(API_URL + taskId, 'PUT', updateTaskBody).then((response) => {
        renderTasks();
      });
    });
  });
  var del = document.getElementsByClassName('delete');
  var edit = document.getElementsByClassName('edit');

  Array.from(edit).forEach((ed) => {
    ed.addEventListener('click', (event) => {
      openPopup();
      const taskDescription =
        event.target.previousElementSibling.previousElementSibling
          .previousElementSibling.innerText;
      selectedTaskId =
        event.target.previousElementSibling.previousElementSibling
          .previousElementSibling.dataset.id;
      var popIn = document.querySelector('.popupInput');
      popIn.value = taskDescription;
      const taskId = event.target.dataset.id;
    });
  });
  var update = document.querySelector('.update');
  update.addEventListener('click', (event) => {
    var popIn = document.querySelector('.popupInput');
    const taskId = event.target.dataset.id;
    var newTaskBodyUpdate = JSON.stringify({
      description: popIn.value,
    });

    apiCall(API_URL + selectedTaskId, 'PUT', newTaskBodyUpdate).then(
      (response) => {
        closePopup();
        renderTasks();
      }
    );
  });

  Array.from(del).forEach((el) => {
    el.addEventListener('click', (event) => {
      const taskId = event.target.dataset.id;
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
cancel.addEventListener('click', () => {
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
