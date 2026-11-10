// ==========================================
// PRE-ENTREGA 4: USO E INTERACCIÓN CON ARRAYS
// Simulador de Control y Ruta de Estudio
// ==========================================

// 1. PREPARACIÓN DE LA COLECCIÓN (Mínimo 5 elementos iniciales)
const tecnologiasEstudio = ["HTML", "CSS", "JavaScript", "React", "Git"];
const historialSesiones = [];

// 2. FUNCIONES DE REPORTE Y MANIPULACIÓN DE ARRAYS
function mostrarTecnologias(listaTecnologias) {
  console.log("--- Catálogo actual de tecnologías de estudio ---");
  for (const tecnologia of listaTecnologias) {
    console.log(`Tecnología: ${tecnologia}`);
  }
  console.log("-------------------------------------------------");
}

function gestionarColeccionInicial(lista) {
  console.log("=== FASE 1: PREPARACIÓN Y MANIPULACIÓN DINÁMICA DEL ARRAY ===");
  mostrarTecnologias(lista);

  lista.push("Testing");
  console.log("-> Se agregó 'Testing' al final con push().");

  lista.unshift("Lógica");
  console.log("-> Se agregó 'Lógica' al inicio con unshift().");

  mostrarTecnologias(lista);

  const elementoEliminado = lista.pop();
  const mensajeEliminado = `Se ha eliminado el elemento: ${elementoEliminado}`;
  console.log(mensajeEliminado);
  alert(mensajeEliminado);
}

function buscarTecnologia(lista) {
  console.log("=== FASE 2: BÚSQUEDA Y VALIDACIÓN EN EL ARRAY ===");
  const entradaBusqueda = prompt(
    `Tecnologías actuales: ${lista.join(", ")}\n\nIngresa el nombre de una tecnología para buscar en tu ruta (ej: JavaScript):`
  );

  if (entradaBusqueda === null || entradaBusqueda.trim() === "") {
    console.log("Búsqueda omitida por el usuario.");
    return;
  }

  const termino = entradaBusqueda.trim();


  let elementoNormalizado = termino;
  for (const item of lista) {
    if (item.toLowerCase() === termino.toLowerCase()) {
      elementoNormalizado = item;
      break;
    }
  }


  if (lista.includes(elementoNormalizado)) {
    const posicion = lista.indexOf(elementoNormalizado);
    const msgExito = `✅ La tecnología "${elementoNormalizado}" existe en la colección y se encuentra en el índice ${posicion}.`;
    console.log(msgExito);
    alert(msgExito);
  } else {
    const msgNoEncontrado = `⚠️ La tecnología "${termino}" no se encuentra en la lista (indexOf: ${lista.indexOf(termino)}).`;
    console.log(msgNoEncontrado);
    alert(msgNoEncontrado);
  }
}

function actualizarTecnologiaPorIndice(lista) {
  console.log("=== FASE 3: ACTUALIZACIÓN POR ÍNDICE CON SPLICE ===");
  let indiceActualizar = lista.indexOf("Git");
  if (indiceActualizar === -1) {
    indiceActualizar = lista.length - 1;
  }

  const valorAnterior = lista[indiceActualizar];
  const nuevoValor = prompt(
    `Vamos a actualizar el elemento en el índice ${indiceActualizar} (actualmente "${valorAnterior}").\nIngresa la nueva tecnología para esa posición (deja vacío para usar "Node.js"):`
  );

  const reemplazo = nuevoValor && nuevoValor.trim() !== "" ? nuevoValor.trim() : "Node.js";


  lista.splice(indiceActualizar, 1, reemplazo);
  console.log(`-> Índice ${indiceActualizar} actualizado con splice(): "${valorAnterior}" fue reemplazado por "${lista[indiceActualizar]}".`);

  mostrarTecnologias(lista);
}


function calcularMultiplicador(tecnologia) {
  let tech = tecnologia.toLowerCase().trim();
  let multiplicador = 1;

  switch (tech) {
    case "logica":
    case "lógica":
    case "html":
    case "css":
      multiplicador = 1;
      console.log(" Tecnología base seleccionada: " + tech.toUpperCase());
      break;
    case "javascript":
    case "git":
    case "node.js":
      multiplicador = 2;
      console.log(" Tecnología intermedia/lógica seleccionada: " + tech.toUpperCase());
      break;
    case "react":
      multiplicador = 3;
      console.log(" Tecnología avanzada seleccionada: REACT");
      break;
    default:
      alert(" Tecnología personalizada. Se calculará con peso estándar (x1).");
      multiplicador = 1;
      break;
  }
  return multiplicador;
}


