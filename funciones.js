function prestamosClientes() {
    return function (array) {
        montoDelCredito = +document.getElementById('imonto').value;
        console.log('monto del credito a solicitar ' + montoDelCredito);
        cantidadDeCoutas = document.getElementById('cantidadDeCoutas');
        if (cantidadDeCoutas.value === '12') {
            intereses = array[0] * montoDelCredito;
            console.log('total de intereses: ' + intereses)
        } else if (cantidadDeCoutas.value === '24') {
            intereses = array[1] * montoDelCredito;
            console.log('total de intereses: ' + intereses)
        } else if (cantidadDeCoutas.value === '36') {
            intereses = array[2] * montoDelCredito;
            console.log('total de intereses: ' + intereses)
        } else if (cantidadDeCoutas.value === '48') {
            intereses = array[3] * montoDelCredito;
            console.log('total de intereses: ' + intereses)
        }
        totalAPagar = intereses + montoDelCredito;
        console.log('total a pagar con intereses ' + totalAPagar)
        coutas = totalAPagar / cantidadDeCoutas.value;
        console.log('monto por coutas ' + coutas)
        tipoDeCredito = document.getElementById('tipoDePrestamo').value
        swal({
            title: "Simulador de Prestamo",
            text: `
                Bienvenido
                Tipo de credito: ${tipoDeCredito}
                Monto a solicitar es de $ ${montoDelCredito}
                Su total a pagar es de ${cantidadDeCoutas.value} coutas  de $ ${coutas}`,
            icon: "success"
        })
    }
};


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
            backgroundColor: ['rgb(3, 132, 252)', 'rgb(252, 90, 3)', 'rgb(232, 188, 172)'],
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