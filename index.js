let montoDelCredito = document.getElementById('imonto');
let cantidadDeCoutas = document.getElementById('cantidadDeCoutas');
let T_N_A = document.getElementById('interes');
nombre = document.getElementById('iname').value;
apellido = document.getElementById('ilastname').value;
document.getElementById('reset').onclick = () =>{
    location.reload();
}

class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido
    }
}

document.getElementById("simularPrestamo").addEventListener("click", comenzar);
function comenzar(e) {
    e.preventDefault();
    localStorage.setItem('monto', montoDelCredito.value),
    localStorage.setItem('cantidadDeCoutas',cantidadDeCoutas.value),
    localStorage.setItem('TNA', T_N_A.value),
    nombre = document.getElementById('iname').value;
    localStorage.setItem('nombre',nombre);
    apellido = document.getElementById('ilastname').value;
    localStorage.setItem('apellido',apellido);
    if (nombre.length < '3' || apellido.length < '3' || montoDelCredito.value < 1000 || cantidadDeCoutas.value === "0" || T_N_A.value === "0") {
        swal({
            text: "Por favor revise los datos ingresados",
            icon: "error",
        
        })
        
    } else {
        document.querySelector(".tabla").style.display="block";
        document.querySelector(".titulo").style.display="block";
        document.querySelector(".btnGuardar").style.display = 'block'
        proceso(montoDelCredito.value, cantidadDeCoutas.value, T_N_A.value);
        
    }
    
}
document.getElementById("simulacion").addEventListener("click", storage);
function storage (e) {
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
   } else {
      swal({
        
        title:"Este fue el resultado de tu ultima simulación de prestamos",
        text: 
        `Nombre: ${activeName.toUpperCase()}

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
    swal({
        title:"Guardar Simulacion",
        text:"Su simulación fue guardada exitosamente",
        icon:"success",
        buttons: false
    }) 
    fetch('  http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json;  charset=UTf-8'
            }
        })
        .then((response) => (response.json()))
        .then((data) => {
            console.log(data);
            
           /*  let storage = document.getElementById('storage');
            storage.innerHTML = `
            <h3 class="text-center text-white">Bienvenido</h3>
            <h5 class="text-center text-white">${data.activeName.toUpperCase()}, ${data.activeLastName.toUpperCase()}</h5>
            <p class="text-center text-white">Sus datos fueron cargados de forma correcta</p>
            ` */
       })
      /* fetch('/estilos/img_introHome.png')
      .then(res => console.log((res.blob()))) */
    
}
