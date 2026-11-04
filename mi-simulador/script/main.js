// ==========================================
// PRE-ENTREGA 3: FUNCIONES E INTEGRACIÓN DE LÓGICA
// ==========================================

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
const calcularPuntosSesion = function(horas, multiplicador) {
  return horas * multiplicador;
};

const validarHoras = (horas) => !isNaN(horas) && horas > 0;

const nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
alert("Bienvenido/a al simulador de control de estudio, " + nombreUsuario + ".");

let totalHorasEstudio = 0;
let sesionesRegistradas = 0;
let totalPuntosXP = 0;
let continuar = true;

console.log("=== INICIO DE SESIÓN DE ESTUDIO: " + nombreUsuario.toUpperCase() + " ===");

while (continuar) {
  let tecnologia = prompt("¿Qué tecnología estudiaste? (Escribe HTML, CSS, JavaScript, React o 'ESC' para salir):");

  if (tecnologia === null || tecnologia.toUpperCase() === "ESC") {
    break;
  }
  let multiplicadorActual = calcularMultiplicador(tecnologia);

  let entradaHoras = prompt("¿Cuántas horas le dedicaste a " + tecnologia + "?");
  let horas = parseFloat(entradaHoras);

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

console.log("==========================================");
console.log("RESUMEN FINAL DE LA JORNADA:");
console.log(`- Total de sesiones: ${sesionesRegistradas}`);
console.log(`- Total de horas acumuladas: ${totalHorasEstudio} hrs`);
console.log(`- Total de Puntos XP obtenidos: ${totalPuntosXP} pts`);
console.log("==========================================");

if (sesionesRegistradas > 0) {
  alert(`Resumen final:\n- Sesiones completadas: ${sesionesRegistradas}\n- Horas totales: ${totalHorasEstudio} hrs\n- Puntos XP totales: ${totalPuntosXP} pts.\n¡Revisa la consola (F12) para ver el detalle completo!`);
} else {
  alert(" Saliendo del simulador sin registrar sesiones. ¡Hasta la próxima!");
}