document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var id = document.getElementById('id').value;
  fetch('http://localhost:8082/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      document.cookie = `accessToken=${data}; path=/`;
      window.location.href = 'index.html'; //경로 수정
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
