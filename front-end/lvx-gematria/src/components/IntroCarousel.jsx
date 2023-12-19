import Carousel from 'react-bootstrap/Carousel'

import Slide1 from '../images/LVX-Gematria-Presentation/Presentation.001.jpeg'
import Slide2 from '../images/LVX-Gematria-Presentation/Presentation.002.jpeg'
import Slide3 from '../images/LVX-Gematria-Presentation/Presentation.003.jpeg'
import Slide4 from '../images/LVX-Gematria-Presentation/Presentation.004.jpeg' 
import Slide5 from '../images/LVX-Gematria-Presentation/Presentation.005.jpeg'

import Slide7 from '../images/LVX-Gematria-Presentation/Presentation.007.jpeg'
import Slide8 from '../images/LVX-Gematria-Presentation/Presentation.008.jpeg'

import Slide10 from '../images/LVX-Gematria-Presentation/Presentation.010.jpeg'
import Slide11 from '../images/LVX-Gematria-Presentation/Presentation.011.jpeg'
import Slide12 from '../images/LVX-Gematria-Presentation/Presentation.012.jpeg'
import Slide13 from '../images/LVX-Gematria-Presentation/Presentation.013.jpeg'

export const IntroCarousel=() => {
    return (
      <Carousel style={{borderRadius: "10px black solid"}}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide3}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide4}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide5}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide7}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide8}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide10}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide11}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide12}
            alt="Second slide"
          />
        </Carousel.Item><Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide13}
            alt="Second slide"
          />
        </Carousel.Item>

      </Carousel>
    );
  }