import React from 'react'
import { Card , Button, Col} from 'react-bootstrap'

const cardItem = (props) => {
  console.log(props)
  return (
    <Col>
      <Card style={{ width: '18rem',height:'25rem' }} >
        <Card.Img variant="bottom" src={props.item.image} className='img1' />
        <Card.Body>
          <Card.Title>{props.item.heading}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
          <Button variant="primary" className='ms-auto'>Order</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default cardItem