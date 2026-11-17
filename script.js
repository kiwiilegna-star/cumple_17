
// ==================================
// NAVEGACION ENTRE ESCENAS
// ==================================

function irEscena(id) {
    document.querySelectorAll('.escena').forEach(escena => {
        escena.classList.remove('activa');
    });

    document.getElementById(id).classList.add('activa');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    actualizarHud(id);

    // Al entrar al juego, iniciar las preguntas
    if (id === 'juego' && !juegoIniciado) {
        iniciarJuego();
    }
}

// ==================================
// HUD: NIVEL Y XP
// ==================================

const ordenEscenas = ['inicio', 'regalo', 'recuerdos', 'carta', 'juego', 'premios', 'final'];
let xpExtra = 0;

function actualizarHud(id) {
    const indice = ordenEscenas.indexOf(id);
    const base = Math.round((indice / (ordenEscenas.length - 1)) * 700);
    const xp = base + xpExtra;
    const porcentaje = Math.min(100, (indice / (ordenEscenas.length - 1)) * 100);

    document.getElementById('hudNivel').textContent = '🎮 NIVEL ' + (indice + 1);
    document.getElementById('hudRelleno').style.width = porcentaje + '%';
    document.getElementById('hudXp').textContent = xp + ' XP';
}

function sumarXp(cantidad) {
    xpExtra += cantidad;
    const activa = document.querySelector('.escena.activa');
    actualizarHud(activa ? activa.id : 'inicio');
}

// ==================================
// LOGROS
// ==================================

let logroTimer;

function mostrarLogro(texto) {
    const caja = document.getElementById('logro');
    document.getElementById('logroTexto').textContent = texto;
    caja.classList.add('visible');
    clearTimeout(logroTimer);
    logroTimer = setTimeout(() => caja.classList.remove('visible'), 3200);
}

// ==================================
// CONFETI
// ==================================

function lanzarConfeti(cantidad = 80) {
    const colores = ['#00e5ff', '#ff2e93', '#7CFF4F', '#ffd60a', '#9d4dff', '#ff7a1a'];
    for (let i = 0; i < cantidad; i++) {
        const c = document.createElement('div');
        c.className = 'confeti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = colores[Math.floor(Math.random() * colores.length)];
        c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
        c.style.animationDelay = Math.random() * 0.6 + 's';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5500);
    }
}

// ==================================
// REGALO SORPRESA
// ==================================

function abrirRegalo() {
    const mensaje = document.getElementById('mensajeRegalo');

    mensaje.innerHTML =
        '🎉 ¡SORPRESA, JOHN! 🎉<br><br>' +
        'Hoy el protagonista eres tú. ' +
        'Espero que disfrutes cada parte de esta sorpresa. ❤️';

    lanzarConfeti(60);
    if (!regaloAbiertoUnaVez) {
        regaloAbiertoUnaVez = true;
        sumarXp(50);
        mostrarLogro('Cofre abierto · +50 XP');
    }
}

let regaloAbiertoUnaVez = false;

// ==================================
// QUIZ DIVERTIDO DE JOHN 😂
// ==================================


