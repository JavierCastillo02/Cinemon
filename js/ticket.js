let localStoragef=JSON.parse(localStorage.getItem("funcion"));
let localStoragep=JSON.parse(localStorage.getItem("precio"));
let localStoragei=JSON.parse(localStorage.getItem("interesado"));
let localStoragee=JSON.parse(localStorage.getItem("edadesNiño"));
(
    function(){
        let datosMenores="";
        for(var i=0; i<localStoragee.length; i++){
            datosMenores+='<div><label>Edad del menor '+(i+1)+': '+localStoragee[i].edad+'</label></div>';
        }
        let datosFuncion='<div><label>Nombre de la funcion: '+localStoragef.nombre+'</label><br><label>Hora: '+localStoragef.horario+'</label><br><label>Sala: '+localStoragef.sala+'</label></div>';
        let datosPrecio='<div><label>Adultos: '+localStoragep.adulto+' ---> $'+localStoragep.adultoP+'</label><br><label>Niños: '+localStoragep.niño+' ---> $'+localStoragep.niñoP+'</label><br>'+datosMenores+'<label>Total: $'+localStoragep.precio+'</label></div>';
        let datosInteresado='<div><label>Nombre: '+localStoragei.nombre+'</label><br><label>Correo '+localStoragei.correo+'</label></div>';
        document.getElementById("factura").innerHTML=datosFuncion+datosPrecio+datosInteresado;
    }
    )();