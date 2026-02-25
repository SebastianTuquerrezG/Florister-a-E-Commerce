import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './styles.css';

const HomeSlider = () => {
  return (
    <Swiper modules={[Navigation]} navigation={true}  className='mySwiper'>
        <SwiperSlide>
            <img src="https://fiore.vamtam.com/wp-content/uploads/2021/12/hero-img-630x704.png" alt="Slider 1" className="slider-image" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/slider2.jpg" alt="Slider 2" className="slider-image" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/slider3.jpg" alt="Slider 3" className="slider-image" />
        </SwiperSlide>
    </Swiper>
  )
};

export default HomeSlider