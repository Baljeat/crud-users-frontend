const API = "https://crud-user-uzzz.onrender.com/users"

const table = document.getElementById("users")
const loading = document.getElementById("loading")

async function loadUsers(){

loading.style.display="block"

const res = await fetch(API)
const data = await res.json()

table.innerHTML=""

data.forEach(user=>{

const row=document.createElement("tr")

row.innerHTML=`
<td>${user.id}</td>
<td>${user.name}</td>
<td>
<button class="delete btn" onclick="deleteUser('${user.id}')">
Delete
</button>
</td>
`

table.appendChild(row)

})

loading.style.display="none"

}

function reloadUsers(){
loadUsers()
}

/* CREATE USER */

document.getElementById("userForm")
.addEventListener("submit",async e=>{

e.preventDefault()

const id=document.getElementById("id").value
const name=document.getElementById("name").value

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({id,name})
})

document.getElementById("id").value=""
document.getElementById("name").value=""

loadUsers()

})

/* DELETE USER */

async function deleteUser(id){

if(!confirm("Delete this user?")) return

await fetch(`${API}/${id}`,{
method:"DELETE"
})

loadUsers()

}

loadUsers()