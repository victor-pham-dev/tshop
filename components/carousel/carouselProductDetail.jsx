import Slider from "@ant-design/react-slick";
import { Component } from "react";

export default class CarouselProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div className="roundedBox" style={{background: '#bdbdbd'}}>
        
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          arrows={false}
        >
         {this.props.images.map((item,i)=>(
          <div key={`to ${i}`}>
            <img src={item} alt={item} className="imgSlide" style={{width: '100%', borderRadius: '0.5rem'}} />
          </div>
         ))}
        </Slider>
      
        <Slider
          style={{marginTop: 16}}
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={5}
              responsive= { [
        
      
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            
          }
        }
      ]}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          arrows={false}
        >
       {this.props.images.map((item,i)=>(
          <div id={`navSlide ${i}`} style={{padding: 8}} key={`nho ${i}`}>
            <img src={item} alt={item} style={{width: 66,height: 66, borderRadius: '0.5rem'}} />
          </div>
         ))}
        </Slider>
      </div>
    );
  }
}
