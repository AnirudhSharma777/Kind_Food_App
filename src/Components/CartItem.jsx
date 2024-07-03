import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import { remove } from "../Redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  const handleQuantityChange = (id, newQuantity) => {
    dispatch((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };


  return (
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
                    <FcDeleteDatabase onClick={removeFromCart}/>
                    </Col>
                  </Row>
                </Card>
  );
};

export default CartItem;
