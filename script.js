const API = "https://crud-user-uzzz.onrender.com/users";

const table = document.getElementById("users");
const loading = document.getElementById("loading");

/* LOAD USERS */

async function loadUsers() {

  loading.style.display = "block";

  const res = await fetch(API);
  const data = await res.json();

  table.innerHTML = "";

  data.forEach(user => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>
        <button class="delete btn" onclick="deleteUser('${user.id}')">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);

  });

  loading.style.display = "none";
}


/* ADD USER */

document.getElementById("userForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, name })
  });

  /* reset form */

  document.getElementById("id").value = "";
  document.getElementById("name").value = "";

  /* update UI */

  loadUsers();

});


/* DELETE USER */

async function deleteUser(id) {

  const confirmDelete = confirm("Delete this user?");
  if (!confirmDelete) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadUsers();

}


/* INITIAL LOAD */

loadUsers();