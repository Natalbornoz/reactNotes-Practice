import React, { Component } from 'react';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import store from '../store'; //aqui importamos store 

const styles = {
  footer: {
    fontWeight: 'bold',
    
  }
}


class ShoppingCart extends Component {
  constructor() {
    super();
    this.removeFromCart = this.removeFromCart.bind(this);

    this.state = {
      cart: []
    };
    store.subscribe (() => { 
      this.setState({    
        cart: store.getState().cart //modificamos cart, con el cart que este en el estado global (store), utilizamos el utilo metodo y la llave cart
      }); //esto va a volver a renderizar el componente y va a agregar ese producto que lo va a mostrar en la funcion de abajo
    });
  }
   // cada vez que se modifique el estado y acá actualizamos el estado local // el this recibe un objeto
   //acá en el constructor vamos a subcribir, esto recibe una funcion que es el callback que se va a llamar 
  render() {
    return (
      <Panel header="Shopping Cart">
        <Table fill>
          <tbody>
            {this.state.cart.map(product => // el producto lo muestra acá !! 
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="text-right">${product.price}</td>
                <td className="text-right"><Button bsSize="xsmall" bsStyle="danger" onClick={() => this.removeFromCart(product)}><Glyphicon glyph="trash" /></Button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={styles.footer}>
                Total: ${this.state.cart.reduce((sum, product) => sum + product.price, 0)}
              </td>
            </tr>
          </tfoot>
        </Table>

      </Panel>
    )
  }

  removeFromCart(product) {
    store.dispatch({
      type: "REMOVE_FROM_CART",
      product
    });

  }
}

export default ShoppingCart;
