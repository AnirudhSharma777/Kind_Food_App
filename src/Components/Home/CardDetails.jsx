import React from 'react';
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';

function CardDetails(props) {
  console.log(props.props);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <MDBBtn style={{ width: '5rem',height:'2.5rem' }} onClick={handleShow}outline>Details</MDBBtn>

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
          <Button variant="primary" onClick={handleClose}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardDetails;