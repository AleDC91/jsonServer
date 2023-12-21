
let logged = false;
let username = "";
let isAdmin = false;
const token = sessionStorage.getItem("token");



if (token) {
  logged = true;
  showProducts();
  isAdminfromToken(token);
  if (document.referrer.includes("login.html")) {
    let searchParams = new URLSearchParams(window.location.search);
    username = searchParams.get("name");
    updateUsername(username);
    console.log(username);
  } else {
    console.log(token);
    getUsernameFromToken(token);
  }
} else {
  username = "Guest";
  console.log(username);
  updateUsername(username);
}
console.log(username);
document.querySelector(".ciao span").innerText = username;

async function getUsernameFromToken(token) {
  const URL = "http://localhost:3000/users/";
  jwt_elements = token.split(".");
  token_body = atob(jwt_elements[1]);
  json_token_body = JSON.parse(token_body);
  console.log(json_token_body);
  userId = json_token_body.sub;
  fetch(URL + userId)
    .then((response) => response.json())
    .then((data) => {
      username = data.name;
      console.log(username);
      updateUsername(username);
      return username;
    });
}

if (logged) {
  document.querySelector(".login-btn").style.display = "none";
  document.querySelector(".register-btn").style.display = "none";
  document.querySelector(".logout-btn").style.display = "block";
  document.querySelector(".logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    location.href = "index.html";
  });
}

function updateUsername(username) {
  console.log(username);
  document.querySelector(".ciao span").innerHTML = username;
}

function isAdminfromToken(token) {
  const URL = "http://localhost:3000/users/";
  jwt_elements = token.split(".");
  token_body = atob(jwt_elements[1]);
  json_token_body = JSON.parse(token_body);
  // console.log(json_token_body)
  userId = json_token_body.sub;
  fetch(URL + userId)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.isAdmin)
      if (data.isAdmin === true) {
        createAdminBtn();
      }
    });
}

function showProducts() {
  const URL = "http://localhost:3000/products/";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      createTable(data);
      console.log(data);
    });
}

function createTable(products) {
  let table = document.querySelector(".products-table");
  let thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Nome Prodotto</th>
      <th>Marca</th>
      <th>Descrizione</th>
      <th>Prezzo</th>
      <th>Immagine</th>
    </tr>`;
  let tbody = document.createElement("tbody");
  products.forEach((product) => {
    let tr = document.createElement("tr");
    let prName = document.createElement("td");
    prName.innerText = product.nomeProdotto;
    let marca = document.createElement("td");
    marca.innerText = product.marca;
    let descr = document.createElement("td");
    descr.innerText = product.descrizioneProdotto;
    let price = document.createElement("td");
    price.innerText = product.prezzo;
    let img = document.createElement("td");
    img.classList.add("img-fluid")
    img.style.backgroundImage = `url(${product.imgUrl})`
    img.style.backgroundSize = "cover";
    img.style.backgroundRepeat = "no-repeat";

    tr.appendChild(prName);
    tr.appendChild(marca);
    tr.appendChild(descr);
    tr.appendChild(price);
    tr.appendChild(img);

    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);


}

function createAdminBtn() {
  let a = document.createElement("a");
  let hook = document.querySelector(".admin");
  a.classList.add("admin-btn");
  a.setAttribute("href", "admin.html");
  a.innerHTML = `<button class="btn btn-primary ms-3">Admin Panel</button>`;
  hook.appendChild(a);
}
