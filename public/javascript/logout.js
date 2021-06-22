

//ADD CLICK EVENT HANDLER THAT CALLS THE /logout ROUTE
// async function logout() {
//   const response = await fetch('/api/users/logout', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' }
//   });

//   if(response.ok){
//     document.location.replace('/');
//   } else {
//     alert(response.statusText);
//   }
// }

// document.querySelector('#logout').addEventListener('click', logout);


async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);