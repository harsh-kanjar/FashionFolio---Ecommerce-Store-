import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 3 ? images.length : 3, // Show fewer slides if less than 3
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set speed for autoplay (in milliseconds)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show one slide on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="banner-container py-8">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p>{image.description}</p>
              <a href={image.link} className="mt-2 inline-block bg-red-500 text-white py-2 px-4 hover:bg-black hover:text-white transition duration-300 ease-in-out transform rounded">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
