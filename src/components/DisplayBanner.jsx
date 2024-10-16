import React from 'react'
import Banner from './Banner';
function DisplayBanner() {
    const images = [
        {
          src: '/crausel/1.jpg',
          alt: 'Image 1',
          title: 'Unleash Your Creativity',
          description: 'Transform your ideas into stunning designs.',
          link: '/shop',
        },
        {
          src: '/crausel/2.jpg',
          alt: 'Image 2',
          title: 'Explore New Adventures',
          description: 'Discover the world with our exclusive travel packages.',
          link: '/shop',
        },
        {
          src: '/crausel/3.jpg',
          alt: 'Image 3',
          title: 'Elevate Your Style',
          description: 'Shop the latest trends and redefine your wardrobe.',
          link: '/shop',
        },
        {
          src: '/crausel/5.jpg',
          alt: 'Image 4',
          title: 'Stay Connected',
          description: 'Join our community and share your passions today!',
          link: '/shop',
        },
      ];
  return (
    <div>
     <Banner images={images} />
    </div>
  )
}

export default DisplayBanner
