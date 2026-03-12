const API = "https://crud-user-uzzz.onrender.com/users";

const table = document.getElementById("users");
const loading = document.getElementById("loading");


/* =======================
   LOAD USERS
======================= */

async function loadUsers() {

  loading.style.display = "block";

  try {

    const res = await fetch(API);

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    table.innerHTML = "";

    data.forEach(user => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>
          <button class="btn" onclick="viewUser(${user.id})">
            View
          </button>
          <button class="delete btn" onclick="deleteUser(${user.id})">
            Delete
          </button>
        </td>
      `;

      table.appendChild(row);

    });

  } catch (err) {

    console.error(err);
    alert("Error loading users");

  } finally {

    loading.style.display = "none";

  }

}


/* =======================
   ADD USER
======================= */

document
.getElementById("userForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document
  .getElementById("name")
  .value.trim();

  if (!name) {
    alert("Please enter name");
    return;
  }

  const res = await fetch(API,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({ name })
  });

  loadUsers();
});


/* =======================
   DELETE USER
======================= */

async function deleteUser(id){

  const confirmDelete = confirm("Delete this user?");
  if (!confirmDelete) return;

  try {

    const res = await fetch(`${API}/${id}`,{
      method:"DELETE"
    });

    if(!res.ok) throw new Error("Delete failed");

    loadUsers();

  } catch(err){

    alert("Error deleting user");

  }

}


/* =======================
   VIEW USER DETAIL
======================= */

async function viewUser(id){

  try{

    const res = await fetch(`${API}/${id}`);

    if(!res.ok) throw new Error("User not found");

    const user = await res.json();

    document.getElementById("detailDbId").textContent = user.id;
    document.getElementById("detailName").textContent = user.name;

    document.getElementById("editDbId").value = user.id;
    document.getElementById("editName").value = user.name;

    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";

    document.getElementById("detailModal").style.display = "flex";

  }catch(err){

    alert("Error loading user");

  }

}


/* =======================
   ENABLE EDIT
======================= */

function enableEdit(){

  document.getElementById("viewMode").style.display = "none";
  document.getElementById("editMode").style.display = "block";

}


/* =======================
   CANCEL EDIT
======================= */

function cancelEdit(){

  document.getElementById("viewMode").style.display = "block";
  document.getElementById("editMode").style.display = "none";

}


/* =======================
   UPDATE USER
======================= */

async function updateUser(){

  const id = document.getElementById("editDbId").value;
  const name = document.getElementById("editName").value;

  await fetch(`${API}/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({ name })
  });

  closeModal();
  loadUsers();
}


/* =======================
   CLOSE MODAL
======================= */

function closeModal(){
  document.getElementById("detailModal").style.display="none";
}


/* =======================
   INITIAL LOAD
======================= */

loadUsers();