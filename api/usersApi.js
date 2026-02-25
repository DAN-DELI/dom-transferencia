// ---------------------------------------------------------------
// API DE USUARIOS
// ---------------------------------------------------------------

// Traer el usuario por la id y mostrarlo
export async function fetchUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (!response.ok) throw new Error("Usuario no encontrado");
    return response.json();
}
