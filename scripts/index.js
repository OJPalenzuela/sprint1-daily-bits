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
setTimeout(()=>{
    window.location.replace("./home.html")
},5000);