let formTarjeta = document.querySelector('.formulario-informacion-tarjeta');

let formPaypal = document.querySelector('.formulario-informacion-paypal');

let opcionTarjeta = document.querySelector('.checkbox-tarjeta');

let opcionPaypal = document.querySelector('.checkbox-paypal');

opcionTarjeta.addEventListener("click", () => {
    formTarjeta.classList.add("formulario-informacion-tarjeta-active");
    formPaypal.classList.remove("formulario-informacion-paypal-active");
});

opcionPaypal.addEventListener("click", () => {
    formTarjeta.classList.remove("formulario-informacion-tarjeta-active");
    formPaypal.classList.add("formulario-informacion-paypal-active");
});



// 