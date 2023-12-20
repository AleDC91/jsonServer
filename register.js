const URL = "http://localhost:3000/users/1";


fetch(URL)


let user = {
    email: "olivier@mail.com",
    password: "bestPassw0rd"
  }

fetch(URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
}).then(response => response.json())
.then(data => console.log(data)) 