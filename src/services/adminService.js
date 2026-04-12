import { fetchTasks, updateTaskApi } from "../api/tasksApi.js";
import { fetchUsers } from "../api/usersApi.js";
import { adminRenderTasks, renderAdminUsersTable, withoutFilterTasks, withoutTasks } from "../ui/adminUI.js";
import { tasksNull, uiEditTask } from "../ui/tasksUI.js";

/**
 * Función exclusiva para DIBUJAR la tabla basándose en una lista de tareas
 * @param {Array} tasksToRender - Lista de tareas que queremos mostrar
 */
export async function renderAdminTasksTable(tableBody) {

    // Conseguimos todas las tareas
    const allTasks = await fetchTasks();
    // Extraer todas los usuarios
    const allUsers = await fetchUsers();

    if (allTasks.length == 0) {
        withoutTasks(tableBody);
        return;
    }

    // Renderizado total de tareas
    adminRenderTasks(allTasks, allUsers, tableBody);
}

/**
 * 3.2. Función que evalúa los filtros y actualiza la tabla de tareas
 */
export async function applyAdminFilters(search, filter, tableBody) {

    // Conseguimos todas las tareas
    const allTasks = await fetchTasks();
    // Extraer todas los usuarios
    const allUsers = await fetchUsers();

    // Aseguramos que el buscador tenga un valor, si no, cadena vacía
    const searchTerm = (search.value || "").toLowerCase();
    const statusValue = filter.value;

    // let matchStat
    const filteredTasks = allTasks.filter(task => {
        // 1. Validar estado
        const currentStatus = task.status || "";
        const matchStatus = statusValue === "all" || currentStatus === statusValue;

        // 2. Buscar al usuario
        const taskUser = allUsers.find(u => String(u.id) === String(task.user_id));
        const userName = taskUser ? (taskUser.name || "").toLowerCase() : "";

        // 3. Validar descripción
        const desc = (task.description || "").toLowerCase();
        const title = (task.title || "").toLowerCase();

        const matchSearch = desc.includes(searchTerm) ||
            title.includes(searchTerm) ||
            userName.includes(searchTerm) ||
            String(task.id).includes(searchTerm);

        return matchStatus && matchSearch;
    });

    if (filteredTasks.length == 0) {
        withoutFilterTasks(tableBody);
        return;
    }

    adminRenderTasks(filteredTasks, allUsers, tableBody)
}

/**
//  * Función principal que carga los datos desde la API
//  */
export async function initialRender(usersTable, tasksTable) {
    try {
        // Traer datos de la base de datos
        const allTasks = await fetchTasks();
        const allUsers = await fetchUsers();

        // Dibujar ambas tablas
        adminRenderTasks(allTasks, allUsers, tasksTable);
        renderAdminUsersTable(allUsers, allTasks, usersTable);

    } catch (error) {
        console.error("Error cargando datos del admin:", error);
        usersTable.innerHTML = `<tr><td colspan="6" class="table-empty" style="color: red;">Error al cargar la base de datos. Verifica que json-server esté corriendo.</td></tr>`;
    }
}

/**
//  * Funcion para renderizar todos los usuarios
//  */
export async function renderAllUsers(usersTable) {
    try {
        // Traer datos de la base de datos
        const allTasks = await fetchTasks();
        const allUsers = await fetchUsers();

        // Dibujar ambas tablas
        renderAdminUsersTable(allUsers, allTasks, usersTable);

    } catch (error) {
        console.error("Error cargando datos del admin:", error);
        usersTable.innerHTML = `<tr><td colspan="6" class="table-empty" style="color: red;">Error al cargar la base de datos. Verifica que json-server esté corriendo.</td></tr>`;
    }
}











//
// EN PROGRESO
// 

// Si contiene un data-id procede a editar
export async function taskToEdit(taskId, newTaskUpdate) {

    // Traer datos de la base de datos
    const allTasks = await fetchTasks();

    const taskToEdit = allTasks.find(task => String(task.id) === String(taskId));

    // Actualizamos la tarea en la db
    await updateTaskApi(taskId, newTaskUpdate);

    // Usamos Object.assign o el spread operator para no perder el userId original
    const index = allTasks.findIndex(t => String(t.id) === String(taskId));
    if (index !== -1) {
        allTasks[index] = { ...allTasks[index], ...newTaskUpdate };
    }

    // UI
    repaintTask(taskToEdit, newTaskUpdate);

    showNotification("Tarea actualizada con éxito", "success");
    applyAdminFilters(adminSearchTask, adminFilterStatus, adminTasksTableBody);

    // cerrar modal
    taskSection.classList.add("hidden");
    body.classList.remove("no-scroll");
    formCard.removeAttribute("data-id");
    hideEmpty(userSelectionError);
    return
}



//
// EN PROCESO
//

export async function renderModalEdit(taskId, formCard) {
    // obtener todas las tareas
    const allTasks = await fetchTasks();

    //
    const taskToEdit = allTasks.find(task => String(task.id) === String(taskId));

    // En caso de que haya un error, corta el proceso he indica la razon.
    if (!taskToEdit){
        throw new Error("No se encontro la tarea a editar");
        return
    }

    uiEditTask(formCard, taskToEdit);
}