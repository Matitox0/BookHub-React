import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import FormField from '../components/molecules/FormField';

export default function Login({ usuarioLogueado, setUsuarioLogueado }) {
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [perfilGuardado, setPerfilGuardado] = useState(() => {
    const perfil = localStorage.getItem('perfilBookHub');
    return perfil ? JSON.parse(perfil) : null;
  });

  // Campos de formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [clave, setClave] = useState('');

  // Punto 3: Método para iniciar sesión
  const manejarLogin = (e) => {
    e.preventDefault();

    if (!perfilGuardado) {
      alert('No existe una cuenta con ese correo. Regístrate primero.');
      return;
    }

    if (perfilGuardado.email !== email || perfilGuardado.clave !== clave) {
      alert('Correo o contraseña incorrectos.');
      return;
    }

    localStorage.setItem('sesionActivaBookHub', email);
    setUsuarioLogueado(email);
    alert('¡Bienvenido de nuevo!\nHas iniciado sesión correctamente con el correo: ' + email);
  };

  // Punto 2: Método para crear cuenta
  const manejarRegistro = (e) => {
    e.preventDefault();
    if (clave.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    const nuevoPerfil = { nombre, email, genero, clave };
    localStorage.setItem('perfilBookHub', JSON.stringify(nuevoPerfil));
    setPerfilGuardado(nuevoPerfil);
    alert(`¡Cuenta creada con éxito!\n\nBienvenido a BookHub, ${nombre}.\nHemos guardado tus gustos sobre: ${genero}`);
    setClave('');
    setModo('login');
  };

  // Punto 6: Método para cerrar sesión perfil
  const cerrarSesion = () => {
    localStorage.removeItem('sesionActivaBookHub');
    setUsuarioLogueado(null);
    alert('Sesión cerrada correctamente.');
  };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            {/* VISTA MI PERFIL SI HAY SESIÓN ACTIVA */}
            {usuarioLogueado ? (
              <div id="datosPerfil" className="card p-4 shadow-sm">
                <h2>Mi Perfil</h2>
                <p><strong>Nombre:</strong> <span id="perfilNombre">{perfilGuardado?.nombre || 'Usuario'}</span></p>
                <p><strong>Email:</strong> <span id="perfilEmail">{usuarioLogueado}</span></p>
                <p><strong>Gusto Literario:</strong> <span id="perfilGenero">{perfilGuardado?.genero || 'No especificado'}</span></p>
                <button id="cerrarSesion" className="btn btn-danger mt-3" onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              /* FORMULARIO DE INICIO DE SESIÓN O REGISTRO */
              <div className="card p-4 shadow-sm">
                {modo === 'login' ? (
                  <form id="formularioLogin" onSubmit={manejarLogin}>
                    <h2>Iniciar Sesión</h2>
                    <FormField
                      label="Correo Electrónico:"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FormField
                      label="Contraseña:"
                      id="claveLogin"
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                    <p className="mt-3 mb-0">
                      ¿No tienes cuenta?{' '}
                      <button type="button" className="btn btn-link p-0" onClick={() => setModo('registro')}>
                        Crear una cuenta
                      </button>
                    </p>
                  </form>
                ) : (
                  <form id="formularioCuenta" onSubmit={manejarRegistro}>
                    <h2>Crear Cuenta</h2>
                    <FormField
                      label="Nombre Completo:"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                    <FormField
                      label="Correo Electrónico:"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FormField
                      label="Género literario favorito:"
                      id="libro"
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                      required
                    />
                    <FormField
                      label="Contraseña (mínimo 6 caracteres):"
                      id="clave"
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary w-100">Registrarme</button>
                    <p className="mt-3 mb-0">
                      ¿Ya tienes cuenta?{' '}
                      <button type="button" className="btn btn-link p-0" onClick={() => setModo('login')}>
                        Volver al login
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
