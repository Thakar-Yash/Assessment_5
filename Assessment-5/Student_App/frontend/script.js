let editingId = null; 

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    stud_id: document.getElementById("id").value,
    stud_name: document.getElementById("name").value,
    stud_email: document.getElementById("email").value,
    stud_birthdate: document.getElementById("dob").value,
  };

  const url = editingId ? `/api/students/edit/${editingId}` : "/api/students/add";
  const method = editingId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.ok) {
    document.getElementById("msg").innerText = editingId ? "✅ Student Updated!" : "✅ Student Added!";
    document.getElementById("studentForm").reset();
    editingId = null;
    document.getElementById("submitBtn").innerText = "Add Student";
    loadStudents();
  } else {
    document.getElementById("msg").innerText = "❌ Error: " + result.error;
  }
});

async function loadStudents() {
  const res = await fetch("/api/students/all");
  const students = await res.json();

  const list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach((student) => {
    list.innerHTML += `
      <li>
        <b>ID:</b> ${student.stud_id} |
        <b>Name:</b> ${student.stud_name} |
        <b>Email:</b> ${student.stud_email} |
        <b>DOB:</b> ${new Date(student.stud_birthdate).toLocaleDateString()} |
        <button onclick="startEditStudent('${student._id}', '${student.stud_id}', '${student.stud_name}', '${student.stud_email}', '${student.stud_birthdate}')">Update</button>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
      </li>
    `;
  });
}

function startEditStudent(_id, stud_id, name, email, dob) {
  editingId = _id;
  document.getElementById("id").value = stud_id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("dob").value = dob.split("T")[0]; // trim time part
  document.getElementById("submitBtn").innerText = "Update";
}

async function deleteStudent(id) {
  const res = await fetch(`/api/students/delete/${id}`, { method: "DELETE" });
  const result = await res.json();
  if (res.ok) {
    alert("✅ Student deleted");
    loadStudents();
  } else {
    alert("❌ Delete failed: " + result.error);
  }
}

document.getElementById("listStudents").addEventListener("click", loadStudents);
