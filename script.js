let consultas = JSON.parse(localStorage.getItem('consultas')) || [
    { id: 1, pet: "Bolt", date: "2025-02-10", vet: "Dra. Ana" },
    { id: 2, pet: "Mia", date: "2025-02-15", vet: "Dr. Lucas" }
];

const consultaList = document.getElementById("consulta-list");
const addConsultaBtn = document.getElementById("add-consulta");
const formContainer = document.getElementById("form-container");
const consultaForm = document.getElementById("consulta-form");
const cancelBtn = document.getElementById("cancel");

function renderConsultas() {
    consultaList.innerHTML = "";
    consultas.forEach((consulta) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Pet:</strong> ${consulta.pet} <br>
            <strong>Data:</strong> ${consulta.date} <br>
            <strong>Veterinário:</strong> ${consulta.vet}
            <button class="edit-btn" data-id="${consulta.id}">Editar</button>
            <button class="delete-btn" data-id="${consulta.id}">Excluir</button>
        `;

        const deleteBtn = li.querySelector(".delete-btn");
        const editBtn = li.querySelector(".edit-btn");

        deleteBtn.addEventListener("click", function() {
            deleteConsulta(consulta.id);
        });

        editBtn.addEventListener("click", function() {
            editConsulta(consulta.id);
        });

        consultaList.appendChild(li);
    });
}

function deleteConsulta(id) {
    consultas = consultas.filter(consulta => consulta.id !== id);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    renderConsultas();
}

function editConsulta(id) {
    const consulta = consultas.find(c => c.id === id);
    document.getElementById("pet-name").value = consulta.pet;
    document.getElementById("date").value = consulta.date;
    document.getElementById("vet").value = consulta.vet;
    formContainer.style.display = "block";
    consultaForm.setAttribute("data-edit-id", id);
}

consultaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const petName = document.getElementById("pet-name").value;
    const date = document.getElementById("date").value;
    const vet = document.getElementById("vet").value;

    if (!petName || !date || !vet) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const consultaId = consultaForm.getAttribute("data-edit-id");
    if (consultaId) {
        updateConsulta(consultaId, petName, date, vet);
    } else {
        addConsulta(petName, date, vet);
    }
});

function addConsulta(petName, date, vet) {
    const newConsulta = {
        id: consultas.length + 1,
        pet: petName,
        date: date,
        vet: vet
    };

    consultas.push(newConsulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    renderConsultas();
    formContainer.style.display = "none";
}

function updateConsulta(id, petName, date, vet) {
    const consultaIndex = consultas.findIndex(c => c.id === parseInt(id));
    if (consultaIndex !== -1) {
        consultas[consultaIndex] = { id: parseInt(id), pet: petName, date, vet };
        localStorage.setItem('consultas', JSON.stringify(consultas));
        renderConsultas();
        formContainer.style.display = "none";
    }
}

cancelBtn.addEventListener("click", function() {
    formContainer.style.display = "none";
});

addConsultaBtn.addEventListener("click", function() {
    formContainer.style.display = "block";
    consultaForm.removeAttribute("data-edit-id");
});

renderConsultas();
