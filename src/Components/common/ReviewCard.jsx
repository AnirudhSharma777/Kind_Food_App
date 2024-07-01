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
        <div>
            <Container fluid>

                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
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
        </div>
    )
}

export default ReviewCard