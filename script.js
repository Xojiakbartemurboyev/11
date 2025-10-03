const userList = document.getElementById("userList");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let users = [];
let filteredUsers = [];

// API'dan foydalanuvchilarni olish
async function fetchUsers() {
  loading.style.display = "block";
  try {
    const res = await fetch("https://randomuser.me/api/?results=100");
    const data = await res.json();
    users = data.results.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      age: user.dob.age,
      city: user.location.city,
      country: user.location.country,
      picture: user.picture.medium
    }));
    filteredUsers = [...users];
    renderUsers();
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    loading.style.display = "none";
  }
}

// Foydalanuvchilarni chiqarish
function renderUsers() {
  userList.innerHTML = "";
  if (filteredUsers.length === 0) {
    userList.innerHTML = "<p>No users found.</p>";
    return;
  }
  filteredUsers.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <img src="${user.picture}" alt="${user.name}">
      <h3>${user.name}</h3>
      <p>Age: ${user.age}</p>
      <p>${user.city}, ${user.country}</p>
    `;
    userList.appendChild(card);
  });
}

// Qidiruv
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query)
  );
  renderUsers();
});

// Sortlash
sortSelect.addEventListener("change", e => {
  const value = e.target.value;
  if (value === "name-asc") {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === "name-desc") {
    filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
  } else if (value === "age-asc") {
    filteredUsers.sort((a, b) => a.age - b.age);
  } else if (value === "age-desc") {
    filteredUsers.sort((a, b) => b.age - a.age);
  }
  renderUsers();
});

// Boshlash
fetchUsers();
