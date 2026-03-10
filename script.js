const API_URL = "https://crud-user-uzzz.onrender.com/users"

async function loadUsers(){

const loading = document.getElementById("loading")
loading.style.display = "block"

const res = await fetch(API_URL)
const data = await res.json()

const table = document.getElementById("users")
table.innerHTML=""

data.forEach(user => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${user.id}</td>
<td>${user.name}</td>
`

table.appendChild(row)

})

loading.style.display = "none"
}

function reloadUsers(){
loadUsers()
}

loadUsers()