let savedPass = 'martillo';
function logIn() {
    let entrar = false;
    for (let i = 2; i >= 0; i--) {
        let userPass = prompt('Ingresa tu contraseña. Tenes ' + (i + 1) + ' oportunidades.');
        if (userPass === savedPass) {
            alert('LogIn exitoso. Bienvenido a The Tool House.');
            entrar = true;
            break;
        } else {
            alert('Contraseña incorrecta. Te quedan ' + i + ' intentos')
        }
    }
    return entrar;
}

class Herramienta {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.cantidadVendida = 0;
    }

    vender(cantidad) {
        this.stock = this.stock - cantidad;
        this.cantidadVendida = this.cantidadVendida + cantidad;
    }

    totalVendido() {
        return this.cantidadVendida * this.precio;
    }

}

const sierra = new Herramienta('Sierra Dewalt', 200, 10);
const taladro = new Herramienta('Taladro Makita', 350, 20);
const amoladora = new Herramienta('Amoladora Stanley', 450, 9);

const herramientas = [];
herramientas.push(sierra);
herramientas.push(taladro);
herramientas.push(amoladora);


class Servicio {
    constructor(nombre, costo, disponible) {
        this.nombre = nombre;
        this.costo = costo;
        this.disponible = disponible;
    }
    definirDisponibilidad(estado) {
        this.disponible = estado;
    }
}

const reparacionSimple = new Servicio('Reparacion Simple', 5000, true);
const reparacionCompleja = new Servicio('Reparacion Compleja', 6500, false);
const asistencia = new Servicio('Asistencia', 2500, true);

const servicios = [];
servicios.push(reparacionSimple);
servicios.push(reparacionCompleja);
servicios.push(asistencia);

let compraTotal = 0;

if (logIn()) {
    let opcion = prompt('Elegí una opción: \n1- Herramientas. \n2 - Servicios. \nPresioná X para finalizar. ');
    let terminar = false;

    while (opcion != 'X' && opcion != 'x' && !terminar) {
        switch (opcion) {
            case '1':
                let seleccionTipoHerramienta = 'Elegi la herramienta\n';
                for (let index = 0; index < herramientas.length; index++) {
                    seleccionTipoHerramienta = seleccionTipoHerramienta + (index + 1) + '- ' + herramientas[index].nombre + '\n';
                }
                let tipoDeHerramienta = prompt(seleccionTipoHerramienta);
                const tipoEnNumero = parseInt(tipoDeHerramienta);
                if (tipoEnNumero === undefined || tipoEnNumero < 1 || tipoEnNumero > herramientas.length) {
                    alert('Eleccion invalida');
                } else {
                    const seleccionCantidad = 'Ingresa la cantidad a comprar\n Cantidad disponible: ' + herramientas[tipoEnNumero - 1].stock + ' Precio: ' + herramientas[tipoEnNumero - 1].precio;
                    let cantidadAComprar = prompt(seleccionCantidad);
                    const cantidadAComprarEnNumero = parseInt(cantidadAComprar);
                    if (cantidadAComprarEnNumero === undefined || cantidadAComprarEnNumero < 1 || cantidadAComprarEnNumero > herramientas[tipoEnNumero - 1].stock) {
                        alert('Cantidad invalida');
                    } else {
                        herramientas[tipoEnNumero - 1].vender(cantidadAComprarEnNumero);
                        compraTotal = compraTotal + (cantidadAComprarEnNumero * herramientas[tipoEnNumero - 1].precio);
                    }
                }
                break;
            case '2':
                let seleccionTipoServicio = 'Elegi el tipo de servicio\n';
                for (let index = 0; index < servicios.length; index++) {
                    if (servicios[index].disponible) {
                        seleccionTipoServicio = seleccionTipoServicio + (index + 1) + '- ' + servicios[index].nombre + '\n';
                    }
                }
                let tipoDeServicio = prompt(seleccionTipoServicio);
                const tipoDeServicioEnNumero = parseInt(tipoDeServicio);
                if (tipoDeServicioEnNumero === undefined || tipoDeServicioEnNumero < 1 || tipoDeServicioEnNumero > servicios.length) {
                    alert('Eleccion invalida');
                } else if (!servicios[tipoDeServicioEnNumero - 1].disponible) {
                    alert('Servicio no disponible');
                } else {
                    const confirmaServicio = prompt('Costo: ' + servicios[tipoDeServicioEnNumero - 1].costo + '\nIngrese SI para aceptar');
                    if (confirmaServicio !== undefined && confirmaServicio === 'SI') {
                        compraTotal = compraTotal + servicios[tipoDeServicioEnNumero - 1].costo;
                        servicios[tipoDeServicioEnNumero - 1].definirDisponibilidad(false);
                    }
                }
                break;
            case 'OK':
                alert('Su compra ha sido realizada con exito.')
                terminar = true;
                break;
            default:
                alert('Elegiste una opción inválida');
                break;
        }
        if (!terminar) {
            opcion = prompt('Elegí una opción: \n1- Herramientas. \n2 - Servicios. \nCarrito de Compras: $ ' + compraTotal + '\nPresioná X para finalizar o OK para realizar la compra. ');
        }
    }
} else {
    alert('Cuenta bloqueada por seguridad.');
}
alert('Adiós vuelva pronto.');


