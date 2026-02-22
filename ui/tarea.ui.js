//
// UI
// 

/**
 * Muestra un mensaje de error en un elemento específico
 * @param {HTMLElement} errorElement - Elemento donde mostrar el error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(errorElement, message) {
    errorElement.textContent = message;
}

/**
 * Limpia el mensaje de error de un elemento específico
 * @param {HTMLElement} errorElement - Elemento del que limpiar el error
 */
function clearError(errorElement) {
    errorElement.textContent = '';
}

/**
 * Oculta el estado vacío (mensaje cuando no hay mensajes)
 */
function hideEmptyState() {
    emptyState.classList.add("hidden");
}

/**
 * Actualiza el contador de mensajes
 */
function updateMessageCount() {
    messageCount.textContent = `${totalMessages} mensaje${totalMessages !== 1 ? 's' : ''}`;
}

/**
 * Muestra el estado vacío (mensaje cuando no hay mensajes)
 */
function showEmptyState() {
    emptyState.classList.remove("hidden");
}

function showUserInfo(user) {
    userNameDisplay.textContent = user.name;
    userEmailDisplay.textContent = user.email;
    userInfoSection.classList.remove("hidden");
    formulario.classList.remove("hidden");
    areaMensajes.classList.remove("hidden");

    alert(`Hola ${user.name}.`);
}

/**
 * Oculta la información del usuario en la interfaz.
 * Deshabilita las secciones de usuario, formulario y área de mensajes, mostrando un mensaje de error.
 * @returns {void}
 */
function hideUserInfo() {
    userInfoSection.classList.add("hidden");
    formulario.classList.add("hidden");
    areaMensajes.classList.add("hidden");
    alert("Usuario no encontrado.");
}


//
// EXPORTACIONES
// 

export {
    showError,
    clearError,
    hideEmptyState,
    updateMessageCount,
    showEmptyState,
    hideUserInfo,
    hideEmptyState
}