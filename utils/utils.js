//
// FUNCIONES AUXILIARES
// 

/**
 * Valida que un campo no esté vacío ni contenga solo espacios en blanco
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
function isValidInput(value) {
    return value.trim().length > 0;
}

/**
 * Valida que un campo no esté vacío, no contenga espacios en blanco y contenga solo letras y números
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
function isValidAlphanumericInput(value) {
    const trimmed = value.trim();
    return trimmed.length > 0 && /^[a-zA-Z0-9]+$/.test(trimmed);
}

/**
 * Obtiene la fecha y hora actual formateada
 * @returns {string} - Fecha y hora en formato legible
 */
function getCurrentTimestamp() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options);
}

/**
 * Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales en mayúsculas
 */
function getInitials(name) {
    // Eliminar espacios en blanco al inicio y al final del nombre
    const trimmedName = name.trim();
    // Separar el nombre en palabras usando expresiones regulares para manejar múltiples espacios
    const words = trimmedName.split(/\s+/);
    // Si hay solo una palabra, retornar las dos primeras letras en mayúsculas
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    } else {
        // Si hay múltiples palabras, tomar la primera letra de cada una, unirlas y convertir a mayúsculas
        return words.map(word => word[0]).join('').toUpperCase();
    }
}

/**
 * Muestra la información de un usuario en la interfaz.
 * Actualiza nombre y correo, habilita las secciones de usuario, formulario y área de mensajes.
 * @param {Object} user - Objeto que contiene los datos del usuario.
 * @param {string} user.name - Nombre del usuario.
 * @param {string} user.email - Correo electrónico del usuario.
 * @returns {void}
 */










//
// EXPORTACIONES
//   

export {
    isValidInput,
    isValidAlphanumericInput,
    getCurrentTimestamp,
    getInitials,
    showUserInfo,
    hideUserInfo
}