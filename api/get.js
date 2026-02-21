export const getTareas = async (userId) => {
    const peticion = await `http://localhost:3000/tasks?userId=${userId}`;
    const data = await peticion.json();
    return data;
}