// ---------------------------------------------------------------
// MAIN - CONTROL TOTAL DE LA APP
// ---------------------------------------------------------------
import { validateUserService } from "./services/userService.js";
import { getTasksByUser, saveTask } from "./services/tasksService.js";
import { renderTasks } from "./ui/tasksUi.js";
import { showUserSections, hideUserSections } from "./ui/layoutUI.js";

//implementacion del RF04
import { generateTasksJSON } from "./services/exportService.js";
import { downloadJSONFile } from "./ui/exportUI.js";

const validateBtn = document.getElementById("validateBtn");
const documentoInput = document.getElementById("documento");

const userInfo = document.getElementById("userInfo");
const form = document.getElementById("task-section");
const messages = document.getElementById("messages-section");

// Evita que cualquier formulario en la página refresque la pantalla por error

const container = document.getElementById("messagesContainer");
const nameDisplay = document.getElementById("userNameDisplay");
const emailDisplay = document.getElementById("userEmailDisplay");

let currentUser = null;
let visibleTasks = [];

document.addEventListener("DOMContentLoaded", () => {
console.log("APP INICIADA", Math.random());
// 🔒 Al iniciar solo se ve validación
hideUserSections(userInfo, form, messages);

// ================= VALIDAR USUARIO =================
validateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = documentoInput.value.trim();

    if (!id || isNaN(id)) {
        alert("ID inválido");
        return;
    }

    try {
        currentUser = await validateUserService(id);

        nameDisplay.textContent = currentUser.name;
        emailDisplay.textContent = currentUser.email;

        showUserSections(userInfo, form, messages);

        const tasks = await getTasksByUser(currentUser.id);
        visibleTasks = tasks; //Guarda lo que se va a renderizar
        renderTasks(container, tasks, currentUser);

    } catch {
        alert("Usuario no encontrado");
    }
});

// ================= CREAR TAREA =================
document.getElementById("taskForm").addEventListener("submit", async e => {
    e.preventDefault();
    if (!currentUser) return alert("Primero valida usuario");

    // CAPTURAR VALORES
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const status = document.getElementById("taskStatus").value;

    // --- VALIDACIÓN DE VACÍOS ---
    if (!title || !description || !status) {
        alert("Por favor, completa todos los campos de la tarea.");
        return; // Detiene la ejecución aquí
    }

    // Prepara el objeto con los datos de los inputs
    const task = {
        userId: currentUser.id,
        title: title,
        description: description,
        status: status,
        createdAt: new Date().toISOString()
    };

    try {
        await saveTask(task); // Usa el servicio de tareas
        
        e.target.reset(); // Limpia el formulario automáticamente al terminar
        
        // Recarga las tareas para que aparezca la nueva con su ID de base de datos
        const tasks = await getTasksByUser(currentUser.id);
        visibleTasks = tasks;
        renderTasks(container, tasks, currentUser);
    } catch (error) {
        console.error("ERROR REAL:", error);
    alert("Hubo un problema al guardar la tarea.");
    }
});

    const exportBtn = document.getElementById("exportBtn");

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {

            if (!visibleTasks.length) {
                alert("No hay tareas para exportar.");
                return;
            }

            // SERVICE (procesamiento)
            const json = generateTasksJSON(visibleTasks);

            // UI (descarga)
            downloadJSONFile(json, "tareas.json");
        });
    }

});
