const c_js = document.getElementById('c_js');
const c_css = document.getElementById('c_css');
const c_html = document.getElementById('c_html');
localStorage.setItem("curse", "");

c_js.addEventListener('click', () => {Curse("JavaScript")});
c_css.addEventListener("click", () => {Curse("CSS")});
c_html.addEventListener("click", () => {Curse("HTML")});

function Curse(selectCurse){
    localStorage.setItem("curse", selectCurse);
}

const d_html = document.getElementById("div-html");
const d_css = document.getElementById("div-css");
const d_js = document.getElementById("div-js");

d_html.className = localStorage.getItem("HTML");
d_css.className = localStorage.getItem("CSS");
d_js.className = localStorage.getItem("JavaScript")