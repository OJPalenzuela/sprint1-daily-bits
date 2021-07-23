const URL = "./json/quest.json";
const request = new XMLHttpRequest();
const div_desc = document.getElementById("div-descripcion");
const div_pre = document.getElementById("div-preguntas");

const btn = document.getElementById("btn_comp");
const check = document.getElementsByName("etJS");

var preguntaList;
var position;

request.open('GET', URL, true);

request.responseType = 'json';
request.send();

request.onload = respuesta;

function respuesta(){
    const jsonElem = request.response;
    preguntaList = jsonElem;
    llenar(jsonElem);
    activarBTN();
}

function llenar(jsonElem){

    var arrayPos = Math.floor(Math.random() * jsonElem['preguntas'].length);
    position = arrayPos;
    const arr = jsonElem['preguntas'][arrayPos];


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



btn.disabled = true;
function activarBTN(){
    check.forEach(element => {
        element.addEventListener("click", function(){
            if(btn.disabled){
                btn.disabled = false;
            }
        });
    });

}


function test(){
    check.forEach(element => {
        if(element.checked){
            if(element.value == preguntaList['preguntas'][position].respuesta){
                console.log("s1");
            }else{
                console.log("no");
            }
        }
    });
}



btn.addEventListener("click", test);

