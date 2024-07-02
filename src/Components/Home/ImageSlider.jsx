import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Swiper.css';

import { Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';


// images
import img1 from '../../assets/upper1.jpg'
import img2 from '../../assets/upper2.jpg'
import img3 from '../../assets/upper3.jpg'
import img4 from '../../assets/upper4.jpg'
import img5 from '../../assets/upper5.jpg'
import img6 from '../../assets/upper6.jpg'


//Card
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';


const ImageSlider = () => {
    return (
        <Container fluid className='bg-white mb-5' >
            <h2 className='text-center p-5'>Follow On <a href='/about' className='text-primary '>@KING-fOOD</a> Instagram</h2>
            <Swiper
                // breakpoints={{
                //     576: {
                //         // width: 576,
                //         slidesPerView: 1,
                //     },
                //     768: {
                //         // width: 768,
                //         slidesPerView: 2,
                //     },
                //     1000:{
                //         // width:1000,
                //         slidesPerView:3
                //     }
                // }}
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    [img1, img2, img3, img4, img5, img6].map((item, id) => (
                        <SwiperSlide key={id}>
                            <MDBCard className='d-flex flex-wrap'>
                                <MDBCardImage src={item} alt='...' position='top' />
                                <MDBCardBody>
                                    <MDBCardText className='fs-6'>
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Container>
    )
}

export default ImageSlider