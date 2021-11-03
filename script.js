var user = document.getElementById('user');
var password = document.getElementById('password');
var submit = document.getElementById('submit');

var result;
submit.addEventListener('click', function (e) {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: user.value,
    password: password.value,
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
    })
    .catch((error) => alert('login failed please try again'));
});
