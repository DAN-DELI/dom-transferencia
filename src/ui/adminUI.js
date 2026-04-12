import { formatFecha } from "../utils/helpers.js";
import { tasksNull } from "./tasksUI.js";

// funcion para renderizar tareas para la UI de admin
export function adminRenderTasks(allTasks, allUsers, tableBody) {
    tableBody.innerHTML = "";

    try {

        allTasks.forEach(task => {
            const taskUser = allUsers.find(u => String(u.id) === String(task.user_id));
            const userName = taskUser ? taskUser.name : "Usuario Desconocido";

            const currentStatus = task.status || task.estado || "pendiente";

            // Definimos el color según el estado real de la DB
            let statusColor;
            if (currentStatus === "completada") {
                statusColor = "var(--color-success)"; // Verde
            } else if (currentStatus === "en-progreso") {
                statusColor = "var(--color-info, #3498db)"; // Azul 
            } else {
                statusColor = "var(--color-warning)"; // Naranja/Amarillo para pendiente
            }
            const fechaFormateada = task.created_at ? formatFecha(task.created_at) : "Sin fecha";

            const tr = document.createElement("tr");
            tr.dataset.id = task.id;
            tr.innerHTML = `
                <td>${userName} <br><small style="color: var(--color-gray-500)">ID: ${task.user_id}</small></td>
                <td><strong>${task.title}</strong></td> 
                <td>${task.description}</td>
                <td>${fechaFormateada}</td>
                <td>
                <span style="background-color: ${statusColor}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                ${currentStatus}
                </span>
                </td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:6px; align-items:stretch;">
                    
                    <button class="btn btn--primary btn-edit-task" data-id="${task.id}" style="padding:5px 10px; font-size:0.8rem; white-space:nowrap;">✏️ Editar</button>
                    <button class="btn btn--danger btn-delete-task" data-id="${task.id}" style="padding:5px 10px; margin-top: 10px;  font-size:0.8rem; white-space:nowrap;">🗑️ Eliminar</button>
                    
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.log("[ERROR] " + error.message)
        tableBody.innerHTML = `<tr><td colspan="6" class="table-empty">Error al traer las tareas.</td></tr>`;
    }

}

/**
 * Dibuja la tabla de usuarios en pantalla
 */
export async function renderAdminUsersTable(usersToRender, allTasks, tableBody) {
    adminUsersTableBody.innerHTML = "";

    if (!usersToRender || usersToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="table-empty">No se encontraron usuarios.</td></tr>`;
        return;
    }


    // console.log(usersToRender)
    // return

    usersToRender.forEach(user => {
        // Definir un color según el rol (Azul para admin, Verde para usuario)
        const roleColor = user.role === "admin" ? "var(--color-primary)" : "var(--color-success)";
        const roleText = user.role === "admin" ? "Administrador" : "Usuario";

        // Guardamos las tareas de este usuario
        const userTasks = allTasks.filter(task => Number(task.user_id) === Number(user.id));

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${user.document}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${userTasks.length}</td>
            <td>
                <span style="background-color: ${roleColor}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                    ${roleText}
                </span>
            </td>
            <td>
                <div style="display:flex; flex-direction:column; gap:6px; align-items:stretch;">
                    <button class="btn btn--primary btn-edit-user" data-id="${user.id}" style="padding: 5px 10px; font-size: 0.8rem; white-space: nowrap;">✏️ Editar</button>
                    <button class="btn btn--danger btn-delete-user" data-id="${user.id}" style="padding: 5px 10px; margin-top: 10px; font-size: 0.8rem; white-space: nowrap;">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// en caso de no haber ninguna tarea, muestra esta informacion
export function withoutTasks(container) {
    container.innerHTML = `<tr><td colspan="6" class="table-empty">No hay tareas registradas.</td></tr>`;
}

// en caso de no haber ninguna tarea con el filtro activado, muestra esta informacion
export function withoutFilterTasks(container) {
    container.innerHTML = `<tr><td colspan="6" class="table-empty">No hay tareas registradas con este filtro.</td></tr>`;
}