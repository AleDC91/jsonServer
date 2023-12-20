let spazio = document.querySelector(".ciao span");

let searchParams = new URLSearchParams(window.location.search);
let username = searchParams.get("name");
spazio.innerText = username;