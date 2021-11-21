var user = document.getElementById('user');


var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  name: 'Muhammad Nur Ali',
  email: 'muh.nurali43@gmail.com',
  password: '12345678',
  age: 20,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://api-nodejs-todolist.herokuapp.com/user/register', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
