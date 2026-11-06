// ==========================================
// PRE-ENTREGA 3: FUNCIONES E INTEGRACIÓN DE LÓGICA
// ==========================================

// 1. FUNCIONES DE PROCESAMIENTO Y CÁLCULO
function calcularMultiplicador(tecnologia) {
  let tech = tecnologia.toLowerCase().trim();
  let multiplicador = 1;

  switch (tech) {
    case "html":
    case "css":
      multiplicador = 1;
      console.log(" Tecnología base seleccionada: " + tech.toUpperCase());
      break;
    case "javascript":
      multiplicador = 2;
      console.log(" Tecnología de lógica seleccionada: JAVASCRIPT");
      break;
    case "react":
      multiplicador = 3;
      console.log(" Tecnología avanzada seleccionada: REACT");
      break;
    default:
      alert(" Tecnología no reconocida. Se calculará con peso estándar.");
      multiplicador = 1;
      break;
  }
  return multiplicador;
}

// Funciones flecha con retorno implícito para cálculo real y validación
const calcularPuntosSesion = (horas, multiplicador) => horas * multiplicador;
const validarHoras = (horas) => !isNaN(horas) && horas > 0;

// 2. FUNCIONES DE ENTRADA Y SALIDA (I/O)
function pedirDatos() {
  let tecnologia = prompt("¿Qué tecnología estudiaste? (Escribe HTML, CSS, JavaScript, React o 'ESC' para salir):");

  if (tecnologia === null || tecnologia.trim().toUpperCase() === "ESC" || tecnologia.trim() === "") {
    return null;
  }

  let entradaHoras = prompt("¿Cuántas horas le dedicaste a " + tecnologia + "?");
  let horas = parseFloat(entradaHoras);

  return { tecnologia: tecnologia.trim(), horas };
}

function mostrarResumen(nombre, sesiones, totalHoras, totalPuntos) {
  console.log("==========================================");
  console.log(`RESUMEN FINAL DE LA JORNADA (${nombre.toUpperCase()}):`);
  console.log(`- Total de sesiones: ${sesiones}`);
  console.log(`- Total de horas acumuladas: ${totalHoras} hrs`);
  console.log(`- Total de Puntos XP obtenidos: ${totalPuntos} pts`);
  console.log("==========================================");

  if (sesiones > 0) {
    alert(`Resumen final de ${nombre}:\n- Sesiones completadas: ${sesiones}\n- Horas totales: ${totalHoras} hrs\n- Puntos XP totales: ${totalPuntos} pts.\n¡Revisa la consola (F12) para ver el detalle completo!`);
  } else {
    alert(" Saliendo del simulador sin registrar sesiones. ¡Hasta la próxima!");
  }
}

// 3. FLUJO PRINCIPAL DEL SIMULADOR
const entradaNombre = prompt("¡Hola! ¿Cuál es tu nombre?");
const nombreUsuario = entradaNombre && entradaNombre.trim() !== "" ? entradaNombre.trim() : "Estudiante";
alert("Bienvenido/a al simulador de control de estudio, " + nombreUsuario + ".");

let totalHorasEstudio = 0;
let sesionesRegistradas = 0;
let totalPuntosXP = 0;
let continuar = true;

console.log("=== INICIO DE SESIÓN DE ESTUDIO: " + nombreUsuario.toUpperCase() + " ===");

while (continuar) {
  const datosSesion = pedirDatos();

  if (datosSesion === null) {
    break;
  }

  const { tecnologia, horas } = datosSesion;
  let multiplicadorActual = calcularMultiplicador(tecnologia);

  if (!validarHoras(horas)) {
    alert(" Valor inválido. No se registraron horas para esta sesión.");
    console.log(" Intento fallido de registro por valor no numérico o negativo.");
  } else {
    let puntosSesion = calcularPuntosSesion(horas, multiplicadorActual);

    totalHorasEstudio += horas;
    totalPuntosXP += puntosSesion;
    sesionesRegistradas++;

    alert(`✅ ¡Sesión registrada! Sumaste ${puntosSesion} puntos de experiencia técnica.`);
    console.log(`> Sesión #${sesionesRegistradas}: ${horas} hrs de ${tecnologia.toUpperCase()} (Puntos: ${puntosSesion})`);
  }
}

mostrarResumen(nombreUsuario, sesionesRegistradas, totalHorasEstudio, totalPuntosXP);