import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CartItem from "../Components/CartItem";

function Cart() {
  const { cart: cartItems, total, totalItems } = useSelector((state) => state.cart);
  const currencySymbol = cartItems.some((item) => String(item.price).includes("$")) ? "$" : "₹";

  const handleOrderNow = () => {
    if (cartItems.length > 0) {
      toast("Checkout is a demo — no order has been placed.");
    }
  };

  return (
    <main>
      <Container className="cart-page">
        <div className="cart-page-heading">
          <div>
            <span className="eyebrow">Your selection</span>
            <h1 className="section-heading">A good choice.</h1>
            <p>Take a final look at your picks before you continue.</p>
          </div>
          <Button as={Link} to="/#products" variant="outline-primary" className="cart-continue-link">
            <FaArrowLeft aria-hidden="true" /> Back to menu
          </Button>
        </div>
        <div className="cart-benefits">
          <span><FaCheck aria-hidden="true" /> Saved to this device</span>
          <span><FaCheck aria-hidden="true" /> Edit quantities anytime</span>
          <span><FaCheck aria-hidden="true" /> Totals update instantly</span>
        </div>
        <Row className="cart-layout g-4 align-items-start">
          <Col lg={8}>
            <section className="cart-panel">
              <div className="cart-panel-heading">
                <div>
                  <h2>Your items</h2>
                  <p>{totalItems} {totalItems === 1 ? "item" : "items"} selected</p>
                </div>
                {cartItems.length > 0 && <span className="cart-count-pill">{totalItems} in your bag</span>}
              </div>
              {cartItems.length > 0 ? (
                <div className="cart-item-list">
                  {cartItems.map((item) => <CartItem key={item._id || item.id} item={item} />)}
                </div>
              ) : (
                <div className="empty-cart">
                  <span className="empty-cart-icon"><FaShoppingBag /></span>
                  <span className="empty-cart-kicker">A table is waiting</span>
                  <h3>Your cart is taking a breather.</h3>
                  <p>Explore the menu and add a dish you love. It’ll be waiting here when you get back.</p>
                  <Button as={Link} to="/#products" variant="primary">Explore the menu <span aria-hidden="true">→</span></Button>
                </div>
              )}
            </section>
          </Col>
          <Col lg={4}>
            <aside className="order-summary">
              <div className="order-summary-heading">
                <span className="order-summary-icon"><FaShoppingBag /></span>
                <div>
                  <span className="order-summary-kicker">Almost there</span>
                  <h2>Order summary</h2>
                </div>
              </div>
              <div className="summary-lines">
                <div className="summary-row">
                  <span>Items subtotal <small>({totalItems})</small></span>
                  <span>{currencySymbol}{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{currencySymbol}{total.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                className="cart-checkout-button"
                disabled={cartItems.length === 0}
                onClick={handleOrderNow}
              >
                Continue to checkout <span aria-hidden="true">→</span>
              </Button>
              <div className="cart-summary-note">
                <FaCheck aria-hidden="true" />
                <p>Your cart is saved on this device while you browse.</p>
              </div>
              <p className="cart-demo-note">Demo checkout only — no order or payment is submitted.</p>
            </aside>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Cart;
