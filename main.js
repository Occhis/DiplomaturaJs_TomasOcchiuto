// ==========================================
// PRE-ENTREGA 1: PRIMEROS PASOS CON JAVASCRIPT
// ==========================================

const nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
const entradaAnioNacimiento = prompt("¿En qué año naciste?");
const entradaHorasSemanales = prompt("¿Cuántas horas por semana le dedicas a programar?");
const anioNacimiento = parseInt(entradaAnioNacimiento);
const horasSemanales = parseInt(entradaHorasSemanales);
const ANIO_ACTUAL = 2026;
const edadActual = ANIO_ACTUAL - anioNacimiento;
const horasMensuales = horasSemanales * 4;
const mensajeBienvenida = "Bienvenido/a, " + nombreUsuario + ". Es un placer saludarte.";
const mensajeEdad = "Basado en tu año de nacimiento (" + anioNacimiento + "), este año estás cumpliendo o cumpliste " + edadActual + " años.";
const mensajeEstudio = "Dedicas " + horasSemanales + " horas semanales al código, lo que equivale a unas " + horasMensuales + " horas al mes.";
console.log("=== REGISTRO DE ACTIVIDAD ===");
console.log(mensajeBienvenida);
console.log(mensajeEdad);
console.log(mensajeEstudio);
alert(mensajeBienvenida);
alert(mensajeEdad);
alert(mensajeEstudio);