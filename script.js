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
        <td>${user.name}</td>
        <td>

          <button class="btn" onclick="viewUser('${user.id}')">
            View
          </button>

          <button class="delete btn" onclick="deleteUser('${user.id}')">
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

    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!id || !name) {
      alert("Please fill all fields");
      return;
    }

    try {

      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name })
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

async function viewUser(id) {

  try {

    const res = await fetch(`${API}/${id}`);
    const user = await res.json();

    document.getElementById("detailId").textContent = user.id;
    document.getElementById("detailName").textContent = user.name;

    document.getElementById("detailModal").style.display = "block";

  } catch (err) {

    alert("Error loading user");

  }

}


function closeModal() {

  document.getElementById("detailModal").style.display = "none";

}


/* =======================
   INITIAL LOAD
======================= */

loadUsers();