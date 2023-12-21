
class User {
    constructor(_name, _surname, _email, _password, _age){
        this.name = _name;
        this.surname = _surname;
        this.email = _email;
        this.password = _password;
        this.age = _age;
    }
}


let bottone = document.querySelector(".register");



bottone.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const age = document.querySelector("#eta").value;

    console.log(email, password, name, surname, age )
    
    let user = new User(name, surname, email, password, age);
    // console.log(user);

    createUser(user)
})





function createUser(user){
    let URL = "http://localhost:3000/users/";
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(data => { location.href = `index.html`
    })
}





// let user = {
//     "email": "madonn@putt.ana",
//     "password": "bastardone",
//     "firstname": "cane",
//     "lastname": "porcoide",
//     "age": 33
//   }
