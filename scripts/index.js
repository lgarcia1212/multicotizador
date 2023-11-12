class Vehiculo {
    constructor(
        marca,
        anio,
        modelo,
        sumaAsegurada,
        cotizacionTR,
        cotizacionC,
        cotizacionB,
        cotizacionA,
        id
    ) {
        this.marca = marca;
        this.anio = anio;
        this.modelo = modelo;
        this.sumaAsegurada = sumaAsegurada;
        this.cotizacionTR = cotizacionTR;
        this.cotizacionC = cotizacionC;
        this.cotizacionB = cotizacionB;
        this.cotizacionA = cotizacionA;
        this.id = id;
    }
    toString = () => {
        return this.marca.toString().toUpperCase().trim() + " " + this.modelo.toString().toUpperCase().trim() + " - " + this.anio.toString().toUpperCase().trim() + " ($ Valor: " + this.sumaAsegurada.toString().toUpperCase().trim() + ")\n  Cotizaciones:\n    Todo Riesgo: " + this.cotizacionTR.toString().toUpperCase().trim() + "\n    Cobertura C: " + this.cotizacionC.toString().toUpperCase().trim() + "\n    Cobertura B: " + this.cotizacionB.toString().toUpperCase().trim() + "\n    Cobertura A: " + this.cotizacionA.toString().toUpperCase().trim() + "\n\n"
    }
}

let vehiculos = JSON.parse(localStorage.getItem("listadoCotizaciones")) || [];

let contenedorCotizaciones = document.querySelector(".cotizaciones-list");
contenedorCotizaciones.innerHTML = "";
for (const vehiculo of vehiculos) {
    let item = document.createElement("ul");
    item.className = "item-vehiculo";
    item.innerHTML = `<li class="marca">${vehiculo.marca.toUpperCase().trim()}</li>
                              <li class="modelo">${vehiculo.modelo.toUpperCase().trim()}</li>
                              <li class="anio">${vehiculo.anio}</li>
                              <li class="suma-asegurada">$ ${vehiculo.sumaAsegurada}</li>
                              <li class="cotizaciones">Todo Riesgo: $ ${vehiculo.cotizacionTR} Cobertura C: $ ${vehiculo.cotizacionC} Cobertura B: $ ${vehiculo.cotizacionB} Cobertura A: $ ${vehiculo.cotizacionA}</li>`;
    contenedorCotizaciones.appendChild(item);
}



const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};


let tasas = [];
const getTasas = async () => {
    const resp = await fetch("/scripts/tasas.json");
    const data = await resp.json();
    tasas = data;
}

getTasas();

const grabarTasas = (tasas = []) => {
    tasas.forEach((unaTasa) => {
        TASA_TR = unaTasa.tr;
        TASA_C = unaTasa.c;
        TASA_B = unaTasa.b;
        TASA_A = unaTasa.a;
    })
}

const inicializarCotizacion = async () => {
    await getTasas();
    grabarTasas(tasas);
}

inicializarCotizacion();


let marca
let anio
let modelo
let antiguedad = 0;
let id = "";
let cotizacionTR = 0;
let cotizacionC = 0;
let cotizacionB = 0;
let cotizacionA = 0;

function calcularAntiguedad(anio) {
    antiguedad = 2023 - anio;
}

const validacionVehiculo = (
    marca = "",
    anio = 0,
    modelo = "",
    sumaAsegurada = 0
) => {
    let mensajesValidacion = [];
    if (marca.length == 0) {
        mensajesValidacion.push(" Complete el campo MARCA");
    }
    if (isNaN(anio) || anio <= 0 || anio > new Date().getFullYear()) {
        mensajesValidacion.push(" Existe un error en el AÑO");
    }
    if (modelo.length == 0) {
        mensajesValidacion.push(" Complete el campo MODELO");
    }
    if (isNaN(sumaAsegurada) || sumaAsegurada < 0) {
        mensajesValidacion.push(" La SUMA ASEGURADA es incorrecta");
    }

    return mensajesValidacion;
}

