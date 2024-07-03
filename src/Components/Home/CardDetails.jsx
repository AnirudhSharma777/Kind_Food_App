import React from 'react';
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {add ,remove} from "../../Redux/slices/cartSlice";



function CardDetails(props) {
  console.log(props.props);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(props.item));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(props.item.id));
    toast.error("Item removed from Cart");
  }
  return (
    <>
    <MDBBtn style={{ width: '5rem',height:'2.5rem' }} onClick={handleShow}outline className='mb-2'>Order</MDBBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Card Details`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Image src={props.props.image} alt="Image" fluid />
            </Col>
            <Col md={8}>
              <h4>{props.props.heading}</h4>
              <p><strong>Price: </strong><span className='text-warning'>{props.props.price}</span></p>
              <p><strong>Genres: </strong>{props.props.genres}</p>
              <p> <strong>Description: </strong><span>{props.props.description}</span></p>
              <p><strong>Ingredients:</strong></p>
              <ul className='d-flex flex-wrap  gap-2 p-1 list-unstyled'>
                {
                  props.props.ingredients[0].map((item,id) => (
                    <li key={id} className=''>{item}</li>
                  ))
                }
              </ul>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardDetails;