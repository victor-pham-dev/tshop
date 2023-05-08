import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { ReactNode } from "react";
import Slider from "react-slick";

interface Props {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slideToShow?: number;
  slideToScroll?: number;
  children: ReactNode;
}
function NextArrow(props: { className?: string; style?: any; onClick?: any }) {
  const { className, style, onClick } = props;
  return (
    <RightOutlined
      className={className}
      style={{ ...style, display: "block", color: "red", fontSize: "26px" }}
      onClick={onClick}
    />
  );
}
function PrevArrow(props: { className?: string; style?: any; onClick?: any }) {
  const { className, style, onClick } = props;
  return (
    <LeftOutlined
      className={className}
      style={{ ...style, display: "block", color: "red", fontSize: "26px" }}
      onClick={onClick}
    />
  );
}

export const CarouselImg: React.FC<Props> = ({
  dots,
  infinite,
  speed,
  slideToShow,
  slideToScroll,
  children,
}) => {
  const settings = {
    dots: dots ?? false,
    infinite: infinite ?? true,
    speed: speed ?? 500,
    slidesToShow: slideToShow ?? 4,
    slidesToScroll: slideToScroll ?? 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return <Slider className="carouselImage" {...settings}>{children}</Slider>;
};
