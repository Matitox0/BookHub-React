// Autenticacion del administrador.
//
// OJO: al no existir backend, estas credenciales viven en el frontend y
// cualquiera podria leerlas en el codigo. Es una simplificacion propia de la
// asignatura. En un proyecto real irian en el servidor y con la clave hasheada.

export const ADMIN_EMAIL = 'admin@bookhub.cl';
export const ADMIN_CLAVE = 'admin123';

// Indica si un correo corresponde a la cuenta de administrador.
export const esAdmin = (email) => email === ADMIN_EMAIL;

// Valida las credenciales del administrador (correo + clave).
export const credencialesAdminValidas = (email, clave) =>
  email === ADMIN_EMAIL && clave === ADMIN_CLAVE;
