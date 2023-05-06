import React, { ReactNode } from 'react'
import Slider from 'react-slick'

interface Props {
  dots?: boolean
  infinite?: boolean
  speed?: number
  slideToShow?: number
  slideToScroll?: number
  children: ReactNode
}

export const Carousel: React.FC<Props> = ({
  dots,
  infinite,
  speed,
  slideToShow,
  slideToScroll,
  children
}) => {
  const settings = {
    dots: dots ?? false,
    infinite: infinite ?? true,
    speed: speed ?? 500,
    slidesToShow: slideToShow ?? 4,
    slidesToScroll: slideToScroll ?? 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false
        }
      }
    ]
  }
  return (
    <Slider className="w-carousel" {...settings}>
      {children}
    </Slider>
  )
}