const preguntas = [
    {
        pregunta: "¿Qué rey de Judá encontró el libro de la Ley durante la reparación del templo?",
        opciones: [
            "Ezequías",
            "Josías",
            "Roboam"
        ],
        respuesta: 1,
        comentario: "¡Correcto! Fue Josías. ¡Ese descubrimiento cambió muchas cosas! 📜"
    },
    {
        pregunta: "¿Cómo se llamaba el padre de Juan el Bautista?",
        opciones: [
            "Zacarías",
            "Simeón",
            "Nicodemo"
        ],
        respuesta: 0,
        comentario: "¡Muy bien! Zacarías era su padre y Elisabet su madre. 👏"
    },
    {
        pregunta: "¿Qué juez de Israel hizo un voto imprudente antes de ir a la batalla?",
        opciones: [
            "Gedeón",
            "Sansón",
            "Jefté"
        ],
        respuesta: 2,
        comentario: "¡Jefté! Su historia está en Jueces 11. ¡Pregunta complicada! 😮"
    },
    {
        pregunta: "¿Quién interpretó la escritura que apareció en la pared durante el banquete del rey Belsasar?",
        opciones: [
            "Daniel",
            "José",
            "Ezequiel"
        ],
        respuesta: 0,
        comentario: "¡Daniel! La famosa frase fue: MENE, MENE, TEKEL, UPARSIN. 📖"
    },
    {
        pregunta: "¿Qué mujer escondió a los espías israelitas en Jericó?",
        opciones: [
            "Débora",
            "Rahab",
            "Rut"
        ],
        respuesta: 1,
        comentario: "¡Rahab! Los escondió y ayudó a que escaparan. 🏠"
    },
    {
        pregunta: "¿Quién fue el primer rey del reino del norte de Israel después de la división?",
        opciones: [
            "Jeroboam",
            "Acab",
            "Omri"
        ],
        respuesta: 0,
        comentario: "¡Jeroboam! ¡Ya estamos entrando en preguntas de experto! 🔥"
    },
    {
        pregunta: "¿Qué profeta fue llevado al cielo en un torbellino?",
        opciones: [
            "Isaías",
            "Eliseo",
            "Elías"
        ],
        respuesta: 2,
        comentario: "¡Elías! Fue llevado en un torbellino y en un carro de fuego. 🔥"
    },
    {
        pregunta: "¿En qué ciudad fueron llamados cristianos por primera vez los discípulos?",
        opciones: [
            "Jerusalén",
            "Antioquía",
            "Éfeso"
        ],
        respuesta: 1,
        comentario: "¡Antioquía! Puedes encontrarlo en Hechos 11:26. 🙌"
    },
    {
        pregunta: "¿Qué personaje perdió su fuerza después de que le cortaron el cabello?",
        opciones: [
            "Sansón",
            "Absalón",
            "Saúl"
        ],
        respuesta: 0,
        comentario: "¡Sansón! Y sí, su cabello tenía una relación especial con su consagración. 😂"
    },
    {
        pregunta: "¿Quién fue elegido para ocupar el lugar de Judas Iscariote entre los doce apóstoles?",
        opciones: [
            "Bernabé",
            "Silas",
            "Matías"
        ],
        respuesta: 2,
        comentario: "¡Matías! La respuesta está en Hechos 1:26. ¡Excelente! 🏆"
    }
];


let preguntaActual = 0;
let puntos = 0;
let juegoIniciado = false;

function iniciarJuego() {
    preguntaActual = 0;
    puntos = 0;
    juegoIniciado = true;
    mostrarPregunta();
}

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    document.getElementById('progreso').textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    document.getElementById('pregunta').textContent =
        pregunta.pregunta;

    document.getElementById('resultadoJuego').textContent = '';
    document.getElementById('barraJuego').style.width =
        (preguntaActual / preguntas.length * 100) + '%';

    const contenedor = document.getElementById('opciones');
    contenedor.innerHTML = '';

    pregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement('button');

        boton.textContent = opcion;
        boton.onclick = () => verificarRespuesta(indice);

        contenedor.appendChild(boton);
    });
}

function verificarRespuesta(indice) {
    const pregunta = preguntas[preguntaActual];

    const resultado = document.getElementById('resultadoJuego');

    document.querySelectorAll('#opciones button').forEach(boton => {
        boton.disabled = true;
    });

    const botones = document.querySelectorAll('#opciones button');
    botones[pregunta.respuesta].classList.add('correcta');
    if (indice !== pregunta.respuesta) botones[indice].classList.add('incorrecta');

    if (indice === pregunta.respuesta) {
        puntos++;
        sumarXp(20);
        resultado.textContent = '¡Correctooo! 🎉 ' + pregunta.comentario;
    } else {
        resultado.textContent =
            'JAJAJA, respuesta incorrecta 😂 ' +
            pregunta.comentario;
    }

    setTimeout(() => {
        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            finalizarJuego();
        }
    }, 2200);
}

