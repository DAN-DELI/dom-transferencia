// ==============
// IMPORTACIONES 
// ==============

// Usados en "validateForm"
import { clearError, showError } from "../ui/tarea.ui.js";
import { isValidInput } from "./utils.js";
import { getUserById } from "../api/index.js";
import { showUserInfo, hideUserInfo } from "../ui/index-ui.js";


/**
 * Valida todos los campos del formulario
 * @returns {boolean} - true si todos los campos son válidos, false si alguno no lo es
 */
function validateForm() {
    let isValid = true;

    if (!isValidInput(taskTitleInput.value)) {
        showError(taskTitleError, 'El título no puede estar vacío.');
        isValid = false;
    } else {
        clearError(taskTitleError);
    }

    if (!isValidInput(taskDescriptionInput.value)) {
        showError(taskDescriptionError, 'La descripción no puede estar vacía.');
        isValid = false;
    } else {
        clearError(taskDescriptionError);
    }

    if (!isValidInput(taskStatusInput.value)) {
        showError(taskStatusError, 'Debes seleccionar un estado.');
        isValid = false;
    } else {
        clearError(taskStatusError);
    }

    return isValid;
}

/**
 * Valida un usuario consultando la API mediante su ID.
 * Si el usuario existe, muestra su información en la interfaz.
 * Si no existe, oculta las secciones correspondientes y lanza un error.
 * @async
 * @param {number|string} id - Identificador único del usuario (solo números).
 * @returns {Promise<Object>} - Retorna el objeto del usuario si la validación es exitosa.
 * @throws {Error} - Lanza un error si el usuario no existe o la consulta falla.
 */
export async function validateUser(id) {
    try {
        const user = await getUserById(id);
        showUserInfo(user); // delega la manipulación del DOM a UI
        return user;
    } catch (error) {
        hideUserInfo();
        throw error;
    }
}


//
// EXPORTACIONES
//  

export {
    validateForm
}












