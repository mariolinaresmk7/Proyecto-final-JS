//REFERENCIAS CON EL DOM
let montoDelCredito = document.getElementById('imonto');
let cantidadDeCoutas = document.getElementById('cantidadDeCoutas');
let T_N_A = document.getElementById('interes');
let nombre = document.getElementById('iname').value;
apellido = document.getElementById('ilastname').value;

class Usuario {
    constructor(nombre, apellido,montoDelCredito,couta,cantidadDeCoutas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.monto= montoDelCredito.value,
        this.couta = couta
        this.numeroDeCoutas = cantidadDeCoutas.value;
    }
}

//document.getElementById("simularPrestamo").addEventListener("click", comenzar);
//document.getElementById("guardar").addEventListener("click", guardar);
//document.getElementById("simulacion").addEventListener("click", storage);
document.getElementById('reset').onclick = () => {
    location.reload();
}