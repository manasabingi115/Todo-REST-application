var listItems = document.getElementById('listItems');

var submit = document.getElementById('submit');

fetch('https://api-nodejs-todolist.herokuapp.com/task', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((response) => {
    var newList = '';
    response.data.forEach((element) => {
      newList += `<li class="${element.completed ? 'completed' : ''}">${
        element.description
      } ${element.completed}</li>`;
    });

    listItems.innerHTML = newList;

    console.log(newList);
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
    });
});
