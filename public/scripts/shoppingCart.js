import utils from './utils.js';
window.addEventListener('load', async () => {
    try {
        //LOGICA PARA CARRO DE COMPRAS
        const shoppingCartContainer = document.querySelector('.shopping-cart-container');
        let totalPriceCart = document.getElementById('total-price-cart');
        let totalProducts = document.querySelector('.products-amount');
        let userLoggedId = document.getElementById('user-logged-id').innerText;
        let userLogged = (await (await fetch('http://localhost:7000/api/user/' + userLoggedId)).json()).user;

        //Le pregunto si hay carrito en el local Storage, si hay le hago el total de precio y productos
        if (userLogged?.temporalCart) {
            const totalPrice = await utils.getTotalPrice(userLoggedId); //Funcion que retorna el total $
            const cartLength = await utils.getTotalProducts(userLoggedId); //Funcion que retorna el total de productos
            totalProducts ? totalProducts.innerHTML = cartLength : null;
            totalPriceCart ? totalPriceCart.innerHTML = totalPrice : null;
        }
        const addBotons = document.querySelectorAll('.adding-button');
        addBotons.forEach(btn => { //Voy por cada btn, y le agrego una escucha a ver si hacen click en el carrito
            btn.addEventListener('click', async (e) => {
                try {
                    //para llegar al id del producto ..
                    const idProd = e.target.getAttribute('data-prodId'); //Tambien se puede hacer e.target.dataset.id
                    const userId = e.target.getAttribute('data-userId');
                    await add(idProd, userId); //Funcion que agrega al carro el producto 
                    const totalPrice = await utils.getTotalPrice(userId); //Funcion que retorna el total $
                    const cartLength = await utils.getTotalProducts(userId); //Funcion que retorna el total de productos
                    totalProducts.innerHTML = cartLength;
                    totalPriceCart.innerHTML = totalPrice;
                } catch (error) {
                    return console.log(`Falle en btn.eventListener: ${error}`);
                }
            })

        });

        async function add(prodId, userId) {
            try {
                // Hago el fetch a la db, asi obtengo el producto a meter/sumar cantidad al carro
                const prod = (await (await fetch('http://localhost:7000/api/product/' + prodId)).json()).product;
                const user = (await (await fetch('http://localhost:7000/api/user/' + userId)).json()).user;
                if (!user.temporalCart) { //Si no esta en localStorage, lo creo
                    const formData = {
                        ...prod,
                        quantity: 1
                    }
                    let createdCart = (await (await fetch(`http://localhost:7000/api/user/${userId}/createTempCart`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    })).json());
                    console.log(createdCart);

                } else { // Si esta, tengo que fijarme si el prod ya estaba dentro y sumarle 1 a quantity, o sumarlo entero con cantidad = 1
                    let cart = user.temporalCart.temporalItems;
                    let prodIndex = cart.findIndex(item => item.products_id == prod.id); //busco si esta el prod que seleccionaron en el carro
                    // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
                    if (prodIndex >= 0) { //Si esta solo le sumo uno, tengo que hacer un fetch de update
                        cart[prodIndex].quantity += 1;
                        (await (await fetch(`http://localhost:7000/api/product/updateTempItems`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(cart)
                        })).json());
                    } else { //Sino tengo que hacer un fetch y agregar el prod 
                        (await (await fetch(`http://localhost:7000/api/product/addTempItem`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                tempCartId: user.temporalCart.id,
                                prodId: prod.id
                            })
                        })).json());
                    }
                }
            } catch (error) {
                console.log("Falle en add: " + error);
            };
        };

        setInterval(async () => {//Actualizacion de precios, descuentos, etc
            if (userLogged.temporalCart) {
                try {
                    const totalPrice = await utils.getTotalPrice(userLoggedId);
                    totalPriceCart.innerHTML = totalPrice

                } catch (error) {
                    console.log(`Falle en updateShoppingCart.setInterval: ${error}`);
                }
            }
        }, 1000 * 5); // 1 hora
    } catch (error) {
        return console.log('Falle en shoppingCart.window.Load: ' + error)
    }
})

