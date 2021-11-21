var user = document.getElementById('user');
var password = document.getElementById('password');
var email = document.getElementById('email');
var age = document.getElementById('age');
var create = document.getElementById('create');
var result;

create.addEventListener('click', (e) => {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    name: user.value,
    email: password.value,
    password: email.value,
    age: age.value,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://api-nodejs-todolist.herokuapp.com/user/login', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert('login succefull');
      sessionStorage.setItem('token', result.token);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => alert('login failed please try again'));
});

// fetch('https://api-nodejs-todolist.herokuapp.com/user/register', requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log('error', error));
