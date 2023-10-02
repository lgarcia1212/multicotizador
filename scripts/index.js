/* let marca
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


do {
    let marca = prompt("Ingrese la marca de su vehiculo");
    let anio = prompt("Ingrese el año de fabricacion");
    let modelo = prompt("ingrese el modelo completo");
    let sumaAsegurada = parseInt(prompt("Ingrese el valor de su vehiculo"));

    function calcularAntiguedad(anio) {
        antiguedad = 2023 - anio;
    }
    calcularAntiguedad(anio)
    
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

    cotizar(antiguedad, sumaAsegurada)
    alert("Usted cotizo el vehiculo: " + marca.toLocaleUpperCase().concat(" ", modelo.toLocaleUpperCase()," - ", anio) + "\n---> Cobertura Todo Riesgo: $ " + cotizacionTR + "\n---> Cobertura C: $ " + cotizacionC + "\n---> Cobertura B: $ " + cotizacionB + "\n---> Cobertura A: $ " + cotizacionA)
    continuar = prompt("¿Desea cotizar otro auto: Si / No?");
} while(continuar.toUpperCase().trim() == "SI");
alert("¡Gracias por utilizar el Multicotizador!") */


// PRE ENTREGA 2 - Prueba 1 ----->

/* let cantidadVehiculos = parseInt(prompt("¿Cuantas unidades vas a cotizar"));
let vehiculos = [];

class Vehiculos {
    constructor(marca, modelo, anio, sumaAsegurada) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.sumaAsegurada = sumaAsegurada;
        /* this.resumenVehiculo = `${this.marca} ${this.modelo} ${this.anio} - Suma Asegurada: $${this.sumaAsegurada}` */

/*     mostrarResumenVehiculo(){
        console.log(this.resumenVehiculo)
    } */

/* 
for (i = 0; i < cantidadVehiculos; i++) {
    const unVehiculo = new Vehiculos (
        this.marca = prompt("Ingrese Marca"),
        this.modelo = prompt("Ingrese Modelo"),
        this.anio = parseInt(prompt("Ingrese Año")),
        this.sumaAsegurada = parseInt(prompt("Ingrese Valor del Vehiculo"))
    );
    vehiculos.push(unVehiculo)
} */

/* unVehiculo.mostrarResumenVehiculo(); */


/* const validacionVehiculo = (    
    marca,
    anio,
    modelo,
    sumaAsegurada
    ) => {
        let mensajesValidacion = [];
        if(marca == 0){
            mensajesValidacion.push("ERROR: Complete el campo MARCA");
        }
        if(anio > 2023){
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

const ingresarVehiculo = (
    marca,
    anio,
    modelo,
    sumaAsegurada
) => {
    const errores = validacionVehiculo(marca, anio, modelo, sumaAsegurada);
    if(errores.length !== 0) {
        console.table(errores);
    }
    let unVehiculo = new Vehiculos(
        marca,
        anio,
        modelo,
        sumaAsegurada
    );
    vehiculos.push(unVehiculo);
} */



// PRE ENTREGA 2 - Prueba 2 ----->

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
