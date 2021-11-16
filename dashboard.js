var listItems = document.getElementById('listItems');
var data = [];
var submit = document.getElementById('submit');

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
    newList += `<li class="${element.completed ? 'completed' : ''}" data-id="${
      element._id
    }">${element.description} ${element.completed}</li>`;
  });

  listItems.innerHTML = newList;

  var list = document.querySelectorAll('li');
  list.forEach((li) => {
    // event.target.classList
    li.addEventListener('click', (event) => {
      // console.log(event.target);
      console.log(event.target.classList);
      fetch(
        `https://api-nodejs-todolist.herokuapp.com/task/${event.target.dataset.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify({
            completed: !Array.from(event.target.classList).includes(
              'completed'
            ),
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          // if (event.target.classlist === 'completed') {
          //   event.target.classlist = '';
          // }
        });
    });
  });
}
