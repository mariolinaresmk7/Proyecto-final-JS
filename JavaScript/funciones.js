// TOASTYFY ALERT
montoDelCredito.onblur = () => {
    (montoDelCredito.value < 1000) && Toastify({
        text: "ingrese un monto superior a 1000",
        duration: 4000,
        gravity: "top",
        position: "center",
        style: {
            background: "#f85032;  /* fallback for old browsers",
            background: "-webkit-linear-gradient(to right, #e73827, #f85032)",
            background: "linear-gradient(to right, #e73827, #f85032)"
        }
    }).showToast()
}
cantidadDeCoutas.onblur = () => {
    (cantidadDeCoutas.value === "0") &&
    Toastify({
        text: "Por favor seleccione la cantidad de coutas",
        duration: 4000,
        gravity: "top",
        position: "center",
        style: {
            background: "#f85032;  /* fallback for old browsers",
            background: "-webkit-linear-gradient(to right, #e73827, #f85032)",
            background: "linear-gradient(to right, #e73827, #f85032)"
        }
    }).showToast()
}
T_N_A.onblur = () => {
    (T_N_A.value < 1) &&
    Toastify({
        text: "Por favor ingrese un monto de interes",
        duration: 4000,
        gravity: "top",
        position: "center",
        style: {
            background: "#f85032;  /* fallback for old browsers",
            background: "-webkit-linear-gradient(to right, #e73827, #f85032)",
            background: "linear-gradient(to right, #e73827, #f85032)"
        }
    }).showToast()
}

//FUNCION STORAGE PARA CARGAR LA ULTIMA SIMULACION REALIZADA
document.getElementById("simulacion").addEventListener("click", storage);
function storage(e) {
    e.preventDefault();
    const activeName = localStorage.getItem('nombre');
    const activeLastName = localStorage.getItem('apellido');
    const activeMonto = localStorage.getItem('monto');
    const activeCantidad = localStorage.getItem('cantidadDeCoutas');
    const activeTNA = localStorage.getItem('TNA');
    const activeTotal = localStorage.getItem('total');
    const activeCouta = localStorage.getItem('couta')
    if (activeName === null || activeLastName === null || activeMonto === 0 || activeCantidad === 0 || activeTNA === 0) {
        console.log('No hay datos a recargar para el storage')
        swal({
            text: "No hay datos para mostrar la ultima simulación",
            icon: "error",
        })
    } else {
        swal({
            title: "Este fue el resultado de tu ultima simulación de prestamos",
            text: `Nombre: ${activeName.toUpperCase()}

        Apellido: ${activeLastName.toUpperCase()}

        Monto a solicitar es de $ ${activeMonto}.

        T.N.A ${activeTNA}

        Duracion ${activeCantidad}

        A pagar $ ${activeCouta} por couta

        Total a pagar $ ${activeTotal}`,
            button: false,
        })
    }
}

// FUNCION DEL PROCESO DE SIMULACION 
function proceso(montoDelCredito, cantidadDeCoutas, T_N_A) {
    interesPorMes = T_N_A / cantidadDeCoutas
    console.log(interesPorMes)
    console.log('esto seria el porcentaje mensual ' + interesPorMes)
    couta = montoDelCredito * (Math.pow(1 + interesPorMes / 100, cantidadDeCoutas) * interesPorMes / 100) / (Math.pow(1 + interesPorMes / 100, cantidadDeCoutas) - 1)
    console.log('couta mensual de ' + couta)
    localStorage.setItem('couta', couta.toFixed(2));
    let totalAPagar = couta * cantidadDeCoutas
    localStorage.setItem('total', totalAPagar.toFixed(2)),
        console.log('esto es el total a pagar ' + totalAPagar)
    let interes = totalAPagar - montoDelCredito
    console.log('esto es el interes a pagar ' + interes)
    const labels = [
        `Monto a solicitar $ ${montoDelCredito}`,
        `Intereses $ ${interes.toFixed(2)}`,
        `Total a pagar $ ${totalAPagar.toFixed(2)}`,
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Total del prestamo',
            backgroundColor: ['rgb(252, 133, 113)', 'rgb(255, 219, 112)', 'rgb(152, 215, 230)'],
            borderColor: 'rgb(0, 0, 0,0.2)',
            data: [montoDelCredito, interes.toFixed(2), totalAPagar.toFixed(2)],
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    let fecha = [];
    let fechaActual = Date.now();
    console.log(fechaActual)
    let mesActual = moment(fechaActual);
    console.log(mesActual)
    mesActual.add(1, 'month');
    for (let i = 1; i <= cantidadDeCoutas; i++) {
        pagoInteres = parseFloat(montoDelCredito * (interesPorMes / 100))
        pagoCapital = couta - pagoInteres
        montoDelCredito = parseFloat(montoDelCredito - pagoCapital)
        fecha[i] = mesActual.format('DD-MM-YYYY');
        mesActual.add(1, 'month');
        let tabla = document.getElementById('tbody')
        let tablita = document.createElement('tr')
        tablita.innerHTML = `
        <td>${fecha[i]}</td> 
        <td>${i}</td>
        <td>${couta.toFixed(2)}</td>
        <td>${pagoCapital.toFixed(2)}</td>
        <td>${pagoInteres.toFixed(2)}</td>
        <td>${montoDelCredito.toFixed(2)}</td>     
        `
        tabla.append(tablita)
    }

}

//FUNCION PARA SIMULAR UN POST A UNA API (json.placeholder)
document.getElementById("guardar").addEventListener("click", guardar);
function guardar(e) {
    e.preventDefault();
    const activeName = localStorage.getItem('nombre');
    const activeLastName = localStorage.getItem('apellido');
    const activeMonto = localStorage.getItem('monto');
    const activeCantidad = localStorage.getItem('cantidadDeCoutas');
    const activeTNA = localStorage.getItem('TNA');
    const activeTotal = localStorage.getItem('total');
    const activeCouta = localStorage.getItem('couta')
    const data = {
        Name: activeName,
        LastName: activeLastName,
        MontoPrestamo: activeMonto,
        CantidadCoutas: activeCantidad,
        T_N_A: activeTNA,
        ImporteCouta: activeCouta,
        totalAPagar: activeTotal,
    }
    fetch("https://jsonplaceholder.typicode.com/users", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json;  charset=UTf-8'
            }
        })
        .then(response => (response.json()))
        .then(json => {
            console.log(json);
            swal({
                title: "Guardar Simulacion",
                text: `${json.Name.toUpperCase()} ${json.LastName.toUpperCase()}. Su simulación fue guardada exitosamente`,
                buttons: false
            })
        })
}