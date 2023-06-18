import { useEffect, useState } from "react";
import bafData from "../data/bafData.js";
import placesData from "../data/placesData.js";
import BafAnswerComponent from "./BafAnswerComponent.jsx";

function PlaceItem({index, setPlaceClicked,placeClicked }){
console.log(placesData.length);
    return(
        <div 
        onClick={() => setPlaceClicked(index)}
         className={placeClicked == index? 'sliderX-backItem': 'sliderX-backItem sliderX-backItemNone'} 
         style={index == 0? {paddingLeft:'5vw'}: index == placesData.length - 1?  {paddingRight:'10%'}:{}}
         >
       
        <div className="sliderX-item">
            <img className="sliderX-image" src={`./images/places/${placesData[index].imgSrc}`} alt="" />
        </div>
       
            <p className="sliderX-text">{placesData[index].title}</p>
            {placeClicked == index &&
                <div className="sliderX-backItemLine">
                </div>
            }
        </div>
    )
}
function BafItem({image, index, itemValues, setItemValues, text, textInfo, setonHoverState, onHoverState}) {
    const [animation, setAnimation] = useState("");
    const [animation2, setAnimation2] = useState("");
    
    const handleValueChange = (e) => {
        let value = e.target.value;
        value = value.replace(',', '.');
        // Regexp for valid numbers or empty strings or single dot or dot at the end
        const validNumberOrDotRegexp = /^(\.\d+|\d+(\.\d*)?(\.)?)?$/;

        if (value === "" || validNumberOrDotRegexp.test(value)) {
            const newValues = [...itemValues];
            newValues[index] = value === "" ? 0 : (value.endsWith('.') ? value : parseFloat(value));
            setItemValues(newValues);
        }
    };
    const handleClick = (e,value) => {
        e.preventDefault();
        if(value === -1) {
            setAnimation2("clickAnimation");
            setTimeout(() => {
                setAnimation2("")
            }, 300); }
        else {
            setAnimation("clickAnimation");
            setTimeout(() => {
                setAnimation("")
            }, 300);
        }
    
    
        
        
        const newValues = [...itemValues];
        if(newValues[index]+value >= 0) {
            newValues[index] += value;
            setItemValues(newValues);
        }
        
    };

    return (
        <div className="grid-item">
        <img className="grid-image" src={image} alt="" />
        <img onMouseEnter={() => setonHoverState(index)} className="grid-iconMore" onMouseLeave={() => setonHoverState(-1)} src="./images/icons/more.svg" alt="" />
        <div className="grid-info" style={onHoverState === index ? {} : { display: 'none' }}>
            <p className="grid-infoText">{textInfo}</p>
        </div>
        
        <p className="grid-text">{text}</p>
        <div className="input-icon-container">
            <input className="grid-input" type="text" placeholder="0" value={itemValues[index] === 0 ? '' : itemValues[index]} onChange={handleValueChange} />
            <div className="icon-container">
                <img onClick={(e) => handleClick(e,-1)} className={`grid-icon2 ${animation2}`} src="./images/icons/minus.svg" alt="" />
                <img onClick={(e) => handleClick(e,1)} className={`grid-icon ${animation}`} src="./images/icons/plus.svg" alt="" />
            </div>
            
        </div>

       
    </div>
    

    )
}

function BafCalculatorComponent({resizeClick}){
    const [showAnswer, setShowAnswer] = useState(false);
    const [itemValues, setItemValues] = useState(Array(9).fill(0));
    const [activeButton, setActiveButton] = useState(false);
    const [onHoverState, setonHoverState] = useState(-1);
    const [placeClicked, setPlaceClicked] = useState(-1);
   const [sum, setSum] = useState(itemValues.reduce((a, b) => a + (isNaN(parseFloat(b)) ? 0 : parseFloat(b)), 0));
    const handleClick = () => {
        if(!activeButton) {
            window.alert("Wprowadź wartości");
        } else if(placeClicked === -1){
            window.alert("Wybierz typ zabudowy");
        } else {
        let bafSurface = 0;
        let surface = 0;
        for(let i = 0; i < itemValues.length; i++) {
            bafSurface += itemValues[i] * bafData[i].calcBaf;
            surface += itemValues[i];

        } 
        let baf = bafSurface/surface;

        setShowAnswer(true);
    }
        // alert(`Przelicznik baf:${bafSurface} ${surface} ${baf.toFixed(2)}`);
    }
   useEffect(() => {
    setSum(itemValues.reduce((a, b) => a + (isNaN(parseFloat(b)) ? 0 : parseFloat(b)), 0));
    if(sum > 0) {
        setActiveButton(true)
    } else {
        setActiveButton(false)
    }
    }, [itemValues, sum])
        
    
        
    return(
        
        <div className={resizeClick? 'App-info opacityAnimation':'App-info opacityAnimation2'}>
        {showAnswer ? <BafAnswerComponent itemValues={itemValues} placeClicked={placeClicked}/> : (
            <div className='grid-infoPositions'>
            <h2 className='App-infoPositionsTitle'>Kalkulator Baf</h2>
            <p className='App-infoPositionsText'>Twoja przestrzeń wynosi 12 m<sup>2</sup>, wykorzystałeś {sum.toFixed(2)} m<sup>2</sup></p>
            
            <div>
                <div className="sliderX-container">
                    {placesData.map((item, index) => (
                        <PlaceItem index={index} key={index} setPlaceClicked={setPlaceClicked} placeClicked={placeClicked}/>
                    ))}
                </div>
                <div className="grid-container">
                    {[...Array(9)].map((_, i) =>
                        <BafItem key={i} image={`./images/baf/baf${i+1}.png`} index={i} itemValues={itemValues} setItemValues={setItemValues} text={bafData[i].textBaf} textInfo={bafData[i].infoBaf} setonHoverState={setonHoverState} onHoverState={onHoverState} />
                    )}
                </div>
                <div  className={activeButton? `global-buttonBig` : `global-buttonBigNotActive`} onClick={(e)=>handleClick(e)}>
                    <p>przelicz</p>
                </div>
            </div>

            </div>
        )}
        </div>
                
    )
}

export default BafCalculatorComponent;
