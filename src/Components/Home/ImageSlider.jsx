import React from 'react';
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
const ImageSlider = () => {
    return (
        <section className='instagram-section'>
            <Container>
                <div className='text-center mb-4'>
                    <span className='eyebrow'>From our kitchen</span>
                    <h2 className='section-heading'>A little inspiration for your next bite</h2>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    breakpoints={{
                        576: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="instagram-slider"
                >
                    {
                        [img1, img2, img3, img4, img5, img6].map((item, id) => (
                            <SwiperSlide key={id}>
                                <img src={item} alt={`Food inspiration ${id + 1}`} className='instagram-image' />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </section>
        )
}

export default ImageSlider