import  { createStore } from 'redux'; //createStore nos permite crear un store de redux
//aqui le definimos la funcio
const reducer = (state, action) => { 
		if (action.type === "ADD_TO_CART"){ 
			return {   
				...state, 
				cart: state.cart.concat(action.product)
			};														
	} else if (action.type === "REMOVE_FROM_CART"){
		return {
			...state,
			cart: state.cart.filter(product => product.id !== action.product.id )
		}

	}


	return state;
};

export default createStore(reducer, { cart:[] }); //en los parentesis le agregamos la funcion reductora


//la funcion reductora recibe dos parametros el estado actual(state) y la acción (action) que quiere ejecutar
//comparamos la funcion, si la accion es igual al objeto del evento, entonces:
//retorna un nuevo estado con el producto que le dieron click en el carrito de compra
//en vez de modificar el estado, vamos a crear un nuevo objeto
//modificamos la llave cart, lo que habia antes en la llave cart lo concatenamos, esto va a devolver un nuevo arreglo
	//y en los "()" le agregamos el producto.