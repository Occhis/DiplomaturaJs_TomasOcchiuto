// ==========================================
// PRE-ENTREGA 2: Logica y Control de Flujo
// ==========================================

const nombreUsuario = prompt("¡Hola! ¿Cuál es tu nombre?");
alert ("Bienvenido/a al controlador de estudio,"+nombreUsuario+"!");

let totalHorasEstudio = 0;
let sesionesRegistradas = 0;
let continuar = true;
let multiplicador =1;
console.log("=== INICIO DE SESIÓN DE ESTUDIO: " + nombreUsuario.toUpperCase() + " ===");

while (continuar){
    let tecnologia = prompt("Que tecnología deseas estudiar? (HTML, CSS, JS, React, o 'ESC' par salir)");
    if (tecnologia == null || tecnologia.toUpperCase() === "ESC"){
        continuar = false;
        break;
    }
tecnologia = tecnologia.toUpperCase();
switch (tecnologia){
    case "HTML":
    case "CSS":
        multiplicador = 1;
        console.log("Has seleccionado tu tecnologia base "+ tecnologia.toUpperCase()+" \nEs una buena eleccion para empezar.\nEl multiplicador de horas es de : "+multiplicador);
        break;
    case "JS":
        multiplicador = 2;
        console.log("Tecnologia seleccionada: "+ tecnologia.toUpperCase()+" \nEs una buena eleccion para seguir avanzando.\nEl multiplicador de horas es de : "+multiplicador);
        break;
    case "REACT":
        multiplicador = 3;
       console.log("Tecnologia seleccionada: "+ tecnologia.toUpperCase()+" \nEs una buena eleccion para seguir avanzando.\nEl multiplicador de horas es de : "+multiplicador);
       break;
    default:
        alert("Tecnologia no valida. Por favor, Ingresa HTML, CSS, JS, React, o 'ESC' par salir");
        break;
}
let entradahoras = prompt("Cuantas horas le dedicaste a "+ tecnologia.toUpperCase()+"?");
let horas = parseInt(entradahoras);
if(isNaN(horas) || horas <= 0){
    alert("Valor invalido , no se registraron horas para la tecnologia");
    console.log("Intento fallido de registro por valor no numérico o negativo");
}else{
    let puntos = horas * multiplicador;
    totalHorasEstudio += puntos;
    sesionesRegistradas++;
    alert(`✅ ¡Sesión registrada! Sumaste ${puntos} puntos de experiencia técnica.`);
    console.log(`> Sesión #${sesionesRegistradas}: ${horas} hrs de ${tecnologia.toUpperCase()} (Puntos: ${puntos})`);
}
console.log("RESUMEN FINAL DE LA JORNADA:");
console.log(`- Total de sesiones: ${sesionesRegistradas}`);
console.log(`- Total de horas acumuladas: ${totalHorasEstudio} hrs`);

if (sesionesRegistradas > 0) {
  alert(` Resumen final:\n- Sesiones completadas: ${sesionesRegistradas}\n- Horas totales de estudio: ${totalHorasEstudio} hrs.\n¡Revisa la consola (F12) para ver el detalle completo!`);
} else {
  alert("👋 Saliendo del simulador sin registrar sesiones. ¡Hasta la próxima!");
}
}