function cotizar(antiguedad, sumaAsegurada) {
    if (antiguedad <= 5) {
        cotizacionTR = sumaAsegurada * TASA_TR;
        cotizacionC = sumaAsegurada * TASA_C;
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 5) {
        cotizacionTR = "Fuera de Pauta"
    }
    if (antiguedad > 5 && antiguedad <= 10) {
        cotizacionC = sumaAsegurada * TASA_C;
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 10) {
        cotizacionTR = "Fuera de Pauta"
        cotizacionC = "Fuera de Pauta"
    }
    if (antiguedad > 5 && antiguedad <= 20) {
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 20) {
        cotizacionTR = "Fuera de Pauta"
        cotizacionC = "Fuera de Pauta"
        cotizacionB = "Fuera de Pauta"
    }
    if (antiguedad > 5 && antiguedad <= 30) {
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 20) {
        cotizacionTR = "Fuera de Pauta"
        cotizacionC = "Fuera de Pauta"
        cotizacionB = "Fuera de Pauta"
        cotizacionA = "Fuera de Pauta"
    }
}

const registrarVehiculo = (marca, anio, modelo, sumaAsegurada) => {
    const errores = validacionVehiculo(marca, anio, modelo, sumaAsegurada);
    if (errores.length !== 0) {
        console.log(errores)
        return false;
    }

    let unVehiculo = new Vehiculo(marca, anio, modelo, sumaAsegurada, cotizacionTR, cotizacionC, cotizacionB, cotizacionA);
    vehiculos.push(unVehiculo);
    return true;
}




const formularioCotizacion = document.getElementById("form-cotizar");
formularioCotizacion.addEventListener("submit", (e) => {
    e.preventDefault();
    let marca = document.getElementById("marca").value;
    let anio = parseInt(document.getElementById("anio").value);
    let modelo = document.getElementById("modelo").value;
    let sumaAsegurada = parseInt(document.getElementById("valor").value);
    let id = Date.now();

    calcularAntiguedad(anio);
    cotizar(antiguedad, sumaAsegurada);

    const registrarVehiculo = (marca, anio, modelo, sumaAsegurada, id) => {
        const errores = validacionVehiculo(marca, anio, modelo, sumaAsegurada, id);
        if (errores.length !== 0) {
            Toastify({
                text: errores,
                duration: 10000,
                style: {
                    background: "#8d1919",
                  },
            }).showToast();
            return false;
        }
        let unVehiculo = new Vehiculo(marca, anio, modelo, sumaAsegurada, cotizacionTR, cotizacionC, cotizacionB, cotizacionA);
        vehiculos.push(unVehiculo);
        guardarLocal("listadoCotizaciones", JSON.stringify(vehiculos));
        return true;
    }
    if (registrarVehiculo(marca, anio, modelo, sumaAsegurada, id)) {
        let contenedorCotizaciones = document.querySelector(".cotizaciones-list");
        contenedorCotizaciones.innerHTML = "";
        for (const vehiculo of vehiculos) {
            let item = document.createElement("ul");
            item.className = "item-vehiculo";
            item.innerHTML = `<li class="marca">${vehiculo.marca.toUpperCase().trim()}</li>
                              <li class="modelo">${vehiculo.modelo.toUpperCase().trim()}</li>
                              <li class="anio">${vehiculo.anio}</li>
                              <li class="suma-asegurada">$ ${vehiculo.sumaAsegurada}</li>
                              <li class="cotizaciones">Todo Riesgo: $ ${vehiculo.cotizacionTR} </br> Cobertura C: $ ${vehiculo.cotizacionC} </br> Cobertura B: $ ${vehiculo.cotizacionB} </br> Cobertura A: $ ${vehiculo.cotizacionA}</li>`;
            contenedorCotizaciones.appendChild(item);

            formularioCotizacion.reset();

        }

    }
    const listadoCotizaciones_recuperar = localStorage.getItem("listadoCotizaciones");
    const listadoCotizaciones_parsear = JSON.parse(listadoCotizaciones_recuperar);
    console.log(listadoCotizaciones_parsear);
});

let botonLimpiarTabla = document.getElementById("delete-button");
botonLimpiarTabla.addEventListener("click", function(){
    localStorage.clear();
    contenedorCotizaciones.innerHTML = "";
    vehiculos = [];
})