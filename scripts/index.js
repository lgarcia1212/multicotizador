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

alert("¡Gracias por utilizar el Multicotizador!")
