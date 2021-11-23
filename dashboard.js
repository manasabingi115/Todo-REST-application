var listItems = document.getElementById('listItems');
var todo = document.getElementById('head');
var loadingIcon = document.getElementById('loading-icon');
var data = [];
var inputData = document.getElementById('inputData');
var submit = document.getElementById('submit');
var API_URL = 'https://api-nodejs-todolist.herokuapp.com/task/';
var selectedTaskId = '';
var filter = ' ';
var all = document.getElementById('all');
var completed = document.getElementById('completed');
var uncompleted = document.getElementById('uncompleted');
var logout = document.getElementById('logout');
var logoutURL = 'https://api-nodejs-todolist.herokuapp.com/user/logout';
var pagination = document.getElementById('pagination');
var count = 0;
var currentPageIndex = 0;
var pageLimit = 10;
var numbers = document.getElementsByClassName('numbers');

logout.addEventListener('click', () => {
  console.log('logout');
  var shoudLogout = confirm('Are you sure to logUot...');
  if (shoudLogout) {
    apiCall(logoutURL, 'POST').then((response) => {
      window.location.href = 'index.html';
    });
  }
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
  var queryParam = '?';
  if (filter === 'COMPLETED') {
    queryParam += 'completed=true';
  }
  if (filter === 'NOT_COMPLETED') {
    queryParam += 'completed=false';
  }
  // queryParam += `limit=${pageLimit}&skip=${(currentPage - 1) * 10}`;
  apiCall(API_URL + queryParam, 'GET').then((response) => {
    data = response.data.reverse();
    count = response.count;
    showTasks();
  });
}
renderTasks();

function addListItem() {
  var input = document.getElementById('inputData');
  var inputValue = input.value;
  var newTaskBody = JSON.stringify({
    description: inputValue,
  });
  apiCall(API_URL, 'POST', newTaskBody).then((response) => {
    input.value = '';
    renderTasks();
  });
}
submit.addEventListener('click', () => {
  addListItem();
});
inputData.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    addListItem();
  }
});

function showTasks() {
  var newList = '';
  var currentData = data.slice(
    currentPageIndex * pageLimit,
    (currentPageIndex + 1) * pageLimit
  );
  currentData.forEach((element, index) => {
    newList += `<li class="${element.completed ? 'completed' : ''}" data-id="${
      element._id
    }">${data.findIndex((el) => el._id === element._id) + 1} ${
      element.description
    } 
    </li><br><button class="delete" data-id="${
      element._id
    }">delete</button><i class='far fa-edit edit' data-id="${
      element._id
    }"></i>`;
  });
  listItems.innerHTML = newList;
  // console.log(count);
  var pages = Math.ceil(count / 10);
  // console.log(pages);
  var pageCount = `<button id="shiftLeft"><i class='fas fa-angle-double-left'></i></button>`;
  for (i = 1; i <= pages; i++) {
    pageCount += `<button class="numbers">${i}</button>`;
  }
  pageCount += `<button id="shiftRight"><i class='fas fa-angle-double-right'></i></button>`;
  pagination.innerHTML = pageCount;

  Array.from(numbers).forEach((num) => {
    num.addEventListener('click', (e) => {
      e.target.style.color = 'red';
      console.log(e.target.innerText);
      currentPageIndex = e.target.innerText - 1;
      showTasks();
      queryPage = '?limit=10&skip=10';
      apiCall(API_URL + queryPage, 'GET').then((response) => {
        renderTasks();
      });
    });
  });

  var shiftLeft = document.getElementById('shiftLeft');
  shiftLeft.addEventListener('click', () => {
    if (currentPageIndex > 0) {
      currentPageIndex = currentPageIndex - 1;
      showTasks();
      console.log(currentPageIndex);
    }
  });
  var shiftRight = document.getElementById('shiftRight');
  shiftRight.addEventListener('click', () => {
    if (currentPageIndex < pages - 1) {
      currentPageIndex = currentPageIndex + 1;
      showTasks();
      console.log(currentPageIndex);
    }
  });

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
  loadingIcon.classList.add('lds-dual-ring');
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: body,
  });
  const data = await response.json();
  loadingIcon.classList.remove('lds-dual-ring');
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
