import React from 'react';
import Carousel from 'react-material-ui-carousel';
import firstBanner from '../../../assets/banner-green.png';
import secondBanner from '../../../assets/banner-black.png';
import styled from 'styled-components';

interface BannerProps {
  item: { bannerImg: string };
}

const Item = (props: BannerProps) => {
  return (
    <Container>
      <img src={props.item.bannerImg} alt="" />
    </Container>
  );
};

const Banner = () => {
  const items = [
    {
      bannerImg: firstBanner,
    },
    {
      bannerImg: secondBanner,
    },
  ];

  return (
    <StyledCarousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </StyledCarousel>
  );
};

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: auto; /* 자동으로 높이를 조절합니다. */
`;

const Container = styled.div`
  position: relative; /* 이미지의 상대적인 위치를 설정합니다. */
  width: 100%;
  padding-top: calc(945 / 4096 * 100%); /* 이미지의 원래 비율을 유지합니다. */

  & > img {
    position: absolute; /* 이미지의 절대적인 위치를 설정합니다. */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 컨테이너에 맞춥니다. */
  }
`;

export default Banner;
