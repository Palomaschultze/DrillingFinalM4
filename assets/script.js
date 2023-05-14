//Función asincrónica
async function cargarPersonajes(i, id, tarjeta, color) {
    try {
        let url = "https://swapi.dev/api/people/" + i
        let response = await fetch(url);
        let data = await response.json();
        constructora(data, id, tarjeta, color);
    } catch (error) {
        console.log("error", error);
    }
};

//Contadores para llevar la cuenta de los personajes
let contador1 = 1;
let contador2 = 6;
let contador3 = 11;

//Función que determina donde ubicar los personajes
const selector = (id, tarjeta, color) => {
    if (id == 'seccionPricipal') {
        if (contador1 < 6) {
            generator(contador1, id, tarjeta, color).next()
            contador1++
        } else {
            $("div").remove(`.${id}`)
            contador1 = 1
        }
    } else if (id == 'seccionSecundarios') {
        if (contador2 < 11) {
            generator(contador2, id, tarjeta, color).next()
            contador2++
        } else {
            $("div").remove(`.${id}`)
            contador2 = 6
        }
    } else if (id == 'seccionOtros') {
        if (contador3 < 16) {
            generator(contador3, id, tarjeta, color).next()
            contador3++
        } else {
            $("div").remove(`.${id}`)
            contador3 = 11
        }
    }
};

//Clase que define caracteristicas comunes de los personajes
class Personaje {
    constructor(name, height, weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }
};

//Clase que añade propiedades a la clase Personaje para ubicarlas en el html
class buscarPersonaje extends Personaje {
    constructor(name, height, weight, id, tarjeta, color) {
        super(name, height, weight);
        this.id = id
        this.tarjeta = tarjeta
        this.color = color
    }
};

//Función que genera un iterador que utiliza la función cargarPersonajes 
function* generator(i, id, tarjeta, color) {
    while (true) {
        yield cargarPersonajes(i, id, tarjeta, color)
    }
};

//Función que crear un objeto de la clase buscarPersonaje a partir de los datos obtenidos y almacenarlos para ubicarlos en el HTML
function constructora(data, id, tarjeta, color) {
    let personaje = new buscarPersonaje(data.name, data.height, data.mass, id, tarjeta, color)
    insertarDatos(personaje)
};

//Función que toma como parámetro un objeto de la clase buscarPersonaje (personaje) e inserta los datos en el HTML.
function insertarDatos(personaje) {
    $(`#${personaje.tarjeta}`).append(`
<div class="col-12 col-md-6 col-lg-4 ${personaje.id}">
    <div class="single-timeline-content d-flex wow fadeInLeft 2021"
        data-wow-delay="0.3s"
        style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
        <div class="timeline-icon" style="background-color: ${personaje.color};"><i
                class="fa fa-address-card" aria-hidden="true"></i>
        </div>
        <div class="timeline-text">
            <h6 style = "font-weight: bold">${personaje.name}</h6>
            <p>Estatura ${personaje.height} cm. Peso ${personaje.weight} kg.</p>
        </div>
    </div>
</div>
    `)
};



