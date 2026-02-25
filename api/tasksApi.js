// ---------------------------------------------------------------
// API DE TAREAS
// ---------------------------------------------------------------

//Le pide al servidor que traiga las tareas que estan en el servidor
export async function fetchTasks() {
    const res = await fetch(`http://localhost:3000/tasks`);
    if (!res.ok) throw new Error("Error cargando tareas");
    return res.json();
}

    //Crea las tareas usando el metodo post, y las guarda en el servidor
export async function createTask(task) {
    const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

    if (!res.ok) throw new Error("Error al registrar tarea");
    return res.json();
}

//Solo actualiza una parte de la tarea 
export async function updateTaskApi(id, updatedData) {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH", // se usa patch para no enviar todo el objeto completo, unicamente se envia lo que se cambio
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    if (!res.ok) throw new Error("No se pudo actualizar la tarea");
    return res.json();
}

//Solicita al servidor que borre una tarea especifica usando el id
export async function deleteTaskApi(id) {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("No se pudo eliminar la tarea");
    return true;
}
