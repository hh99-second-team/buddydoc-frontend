import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';
import MentorItem from './MentorItem';

const SwiperPerView = () => {
  return (
    <>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}>
        {Array.from({ length: 12 }, (_, idx) => (
          <StyledSwiperSlide>
            <MentorItem />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding: 40px 0;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SwiperPerView;
