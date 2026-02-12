/**
 * ============================================
 * EJERCICIO DE MANIPULACIÓN DEL DOM
 * ============================================
 * 
 * Objetivo: Aplicar conceptos del DOM para seleccionar elementos,
 * responder a eventos y crear nuevos elementos dinámicamente.
 * 
 * Autor: [Tu nombre aquí]
 * Fecha: [Fecha actual]
 * ============================================
 */

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================

/**
 * Seleccionamos los elementos del DOM que necesitamos manipular.
 * Usamos getElementById para obtener referencias a los elementos únicos.
 */

// Formulario
const messageForm = document.getElementById('messageForm');

// Campos de entrada
const userNameInput = document.getElementById('userName');
const userMessageInput = document.getElementById('userMessage');

// Botón de envío
const submitBtn = document.getElementById('submitBtn');

// Elementos para mostrar errores
const userNameError = document.getElementById('userNameError');
const userMessageError = document.getElementById('userMessageError');

// Contenedor donde se mostrarán los mensajes
const messagesContainer = document.getElementById('messagesContainer');

// Estado vacío (mensaje que se muestra cuando no hay mensajes)
const emptyState = document.getElementById('emptyState');

// Contador de mensajes
const messageCount = document.getElementById('messageCount');

// Variable para llevar el conteo de mensajes
let totalMessages = 0;


// ============================================
// 2. FUNCIONES AUXILIARES
// ============================================

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
 * Valida todos los campos del formulario
 * @returns {boolean} - true si todos los campos son válidos, false si alguno no lo es
 */
function validateForm() {
    const userName = userNameInput.value;
    const userMessage = userMessageInput.value;
    let isValid = true;

    // Validar nombre de usuario (solo letras y números, sin espacios)
    if (!isValidAlphanumericInput(userName)) {
        showError(userNameError, 'El nombre de usuario debe contener solo letras y números y no estar vacío.');
        userNameInput.classList.add('error');
        isValid = false;
    } else {
        clearError(userNameError);
        userNameInput.classList.remove('error');
    }

    // Validar mensaje
    if (!isValidInput(userMessage)) {
        showError(userMessageError, 'El mensaje no puede estar vacío.');
        userMessageInput.classList.add('error');
        isValid = false;
    } else {
        clearError(userMessageError);
        userMessageInput.classList.remove('error');
    }

    return isValid;
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
 * Actualiza el contador de mensajes
 */
function updateMessageCount() {
    // TODO: Implementar actualización del contador
    // Pista: Usa template literals para crear el texto
    // Formato: "X mensaje(s)" o "X mensajes"
}

/**
 * Oculta el estado vacío (mensaje cuando no hay mensajes)
 */
function hideEmptyState() {
    // TODO: Implementar función para ocultar el estado vacío
    // Pista: Agrega la clase 'hidden' al elemento emptyState
}

/**
 * Muestra el estado vacío (mensaje cuando no hay mensajes)
 */
function showEmptyState() {
    // TODO: Implementar función para mostrar el estado vacío
    // Pista: Remueve la clase 'hidden' del elemento emptyState
}


// ============================================
// 3. CREACIÓN DE ELEMENTOS
// ============================================

/**
 * Crea un nuevo elemento de mensaje en el DOM
 * @param {string} userName - Nombre del usuario
 * @param {string} message - Contenido del mensaje
 */
function createMessageElement(userName, message) {
    // TODO: Implementar la creación de un nuevo mensaje
    
    // PASO 1: Crear el contenedor principal del mensaje
    // Pista: document.createElement('div')
    // Asignar la clase 'message-card'
    
    // PASO 2: Crear la estructura HTML del mensaje
    // Puedes usar innerHTML con la siguiente estructura:
    /*
    <div class="message-card__header">
        <div class="message-card__user">
            <div class="message-card__avatar">[INICIALES]</div>
            <span class="message-card__username">[NOMBRE]</span>
        </div>
        <span class="message-card__timestamp">[FECHA]</span>
    </div>
    <div class="message-card__content">[MENSAJE]</div>
    */
    
    // PASO 3: Insertar el nuevo elemento en el contenedor de mensajes
    // Pista: messagesContainer.appendChild(nuevoElemento)
    // O usar insertBefore para agregarlo al principio
    
    // PASO 4: Incrementar el contador de mensajes
    
    // PASO 5: Actualizar el contador visual
    
    // PASO 6: Ocultar el estado vacío si está visible
}


// ============================================
// 4. MANEJO DE EVENTOS
// ============================================

/**
 * Maneja el evento de envío del formulario
 * @param {Event} event - Evento del formulario
 */
function handleFormSubmit(event) {
    // TODO: Implementar el manejador del evento submit
    
    // PASO 1: Prevenir el comportamiento por defecto del formulario
    // Pista: event.preventDefault()
    
    // PASO 2: Validar el formulario
    // Si no es válido, detener la ejecución (return)
    
    // PASO 3: Obtener los valores de los campos
    
    // PASO 4: Crear el nuevo elemento de mensaje
    // Llamar a createMessageElement con los valores obtenidos
    
    // PASO 5: Limpiar el formulario
    // Pista: messageForm.reset()
    
    // PASO 6: Limpiar los errores
    
    // PASO 7: Opcional - Enfocar el primer campo para facilitar agregar otro mensaje
    // Pista: userNameInput.focus()
}

/**
 * Limpia los errores cuando el usuario empieza a escribir
 */
function handleInputChange() {
    // TODO: Implementar limpieza de errores al escribir
    // Esta función se ejecuta cuando el usuario escribe en un campo
    // Debe limpiar el error de ese campo específico
}


// ============================================
// 5. REGISTRO DE EVENTOS
// ============================================

/**
 * Aquí registramos todos los event listeners
 */

// TODO: Registrar el evento 'submit' en el formulario
// Pista: messageForm.addEventListener('submit', handleFormSubmit);

// TODO: Registrar eventos 'input' en los campos para limpiar errores al escribir
// Pista: userNameInput.addEventListener('input', handleInputChange);
// Pista: userMessageInput.addEventListener('input', handleInputChange);


// ============================================
// 6. REFLEXIÓN Y DOCUMENTACIÓN
// ============================================

/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: 
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: 
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: 
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: 
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: 
 */


// ============================================
// 7. INICIALIZACIÓN (OPCIONAL)
// ============================================

/**
 * Esta función se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM completamente cargado');
    console.log('📝 Aplicación de registro de mensajes iniciada');
    
    // Aquí puedes agregar cualquier inicialización adicional
    // Por ejemplo, cargar mensajes guardados del localStorage
});


// ============================================
// 8. FUNCIONALIDADES ADICIONALES (BONUS)
// ============================================

/**
 * RETOS ADICIONALES OPCIONALES:
 * 
 * 1. Agregar un botón para eliminar mensajes individuales
 * 2. Implementar localStorage para persistir los mensajes
 * 3. Agregar un contador de caracteres en el textarea
 * 4. Implementar un botón para limpiar todos los mensajes
 * 5. Agregar diferentes colores de avatar según el nombre del usuario
 * 6. Permitir editar mensajes existentes
 * 7. Agregar emojis o reacciones a los mensajes
 * 8. Implementar búsqueda/filtrado de mensajes
 */
