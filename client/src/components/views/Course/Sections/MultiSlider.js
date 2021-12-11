import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from "react-router-dom";

import Gwanghwamun from "../img/Gwanghwamun.jpg";
import HanRiver from "../img/한강.jpg";

export default class MultiSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    return (
      <div className="container">
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<style>{cssstyle}</style>
        <Slider {...settings}>
          <div>
            <NavLink to={"/PopularDestinations"}>
                <img src={Gwanghwamun} width='95%' height='250' style={{ position: 'relative' }} />
                <h6>광화문</h6>
            </NavLink>
          </div>
          <div>
            <NavLink to={"/Course/6184bcb4a62d696d70d7b75e"}>
                <img src={HanRiver} width='95%' height='250' style={{ position: 'relative' }} />
                <h6>한강공원 잠원지구</h6>
            </NavLink>
          </div>
          <div>
            <NavLink to={"/PopularDestinations"}>
                <img src={Gwanghwamun} width='95%' height='250' style={{ position: 'relative' }} />
            </NavLink>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
          <div>
            <h3>10</h3>
          </div>
          <div>
            <h3>11</h3>
          </div>
          <div>
            <h3>12</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 40px 40px;
  width: 1200px;
}
NavLink {
    height: 250px;
    background: #5f9ea0;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}

h6 {
    padding: 5%;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`