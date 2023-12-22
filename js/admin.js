let logged = false;
let username = "";
let isAdmin = false;
const token = localStorage.getItem("token");
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
      }
    });
}

showProducts();
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
      <th>Elimina</th>
      <th>Modifica</th> 
    </tr>`;
  let tbody = document.createElement("tbody");
  products.forEach((product) => {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", product.id);
    let prName = document.createElement("td");
    prName.innerText = product.nomeProdotto;
    let marca = document.createElement("td");
    marca.innerText = product.marca;
    let descr = document.createElement("td");
    descr.innerText = product.descrizioneProdotto;
    let price = document.createElement("td");
    price.innerText = product.prezzo;
    let elimina = document.createElement("td");
    elimina.innerHTML = `<button class="btn btn-danger elimina-prodotto">Elimina</button>`;
    let modifica = document.createElement("td");
    modifica.innerHTML = `<button class="btn btn-warning modifica-prodotto" data-bs-toggle="modal" data-bs-target="#exampleModal">Modifica</button>`;

    let img = document.createElement("td");
    img.classList.add("img-fluid");
    img.style.backgroundImage = `url(${product.imgUrl})`;
    img.style.backgroundSize = "cover";
    img.style.backgroundRepeat = "no-repeat";
    tr.appendChild(prName);
    tr.appendChild(marca);
    tr.appendChild(descr);
    tr.appendChild(price);
    tr.appendChild(img);
    tr.appendChild(elimina);
    tr.appendChild(modifica);

    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
}

function createPreviewBtn() {
  let a = document.createElement("a");
  let hook = document.querySelector(".admin");
  a.classList.add("admin-btn");
  a.setAttribute("href", "index.html");
  a.innerHTML = `<button class="btn btn-warning ms-3">Vedi pagina</button>`;
  hook.appendChild(a);
}

let addProducButton = document.querySelector(".add-product");

addProducButton.addEventListener("click", (e) => {
  e.preventDefault();
  let pName = document.querySelector("#nomeProdotto").value;
  let marca = document.querySelector("#marca").value;
  let descrizione = document.querySelector("#descrizione").value;
  let prezzo = document.querySelector("#prezzo").value;
  let imgUrl = document.querySelector("#immagine").value;
  console.log(pName, marca, descrizione, prezzo, imgUrl);
  let id = Product.productCounter++;
  console.log(id);
  let product = new Product(pName, marca, descrizione, prezzo, imgUrl, id);
  console.log(product);
  createNewProduct(product);
});

class Product {
  constructor(_nome, _marca, _descr, _prezzo, _imgUrl, _id) {
    this.nomeProdotto = _nome;
    this.marca = _marca;
    this.descrizioneProdotto = _descr;
    this.prezzo = _prezzo;
    this.imgUrl = _imgUrl;
    this.id = _id;
  }
  static productCounter = 2;
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

document.querySelector("table").addEventListener("click", (e) => {
  if (e.target.classList.contains("elimina-prodotto")) {
    let productId = e.target.parentNode.parentNode.dataset.id;
    eliminaProdotto(productId)
   } else if(e.target.classList.contains("modifica-prodotto")){
     let productId = e.target.parentNode.parentNode.dataset.id;
    showEditPreview(productId)

  //   location.href = `edit.html?id=${productId}`
  }
});

function eliminaProdotto(id) {
  let URL = "http://localhost:3000/products/";
  fetch(URL + id, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  });
}


function showEditPreview(id){
  const URL = "http://localhost:3000/products/"
  let prodName = document.querySelector("#mod-nomeProdotto");
  let marca = document.querySelector("#mod-marca");
  let descr = document.querySelector("#mod-descrizione");
  let prezzo = document.querySelector("#mod-prezzo");
  let imgURL = document.querySelector("#mod-immagine");
  let editBtn = document.querySelector(".edit-mod");
  fetch(URL+id)
    .then(response => response.json())
    .then(data => {
      prodName.value = data.nomeProdotto;
      marca.value = data.marca;
      descr.value = data.descrizioneProdotto;
      prezzo.value = data.prezzo;
      imgURL.value = data.imgUrl;

      editBtn.addEventListener("click", () => {
        let prod = document.querySelector("#mod-nomeProdotto").value;
        let marca = document.querySelector("#mod-marca").value;
        let descr = document.querySelector("#mod-descrizione").value;
        let prezzo = document.querySelector("#mod-prezzo").value;
        let img = document.querySelector("#mod-immagine").value;
        let editBtn = document.querySelector(".edit-mod");

        let prodModif = {
          nomeProdotto: prod,
          marca: marca,
          descrizioneProdotto: descr,
          prezzo: prezzo,
          imgUrl: img 
        }
        editProduct(id, prodModif)

      })
    })

}


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
