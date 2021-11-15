var listItems = document.getElementById('listItems');
var data = [];
var submit = document.getElementById('submit');
var list = document.querySelectorAll('li');
console.log(list);

fetch('https://api-nodejs-todolist.herokuapp.com/task', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((response) => {
    data = response.data;
    showTasks();
  });

submit.addEventListener('click', (e) => {
  var input = document.getElementById('inputData');
  var inputValue = input.value;

  fetch('https://api-nodejs-todolist.herokuapp.com/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify({
      description: inputValue,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      input.value = '';
      data.push(response.data);
      showTasks();
    });
});

function showTasks() {
  var newList = '';
  data.forEach((element) => {
    newList += `<li class="${element.completed ? 'completed' : ''}">${
      element.description
    } ${element.completed}</li>`;
  });

  listItems.innerHTML = newList;

  console.log(newList);
}

list.forEach(("li"),(event) => { li.addEventListener('click', (element) => {
  fetch('https://api-nodejs-todolist.herokuapp.com/task/' +${count.data._id}, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: {
	"completed": true
},
  })
    .then((response) => response.json())
    .then((response) => {
      if ($(element.completed) === true) {
        return ($(element.completed) = false);
      } else {
        return ($(element.completed) = true);
      }
    });
}) });
