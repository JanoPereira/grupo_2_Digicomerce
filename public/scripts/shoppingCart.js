window.addEventListener('load', () => {
    //LOGICA PARA CARRO DE COMPRAS
    const shoppingCartContainer = document.querySelector('.shopping-cart-container');
    let totalPriceCart = document.getElementById('total-price-cart');
    let totalProducts = document.querySelector('.products-amount');

    //Le pregunto si hay carrito en el local Storage, si hay le hago el total de precio y productos
    if (localStorage.carrito) {
        const totalPrice = getTotalPrice(); //Funcion que retorna el total $
        const cartLength = getTotalProducts(); //Funcion que retorna el total de productos
        totalProducts.innerHTML = cartLength;
        totalPriceCart.innerHTML = totalPrice;
    }
    const addBotons = document.querySelectorAll('.adding-button');
    addBotons.forEach(btn => { //Voy por cada btn, y le agrego una escucha a ver si hacen click en el carrito
        btn.addEventListener('click', async (e) => {
            try {
                //para llegar al id del producto ..
                const idProd = e.target.getAttribute('data-id'); //Tambien se puede hacer e.target.dataset.id
                await add(idProd); //Funcion que agrega al carro el producto 
                const totalPrice = getTotalPrice(); //Funcion que retorna el total $
                const cartLength = getTotalProducts(); //Funcion que retorna el total de productos
                totalProducts.innerHTML = cartLength;
                totalPriceCart.innerHTML = totalPrice;
            } catch (error) {
                return console.log(`Falle en btn.eventListener: ${error}`);
            }
        })

    });

    async function add(id) {
        try {
            // Hago el fetch a la db, asi obtengo el producto a meter/sumar cantidad al carro
            const prod = (await (await fetch('http://localhost:7000/api/product/' + id)).json()).product;

            if (!localStorage.carrito) { //Si no esta en localStorage, lo creo
                localStorage.setItem('carrito', JSON.stringify([
                    {//El objeto en el carro tiene mismas propiedades, se le suma la cantidad nomas
                        ...prod,
                        quantity: 1
                    }
                ]));
            } else { // Si esta, tengo que fijarme si el prod ya estaba dentro y sumarle 1 a quantity, o sumarlo entero con cantidad = 1
                let carrito = JSON.parse(localStorage.getItem('carrito'));
                let prodIndex = carrito.findIndex(product => product.id == prod.id); //busco si esta el prod que seleccionaron en el carro
                // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
                prodIndex >= 0 ? carrito[prodIndex].quantity += 1 : carrito.push({ ...prod, quantity: 1 });
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
        } catch (error) {
            console.log("Falle en add: " + error);
        };
    };

    function getTotalPrice() {
        // Yo se que si o si voy a tener un carrito, porque esta funcion se invoca despues de que hice la funcion add()
        let cart = JSON.parse(localStorage.getItem('carrito')); //Obtengo el carrito
        const total = cart.reduce((acum, value) => {//va por cada objeto dentro de carrito y suma quantity * total
            return acum = acum + (value.quantity * (parseInt(value.price) - parseInt(value.price) * value.discount / 100));
        }, 0);
        return parseFloat(total).toFixed(2)
    }
    function getTotalProducts() {
        let cart = JSON.parse(localStorage.getItem('carrito'));
        return cart.length;
    }

})

