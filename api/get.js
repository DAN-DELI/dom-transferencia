



// Obtener usuario por id
async function getUserById(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);

  // Mensaje en caso de que no se encuentre al usuario
  if (!response.ok) {
    throw new Error("Usuario no encontrado");
  }

  return response.json();
}




//
// EXPORTACIONES
//  
export {
    getUserById
}