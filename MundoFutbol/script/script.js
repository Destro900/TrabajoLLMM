// ─────────────────────────────────────────────
  // CURIOSIDADES ALEATORIAS
  // ─────────────────────────────────────────────

  var curiosidades = [
    "El estadio más grande del mundo tiene capacidad para 114.000 personas.",
    "Pelé es el único jugador en ganar tres Copas del Mundo.",
    "La portería mide exactamente 7,32 m de ancho y 2,44 m de alto. ",
    "Messi marcó 91 goles en un solo año natural (2012).",
    "El partido de fútbol con más espectadores en la historia fue la final del Mundial de 1950 entre Brasil y Uruguay, con más de <strong>200.000 personas</strong> en el estadio Maracaná.",
    "Brasil es la única selección que ha jugado todos los Mundiales de la historia.",
  ];

  document.getElementById("btn-curiosidad").addEventListener("click", function () {
    // Ocultar la curiosidad predeterminada
    var curiosidadPredeterminada = document.getElementById("curiosidad-predeterminada");
    if (curiosidadPredeterminada) {
      curiosidadPredeterminada.style.display = "none";
    }
    // Mostrar una curiosidad aleatoria diferente de la actual
    var curiosidadAleatoria = document.getElementById("curiosidad-aleatoria");
    var currentContent = curiosidadAleatoria.innerHTML;
    var indice;
    do {
      indice = Math.floor(Math.random() * curiosidades.length);
    } while (curiosidades[indice] === currentContent);
    curiosidadAleatoria.innerHTML = curiosidades[indice];
    curiosidadAleatoria.style.display = "block";
  });


  // ─────────────────────────────────────────────
  // FILTRO DE JUGADORES
  // ─────────────────────────────────────────────

  document.querySelectorAll("#filtros-jugadores .btn-filtro").forEach(function (boton) {
    boton.addEventListener("click", function () {
      document.querySelectorAll("#filtros-jugadores .btn-filtro").forEach(function (b) {
        b.classList.remove("activo");
      });
      boton.classList.add("activo");

      var filtro = boton.dataset.filtro;
      document.querySelectorAll("#grid-jugadores .tarjeta-jugador").forEach(function (tarjeta) {
        if (filtro === "todos" || tarjeta.dataset.posicion === filtro) {
          tarjeta.style.display = "";
        } else {
          tarjeta.style.display = "none";
        }
      });
    });
  });


  // ─────────────────────────────────────────────
  // FILTRO DE EQUIPOS
  // ─────────────────────────────────────────────

  document.querySelectorAll("#filtros-equipos .btn-filtro").forEach(function (boton) {
    boton.addEventListener("click", function () {
      document.querySelectorAll("#filtros-equipos .btn-filtro").forEach(function (b) {
        b.classList.remove("activo");
      });
      boton.classList.add("activo");

      var filtro = boton.dataset.filtro;
      document.querySelectorAll("#grid-equipos .tarjeta-equipo").forEach(function (tarjeta) {
        if (filtro === "todos" || tarjeta.dataset.pais === filtro) {
          tarjeta.style.display = "";
        } else {
          tarjeta.style.display = "none";
        }
      });
    });
  });


  // ─────────────────────────────────────────────
  // FORMULARIO DE CONTACTO CON VUE
  //
  // Vue es una librería que conecta variables de
  // JavaScript con el HTML. Cuando una variable
  // cambia, el HTML se actualiza solo. Sin Vue
  // tendríamos que buscar cada elemento del HTML
  // y actualizarlo a mano cada vez.
  // ─────────────────────────────────────────────

  var app = Vue.createApp({
    setup() {

      // ref() crea una variable especial que Vue "vigila".
      // Cuando su valor cambia, Vue actualiza el HTML donde
      // esa variable aparece, sin que tengamos que hacer nada más.
      var ref        = Vue.ref;

      var nombre     = ref("");
      var email      = ref("");
      let mensaje    = ref("");
      var favorito   = ref("");

      var errNombre  = ref("");
      var errEmail   = ref("");
      var errMensaje = ref("");
      var exito      = ref(false);

      // Esta función se ejecuta al pulsar "Enviar mensaje"
      function enviar() {


        // Borramos los errores del intento anterior
        errNombre.value  = "";
        errEmail.value   = "";
        errMensaje.value = "";
        exito.value      = false;

        // Comprobamos cada campo. Si algo falla, guardamos
        // el mensaje de error en la variable correspondiente
        // y Vue lo muestra en pantalla automáticamente.
        var valido = true;

        if (nombre.value.trim().length < 2) {
          errNombre.value = "El nombre debe tener al menos 2 caracteres.";
          valido = false;
        }

        // Comprobamos que el email tenga el formato correcto (algo@algo.algo)
        var formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
          errEmail.value = "El correo electrónico es obligatorio.";
          valido = false;
        } else if (!formatoEmail.test(email.value)) {
          errEmail.value = "Introduce un correo electrónico válido.";
          valido = false;
        }

        if (mensaje.value.trim().length < 10) {
          errMensaje.value = "El mensaje debe tener al menos 10 caracteres.";
          valido = false;
        }

        // Si todos los campos son correctos, mostramos el mensaje de éxito
        // y vaciamos el formulario
        if (valido) {
          exito.value = true;
          nombre.value = "";
          email.value = "";
          mensaje.value = "";
          favorito.value = "";
        }
      }

      // Le decimos a Vue qué variables y funciones puede usar en el HTML
       return { nombre, email, mensaje, favorito, errNombre, errEmail, errMensaje, exito, enviar };
    }

  // Le decimos a Vue que controle solo la sección de contacto del HTML
  });

  app.mount("#contacto");
