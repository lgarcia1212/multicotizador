let vehiculos = []

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

class Vehiculo {
    constructor(
        marca,
        anio,
        modelo,
        sumaAsegurada,
        cotizacionTR,
        cotizacionC,
        cotizacionB,
        cotizacionA
    ) {
        this.marca = marca;
        this.anio = anio;
        this.modelo = modelo;
        this.sumaAsegurada = sumaAsegurada;
        this.cotizacionTR = cotizacionTR;
        this.cotizacionC = cotizacionC;
        this.cotizacionB = cotizacionB;
        this.cotizacionA = cotizacionA;
    }    
    toString = () => {
        return this.marca.toString().toUpperCase().trim() + " " + this.modelo.toString().toUpperCase().trim() + " - " + this.anio.toString().toUpperCase().trim() + " ($ Valor: " + this.sumaAsegurada.toString().toUpperCase().trim() + ")\n  Cotizaciones:\n    Todo Riesgo: " + this.cotizacionTR.toString().toUpperCase().trim() + "\n    Cobertura C: " + this.cotizacionC.toString().toUpperCase().trim() + "\n    Cobertura B: " + this.cotizacionB.toString().toUpperCase().trim() + "\n    Cobertura A: " + this.cotizacionA.toString().toUpperCase().trim() + "\n\n"
    }
}

let marca
let anio
let modelo
let antiguedad = 0;
const TASA_TR = 0.005;
const TASA_C = 0.0025;
const TASA_B = 0.0010;
const TASA_A = 0.0001;
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
        if(marca.length == 0){
            mensajesValidacion.push("ERROR: Complete el campo MARCA");
        }
        if(anio == " "){
            mensajesValidacion.push("ERROR: Complete el campo AÑO");
        }else if(anio > 2023) {
            mensajesValidacion.push("ERROR: El AÑO es incorrecto");
        }
        if(modelo == 0){
            mensajesValidacion.push("ERROR: Complete el campo MODELO");
        }
        if(sumaAsegurada < 0){
            mensajesValidacion.push("ERROR: La SUMA ASEGURADA es incorrecta");
        }

        return mensajesValidacion;
}

function cotizar (antiguedad, sumaAsegurada) {
    if(antiguedad <= 5) {
        cotizacionTR = sumaAsegurada * TASA_TR;
        cotizacionC = sumaAsegurada * TASA_C;
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 5){
        cotizacionTR = "Fuera de Pauta"
    }
    if(antiguedad > 5 && antiguedad <= 10) {
        cotizacionC = sumaAsegurada * TASA_C;
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 10){
        cotizacionTR = "Fuera de Pauta"
        cotizacionC = "Fuera de Pauta"
    } 
    if(antiguedad > 5 && antiguedad <= 20) {
        cotizacionB = sumaAsegurada * TASA_B;
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 20){
        cotizacionTR = "Fuera de Pauta"
        cotizacionC = "Fuera de Pauta"
        cotizacionB = "Fuera de Pauta"
    }
    if(antiguedad > 5 && antiguedad <= 30) {
        cotizacionA = sumaAsegurada * TASA_A;
    } else if (antiguedad > 20){
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




const formularioCotizacion = document.getElementById ("form-cotizar");
formularioCotizacion.addEventListener("submit", (e) => {
    e.preventDefault();
    let marca = document.getElementById("marca").value;
    let anio = parseInt(document.getElementById("anio").value);
    let modelo = document.getElementById("modelo").value;
    let sumaAsegurada = parseInt(document.getElementById("valor").value);

    calcularAntiguedad(anio);
    cotizar(antiguedad, sumaAsegurada);

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

    if(registrarVehiculo(marca, anio, modelo, sumaAsegurada)) {
        const contenedorCotizaciones = document.querySelector(".cotizaciones-list");
        contenedorCotizaciones.innerHTML = "";
        for(const vehiculo of vehiculos) {
            let item = document.createElement("li");
            item.className = "item-vehiculo";
            item.innerHTML = `<ul class="marca">${vehiculo.marca.toUpperCase().trim()}</ul>
                              <ul class="modelo">${vehiculo.modelo.toUpperCase().trim()}</ul>
                              <ul class="anio">${vehiculo.anio}</ul>
                              <ul class="suma-asegurada">$ ${vehiculo.sumaAsegurada}</ul>
                              <ul class="cotizaciones">Todo Riesgo: $ ${vehiculo.cotizacionTR} Cobertura C: $ ${vehiculo.cotizacionC} Cobertura B: $ ${vehiculo.cotizacionB} Cobertura A: $ ${vehiculo.cotizacionA}</ul>`;
            contenedorCotizaciones.appendChild(item);
            guardarLocal("listadoCotizaciones", JSON.stringify(vehiculos));
            formularioCotizacion.reset();   

        }

    }  
    const listadoCotizaciones_recuperar = localStorage.getItem("listadoCotizaciones");
    const listadoCotizaciones_parsear = JSON.parse(listadoCotizaciones_recuperar);
    console.log(listadoCotizaciones_parsear);
});








