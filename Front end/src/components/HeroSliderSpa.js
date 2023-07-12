import React from 'react';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade, Autoplay } from 'swiper';

import Img1 from '../assets/img/Spa/1.jpg';
import Img2 from '../assets/img/Spa/2.jpg';
import Img3 from '../assets/img/Spa/3.jpg';

const slides = [
  {
    title: 'Your Relax & Wellness',
    bg: Img1,
  },
  {
    title: 'Your Relax & Wellness',
    bg: Img2,
  },
  {
    title: 'Your Relax & Wellness',
    bg: Img3,
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className='heroSlider h-screen'
    >
      {slides.map((slide, index) => {
        // destructure slide
        const { title, bg } = slide;
        return (
          <SwiperSlide
            className='h-full relative flex items-center justify-center'
            key={index}
          >
            <div className='z-20 text-white text-center'>
              <div className='uppercase font-tertiary tracking-[6px] mb-5'>
                Enjoy and relax
              </div>
              <h1 className='text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>
                {title}
              </h1>
            </div>
            <div className='absolute inset-0'>
              <img
                className='object-cover w-full h-full'
                src={bg}
                alt=''
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* overlay */}
            <div className='absolute inset-0 bg-black/70'></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;

