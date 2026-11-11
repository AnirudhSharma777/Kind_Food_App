import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './MainSlider.css';

//videos
import third from '../../assets/Frame1.mp4'
import fourth from '../../assets/Frame2.mp4'
import first from '../../assets/Frame3.mp4'
import second from '../../assets/Frame4.mp4'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const MainSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="hero-wrap">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="hero-slider"
      >
        {
          [first, third,fourth,second].map((item, id) => (
            <SwiperSlide key={id}>
              <video autoPlay muted loop playsInline className="hero-video" src={item} aria-label="Freshly prepared food" />
            </SwiperSlide>
          ))
        }
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className="hero-copy">
        <span className="eyebrow">Good food, good mood</span>
        <h1>Fresh flavors.<br />Made for sharing.</h1>
        <p>Discover delicious meals made with care, delivered right to your table.</p>
        <a className="btn btn-primary px-4 py-2" href="#products">Explore the menu</a>
      </div>
    </div>
  );
}

export default MainSlider;
