import React from 'react'
import  {Card,Container,Image,} from 'react-bootstrap'
import {FaThumbsUp} from 'react-icons/fa';


const CardForReview = (props) => {
    return (
        <div>
            <Container>
                <Card style={{ width: '23rem', height: '18rem',marginTop:'100px' }} className=''>
                    <Card.Header className="d-flex justify-content-between align-items-center bg-white no-border">
                        <div className="d-flex align-items-center">
                            <Image
                                src={props.item.image}
                                roundedCircle
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <div>
                                <Card.Title className="mb-0">{props.item.customer}</Card.Title>
                                <Card.Subtitle className="text-muted">{props.item.date}</Card.Subtitle>
                            </div>
                        </div>
                        <div>
                            {props.item.rating}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{props.item.dish}</Card.Title>
                        <Card.Text  className='comment'>
                            {props.item.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='text-smallest d-flex flex-row align-items-center gap-2 justify-content-center'>Was this helpful ? <FaThumbsUp /></Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default CardForReview