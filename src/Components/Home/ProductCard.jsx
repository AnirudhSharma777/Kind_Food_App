import React from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';

export default function App(props) {
  return (
    <MDBCard className="my-3" >
      <MDBRow className="g-0" style={{ width: '18rem',height:'22rem' }}>
        <MDBCol >
          <MDBCardImage src={props.item.image} alt="KFC Food" fluid />
          <MDBCardBody>
            <MDBCardTitle>{props.item.heading}</MDBCardTitle>
            <MDBCardText>Burger, Rolls, Fast Food</MDBCardText>
            <MDBCardText>
              <small className="text-muted">₹200 for one</small>
            </MDBCardText>
            <MDBCardText>
              <MDBIcon fas icon="star" className="text-warning" /> 4.2
            </MDBCardText>
            <MDBCardText>
              <small className="text-muted">17 min</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}