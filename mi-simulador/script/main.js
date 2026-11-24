class Tecnologia {
    constructor(id, nombre, categoria, multiplicadorXP) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.multiplicadorXP = multiplicadorXP;
        this.horasAcumuladas = 0;
        this.puntosXP = 0;
        this.dominada = false;
    }

    registrarEstudio(horas) {
        if (isNaN(horas) || horas <= 0) {
            return 0;
        }
        const xpGanada = horas * this.multiplicadorXP;
        this.horasAcumuladas += horas;
        this.puntosXP += xpGanada;

        if (this.horasAcumuladas >= 10) {
            this.dominada = true;
        }

        return xpGanada;
    }

  
    obtenerResumen() {
        const estado = this.dominada ? "Dominada ✅" : "En progreso";
        return `[#${this.id}] ${this.nombre} (${this.categoria}) | x${this.multiplicadorXP} XP | ${this.horasAcumuladas}h | ${this.puntosXP} pts | ${estado}`;
    }
}


const techHtml = new Tecnologia(1, "HTML", "Frontend", 1);
const techCss = new Tecnologia(2, "CSS", "Frontend", 1);
const techJs = new Tecnologia(3, "JavaScript", "Lenguaje", 2);
const techReact = new Tecnologia(4, "React", "Framework", 3);
const techGit = new Tecnologia(5, "Git", "Herramientas", 2);

const tecnologiasEstudio = [techHtml, techCss, techJs, techReact, techGit];
const historialSesiones = [];

const estadoUsuario = {
    nombre: "Estudiante",
    sesiones: 0
};


function verificarInstanciasEnConsola() {
    console.log("=== VERIFICACIÓN DE INSTANCIAS Y MÉTODOS ===");
    console.log("Instancias iniciales:");
    console.log(techJs.obtenerResumen());
    console.log(techReact.obtenerResumen());
    console.log(techGit.obtenerResumen());

   
    const techPrueba = new Tecnologia(99, "TypeScript", "Lenguaje", 2);
    console.log("\nAntes de registrar estudio:", techPrueba.obtenerResumen());
    techPrueba.registrarEstudio(12);
    console.log("Después de registrar 12h:", techPrueba.obtenerResumen());
    console.log("============================================\n");
}


function buscarTecnologiaPorNombre(lista, termino) {
    const limpio = termino.trim().toLowerCase();
    return lista.find((tech) => tech.nombre.toLowerCase() === limpio) || null;
}

function obtenerSiguienteId(lista) {
    if (lista.length === 0) return 1;
    const maxId = Math.max(...lista.map((tech) => tech.id));
    return maxId + 1;
}

const validarHoras = (horas) => !isNaN(horas) && horas > 0;

function mostrarFeedback(mensaje) {
    const cajaFeedback = document.getElementById("mensaje-feedback");
    cajaFeedback.textContent = mensaje;
}

function renderizarTecnologias() {
    const ulTecnologias = document.getElementById("lista-tecnologias");
    const selectIndice = document.getElementById("select-indice");

    ulTecnologias.innerHTML = "";
    selectIndice.innerHTML = "";

    tecnologiasEstudio.forEach((tech, indice) => {
        const li = document.createElement("li");
        const marcaDominada = tech.dominada ? " ⭐" : "";
        li.textContent = `[${indice}] ${tech.nombre} (${tech.horasAcumuladas}h | ${tech.puntosXP} XP)${marcaDominada}`;
        ulTecnologias.appendChild(li);

        const option = document.createElement("option");
        option.value = indice;
        option.textContent = `Índice ${indice}: ${tech.nombre} (${tech.categoria})`;
        selectIndice.appendChild(option);
    });
}

function renderizarEstadisticas() {
    let totalHoras = 0;
    let totalXP = 0;

    for (const tech of tecnologiasEstudio) {
        totalHoras += tech.horasAcumuladas;
        totalXP += tech.puntosXP;
    }

    document.getElementById("stat-sesiones").textContent = estadoUsuario.sesiones;
    document.getElementById("stat-horas").textContent = `${totalHoras} hrs`;
    document.getElementById("stat-xp").textContent = `${totalXP} pts`;
}

function renderizarHistorial() {
    const ulHistorial = document.getElementById("lista-historial");
    ulHistorial.innerHTML = "";

    for (const registro of historialSesiones) {
        const li = document.createElement("li");
        li.textContent = registro;
        ulHistorial.appendChild(li);
    }
}

function actualizarNombreUsuario() {
    const inputNombre = document.getElementById("input-nombre");
    const nombreLimpio = inputNombre.value.trim();

    if (nombreLimpio !== "") {
        estadoUsuario.nombre = nombreLimpio;
        document.getElementById("saludo-usuario").textContent = `Hola, ${estadoUsuario.nombre}`;
        inputNombre.value = "";
    }
}

