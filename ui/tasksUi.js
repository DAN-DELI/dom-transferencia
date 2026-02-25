// ---------------------------------------------------------------
// UI DE TAREAS (DOM)
// ---------------------------------------------------------------
// se importan las funciones actualizar, eliminar, obtener iniciales, y tiempo actual, taskApi
// y helpers
import { getInitials, getCurrentTimestamp } from "../utils/helpers.js";
import { deleteTaskApi, updateTaskApi } from "../api/tasksApi.js";

function updateTaskCounter() {
    const counter = document.getElementById('messageCount');
    if (!counter) return;

    const total = document.querySelectorAll('.message-card').length;
    counter.textContent = `${total} mensaje${total !== 1 ? 's' : ''}`;
}

//Limpia el contenedor de las tareas, y las muestra, aparte, tambien configura los botones de las cards 
export function renderTasks(container, tasks, currentUser) {
    container.innerHTML = "";
    
    // Actualiza el contador de tareas en la interfaz
    const counter = document.getElementById('messageCount');
    if (counter) counter.textContent = `${tasks.length} mensaje${tasks.length !== 1 ? 's' : ''}`;

    // Si no hay nada que mostrar, se avisa visualmente
    if (!tasks.length) {
        document.getElementById('emptyState')?.classList.remove('hidden');
        return;
    }
    document.getElementById('emptyState')?.classList.add('hidden');

    // Crea cada card con los datos de la tarea
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.setAttribute('data-id', task.id);
        // card.style.position = 'relative';

        card.innerHTML = `
            <div class="message-card__header">
                <div class="message-card__user">
                    <div class="message-card__avatar">${getInitials(currentUser.name)}</div>
                    <span class="message-card__username">${currentUser.name}</span>
                </div>
                <div class="header-right" style="text-align: right;">
                    <span class="message-card__timestamp">${getCurrentTimestamp()}</span>
                    <div class="task-btns">
                    <button type="button" class="btn btn--secondary btn--sm btn-edit">
                        Editar
                    </button>
                    <button type="button" class="btn btn--danger btn--sm btn-delete">
                        Eliminar
                    </button>
                </div>
                </div>
            </div>
            <div class="message-card__content">
                <h4 class="task-title">${task.title}</h4>
                <p class="task-desc">${task.description}</p>
                <span class="badge">${task.status}</span>
            </div>
        `;

        // Conecta los botones a sus funciones lógicas
        card.querySelector('.btn-delete').onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm("¿Esta seguro de que desea eliminar?")) {
                await deleteTaskApi(task.id);
                card.remove();

                updateTaskCounter();
                // Mostrar emptyState si ya no quedan tareas
                if (!document.querySelectorAll('.message-card').length) {
                    document.getElementById('emptyState')?.classList.remove('hidden');
                }
            }
        };
        
        card.querySelector('.btn-edit').onclick  = (e) => {
            e.preventDefault();
            e.stopPropagation();
            makeEditable(card, task);
        };

        container.prepend(card);
    });
}

//     //Pregunta antes de borrar
// async function handleDelete(id, cardElement) {
//     if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
//         try {
//             await deleteTaskApi(id);
//             cardElement.classList.add('fade-out');
//             setTimeout(() => cardElement.remove(), 300);
//         } catch (error) {
//             console.error("Error al eliminar:", error);
//             alert("No se pudo eliminar de la base de datos.");
//         }
//     }
// }
    //Transforma los textos en inputs para que el usuario pueda cambiar datos.
function makeEditable(card, task) {
    const content = card.querySelector('.message-card__content');
    const originalHTML = content.innerHTML; //Crea un respaldo por si cancelan la eliminacion

    content.innerHTML = `
        <div class="edit-mode">
        <div class="form__group">
            <label class="form__label">Título</label>
            <input type="text" class="form__input edit-title" value="${task.title}">
        </div>

        <div class="form__group">
            <label class="form__label">Descripción</label>
            <textarea class="form__input form__textarea edit-desc">${task.description}</textarea>
        </div>

        <div class="form__group">
            <label class="form__label">Estado</label>
            <select class="form__input edit-status">
                <option value="pendiente" ${task.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="en-progreso" ${task.status === 'en-progreso' ? 'selected' : ''}>En progreso</option>
                <option value="completada" ${task.status === 'completada' ? 'selected' : ''}>Completada</option>
            </select>
        </div>

        <div class="edit-actions">
            <button type="button" class="btn btn--primary btn-save">Guardar</button>
            <button type="button" class="btn btn--ghost btn-cancel">Cancelar</button>
        </div>
        </div>
    `;

    // Botón Cancelar: Restaura el contenido original
    content.querySelector('.btn-cancel').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        content.innerHTML = originalHTML;
    };

    // Botón Guardar: Ejecuta la actualización
    content.querySelector('.btn-save').onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Definir las variables PRIMERO
        const titleField = content.querySelector('.edit-title');
        const descField = content.querySelector('.edit-desc');
        const statusField = content.querySelector('.edit-status');

        const titleVal = titleField.value.trim();
        const descVal = descField.value.trim();
        const statusVal = statusField.value;

        titleField.classList.toggle("input-error", !titleVal);
        descField.classList.toggle("input-error", !descVal);
        //valida que no esten espacios vacios al editar una tarea
        if (!titleVal || !descVal) {
            alert("No puedes dejar el título o la descripción vacíos al editar.");
            return;
        }

        try {
            // Llamada a la API 
            await updateTaskApi(task.id, { title: titleVal, description: descVal, status: statusVal });
            // Actualización manual del DOM para evitar renderizar 
            task.title = titleVal; task.description = descVal; task.status = statusVal;

            // vuelve a la lista sin recargar
            content.innerHTML = `
            <h4 class="task-title" style="margin: 0; color: var(--color-primary);">${task.title}</h4>
            <p class="task-desc" style="margin: 5px 0; color: #555;">${task.description}</p>
            <span class="badge" style="background: #f0f0f0; padding: 2px 10px; border-radius: 4px; font-size: 0.8rem; border: 1px solid #e0e0e0;">${task.status}</span>
            `;
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudieron guardar los cambios. Revisa la consola.");
        }
    };
}