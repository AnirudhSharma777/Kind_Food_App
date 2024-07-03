// import React,{useState} from 'react'
// import { useSelector } from 'react-redux';


// const Cart = () => {

//   const {cart} = useSelector((state) => state);
//   console.log("Printing Cart");
//   console.log(cart);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect( () => {
//     setTotalAmount( cart.reduce( (acc, curr) => acc + curr.price,0) );
//   }, [cart])
//   return (
//     <div>Cart</div>
//   )
// }

// export default Cart




import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "food product",
      price: 759.0,
      quantity: 1,
      imageUrl: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      name: "Another Product",
      price: 500.0,
      quantity: 2,
      imageUrl: "https://picsum.photos/200/300?random=1",
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleOrderNow = () => {
    // Implement order now logic here
    toast.success('Order Successfully...');
  };

  return (
    <Container fluid className="px-4 py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5>Order Now</h5>
            </Card.Header>
            <Card.Body>
              {cartItems.map((item) => (
                <Card className="mb-3">
                  <Row key={item.id} className="">
                    <Col xs={4} md={3} className="text-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col xs={8} md={6} className="mt-3">
                      <h6>{item.name}</h6>
                      <p>
                        <small>₹{item.price}</small>
                      </p>
                      <Form className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-25"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </Form>
                    
                    </Col>
                    <Col>
                    <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-2"
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
              <Row className="justify-content-end">
                <Col xs={6} md={4} className="text-right">
                  <h5>Subtotal: ₹{calculateSubtotal().toFixed(2)}</h5>
                </Col>
              </Row>
              <Row className="justify-content-end">
                <Col xs={6} md={4} className="text-right">
                  <Button variant="primary" onClick={handleOrderNow}>
                    Order Now
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;