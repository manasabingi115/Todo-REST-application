var user = document.getElementById('user');
var password = document.getElementById('password');
var email = document.getElementById('email');
var age = document.getElementById('age');
var create = document.getElementById('create');
var result;
var cancel = document.getElementById('cancel');

create.addEventListener('click', (e) => {
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    name: user.value,
    email: email.value,
    password: password.value,
    age: age.value,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://api-nodejs-todolist.herokuapp.com/user/register',
    requestOptions
  )
    .then((response) => {
      // if (response.status != 201) {
      //   throw new Error('account not created');
      // }
      return response.text();
      alert('created');
    })
    .then((result) => {
      sessionStorage.setItem('token', result.token);
      window.location.href = 'index.html';
      console.log(result);
    })
    .catch((error) => {
      alert('Error');
      console.log('error', error);
    });
});

cancel.addEventListener('click', () => {
  window.location.href = 'index.html';
});