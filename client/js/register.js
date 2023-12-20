const URL = "http://localhost:3000/register/1";


fetch(URL, {
    method: "POST",
    headers: {"Content-Type": "application-json"},
    body: {
        "email": "adfb@sfgbs.df",
        "password": "3waerfghv"
    }
})