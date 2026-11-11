import { Button, Form } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { remove, setQuantity } from "../Redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const itemId = item._id || item.id;
  const unitPrice = Number(item.unitPrice) || 0;
  const currencySymbol = String(item.price).includes("$") ? "$" : "₹";

  const updateQuantity = (quantity) => {
    if (Number.isInteger(quantity) && quantity > 0) {
      dispatch(setQuantity({ id: itemId, quantity }));
    }
  };

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.heading} className="cart-item-image" />
      <div className="cart-item-info">
        <span className="cart-item-kicker">Made with care</span>
        <h3 className="cart-item-name">{item.heading}</h3>
        <p className="cart-item-unit-price">{currencySymbol}{unitPrice.toFixed(2)} <span>each</span></p>
      </div>
      <div className="cart-item-controls">
        <Form className="cart-quantity d-flex gap-1" onSubmit={(event) => event.preventDefault()}>
          <Button
            variant="outline-secondary"
            type="button"
            aria-label={`Decrease ${item.heading} quantity`}
            disabled={item.quantity <= 1}
            onClick={() => updateQuantity(item.quantity - 1)}
          >
            −
          </Button>
          <Form.Control
            type="number"
            min="1"
            step="1"
            value={item.quantity}
            aria-label={`${item.heading} quantity`}
            onChange={(event) => updateQuantity(Number(event.target.value))}
          />
          <Button
            variant="outline-secondary"
            type="button"
            aria-label={`Increase ${item.heading} quantity`}
            onClick={() => updateQuantity(item.quantity + 1)}
          >
            +
          </Button>
        </Form>
        <div className="cart-item-total">
          <span>Item total</span>
          <strong>{currencySymbol}{(unitPrice * item.quantity).toFixed(2)}</strong>
        </div>
        <Button
          variant="link"
          type="button"
          className="cart-remove-button"
          aria-label={`Remove ${item.heading}`}
          onClick={() => dispatch(remove(itemId))}
        >
          <FaTrashAlt /><span>Remove</span>
        </Button>
      </div>
    </article>
  );
};

export default CartItem;