function finalizarJuego() {
    document.getElementById('pregunta').textContent =
        '¡MISIÓN COMPLETADA! 🎮';

    document.getElementById('progreso').textContent =
        `Puntuación: ${puntos} / ${preguntas.length}`;

    document.getElementById('opciones').innerHTML = '';
    document.getElementById('barraJuego').style.width = '100%';
    lanzarConfeti(puntos >= 6 ? 100 : 30);

    let mensaje = '';

    
if (puntos === 10) {
    mensaje = "🏆 ¡MAESTRO DE LAS ESCRITURAS! ¡John, eres una enciclopedia bíblica!";
} else if (puntos >= 8) {
    mensaje = "🔥 ¡NIVEL EXPERTO! ¡No te agarramos desprevenido!";
} else if (puntos >= 6) {
    mensaje = "👏 ¡MUY BUEN CONOCIMIENTO! ¡Vas por buen camino!";
} else if (puntos >= 4) {
    mensaje = "😂 ¡APROBADO! Pero toca leer unos capítulos más.";
} else {
    mensaje = "📖 ¡JOHN, A ESTUDIAR! La Biblia tiene unas cuantas sorpresas más.";
}


    document.getElementById('resultadoJuego').textContent = mensaje;

    const boton = document.createElement('button');

    boton.textContent = '🎁 RECLAMAR MIS 40 REGALOS';
    boton.onclick = () => irEscena('premios');

    document.getElementById('opciones').appendChild(boton);
}


// ==================================
// REGALOS VIRTUALES PARA JOHN
// ==================================