function agregarTecnologia(alInicio = false) {
    const inputTech = document.getElementById("input-tech");
    const nombre = inputTech.value.trim();

    if (nombre === "") {
        mostrarFeedback("⚠️ Escribe el nombre de una tecnología para agregar.");
        return;
    }

    if (buscarTecnologiaPorNombre(tecnologiasEstudio, nombre)) {
        mostrarFeedback(`⚠️ "${nombre}" ya existe en tu catálogo.`);
        return;
    }

    const nuevoId = obtenerSiguienteId(tecnologiasEstudio);
    const nuevaInstancia = new Tecnologia(nuevoId, nombre, "Personalizada", 2);

    if (alInicio) {
        tecnologiasEstudio.unshift(nuevaInstancia);
        mostrarFeedback(`✅ Se instanció y agregó "${nuevaInstancia.nombre}" al inicio.`);
    } else {
        tecnologiasEstudio.push(nuevaInstancia);
        mostrarFeedback(`✅ Se instanció y agregó "${nuevaInstancia.nombre}" al final.`);
    }

    console.log("Nueva instancia creada:", nuevaInstancia.obtenerResumen());
    inputTech.value = "";
    renderizarTecnologias();
}

function eliminarUltimaTecnologia() {
    if (tecnologiasEstudio.length === 0) {
        mostrarFeedback("⚠️ No hay elementos para eliminar.");
        return;
    }

    const eliminada = tecnologiasEstudio.pop();
    mostrarFeedback(`🗑️ Se eliminó el objeto "${eliminada.nombre}" (${eliminada.puntosXP} XP).`);
    renderizarTecnologias();
    renderizarEstadisticas();
}

function buscarTecnologiaDOM() {
    const inputBuscar = document.getElementById("input-buscar");
    const termino = inputBuscar.value.trim();

    if (termino === "") {
        mostrarFeedback("⚠️ Ingresa un término de búsqueda.");
        return;
    }

    const encontrada = buscarTecnologiaPorNombre(tecnologiasEstudio, termino);

    if (encontrada) {
        const posicion = tecnologiasEstudio.indexOf(encontrada);
        mostrarFeedback(`✅ Índice ${posicion}: ${encontrada.obtenerResumen()}`);
    } else {
        mostrarFeedback(`❌ "${termino}" no se encuentra en la colección.`);
    }
}

function reemplazarTecnologiaDOM() {
    const selectIndice = document.getElementById("select-indice");
    const inputReemplazo = document.getElementById("input-reemplazo");

    const indice = parseInt(selectIndice.value);
    const nuevoNombre = inputReemplazo.value.trim() || "Node.js";

    if (isNaN(indice) || tecnologiasEstudio.length === 0) return;

    const anterior = tecnologiasEstudio[indice];
    const nuevaInstancia = new Tecnologia(anterior.id, nuevoNombre, anterior.categoria, anterior.multiplicadorXP);

    tecnologiasEstudio.splice(indice, 1, nuevaInstancia);
    mostrarFeedback(`🔄 Índice ${indice} reemplazado: "${anterior.nombre}" → "${nuevaInstancia.nombre}".`);

    inputReemplazo.value = "";
    renderizarTecnologias();
    renderizarEstadisticas();
}

function manejarRegistroSesion(evento) {
    evento.preventDefault();

    const inputTech = document.getElementById("input-sesion-tech");
    const inputHoras = document.getElementById("input-sesion-horas");

    const nombreIngresado = inputTech.value.trim();
    const horas = parseFloat(inputHoras.value);

    if (nombreIngresado === "" || !validarHoras(horas)) {
        mostrarFeedback("⚠️ Ingresa una tecnología válida y horas mayores a 0.");
        return;
    }


    let techObjeto = buscarTecnologiaPorNombre(tecnologiasEstudio, nombreIngresado);
    if (!techObjeto) {
        const nuevoId = obtenerSiguienteId(tecnologiasEstudio);
        techObjeto = new Tecnologia(nuevoId, nombreIngresado, "Personalizada", 2);
        tecnologiasEstudio.push(techObjeto);
    }


    const xpGanada = techObjeto.registrarEstudio(horas);
    estadoUsuario.sesiones++;

    const descripcion = `#${estadoUsuario.sesiones} - ${techObjeto.nombre.toUpperCase()} (${horas} hrs | +${xpGanada} XP | Acumulado: ${techObjeto.horasAcumuladas}h)`;
    historialSesiones.push(descripcion);

    console.log("Estado actualizado del objeto:", techObjeto.obtenerResumen());
    mostrarFeedback(`🚀 ¡Sesión registrada en ${techObjeto.nombre}! Sumaste ${xpGanada} XP.`);

    renderizarTecnologias();
    renderizarEstadisticas();
    renderizarHistorial();

    inputTech.value = "";
    inputHoras.value = "";
}

function iniciarSimulador() {
    verificarInstanciasEnConsola();
    renderizarTecnologias();
    renderizarEstadisticas();

    document.getElementById("btn-guardar-nombre").addEventListener("click", actualizarNombreUsuario);
    document.getElementById("btn-agregar-final").addEventListener("click", () => agregarTecnologia(false));
    document.getElementById("btn-agregar-inicio").addEventListener("click", () => agregarTecnologia(true));
    document.getElementById("btn-eliminar-ultima").addEventListener("click", eliminarUltimaTecnologia);
    document.getElementById("btn-buscar").addEventListener("click", buscarTecnologiaDOM);
    document.getElementById("btn-actualizar").addEventListener("click", reemplazarTecnologiaDOM);
    document.getElementById("form-sesion").addEventListener("submit", manejarRegistroSesion);
}

iniciarSimulador();