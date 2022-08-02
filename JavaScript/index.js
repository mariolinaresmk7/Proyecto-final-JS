document.getElementById("simularPrestamo").addEventListener("click", comenzar);
function comenzar(e) {
    e.preventDefault();
    localStorage.setItem('monto', montoDelCredito.value),
    localStorage.setItem('cantidadDeCoutas', cantidadDeCoutas.value),
    localStorage.setItem('TNA', T_N_A.value),
    nombre = document.getElementById('iname').value;
    localStorage.setItem('nombre', nombre);
    apellido = document.getElementById('ilastname').value;
    localStorage.setItem('apellido', apellido);
    if (nombre.length < '3' || apellido.length < '3' || montoDelCredito.value < 1000 || cantidadDeCoutas.value === "0" || T_N_A.value === "0") {
        swal({
            text: "Por favor revise los datos ingresados",
            icon: "error",
        })
    } else {
        document.querySelector(".tabla").style.display = "block";
        document.querySelector(".titulo").style.display = "block";
        document.querySelector(".btnGuardar").style.display = 'block'
        proceso(montoDelCredito.value, cantidadDeCoutas.value, T_N_A.value);
    }
    let listaUsers = [];
    listaUsers.push(new Usuario(nombre, apellido,montoDelCredito,couta,cantidadDeCoutas));
    console.log(listaUsers);
    let resultText = document.getElementById("result-text");
    listaUsers.forEach(element => {
        resultText.innerHTML = `
        <ul>
            <li><h4>Monto a solicitar: $ ${element.monto}</h4>
            </li>
            <li> <h4>A Pagar en ${element.numeroDeCoutas} coutas de: $ ${element.couta.toFixed(2)}</h4>
            </li>
        </ul>
        `
        console.log(element);
    });
}


