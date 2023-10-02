let vehiculos = []

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
        return this.marca.toString().toUpperCase().trim() + " " + this.modelo.toString().toUpperCase().trim() + " - " + this.anio.toString().toUpperCase().trim() + " (Valor $: " + this.sumaAsegurada.toString().toUpperCase().trim() + ")\n  Cotizaciones:\n    Todo Riesgo: " + this.cotizacionTR.toString().toUpperCase().trim() + "\n    Cobertura C: " + this.cotizacionC.toString().toUpperCase().trim() + "\n    Cobertura B: " + this.cotizacionB.toString().toUpperCase().trim() + "\n    Cobertura A: " + this.cotizacionA.toString().toUpperCase().trim() + "\n\n"
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


do {
    let marca = prompt("Ingrese la marca de su vehiculo");
    let anio = prompt("Ingrese el año de fabricacion");
    let modelo = prompt("ingrese el modelo completo");
    let sumaAsegurada = parseInt(prompt("Ingrese el valor de su vehiculo"));

    calcularAntiguedad(anio);
    cotizar(antiguedad, sumaAsegurada);

    const unVehiculo = new Vehiculo(marca, anio, modelo, sumaAsegurada, cotizacionTR, cotizacionC, cotizacionB, cotizacionA); 
    vehiculos.push(unVehiculo)

    continuar = prompt("¿Desea cotizar otro auto: Si / No?");
} while(continuar.toUpperCase().trim() == "SI");
alert("¡Gracias por utilizar el Multicotizador!")


vehiculos.forEach((unVehiculo) => {
    console.log(unVehiculo.toString())
});
