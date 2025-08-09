import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, changeQuantity } from "../../features/cart/cartSlice"; // adjust path

const ProductCart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div style={{padding: 40, textAlign: "center"}}>
        <img src="/images/empty-shopping-cart.avif" alt="Empty cart" style={{width: 120}}/>
        <h3>Your cart is currently empty!</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>Your Shopping Cart</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {/* <-- HERE is the location for your provided map code: */}
          {items.map((item) => (
            <tr key={item.product.id}>
              <td>
                <img src={item.product.images?.[0]} style={{width:80}} alt={item.product.name}/>
              </td>
              <td>{item.product.name}</td>
              <td>₹{item.product.price}</td>
              <td>
                <button onClick={() => dispatch(changeQuantity({ productId: item.product.id, delta: -1 }))}>&minus;</button>
                {' '}
                {item.quantity}
                {' '}
                <button onClick={() => dispatch(changeQuantity({ productId: item.product.id, delta: 1 }))}>+</button>
              </td>
              <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => dispatch(removeItem(item.product.id))}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCart;
