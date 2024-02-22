import React from 'react';
import Carousel from 'react-material-ui-carousel';
import firstBanner from '../../assets/banner-green.png';
import secondBanner from '../../assets/banner-black.png';
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
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 8vh;
  height: 330px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Banner;
