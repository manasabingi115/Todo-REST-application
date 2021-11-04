var listItems = document.getElementById('listItems');

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
