var funcion={
    objNombre:"",
    objHorario: "",
    objSala: "",
    funcionLS:function(){
        let ticketfuncion={
            nombre:this.objNombre,
            horario:this.objHorario,
            sala:this.objSala,
        };
        localStorage.setItem("funcion", JSON.stringify(ticketfuncion));
        console.table(JSON.stringify(ticketfuncion));
    }
}

function pelicula(nombrefoto, nombrepeli, horario, sala){
    document.getElementById('foto').src="img/"+nombrefoto+".jpg";
    document.getElementById('pelicula-seleccionada').innerHTML=nombrepeli+' a las '+horario+' en la sala '+sala;
    funcion.objNombre=nombrepeli;
    funcion.objHorario=horario;
    funcion.objSala=sala;
    funcion.funcionLS();
    var boton=document.getElementsByClassName("boton-mostrar");
    boton[0].disabled=false;
}

function mostrar(tema){
    switch(tema){
        case 1:
            document.getElementById("boletos").style.display="block";
        break;
        case 2:
            document.getElementById("edades").style.display="block";
            edadNiño.generarInputs();
        break;
        case 3:
            document.getElementById("datos-personales").style.display="block";
        break;
        case 4:
            edadNiño.habilitarboton();
        break;
        default:
            alert("Selecciona un valor valido")
        ;
    }
}
var boleto={
    objAdulto: 0,
    objNiño: 0,
    objPrecio:0,
    adultoMenos:function(){
        this.objAdulto--;
        document.getElementById('adulto').value=this.objAdulto;
        if(this.objAdulto=='0'){
            document.getElementById('adultoMenos').disabled=true;
        }
    },
    adultoMas:function(){
        this.objAdulto++;
        document.getElementById('adulto').value=this.objAdulto;
        document.getElementById('adultoMenos').disabled=false;
    },
    niñoMenos:function(){
        this.objNiño--;
        document.getElementById('niño').value=this.objNiño;
        if(this.objNiño=='0'){
            document.getElementById('niñoMenos').disabled=true;
        }
    },
    niñoMas:function(){
        this.objNiño++;
        document.getElementById('niño').value=this.objNiño;
        document.getElementById('niñoMenos').disabled=false;
    },
    funcionLS:function(){
        let ticketprecio={
            adulto:this.objAdulto,
            adultoP:this.objAdulto*90,
            niño:this.objNiño,
            niñoP:this.objNiño*70,
            precio:this.objPrecio,
        };
        localStorage.setItem("precio", JSON.stringify(ticketprecio));
    }
}

function precio(posicion){
    apretado=document.getElementsByClassName("botones-cantidad")[posicion].id;
    boton=document.getElementsByClassName("boton-mostrar");
    switch(apretado){
        case "adultoMenos":
            boleto.objAdulto=document.getElementById('adulto').value;
            boleto.adultoMenos();
        break;
        case "adultoMas":
            boleto.objAdulto=document.getElementById('adulto').value;
            boleto.adultoMas();
            boton[1].disabled=false;
        break;
        case "niñoMenos":
            boleto.objNiño=document.getElementById('niño').value;
            boleto.niñoMenos();
        break;
        case "niñoMas":
            boleto.objNiño=document.getElementById('niño').value;
            boleto.niñoMas();
            boton[1].disabled=false;
        break;
        default:
            alert("ingrese opcion valida");
        break;
    }
    if(boleto.objAdulto=="4"){
        document.getElementById('adultoMas').disabled=true;
        document.getElementById('niñoMas').disabled=true;
        document.getElementById('niñoMenos').disabled=true;
        document.getElementById('niño').value=0;
        boleto.objNiño=0;
    }
    if(boleto.objAdulto<"4"){
        document.getElementById('niñoMas').disabled=false;
        document.getElementById('adultoMas').disabled=false;
    }
    if(boleto.objAdulto=="3" && boleto.objNiño>="2"){
        document.getElementById('adultoMas').disabled=true;
        document.getElementById('niñoMas').disabled=true;
        document.getElementById('niño').value=2;
        boleto.objNiño=2;
    }
    if(boleto.objAdulto=="2" && boleto.objNiño>="3"){
        document.getElementById('adultoMas').disabled=true;
        document.getElementById('niñoMas').disabled=true;
        document.getElementById('niño').value=3;
        boleto.objNiño=3;
    }
    if(boleto.objAdulto=="1" && boleto.objNiño>="4"){
        document.getElementById('adultoMas').disabled=true;
        document.getElementById('niñoMas').disabled=true;
        document.getElementById('niño').value=4;
        boleto.objNiño=4;
    }
    if(boleto.objNiño=="4"){
        document.getElementById('niñoMas').disabled=true;
    }
    var precio=(boleto.objAdulto*90)+(boleto.objNiño*70);
    boleto.objPrecio=precio;
    boleto.funcionLS();
    document.getElementById('precio').innerHTML="Total (IVA) incluido: $"+precio;
    if(boleto.objPrecio=="0"){
        boton[1].disabled=true;
    }
}

var edadNiño={
    Edad:"",
    generarInputs:function(){
    let num=boleto.objNiño;
    let conceptos="";
    if(num>0){
        for(let i=0; i<num; i++){
            conceptos+=edad(i);
        }
    }
    document.getElementById("edadNiño").innerHTML="<h1>Ingrese edad del/los menor/es</h1>"+conceptos;
    //edad niños
    },
    habilitarboton(){
        var boton=document.getElementsByClassName("boton-mostrar");
        let edadAr=document.getElementsByName("edad");
        let edades=[];
        if(edadAr.value!="" || edadAr.value!=null){
            for(var i=0; i<edadAr.length; i++){
                if(edadAr[i].value>18 || edadAr[i].value<0){
                    alert("Solo se aceptan edades entre 0-17 años");
                    edadAr[i].value=null;
                }else{
                    objEdad=edadAr[i].value;
                    edades[i]={
                        edad:objEdad,
                    }
                }
            }
        }
        boton[2].disabled=false;
        localStorage.setItem("edadesNiño", JSON.stringify(edades));
    }
}

 function edad(num){
    return `<div id="edad-caja"><label>Edad: </label><input class="edad-estilo" min="0" max="17" type="number" name="edad" id="e${num}" onblur="mostrar(4);"</div>`
 }

function generarTicket(){
    let ticketPersona={
        nombre:persona.objNombre,
        correo:persona.objCorreo,
    };
    localStorage.setItem("interesado", JSON.stringify(ticketPersona));
    window.open("ticket.html", width="100%");
}
var persona={
    objNombre:"",
    objCorreo:"",
}
function habilitarTicket(){
    persona.objCorreo=document.getElementById("email").value;
    persona.objNombre=document.getElementById("nombre").value;
    if(persona.objNombre=="" || persona.objCorreo==""){
        alert("Porfavor llene los campos necesarios");
    }else{
        if(persona.objCorreo.includes("@gmail.com")){
            var boton=document.getElementsByClassName("boton-mostrar");
            boton[3].disabled=false;

        }        
    }
}