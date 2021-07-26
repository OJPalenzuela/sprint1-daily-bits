const URL = "./json/quest.json";
const request = new XMLHttpRequest();
const div_desc = document.getElementById("div-descripcion");
const div_res = document.getElementById("div-respuesta");
const div_pre = document.getElementById("div-preguntas");
const section = document.getElementById("section");

const btn = document.getElementById("btn_comp");
var check = document.getElementsByName("etJS");

var preguntaList;
var position;
var total;

request.open('GET', URL, true);

request.responseType = 'json';
request.send();

request.onload = respuesta;

btn.addEventListener("click", test);

function timer(){
    var i = parseFloat(localStorage.getItem("time"));
    var b = i + 2/3600;
    localStorage.setItem("time", b.toFixed(4) + "");

}

function respuesta() {
    const jsonElem = request.response;
    preguntaList = jsonElem;
    llenar(preguntaList);
    total = preguntaList['preguntas'].length;
    console.log(total)
    //activarBTN();
    setInterval(timer, 2000);
}

function llenar(jsonElem) {
    aleatorio();
    anadirElementos(jsonElem);
    btn.disabled = true;
}

function anadirElementos(jsonList) {
    var position = aleatorio();
    resetHTML();

    switch (jsonList['preguntas'][position].type) {
        case "a":
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

            check = document.getElementsByName("etJS");
            check.forEach(element => {
                element.addEventListener("click", function () {
                    activarBTN();
                });
            });

            break;

        case "b":
            const arra = jsonList['preguntas'][position];
            div_desc.innerHTML = arra.descripcion;

            arra.opciones.forEach((element, index) => {
                div_pre.innerHTML += `
                    <p id='select_${index}' class="option d-block">${element}</p>
                `
            })

            console.log(btn.disabled)
            var opcionList = div_pre.childNodes;

            opcionList.forEach(function (elem) {
                elem.addEventListener("click", function () {
                    if (!verificar(div_res, elem)) {
                        div_res.appendChild(elem);
                        validar(div_res.childNodes)
                    } else {
                        div_pre.appendChild(elem);
                        validar(div_res.childNodes)
                    }
                });
            });

            function verificar(n, elem) {
                var nodeList = n.childNodes;
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i] == elem) {
                        return true;
                    }
                }
                return false;
            }

            function validar(elem) {
                if (elem.length == arra.opciones.length) {
                    console.log("esta entrando")
                    activarBTN();
                } else {
                    btn.disabled = true;
                }
            }
            break;

        case "c":
            var arraaa = jsonList['preguntas'][position];

            arraaa.opciones.forEach((element, index) => {
                div_pre.innerHTML += `
                <div class="card bg-dark" style="width: 4rem;">
                <img class="card-img-top" src="./images/logos/${element}.png" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">${element}</p>
                </div>
                </div>
                `
            })

            var cards = document.getElementsByClassName("card");
            cards.forEach(element => {
                element.addEventListener("click", function () {
                    activarBTN();
                });
            });

            break;
    }
}

function resetHTML() {
    div_desc.innerHTML = '';
    div_pre.innerHTML = '';
    div_res.innerHTML = '';
}

function aleatorio() {
    var arrayPos = Math.floor(Math.random() * preguntaList['preguntas'].length);
    position = arrayPos;
    console.log(preguntaList['preguntas'].length)
    console.log("a")
    return arrayPos;
}

function activarBTN() {
    switch (preguntaList['preguntas'][position].type) {
        case "a":
            btn.disabled = false;
            break;

        case "b":
            btn.disabled = false;
            break;
        case "c":
            btn.disabled = false;
            break;
    }
}


function test() {
    if (!preguntaList['preguntas'].length == 0) {
        validarPreguntas();

        btn.disabled = true;
        activarBTN();
    } else {
        window.location.replace("./home.html");
    }
}

function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
    }
}




