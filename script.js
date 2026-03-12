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
    const data = await res.json();

    table.innerHTML = "";

    data.forEach(user => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.mssv}</td>
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

    alert("Error loading users");

  }

  loading.style.display = "none";
}


/* =======================
   ADD USER
======================= */

document
  .getElementById("userForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const mssv = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!mssv || !name) {
      alert("Please fill all fields");
      return;
    }

    try {

      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mssv, name })
      });

      document.getElementById("id").value = "";
      document.getElementById("name").value = "";

      loadUsers();

    } catch (err) {

      alert("Error adding user");

    }

  });


/* =======================
   DELETE USER
======================= */

async function deleteUser(id) {

  const confirmDelete = confirm("Delete this user?");
  if (!confirmDelete) return;

  try {

    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    loadUsers();

  } catch (err) {

    alert("Error deleting user");

  }

}


/* =======================
   VIEW USER DETAIL
======================= */

async function viewUser(id){

  const res = await fetch(`${API}/${id}`);
  const user = await res.json();

  document.getElementById("detailId").textContent = user.mssv;
  document.getElementById("detailName").textContent = user.name;

  document.getElementById("editId").value = user.id;
  document.getElementById("editName").value = user.name;

  document.getElementById("viewMode").style.display = "block";
  document.getElementById("editMode").style.display = "none";

  document.getElementById("detailModal").style.display = "flex";
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

  const id = document.getElementById("editId").value;
  const name = document.getElementById("editName").value;

  try{

    await fetch(`${API}/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ name })
    });

    closeModal();
    loadUsers();

  }catch(err){

    alert("Error updating user");

  }

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