import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../img/banner.png";
import banner4 from "../img/banner4.png";
import Chunggyecheon from "../img/Chunggyecheon.jpg";
import Gwanghwamun from "../img/Gwanghwamun.jpg";
import HanRiver from "../img/한강.jpg";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <NavLink to={"/PopularDestinations"}>
              <img src={banner} width='100%' height='400' style={{ position: 'relative' }} />
            </NavLink>
          </div>
          <div>
            <NavLink to={"/Course"}>
              <img src={banner4} width='100%' height='400' style={{ position: 'relative' }} />
            </NavLink>
          </div>
          <div>
            <img src={Gwanghwamun} width='100%' height='400' style={{ position: 'relative' }} />
          </div>
          <div>
            <img src={HanRiver} width='100%' height='400' style={{ position: 'relative' }} />
          </div>
        </Slider>
      </div>
    );
  }
}