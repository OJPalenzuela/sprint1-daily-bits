const URL = "./json/quest.json";
const request = new XMLHttpRequest();
const div_desc = document.getElementById("div-descripcion");
const div_pre = document.getElementById("div-preguntas");
const section = document.getElementById("section");

const btn = document.getElementById("btn_comp");
const check = document.getElementsByName("etJS");

var preguntaList;
var position;

request.open('GET', URL, true);

request.responseType = 'json';
request.send();

request.onload = respuesta;

function respuesta() {
    const jsonElem = request.response;
    preguntaList = jsonElem;
    llenar(preguntaList);
    activarBTN();
}

function llenar(jsonElem) {
    aleatorio();
    anadirElementos(jsonElem);
}

function anadirElementos(jsonList) {
    var position = aleatorio();


    resetHTML();

    const arr = jsonList['preguntas'][position];
    const desc = document.createElement('p');

    desc.textContent = arr.descripcion;
    div_desc.appendChild(desc);

    var list = arr.opciones;
    list.forEach((element, index) => {
        div_pre.innerHTML += `
        <label class='check-opciones'>
        ${element}<input type="radio" name='${arr.name}' value='${element}'>
        </label>`
    });

}

function resetHTML() {
    div_desc.innerHTML = '';
    div_pre.innerHTML = '';
}

function aleatorio() {
    var arrayPos = Math.floor(Math.random() * preguntaList['preguntas'].length);
    position = arrayPos;
    return arrayPos;
}



btn.disabled = true;
function activarBTN() {
    check.forEach(element => {
        element.addEventListener("click", function () {
            if (btn.disabled) {
                btn.disabled = false;
            }
        });
    });

}


function test() {
    check.forEach(element => {
        if (element.checked) {
            if (!preguntaList['preguntas'].length == 0) {
                if (element.value == preguntaList['preguntas'][position].respuesta) {

                    createChild(true);

                } else {
                    createChild(false);
                }
                btn.disabled = true;
                activarBTN();
            } else {
                resetHTML();
            }
        }
    });
}

function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
    }
}


btn.addEventListener("click", test);

function createChild(typeID) {
    const etq = document.createElement("div");
    var desc;
    var txtBTN;

    if (typeID) {
        etq.id = "div-correcto"
        desc = "¡Bien hecho!"
        txtBTN = "CONTINUAR"
    } else {
        etq.id = "div-rechazado"
        desc = "Respuesta incorrecta"
        txtBTN = "REINTENTAR"
    }

    etq.innerHTML = `
        <h2>${desc}</h2>
        <input id='btn-realizado' class='comprobar' type='button' value='${txtBTN}'>
    `

    

    section.appendChild(etq);

    validad(typeID, etq);

}

function validad(typeID, etq){
    if(typeID){
        const btn_cor = document.getElementById("btn-realizado");
        btn_cor.addEventListener("click", function(){
            siguientePregunta();
            section.removeChild(etq);
        });
    }else{
        const btn_cor = document.getElementById("btn-realizado");
        btn_cor.addEventListener("click", function(){
            section.removeChild(etq);
        });
    }
}

function siguientePregunta() {
    removeItemFromArr(preguntaList['preguntas'], preguntaList['preguntas'][position])

    console.log(preguntaList);

    if (!preguntaList['preguntas'].length == 0) {
        anadirElementos(preguntaList);
        btn.disabled = true;
        activarBTN()
    } else {
        resetHTML();
    }
}

