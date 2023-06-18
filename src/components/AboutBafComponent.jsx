import styles from './AboutBafComponent.module.css';
import { useState, useEffect, useRef } from "react";
const slidesImages = [{
    source: './slides/kwiat.jpeg',
    alt: 'slide1',
    color: 'red',
    title: 'Poprawa Jakości Życia',
    subtitle: 'Wykorzystanie kalkulatora BAF może przyczynić się do stworzenia zielonych przestrzeni, które zwiększają jakość życia mieszkańców poprzez poprawę jakości powietrza, redukcję hałasu czy tworzenie miejsc do rekreacji.'
},
{
    source: './slides/map1.png',
    alt: 'slide2',
    color: 'blue',
    title: 'Ochrona Środowiska Naturalnego',
    subtitle: 'Kalkulator Biotope Area Factor umożliwia przeprowadzanie precyzyjnych obliczeń dotyczących wpływu planowanej inwestycji na lokalne ekosystemy. To narzędzie może przyczynić się do ochrony siedlisk naturalnych, a tym samym do zrównoważonego rozwoju.'
},
{
    source: './slides/slide1.jpeg',
    alt: 'slide3',
    color: 'green',
    title: 'Wsparcie w Projektowaniu Zrównoważonym',
    subtitle: 'Kalkulator BAF pomaga architektom i projektantom uwzględniać zasady zrównoważonego rozwoju w swoich projektach. Może to prowadzić do tworzenia bardziej ekologicznych budynków i przestrzeni miejskich.'
}]
export function Slide1({ index, slide, slideIndex, setIndex, isMouseDown, setIsMouseDown }) {
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0 });
  
    const handleMouseDown = (e) => {
      setIsMouseDown(true);
      setOrigin({ x: e.clientX });
    };
  
    const handleMouseMove = (e) => {
      if (isMouseDown) {
        setPosition({ x: e.clientX - origin.x });
      }
    };
  
    const handleMouseUp = (e) => {
      setIsMouseDown(false);
      if (position.x > 100 || position.x < -100) {
        if (slideIndex < 2) {
          setIndex(slideIndex + 1);
        } else {
          setIndex(0);
        }
      }
      setPosition({ x: 0 });
    };
  
    const handleTouchStart = (e) => {
      setIsMouseDown(true);
      setOrigin({ x: e.touches[0].clientX });
    };
  
    const handleTouchMove = (e) => {
      if (isMouseDown) {
        setPosition({ x: e.touches[0].clientX - origin.x });
      }
    };
  
    const handleTouchEnd = (e) => {
      setIsMouseDown(false);
      if (position.x > 20 || position.x < -20) {
        if (slideIndex < 2) {
          setIndex(slideIndex + 1);
        } else {
          setIndex(0);
        }
      }
      setPosition({ x: 0 });
    };
  
    let rotate = 0;
    
    if (position.x > 0 && position.x > 50) {
      rotate = 4;
    } else if (position.x < 0 && position.x < -50) {
      rotate = -4;
    }
  
    return (
      <div
        style={
          isMouseDown
            ? {
                transition: "scale 0.3s forwards",
                scale: "1.05",
                transform: `translateX(${position.x}px) translateY(0px) rotate(${rotate}deg)`,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                zIndex: "999",
                cursor: "grabbing",
                top: "0",
              }
            : null
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={styles.slide}
      >
        <img src={slide.source} alt="slide1" className={styles.slideImage} />
      </div>
    );
  }
  
export function Slide({index, slide, slideIndex}){
   
    
    let mathIndex = slideIndex + 1;
    if(slideIndex === 2) {
        mathIndex = 0;
    }
    
    
    return (
      
            <div
                className={mathIndex === index ? styles.slide2 : styles.slide3}>
                    <img src={slide.source} alt="slide1" className={styles.slideImage} />
                </div>
        )  
}

function AboutBafComponent() {
    const [slideIndex, setIndex] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const titleRef = useRef(null);
    return (
        <div className={styles.intro}>
          
          
        <div className={styles.introInfo}>
        <div className={styles.introText}>
                <p ref={titleRef} className={styles.introTitle}>{slidesImages[slideIndex].title}</p>
                
        </div>
        

        {/* <img style={isMouseDown? {display:'none'} : {display:'block'}} onClick={buttonClick} src="./images/arrow.svg" alt="Logo" className={styles.slideArrow} /> */}
         <div className={styles.slidesContainer}>
          {slidesImages.map((slide, index) =>
            index === slideIndex ? (
              <Slide1 key={index} index={index} slide={slide} slideIndex={slideIndex} setIndex={setIndex} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown} />
            ) : (
              <Slide key={index} index={index} slide={slide} slideIndex={slideIndex} />
            )
          )}
        </div>
        
      </div>
      <div className={styles.introSubtitleDiv}>
                    <p  className={styles.introSubtitle}>{slidesImages[slideIndex].subtitle}</p> {/*Updated the ref attribute to `subtitleRef` since it should be different for every element */}
        </div>
        </div>
    )
}
export default AboutBafComponent;