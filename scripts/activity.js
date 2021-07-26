var cantidadCorrectas = parseInt(localStorage.getItem("preCorrectas"));
var cantidadIncorrectas = parseInt(localStorage.getItem("preIncorrectas"));

var correctas = document.getElementById("correctas");
correctas.innerHTML = cantidadCorrectas;

var incorrectas = document.getElementById("incorrectas");
incorrectas.innerHTML = cantidadIncorrectas;

var total = document.getElementById("total");
total.innerHTML = cantidadCorrectas + cantidadIncorrectas;

var time = document.getElementById("time");
time.innerHTML = localStorage.getItem("time")