//arreglo que contiene el orden correcto de las palabras
let orden_correcto = ['Croacia', 'franceses', '1998', 'contundente', 'Antoine'];

//Palabras desordenadas para mostrar en opciones
let palabras_juego = ['contundente', 'Antoine', 'Croacia', '1998', 'franceses'];

//contenedr de las opciones
let contenedorOpciones = document.getElementById("opciones");
//boton comprobar
let comprobar = document.getElementById("comprobar");
//texto donde se muestra el resultado
let txtResultado = document.getElementById("resultado");

//Arreglo que contiene el orden de las palabras que el usuario va eligiendo. Tambien me sirve para saber las posiciones disponibles
let posDisponible = ["", "", "", "", ""];

//Función que agrega las opciones 
function agregarOpciones(){
    palabras_juego.forEach(element => {
        let div = document.createElement("div");
        div.className = "palabra";
        div.innerHTML = element;
        div.setAttribute("onclick", "completar(this)");
        contenedorOpciones.appendChild(div);
    });
}
agregarOpciones();

//agrego el método remove onclick a cada elemento span del texto
function agregarEliminarAspan(){
    var spans = document.getElementsByTagName("span");
    for(let i=0; i < spans.length; i++){
        spans[i].setAttribute("onclick", "remove(this)");
    }
}
agregarEliminarAspan();

//funcion que coloca el texto de la opcion elegida en el span correspondiente
function completar(palabra){
    let posLibre = posDisponible.indexOf("");
    document.getElementById(posLibre).innerHTML = palabra.innerHTML;
    posDisponible[posLibre] = palabra.innerHTML;
    contenedorOpciones.removeChild(palabra);
}

//Función que elimina una palabra del texto y la pone de nuevo en opciones
function remove(palabra){
    //comprobamos que haya texto
    if(palabra.innerHTML!=""){
        //agregamos la opcion nuevamente al listado
        let div = document.createElement("div");
        div.className = "palabra";
        div.innerHTML = palabra.innerHTML;
        div.setAttribute("onclick", "completar(this)");
        contenedorOpciones.appendChild(div);

        //eliminamos el texto del span
        palabra.innerHTML = "";
        posDisponible[palabra.id] = "";

        document.getElementById(palabra.id).style.background = "#ccc";

        //limpiamos el texto resultado
        txtResultado.innerHTML = "";
    }
}

//funcion que comprueba si esta correcto
comprobar.onclick = function(){
    //compruebo si todavía hay palabras disponibles
    let posLibre = posDisponible.indexOf("");
    let totalAciertos = 0;

    if(posLibre==-1){
        for(i=0; i <orden_correcto.length;i++){
            if(orden_correcto[i]==posDisponible[i]){
                document.getElementById(i).style.background = "#c0ff33";
                totalAciertos++;
            }else{
                document.getElementById(i).style.background = "#fb4b4b";
            }
        }

        if(totalAciertos==orden_correcto.length){
            txtResultado.innerHTML = "Muy bien!!";
        }else{
            txtResultado.innerHTML = "Existen errores!!";
        }
    }else{
        alert("Completa las palabras");
    }

}
