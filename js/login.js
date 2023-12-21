let bottone = document.querySelector(".login");

bottone.addEventListener("click", (evt) => {
 evt.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log(email, password);
  login(email, password);
});

function login(email, pass) {
  let user = {
    email: email,
    password: pass
  };

  console.log(user);
  let URL = "http://localhost:3000/login/";

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (json.user) {
        sessionStorage.setItem("token", json.accessToken);
        location.href = `index.html?name=${json.user.name}`;
      } else {
        if (json === "Incorrect password") {
          document.querySelector(".msg").innerHTML = `
                <div
                class="alert alert-danger"
                role="alert">
                <strong>Errore!</strong> Hai sbagliatoooo la password!
                </div>`;
        } else if (json === "Cannot find user") {
          document.querySelector(".msg").innerHTML = `
                <div
                class="alert alert-danger"
                role="alert">
                <strong>E tu?</strong> Chi  sei???
                </div>`;
        }
      }
    })
    .catch((err) => {
      console.log("Errore: " + err);
      document.querySelector(".msg").innerHTML = `
        <div
        class="alert alert-danger"
        role="alert">
        <strong> Errore: </strong> ${err}
        </div>`;
    });
}

// users.forEach(user => {
//     if(email === user.email && pass === user.password){
//         location.href = `home.html?nome=${user.name}`
//     } else if(email === user.email && pass == user.password){
//         console.log("password sbagliata coglione")
//     } else {
//         console.log("utente non registrato")
//     }
// })

// users => {
//     if(users.some(user => user.email === email)){
//      let candidate = users.filter(user => user.email === email);
//      if(candidate.password === pass){
//          location.href = `home.html?name=${candidate.name}`
//      } else {
//          console.log("password sbagliata pirla")
//      }
//     } else{
//      console.log("registrati")
//     }
//     }
