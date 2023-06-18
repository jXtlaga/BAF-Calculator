import {useState} from 'react';
import AboutBafComponent from './AboutBafComponent.jsx';
function InfoComponent({resizeClick, setMenu, searchInput, setSearchInput}) {
    
    const search = (e) => {
        e.preventDefault();
        console.log(searchInput);
        let searchInputPom = searchInput;
        let id = {"title": "hello"}
        window.ILITEAPI.searchAddress(
            searchInputPom, {"id": "mainMarker"}
            );
        window.ILITEAPI.getMapSize(function (size) {
            console.log(size);
        })
            
        }
        console.log(resizeClick);
    return (
        <div className={resizeClick? 'App-info opacityAnimation':'App-info opacityAnimation2'}>
            <div className='App-infoPositions'>
            <h2 className='App-infoPositionsTitle'>Oblicz współczynnik powierzchni biotopu (Biotope Area Factor)</h2>
            <p className='App-infoPositionsText'>Za pomocą kalkulatora BAF mozesz sprawdzić jaki jest współczynnik powierzchni biotopu twojej działki, wsi lub miasta</p>
            <form className='App-infoPositionForm' onSubmit={search} style={{marginTop:'80px'}}> 
                <input 
                className='App-infoPositionsInput'
                    type="text" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="wyszukaj teren"
                />
                {/* <div onClick={search} className='App-infoPositionsIconBackground'>
                    <img src="./images/icons/search.svg" className='App-infoPositionsIcon'/>
                </div>   */}
            </form>
            
            <div onClick={() => setMenu(false)} className={'global-buttonBig'}>
                <p>kalkulator</p>
            </div>
            <AboutBafComponent />
            </div>
            
        </div>
    )
    }
    export default InfoComponent;