function validarPreguntas() {
    switch (preguntaList['preguntas'][position].type) {
        case "a":
            var isCorrect;
            check.forEach(element => {
                if (element.checked) {
                    if (element.value == preguntaList['preguntas'][position].respuesta) {
                        isCorrect = true;
                    } else {
                        isCorrect = false;
                    }
                }
            });
            createChild(isCorrect);
            break;
        case "b":
            var listNodes = new Array();
            div_res.childNodes.forEach(element =>{
                listNodes.push(element.id)
            })
            
            var isCorrect;
            function setCorrect(){
                for(var i = 0; i < listNodes.length; i++){
                    if(listNodes[i] == preguntaList['preguntas'][position].respuesta[i]){
                        isCorrect = true;
                    }else{
                        isCorrect = false;
                        break;
                    }
                }
            }

            setCorrect()
            createChild(isCorrect);

            break;
    }
}

function createChild(typeID) {
    const etq = document.createElement("div");
    var desc;
    var txtBTN;

    if (typeID) {
        progress();

        var correctas = parseInt(localStorage.getItem("preCorrectas"));
        correctas++;
        localStorage.setItem("preCorrectas", correctas + "")

        etq.id = "div-correcto"
        desc = "¡Bien hecho!"
        txtBTN = "CONTINUAR"
    } else {

        var incorrectas = parseInt(localStorage.getItem("preIncorrectas"));
        incorrectas++;
        localStorage.setItem("preIncorrectas", incorrectas + "")

        etq.id = "div-rechazado"
        desc = "Respuesta incorrecta"
        txtBTN = "REINTENTAR"

        lives(etq);
    }

    etq.innerHTML = `
        <h2>${desc}</h2>
        <input id='btn-realizado' class='comprobar' type='button' value='${txtBTN}'>
    `

    section.appendChild(etq);

    validad(typeID, etq);

}

function validad(typeID, etq) {
    btn.disabled = true;
    if (typeID) {
        const btn_cor = document.getElementById("btn-realizado");
        btn_cor.addEventListener("click", function () {
            siguientePregunta();
            section.removeChild(etq);
            btn.disabled = true;
        });
    } else {
        const btn_cor = document.getElementById("btn-realizado");
        btn_cor.addEventListener("click", function () {
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
        window.location.replace("./home.html");
    }
}




function progress(){
    let cur = parseInt(document.getElementById('progress').getAttribute('aria-valuenow'));

    if(cur < 100){
        cur += (1 * 100) / total;
        console.log(cur)
        document.getElementById('progress').setAttribute('aria-valuenow', cur);
        document.getElementById('progress').setAttribute('style', "width: "+ cur+ "%;");
    }
}

function lives(rein){
    var li = parseInt(document.getElementById("lives").innerHTML);

    if(li > 1){
        li--;
        document.getElementById("lives").innerHTML = li;
    }else {
        li--;
        document.getElementById("lives").innerHTML = li;

        const etq = document.createElement("div");
        etq.id = "all";
        etq.innerHTML = `
        <div id="volver">
        <h2>Hasta aquí llego tu carrera...</h2>
        <p>No pudiste completar con éxito el curso, vuelve al inicio para empezar de nuevo</p>
        <input id='btn-volver' class='comprobar' type='button' value='VOLVER'>
        </div>
        `
        

        document.body.appendChild(etq)

        document.getElementById("btn-volver").addEventListener("click", function(){
            window.location.replace("./home.html");
        });

    }
}


const exit = document.getElementById("exit");
exit.addEventListener("click", function(){
    const etq = document.createElement("div");
        etq.id = "all";
        etq.innerHTML = `
        <div id="volver">
        <h2>¡Espera! Aún te falta</h2>
        <p>¿Estás seguro que quieres salir?</p>
        <div class="d-flex">
        <input id='btn-volver' class='comprobar' type='button' value='VOLVER'>
        <input id='btn-quedarse' class='comprobar' type='button' value='QUEDARSE'>
        </div>
        </div>
        `
        

        document.body.appendChild(etq)

        document.getElementById("btn-volver").addEventListener("click", function(){
            window.location.replace("./home.html");
        });
        document.getElementById("btn-quedarse").addEventListener("click", function(){
            document.body.removeChild(etq)
        });
})