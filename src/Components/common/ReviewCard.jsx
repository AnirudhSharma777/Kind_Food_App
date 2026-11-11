import React from 'react'
import { ReviewCartData } from '../../Data/ReviewCard'
import CardForReview from './CardForReview'
import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../Home/Swiper.css';

import { Pagination } from 'swiper/modules';


const ReviewCard = () => {
    return (
        <section className='review-section'>
            <Container>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="review-slider"
                >
                    {
                        ReviewCartData.map((item) => {
                            // console.log(item);
                            return (
                                <SwiperSlide key={item.id}>
                                    <CardForReview item={item} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Container>
        </section>
    )
}

export default ReviewCard