import React from 'react';
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { FaClock, FaLeaf, FaStar } from 'react-icons/fa';
import { add } from "../../Redux/slices/cartSlice";

function CardDetails(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const product = props.props;
  const ingredients = Array.isArray(product.ingredients?.[0]) ? product.ingredients[0] : [];

  const addToCart = () => {
    const productId = product._id || product.id || product.heading.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    dispatch(add({ ...product, _id: productId }));
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='product-details-trigger'>
        View dish details <span aria-hidden='true'>↗</span>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="food-details-title"
        centered
        size="lg"
        dialogClassName="food-detail-dialog"
      >
        <Modal.Header closeButton className='food-detail-header'>
          <div>
            <span className='food-detail-kicker'>Fresh from our menu</span>
            <Modal.Title id="food-details-title">A closer look</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className='food-detail-body'>
          <Row className='g-4 align-items-center'>
            <Col xs={12} md={5}>
              <div className='food-detail-image-wrap'>
                <Image src={product.image} alt={product.heading} fluid className="detail-image" />
                <span className='food-detail-category'>{props.category || 'From our kitchen'}</span>
              </div>
            </Col>
            <Col xs={12} md={7} className='food-detail-copy'>
              <div className='food-detail-meta'>
                <span><FaStar aria-hidden='true' /> {product.rating}</span>
                <span><FaClock aria-hidden='true' /> {product.time}</span>
              </div>
              <h2>{product.heading}</h2>
              <p className='food-detail-description'>{product.description}</p>
              <div className='food-detail-price'>{product.price}</div>
              {product.genres && <p className='food-detail-genres'>{product.genres}</p>}
              <div className='food-detail-ingredients'>
                <h3><FaLeaf aria-hidden='true' /> What goes into it</h3>
                {ingredients.length > 0 ? (
                  <ul>
                    {ingredients.map((item, id) => (
                      <li key={`${item}-${id}`}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='food-detail-no-ingredients'>Ingredient details are coming soon.</p>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='food-detail-footer'>
          <Button variant="outline-secondary" onClick={handleClose}>
            Keep browsing
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to cart <span aria-hidden='true'>+</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardDetails;