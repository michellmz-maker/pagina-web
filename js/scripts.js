// ==========================================================
// 1. BASE DE DATOS DE TOURS (RUTAS DE IMAGEN CORREGIDAS)
// 💡 Las rutas se ajustan a "../images/" porque scripts.js está en la carpeta "js/"
// ==========================================================

const TOURS_DATA = {
    maya: {
        nombre: "Maravilla Maya en Yucatán",
        precio: "$1,500 MXN por persona",
        ubicacionPrincipal: "Chichén Itzá, Yucatán",
        personas: 15,
        ubicacionInicial: "Hotel en Cancún o Riviera Maya",
        ubicacionFinal: "Mismo Hotel en Cancún/Riviera Maya",
        guia: "Lic. Ana Sofía Ramírez",
        imagen: "images/chichen_itza.jpg" // Debe terminar en .jpg
    },
    oaxaca: {
        nombre: "Aventura en la Costa de Oaxaca",
        precio: "$2,800 MXN por persona",
        ubicacionPrincipal: "Puerto Escondido, Oaxaca",
        personas: 10,
        ubicacionInicial: "Aeropuerto de Oaxaca (OAX)",
        ubicacionFinal: "Bahías de Huatulco (HUX)",
        guia: "Biól. Carlos Gómez",
         imagen: "images/oaxaca_costa.jpg" // Debe terminar en .jpg
    },
    cobre: {
        nombre: "Tren Chepe: Barrancas del Cobre",
        precio: "$5,500 MXN por persona",
        ubicacionPrincipal: "Divisadero, Chihuahua",
        personas: 20,
        ubicacionInicial: "Estación de Tren en Los Mochis, Sinaloa",
        ubicacionFinal: "Chihuahua Capital",
        guia: "Ing. Jorge Lara",
        imagen: "images/barrancas.jpg" // Debe terminar en .jpg
    }
};

// ==========================================================
// 2. FUNCIÓN PARA CARGAR DETALLES DEL TOUR (detalle_tour.html)
// ==========================================================

function cargarDetallesTour() {
    // La lógica de llenado de la tabla y la imagen es correcta, no se necesita cambiar
    if (document.getElementById('titulo-tour')) {
        const params = new URLSearchParams(window.location.search);
        const tourId = params.get('id');
        const tour = TOURS_DATA[tourId];

        if (tour) {
            document.getElementById('page-title').textContent = tour.nombre;
            document.getElementById('titulo-tour').textContent = tour.nombre;
            document.getElementById('imagen-tour').src = tour.imagen;
            document.getElementById('imagen-tour').alt = tour.nombre;
            
            document.getElementById('precio-tour').textContent = tour.precio;
            document.getElementById('ubicacion-principal').textContent = tour.ubicacionPrincipal;
            document.getElementById('personas-permitidas').textContent = tour.personas;
            document.getElementById('ubicacion-inicial').textContent = tour.ubicacionInicial;
            document.getElementById('ubicacion-final').textContent = tour.ubicacionFinal;
            document.getElementById('guia-acargo').textContent = tour.guia;

        } else {
            document.getElementById('titulo-tour').textContent = "Tour No Encontrado (Revisa el ID en la URL)";
            const imagenElement = document.getElementById('imagen-tour');
            if (imagenElement) {
                imagenElement.style.display = 'none';
            }
        }
    }
}


// ==========================================================
// 3. LÓGICA DE REGISTRO Y LOGIN (Simulación sin servidor)
// ==========================================================

const USERS_KEY = 'travelUsers';

function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function handleRegistration(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario_reg').value;
    const contrasena = document.getElementById('contrasena_reg').value;
    const confirmar = document.getElementById('confirmar_contrasena').value;

    if (contrasena !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let users = getUsers();
    if (users.some(u => u.usuario === usuario)) {
        alert("Este nombre de usuario ya está registrado.");
        return;
    }

    users.push({ usuario: usuario, contrasena: contrasena });
    saveUsers(users);

    alert("¡Registro Exitoso! Serás redirigido para iniciar sesión.");
    window.location.href = 'index.html'; 
}

function handleLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const users = getUsers();
    const userFound = users.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (userFound) {
        localStorage.setItem('currentUser', usuario);
        alert(`¡Bienvenido, ${usuario}! Sesión iniciada.`);
        window.location.href = 'tours.html'; 
    } else {
        alert("Usuario o Contraseña incorrectos. Intenta de nuevo o regístrate.");
    }
}

// ==========================================================
// 4. LÓGICA DEL BOTÓN RESERVAR (Simulación)
// ==========================================================

function handleReservaClick() {
    const usuarioActual = localStorage.getItem('currentUser');
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get('id');
    const tour = TOURS_DATA[tourId];

    if (!usuarioActual) {
        alert("Debes iniciar sesión para reservar un tour. Redirigiendo a Login...");
        window.location.href = 'index.html'; 
    } else if (tour) {
        alert(`¡Reserva exitosa para el tour: ${tour.nombre}!\nUsuario: ${usuarioActual}\nRegresando a Tours...`);
        window.location.href = 'tours.html'; 
    }
}


// ==========================================================
// 5. INICIALIZACIÓN DE LISTENERS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Asignar manejador de registro
    const regForm = document.getElementById('registroForm');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }
    
    // 2. Asignar manejador de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 3. Cargar los detalles del tour
    cargarDetallesTour();
    
    // 4. Asignar manejador del botón de reserva
    const reservaBtn = document.getElementById('boton-reservar');
    if (reservaBtn) {
        reservaBtn.addEventListener('click', handleReservaClick);
    }
});

