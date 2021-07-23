var div_respuesta = document.getElementById("div_respuesta");
var div_opciones = document.getElementById("div_opciones");
var btn_comp = document.getElementById("btn_comp");

btn_comp.disabled = true;

var opcionList = div_opciones.childNodes;


opcionList.forEach(function(elem){
    elem.addEventListener("click", function(){
        if(!verificar(div_respuesta, elem)){
            div_respuesta.appendChild(elem);
            validar(div_respuesta.childNodes);
        }else{
            div_opciones.appendChild(elem);
            validar(div_respuesta.childNodes);
        }
    
    });
});

function verificar(n, elem){
    var nodeList = n.childNodes;
    for(var i = 0; i < nodeList.length; i++){
        if(nodeList[i] == elem){
            return true;
        }
    }
    return false;
}

function validar(elem){
    if(elem.length == 5){
        btn_comp.disabled = false;
    }else{
        btn_comp.disabled = true;
    }
}