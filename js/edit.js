let logged = false;
let username = "";
let isAdmin = false;
const token = sessionStorage.getItem("token");
let searchParams = new URLSearchParams(window.location.search);
productId = searchParams.get("id");
if (token) {
  logged = true;
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
    localStorage.removeItem("token");
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
        createPreviewBtn();
        createAdminBtn();
        getImage(productId)
      }
    });
}

function createAdminBtn() {
    let a = document.createElement("a");
    let hook = document.querySelector(".admin");
    a.classList.add("admin-btn");
    a.setAttribute("href", "admin.html");
    a.innerHTML = `<button class="btn btn-primary ms-3">Admin Panel</button>`;
    hook.appendChild(a);
  }
  
function createPreviewBtn() {
  let a = document.createElement("a");
  let hook = document.querySelector(".preview");
  a.classList.add("admin-btn");
  a.setAttribute("href", "index.html");
  a.innerHTML = `<button class="btn btn-warning ms-3">Vedi pagina</button>`;
  hook.appendChild(a);
}



function createNewProduct(product) {
  const URL = "http://localhost:3000/products/";
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}


function getImage(id){
    let imgSpot = document.querySelector(".img-prod");
    let pName = document.querySelector("#nomeProdotto");
    let marca = document.querySelector("#marca");
    let descrizione = document.querySelector("#descrizione");
    let prezzo = document.querySelector("#prezzo");
    let imgUrl = document.querySelector("#immagine");

    const URL = "http://localhost:3000/products/";

    fetch(URL+id).then(response => response.json())
    .then(data => {
        imgSpot.style.backgroundImage = `url(${data.imgUrl})`;
            pName.value = data.nomeProdotto;
            marca.value = data.marca;
            descrizione.value = data.descrizioneProdotto;
            prezzo.value = Number(data.prezzo);
            imgUrl.value = data.imgUrl;
      })
}


document.querySelector(".edit-product").addEventListener("click", () => {
    let pName = document.querySelector("#nomeProdotto").value;
    let marca = document.querySelector("#marca").value;
    let descrizione = document.querySelector("#descrizione").value;
    let prezzo = document.querySelector("#prezzo").value;
    let imgUrl = document.querySelector("#immagine").value;

    let prod = {
            nomeProdotto: pName,
            marca: marca,
            descrizioneProdotto: descrizione,
            prezzo: prezzo,
            imgUrl: imgUrl,
            id: productId
    }

    editProduct(productId, prod)
})


function editProduct(id, product) {
  const URL = "http://localhost:3000/products/";
  fetch(URL+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}
