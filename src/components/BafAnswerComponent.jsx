import { useEffect, useState } from "react";
import bafData from "../data/bafData.js";
import placesData from "../data/placesData.js";
function BafAnswerComponent({itemValues, placeClicked}){
    const [baf, setBaf] = useState(0);
    const [bafSurface, setBafSurface] = useState(0);
    const [surface, setSurface] = useState(0);
    const [placesDataValue, setplacesDataValue] = useState(-1);
    useEffect(() => {
        if(placeClicked !== -1) {
            console.log("placeClicked",placesData[placeClicked]);
            setplacesDataValue(placesData[placeClicked].minValue);
        }
    },[placeClicked]);
    useEffect(() => {
        let bafSurfacePom = 0;
        let surfacePom = 0;
        for(let i = 0; i < itemValues.length; i++) {
            bafSurfacePom += itemValues[i] * bafData[i].calcBaf;
            surfacePom += itemValues[i];
        }
        if(surfacePom === 0) {
            setBaf(0);
        } else {
            setBaf((bafSurfacePom/surfacePom).toFixed(2));
        }
        setBafSurface(bafSurfacePom);
        setSurface(surfacePom);

        
    },[itemValues,bafData]);
    return(
        <div className='grid-infoPositions'>
            <h2 className='App-infoPositionsTitle'>Twój współczynnik powierzchni biotopu wynosi około {baf}</h2>
            <p style={{marginBottom:'20px'}} className='App-infoPositionsText'>równanie wygląda następująco:</p>
            <p className="App-infoPositionsSmallText">Powierzchnie efektywne ekologicznie * Współczynnik wartości ekologicznej na m2 powierzchni</p>
            <div className="Math-line"></div>
            <p className="App-infoPositionsSmallText">Całkowita powierzchnia działki</p>
            <div className="Math-operation">
                <div className="Math-fraction">
                    <span className="Math-numerator">{bafSurface}</span>
                    <span className="Math-denominator">{surface}</span>
                </div>
                <p>= {baf}</p>
                
                 {placesDataValue !== -1 && placesDataValue < baf? <img src="./images/icons/correct.svg" className="message-icon"/> : 
                 placesDataValue !== -1 && <img src="./images/icons/important.svg" className="message-icon"/> }
            </div>
            <div className="App-infoIfBAF">
            {placesDataValue !== -1 && placesDataValue < baf? <p>{`Twoja wartość BAF spełnia kryteriów wymagań dla zabudowy ${placesData[placeClicked].formTitle}`}</p> : 
                 placesDataValue !== -1 &&  <p>{`Twoja wartość BAF nie spełnia kryteriów wymagań dla zabudowy ${placesData[placeClicked].formTitle}, gdzie minimalna wartośc wynosi ${placesData[placeClicked].minValue}`}</p> }
                 </div>
            <table className="myTable">
                <tbody>
                <tr>
                    <th>typ powierzchni</th>
                    <th>przelicznik</th>
                    <th>twoja powierzchnia</th>
                    <th>mnożnik</th>
                </tr>
                    {bafData.map((item, i) => (
                        itemValues[i] !== 0 && (
                    <tr key={i}>
                        <td key={`${i}itemText`}><img src={`./images/baf/baf${i+1}.png`}/></td>
                        <td key={`${i}itemBaf`}>{item.calcBaf}</td>
                        <td key={`${i}itemBaf2`}>{itemValues[i]}</td>
                        <td key={`${i}itemBaf2`}>{(item.calcBaf*itemValues[i]).toFixed(1)}</td>
                    </tr>
                        )
                    ))}
                </tbody>
    </table>
    {/* <p style={{marginBottom:'20px'}} className='App-infoPositionsText'>wynik</p> */}
   
        </div>
    )
}
export default BafAnswerComponent;