import { getTareas } from "../api/get.js"
import { renderTarea } from "../ui/tarea.ui.js";


export const listarTareas = () => {
    const tareas = getTareas();
    
    const listaDeTareas = tareas.map(tarea => {
        renderTarea(tarea)
    });
    return listaDeTareas;
}