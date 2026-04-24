// Cargamos Vue 3 desde internet y cuando termina de cargarse, arrancamos todo
var scriptVue = document.createElement("script");
scriptVue.src = "https://unpkg.com/vue@3/dist/vue.global.js";
scriptVue.onload = iniciar;
document.head.appendChild(scriptVue);


function iniciar() {

  // ─────────────────────────────────────────────
  // CURIOSIDADES ALEATORIAS
  // ─────────────────────────────────────────────

  var curiosidades = [
    "El estadio más grande del mundo tiene capacidad para 114.000 personas.",
    "Pelé es el único jugador en ganar tres Copas del Mundo.",
    "La portería mide exactamente 7,32 m de ancho y 2,44 m de alto.",
    "Messi marcó 91 goles en un solo año natural (2012).",
    "Brasil es la única selección que ha jugado todos los Mundiales de la historia.",
  ];

  document.getElementById("btn-curiosidad").addEventListener("click", function () {
    var indice = Math.floor(Math.random() * curiosidades.length);
    document.getElementById("curiosidad-aleatoria").textContent = curiosidades[indice];
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
      var errNombre  = Vue.ref("");
      var errEmail   = Vue.ref("");
      var errMensaje = Vue.ref("");
      var exito      = Vue.ref(false);

      // Esta función se ejecuta al pulsar "Enviar mensaje"
      function enviar(evento) {

        // Evita que al enviar el formulario la página se recargue
        evento.preventDefault();

        // Leemos lo que el usuario ha escrito en cada campo
        var nombre  = document.getElementById("nombre").value.trim();
        var email   = document.getElementById("email").value.trim();
        var mensaje = document.getElementById("mensaje").value.trim();

        // Borramos los errores del intento anterior
        errNombre.value  = "";
        errEmail.value   = "";
        errMensaje.value = "";
        exito.value      = false;

        // Comprobamos cada campo. Si algo falla, guardamos
        // el mensaje de error en la variable correspondiente
        // y Vue lo muestra en pantalla automáticamente.
        var valido = true;

        if (nombre.length < 2) {
          errNombre.value = "El nombre debe tener al menos 2 caracteres.";
          valido = false;
        }

        // Comprobamos que el email tenga el formato correcto (algo@algo.algo)
        var formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          errEmail.value = "El correo electrónico es obligatorio.";
          valido = false;
        } else if (!formatoEmail.test(email)) {
          errEmail.value = "Introduce un correo electrónico válido.";
          valido = false;
        }

        if (mensaje.length < 10) {
          errMensaje.value = "El mensaje debe tener al menos 10 caracteres.";
          valido = false;
        }

        // Si todos los campos son correctos, mostramos el mensaje de éxito
        // y vaciamos el formulario
        if (valido) {
          exito.value = true;
          document.getElementById("form-contacto").reset();
        }
      }

      // Le decimos a Vue qué variables y funciones puede usar en el HTML
      return { errNombre, errEmail, errMensaje, exito, enviar };
    }

  // Le decimos a Vue que controle solo la sección de contacto del HTML
  });

  app.mount("#contacto");

}
