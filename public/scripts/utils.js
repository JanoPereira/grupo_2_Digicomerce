const functions = {
    getTotalPrice: async function(id) {//Agarro el usuario, accedo a todos los tempItems que tenga y hago la suma
        try {
            // Yo se que si o si voy a tener un carrito, porque esta funcion se invoca despues de que hice la funcion add()
            let cart = (await (await fetch('http://localhost:7000/api/user/' + id)).json()).user.temporalCart.temporalItems; //Obtengo el carrito
            const total = cart.reduce((acum, value) => {//va por cada objeto dentro de carrito y suma quantity * total
                return acum = acum + (value.quantity * (parseInt(value.product.price) - parseInt(value.product.price) * value.product.discount / 100));
            }, 0);
            return parseFloat(total).toFixed(2)
        } catch (error) {
            return console.log(`Falle en getTotalPrice: ${error}`);
        }
    },

    getTotalProducts: async function(id) {//Agarro el usuario, accedo a todos los tempItems y hago el length
        try {
            let cart = (await (await fetch('http://localhost:7000/api/user/' + id)).json()).user.temporalCart.temporalItems;
            return cart.length;
        } catch (error) {
            return console.log(`Falle en getTotalProducts: ${error}`);
        }
    }
}

export default functions;