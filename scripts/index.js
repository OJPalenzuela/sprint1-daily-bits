if(localStorage.getItem("nombre") == undefined || localStorage.getItem("nombre") == ""){
    localStorage.setItem("nombre", "Usuario");
}
if(localStorage.getItem("preCorrectas") == undefined || localStorage.getItem("preCorrectas") == ""){
    localStorage.setItem("preCorrectas", "0");
}
if(localStorage.getItem("preIncorrectas") == undefined || localStorage.getItem("preIncorrectas") == ""){
    localStorage.setItem("preIncorrectas", "0");
}
if(localStorage.getItem("time") == undefined || localStorage.getItem("time") == "" || localStorage.getItem("time") == null ){
    localStorage.setItem("time", "0.03");
}
if(localStorage.getItem("HTML") == undefined || localStorage.getItem("HTML") == "" || localStorage.getItem("HTML") == null ){
    localStorage.setItem("HTML", "border_incomplete");
}
if(localStorage.getItem("CSS") == undefined || localStorage.getItem("CSS") == "" || localStorage.getItem("CSS") == null ){
    localStorage.setItem("CSS", "border_incomplete");
}
if(localStorage.getItem("JavaScript") == undefined || localStorage.getItem("JavaScript") == "" || localStorage.getItem("JavaScript") == null ){
    localStorage.setItem("JavaScript", "border_incomplete");
}

setTimeout(()=>{
    window.location.replace("./home.html")
},5000);