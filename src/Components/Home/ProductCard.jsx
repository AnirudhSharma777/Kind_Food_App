import React ,{useState}from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBadge,
  MDBRipple,
  MDBIcon
} from 'mdb-react-ui-kit';
import CardDetails from './CardDetails';


export default function App(props) {


  const [readmore, setreadmore] = useState(false);
  const description = readmore ? ` ${props.item.genres}` : ` ${props.item.genres.substring(0, 10)}.... `;

  function readMorehandler() {
    setreadmore(!readmore);
  }

  return (
    <MDBCard className="mt-3 d-flex flex-lg-row flex-xxl-row flex-sm-column justify-content-center mx-auto shadow rounded-4 " >
      <MDBRow className="g-0" style={{ width: '18rem', height: '22rem' }}>
        <MDBCol >
          <MDBRow className=''>
            <MDBCol lg={12} className=''>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage  src={props.item.image} alt="Food" className='img1  rounded' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
            </MDBCol>
          </MDBRow>
          <MDBCardBody>
            <MDBRow className='p-1'>
              <MDBCol >
                <MDBCardTitle className='fs-6'>{props.item.heading}</MDBCardTitle>
              </MDBCol>
              <MDBCol className='d-flex justify-content-end mb-3'>
                <MDBBadge className='bg-success mb-2'>{props.item.rating}</MDBBadge>
              </MDBCol>
            </MDBRow>
            <MDBRow className='p-1'>
              <MDBCol>
                <MDBCardText className='comment'>{description}</MDBCardText>
              </MDBCol>
              <MDBCol>
                <MDBCardText className='d-flex flex-row justify-content-end'>

                  <small className="text-muted">
                    {props.item.price}
                  </small>

                </MDBCardText>
              </MDBCol>
            </MDBRow>
            <MDBRow className='p-1 '>
              <MDBCol >

                <CardDetails props={props.item} />
              </MDBCol>
              <MDBCol >
                <MDBCardText className='d-flex justify-content-end'>
                  <small className="text-muted">{props.item.time}</small>
                </MDBCardText>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}