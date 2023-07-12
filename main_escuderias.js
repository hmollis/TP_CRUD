const endpoint="escuderias";
//const host="localhost:5000";
const host="hmollis.pythonanywhere.com";
//const protocol="http:";
const protocol="https:";
const URL=protocol + "//" + host + "/" + endpoint;

const fetchPromise=fetch(URL);

function verificaDatos(objeto) {
    for (let propiedad in objeto) {
        if (objeto[propiedad] === null || objeto[propiedad] === undefined) {
            objeto[propiedad] = "sin dato"
        }
    }
}

fetchPromise
    .then((response) => response.json())
    .then((data) => {
        let elementoHTML = '<ul class="grilla">' + "\n"
        for (let escuderia of data) {

            verificaDatos(escuderia)

            elementoHTML +=
            `
            <li>
                <div>
                    <h2>${escuderia.nombre}</h2>
                    <img class="logo-escuderia" src="${escuderia.logo}" alt="${escuderia.nombre}">
                    <p class="datos"> Con Base en: <span class="dato-api">${escuderia.base}</span></p>
                    <p class="datos"> Presidente: <span class="dato-api">${escuderia.presidente}</span></p>
                    <p class="datos"> Director: <span class="dato-api">${escuderia.director}</span></p>
                    <p class="datos"> Director Tecnico: <span class="dato-api">${escuderia.dir_tecnico}</span></p>
                    <p class="datos"> Primera Participacion: <span class="dato-api">${escuderia.primera_participacion}</span></p>
                    <p class="datos"> Chasis: <span class="dato-api">${escuderia.chasis}</span></p>
                    <p class="datos"> Motor: <span class="dato-api">${escuderia.motor}</span></p>
                    <p class="datos"> Neumaticos: <span class="dato-api">${escuderia.neumaticos}</span></p>
                    <p class="datos"> Mejores vueltas: <span class="dato-api">${escuderia.mejor_vuelta}</span></p>
                    <p class="datos"> Podios: <span class="dato-api">${escuderia.pole_positions}</span></p>
                    <p class="datos"> Campeonatos: <span class="dato-api">${escuderia.mundiales}</span></p>                
                </div>
                <div>
                    <a href="editar_escuderia.html?id=${escuderia.id}"><button type="button">Editar</button></a>
                    <button type="button" v-on:click="eliminar(${escuderia.id})">Eliminar</button>
                </div>
            </li>
            `
        }
        elementoHTML += '</ul>'

        document.querySelector('#escuderias').innerHTML = elementoHTML
    })

