imagen = document.querySelector(".interaction__right");

silver = document.querySelector(".silver");
gray = document.querySelector(".gray");
blue = document.querySelector(".blue");
black = document.querySelector(".black");


imagenArray = [
    "url('imagenes/opcion1.png')",
    "url('imagenes/opcion2.png')",
    "url('imagenes/opcion3.png')",
    "url('imagenes/opcion4.png')"]

if (silver != null) {

    silver.addEventListener("click", (e) => {
        imagen.style.backgroundImage = imagenArray[0];
    });
}

if (gray != null) {

    gray.addEventListener("click", (e) => {
        imagen.style.backgroundImage = imagenArray[1];
    });
}

if (blue != null) {

    blue.addEventListener("click", (e) => {
        imagen.style.backgroundImage = imagenArray[2];
    });
}

if (black != null) {

    black.addEventListener("click", (e) => {
        imagen.style.backgroundImage = imagenArray[3];
    });
}

// Nuevo Js

function menuRes() {
	  var x = document.getElementById("myTopnav");
	  if (x.className === "topnav") {
		x.className += " responsive";
	  } else {
		x.className = "topnav";
	  }
}