const cupones = [
    // 1 AL 10: MOTIVACION
    {
        titulo: "Nunca te rindas ❤️",
        mensaje: "No te rindas solo porque hoy sea difícil. Mañana puedes descubrir que todo ese esfuerzo valió la pena."
    },
    {
        titulo: "A tu propio ritmo 🌱",
        mensaje: "No tienes que avanzar rápido, solo procura no dejar de avanzar."
    },
    {
        titulo: "Un mal día no es una mala vida 🌈",
        mensaje: "Incluso los días malos forman parte de una historia que todavía puede tener un final bonito."
    },
    {
        titulo: "Aprende de tus errores ✨",
        mensaje: "No permitas que un error te haga olvidar todas las cosas que has hecho bien."
    },
    {
        titulo: "También puedes descansar ☁️",
        mensaje: "Descansa si lo necesitas, pero no confundas descansar con rendirte."
    },
    {
        titulo: "Cree en ti 🌟",
        mensaje: "Eres capaz de mucho más de lo que a veces imaginas."
    },
    {
        titulo: "No te compares 🦋",
        mensaje: "Tu camino tiene su propio ritmo. No tienes que vivir al ritmo de nadie más."
    },
    {
        titulo: "Todo toma tiempo 🌷",
        mensaje: "Las cosas buenas también necesitan tiempo para crecer."
    },
    {
        titulo: "Mira cuánto has avanzado 💗",
        mensaje: "No olvides lo lejos que has llegado por mirar solamente lo que te falta."
    },
    {
        titulo: "Sigue intentando 🎯",
        mensaje: "Todavía tienes muchas cosas bonitas por vivir."
    },

    // 11 AL 20: FE Y ESPERANZA
    {
        titulo: "Dios está contigo 🙏",
        versiculo: "Isaías 41:10",
        mensaje: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios."
    },
    {
        titulo: "Todo es posible ✝️",
        versiculo: "Filipenses 4:13",
        mensaje: "Todo lo puedo en Cristo que me fortalece."
    },
    {
        titulo: "Confía en el camino 🕊️",
        versiculo: "Salmos 37:5",
        mensaje: "Encomienda al Señor tu camino; confía en Él."
    },
    {
        titulo: "Confía de corazón ❤️",
        versiculo: "Proverbios 3:5-6",
        mensaje: "Confía en el Señor con todo tu corazón y no te apoyes solamente en tu propia prudencia."
    },
    {
        titulo: "Sé valiente 🦁",
        versiculo: "Josué 1:9",
        mensaje: "Sé fuerte y valiente. No temas ni desmayes, porque Dios estará contigo."
    },
    {
        titulo: "Nunca estás solo 🌟",
        versiculo: "Salmos 46:1",
        mensaje: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las dificultades."
    },
    {
        titulo: "Mantén la esperanza 🌻",
        versiculo: "Romanos 12:12",
        mensaje: "Alégrate en la esperanza, sé paciente en la tribulación y persevera en la oración."
    },
    {
        titulo: "Un futuro con esperanza 🌅",
        versiculo: "Jeremías 29:11",
        mensaje: "Dios tiene pensamientos de paz y no de mal, para darles un futuro y una esperanza."
    },
    {
        titulo: "Cree en lo imposible ✨",
        versiculo: "Mateo 19:26",
        mensaje: "Para Dios todo es posible."
    },
    {
        titulo: "No te canses de hacer el bien 💗",
        versiculo: "Gálatas 6:9",
        mensaje: "No nos cansemos de hacer el bien, porque a su tiempo cosecharemos si no nos damos por vencidos."
    },

    // 21 AL 30: ATREVETE A VIVIR
    {
        titulo: "Sal de tu zona de confort 🚀",
        mensaje: "A veces tienes que salir de lo conocido para descubrir de lo que eres capaz."
    },
    {
        titulo: "Atrapa las oportunidades 🌠",
        mensaje: "No todas las oportunidades llegan dos veces. Aprende a reconocerlas."
    },
    {
        titulo: "Apuesta por ti 🎲",
        mensaje: "Arriesgarse también es una manera de apostar por ti."
    },
    {
        titulo: "Equivocarse está bien 🌱",
        mensaje: "Equivocarte no significa fracasar, significa que lo intentaste."
    },
    {
        titulo: "No dejes que gane el miedo 🦋",
        mensaje: "No dejes que el miedo decida por ti."
    },
    {
        titulo: "Dale una oportunidad a tu sueño 🌙",
        mensaje: "Si tienes un sueño, dale al menos una oportunidad."
    },
    {
        titulo: "Empieza hoy 🎬",
        mensaje: "No necesitas tener todo resuelto para comenzar."
    },
    {
        titulo: "Descubre quién puedes ser 🌟",
        mensaje: "Atrévete a conocer nuevas versiones de ti."
    },
    {
        titulo: "Las decisiones también enseñan 🧭",
        mensaje: "Algunas decisiones difíciles pueden llevarte a lugares maravillosos."
    },
    {
        titulo: "Vive nuevas aventuras 🌍",
        mensaje: "Que nunca te falte curiosidad por descubrir lo que viene."
    },

    // 31 AL 40: AMISTAD Y AMOR PROPIO
    {
        titulo: "Nunca pierdas tu esencia 💗",
        mensaje: "Nunca pierdas esa esencia que te hace ser tú."
    },
    {
        titulo: "Mereces cosas bonitas 🌷",
        mensaje: "Mereces personas que también celebren tus logros."
    },
    {
        titulo: "No necesitas ser perfecto ✨",
        mensaje: "No necesitas ser perfecto para ser alguien increíble."
    },
    {
        titulo: "Está bien no estar bien ☁️",
        mensaje: "Está bien no tener un buen día; también eres humano."
    },
    {
        titulo: "Nunca dejes de reír 😂",
        mensaje: "Nunca dejes de reír, incluso por las cosas más tontas."
    },
    {
        titulo: "Reconoce tu valor 👑",
        mensaje: "Tu valor no depende de lo que los demás piensen de ti."
    },
    {
        titulo: "Rodéate de personas bonitas 🫂",
        mensaje: "Rodéate de personas con las que puedas ser tú mismo."
    },
    {
        titulo: "Gracias por tu amistad 💌",
        mensaje: "Gracias por formar parte de esta pequeña historia de amistad."
    },
    {
        titulo: "Más motivos para sonreír 🌈",
        mensaje: "Que nunca te falten motivos para sonreír ni personas con quienes compartirlos."
    },
    {
        titulo: "Tu historia continúa 🎬",
        mensaje: "Esta es solamente una parte de tu historia. Todavía te quedan muchas escenas por protagonizar."
    }
];