const calcularPuntosSesion = (horas, multiplicador) => horas * multiplicador;
const validarHoras = (horas) => !isNaN(horas) && horas > 0;


function pedirDatos(listaDisponible) {
  let tecnologia = prompt(
    `Ruta disponible: ${listaDisponible.join(" | ")}\n\n¿Qué tecnología estudiaste hoy? (o escribe 'ESC' para finalizar y ver el resumen):`
  );

  if (tecnologia === null || tecnologia.trim().toUpperCase() === "ESC" || tecnologia.trim() === "") {
    return null;
  }

  let entradaHoras = prompt("¿Cuántas horas le dedicaste a " + tecnologia.trim() + "?");
  let horas = parseFloat(entradaHoras);

  return { tecnologia: tecnologia.trim(), horas };
}

function mostrarResumen(nombre, sesiones, totalHoras, totalPuntos, listaTecnologias, historial) {
  console.log("==========================================");
  console.log(`RESUMEN FINAL DE LA JORNADA (${nombre.toUpperCase()}):`);
  console.log(`- Total de sesiones: ${sesiones}`);
  console.log(`- Total de horas acumuladas: ${totalHoras} hrs`);
  console.log(`- Total de Puntos XP obtenidos: ${totalPuntos} pts`);

  if (historial.length > 0) {
    console.log("--- Detalle de sesiones registradas (for...of) ---");
    for (const registro of historial) {
      console.log(`Sesión: ${registro}`);
    }
  }

  mostrarTecnologias(listaTecnologias);
  console.log("==========================================");

  if (sesiones > 0) {
    alert(
      `Resumen final de ${nombre}:\n- Sesiones completadas: ${sesiones}\n- Horas totales: ${totalHoras} hrs\n- Puntos XP totales: ${totalPuntos} pts.\n¡Revisa la consola (F12) para ver el reporte completo de arrays y sesiones!`
    );
  } else {
    alert(" Saliendo del simulador sin registrar sesiones. ¡Revisa la consola (F12) para ver el reporte de tecnologías!");
  }
}


const entradaNombre = prompt("¡Hola! ¿Cuál es tu nombre?");
const nombreUsuario = entradaNombre && entradaNombre.trim() !== "" ? entradaNombre.trim() : "Estudiante";
alert("Bienvenido/a al simulador de control de estudio, " + nombreUsuario + ".");

console.log("=== INICIO DE SESIÓN DE ESTUDIO: " + nombreUsuario.toUpperCase() + " ===");


gestionarColeccionInicial(tecnologiasEstudio);
buscarTecnologia(tecnologiasEstudio);
actualizarTecnologiaPorIndice(tecnologiasEstudio);

let totalHorasEstudio = 0;
let sesionesRegistradas = 0;
let totalPuntosXP = 0;
let continuar = true;

console.log("=== FASE 4: REGISTRO DE SESIONES DE ESTUDIO ===");

while (continuar) {
  const datosSesion = pedirDatos(tecnologiasEstudio);

  if (datosSesion === null) {
    break;
  }

  const { tecnologia, horas } = datosSesion;

  let existeEnLista = false;
  for (const item of tecnologiasEstudio) {
    if (item.toLowerCase() === tecnologia.toLowerCase()) {
      existeEnLista = true;
      break;
    }
  }
  if (!existeEnLista) {
    tecnologiasEstudio.push(tecnologia);
    console.log(`-> Nueva tecnología "${tecnologia}" agregada dinámicamente al array con push().`);
  }

  let multiplicadorActual = calcularMultiplicador(tecnologia);

  if (!validarHoras(horas)) {
    alert(" Valor inválido. No se registraron horas para esta sesión.");
    console.log(" Intento fallido de registro por valor no numérico o negativo.");
  } else {
    let puntosSesion = calcularPuntosSesion(horas, multiplicadorActual);

    totalHorasEstudio += horas;
    totalPuntosXP += puntosSesion;
    sesionesRegistradas++;

    const descripcionSesion = `#${sesionesRegistradas} - ${tecnologia.toUpperCase()} (${horas} hrs | ${puntosSesion} XP)`;
    historialSesiones.push(descripcionSesion);

    alert(`✅ ¡Sesión registrada! Sumaste ${puntosSesion} puntos de experiencia técnica.`);
    console.log(`> Sesión registrada: ${descripcionSesion}`);
  }
}

mostrarResumen(
  nombreUsuario,
  sesionesRegistradas,
  totalHorasEstudio,
  totalPuntosXP,
  tecnologiasEstudio,
  historialSesiones
);