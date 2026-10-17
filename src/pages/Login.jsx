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
      <main style={{ maxWidth: '450px', margin: '40px auto' }}>
        {/* VISTA MI PERFIL SI HAY SESIÓN ACTIVA */}
        {usuarioLogueado ? (
          <div id="datosPerfil" className="tarjeta-formulario">
            <h2>Mi Perfil</h2>
            <p><strong>Nombre:</strong> <span id="perfilNombre">{perfilGuardado?.nombre || 'Usuario'}</span></p>
            <p><strong>Email:</strong> <span id="perfilEmail">{usuarioLogueado}</span></p>
            <p><strong>Gusto Literario:</strong> <span id="perfilGenero">{perfilGuardado?.genero || 'No especificado'}</span></p>
            <button id="cerrarSesion" className="boton" onClick={cerrarSesion} style={{ marginTop: '15px', backgroundColor: '#d9534f' }}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          /* FORMULARIO DE INICIO DE SESIÓN O REGISTRO */
          <div className="tarjeta-formulario">
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
                <button type="submit" className="boton">Iniciar Sesión</button>
                <p style={{ marginTop: '15px' }}>
                  ¿No tienes cuenta?{' '}
                  <button type="button" onClick={() => setModo('registro')} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
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
                <button type="submit" className="boton">Registrarme</button>
                <p style={{ marginTop: '15px' }}>
                  ¿Ya tienes cuenta?{' '}
                  <button type="button" onClick={() => setModo('login')} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
                    Volver al login
                  </button>
                </p>
              </form>
            )}
          </div>
        )}
      </main>
    </MainLayout>
  );
}