// CREAR LOS 40 REGALOS AUTOMATICAMENTE

let regalosAbiertos = [];

function crearRegalos() {
    const contenedor = document.getElementById('regalosGrid');

    contenedor.innerHTML = '';

    cupones.forEach((regalo, indice) => {
        const boton = document.createElement('button');

        boton.className = 'regalo';
        boton.innerHTML = `
            🎁
            <span>Regalo ${indice + 1}</span>
        `;

        boton.onclick = () => abrirCupon(indice);

        contenedor.appendChild(boton);
    });

    actualizarContador();
}

// ABRIR REGALO

function abrirCupon(numero) {
    const regalo = cupones[numero];

    if (!regalosAbiertos.includes(numero)) {
        regalosAbiertos.push(numero);
        sumarXp(10);

        const total = regalosAbiertos.length;
        if (total === 10) mostrarLogro('Coleccionista · 10 regalos');
        if (total === 20) mostrarLogro('Mitad del botín · 20 regalos');
        if (total === 40) {
            mostrarLogro('¡100% COMPLETADO! 🏆');
            lanzarConfeti(120);
        }
    }

    const contenido = document.getElementById('contenidoCupon');

    contenido.innerHTML = `
        <div class="mensaje-regalo">
            <span class="icono-regalo">🎁✨</span>

            <h3>${regalo.titulo}</h3>

            ${regalo.versiculo ? `<div class="versiculo">📖 ${regalo.versiculo}</div>` : ''}

            <p>${regalo.mensaje}</p>

            <small>Un pequeño recordatorio para ti, John. ❤️</small>
        </div>
    `;

    const botones = document.querySelectorAll('.regalo');

    botones[numero].classList.add('abierto');
    botones[numero].innerHTML = `
        💝
        <span>Descubierto</span>
    `;

    actualizarContador();
}

// CONTADOR DE REGALOS

function actualizarContador() {
    document.getElementById('contadorRegalos').textContent =
        regalosAbiertos.length;
}

// CREAR AL CARGAR LA PAGINA

crearRegalos();


// ==================================
// MUSICA
// ==================================

function controlarMusica() {
    const musica = document.getElementById('musica');
    const boton = document.getElementById('botonMusica');

    if (musica.paused) {
        musica.play().then(() => {
            boton.textContent = '♫ PAUSAR MÚSICA';
        }).catch(() => {
            boton.textContent = 'NO SE PUDO REPRODUCIR';
        });
    } else {
        musica.pause();
        boton.textContent = '♫ ACTIVAR MÚSICA';
    }
}

// ==================================
// PASTEL Y DESEOS
// ==================================

function apagarVelas() {
    document.getElementById('deseo').innerHTML =
        '✨ ¡Deseo concedido! Que este nuevo año esté lleno de felicidad, John. ❤️';

    lanzarConfeti(150);
    sumarXp(100);
    mostrarLogro('¡Juego completado! · +100 XP');

    document.querySelector('.pastel').innerHTML =
        '🎉🎂🎉<p>¡Feliz cumpleaños!</p>';
}


const particulas = document.querySelector('.particulas');

for (let i = 0; i < 35; i++) {
    const p = document.createElement('span');
    p.className = 'particula';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (5 + Math.random() * 7) + 's';
    particulas.appendChild(p);
}
