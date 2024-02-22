import React from 'react';
import Carousel from 'react-material-ui-carousel';
import firstBanner from '../../assets/banner-test-1.jpg';
import secondBanner from '../../assets/banner-test-2.jpg';
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
  height: 320px;
  border-radius: 28px;
  overflow: hidden;
`;

export default Banner;
