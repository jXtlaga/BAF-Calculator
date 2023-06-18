
import React, { useEffect, useState } from 'react';


import '../App.css';
import '../test.js';
import InfoComponent from './InfoComponent';
import BafCalculatorComponent from './BafCalculatorComponent';

const MyMapComponent = () => {
    const [size, setSize] = useState({width: window.innerWidth/2, height: window.innerHeight});
    const [resizeClick, setResizeClick] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [menu, setMenu] = useState(true);
    useEffect(() => {
        
        try {

            document.cookie = 'myMapCookie=someValue; SameSite=None; Secure';
          window.ILITEAPI.init({
            "divId" : "iapi",
            "width" : size.width,
            "height" : size.height-80,
            "activeGpMapId" : "gp1",
            "activeGpMaps" : ["gp0","gp1"],
            "activeGpActions" : ["pan","fullExtent"],
            
            "scale" : 400000,
            "gpplugins": ["clusterLayer","imapLiteApi-coreEx.js"]
            
          });
            
           
                
                    
        } catch(e) {
          console.error(e);
        }
        
      },[size]);

    //   window.ILITEAPI.addMapModule({"id":"test","label":"test", "mapservices":"https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow/%22%7D"},function (response) {
    //     console.log(response)   
    //    })

    // useEffect(() => {
        
    //     const handleResize = () => {
    //         if(resizeClick) {
    //             setSize({width: window.innerWidth, height: window.innerHeight});
    //         } else {
    //             setSize({width: window.innerWidth/2, height: window.innerHeight});
    //         }
    //     }
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // },[]);
    
    
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
    const resize = () => {
       
        
        // let newObject = {
        //     "xmin": 4514693.554800,  
        //     "ymin": 274538.963600,  
        //     "xmax": 274540.963600,  
        //     "ymax": 514695.554800,
        // };
        
        // let callback = function(result) {
        //     console.log("Wynik zapisu do bazy:", result);
        // };
        // console.log(window.ILITEAPI);
        // window.ILITEAPIA.addObject("gp1", "gp1", newObject, callback);
        
        if(resizeClick) {
            setSize({width: window.innerWidth, height: window.innerHeight});
            setResizeClick(false);
        } else {
            setSize({width: window.innerWidth, height: window.innerHeight});
            setResizeClick(true);
        }
    }
    
    return (
    <div>
        <header className="App-header">
            {!menu &&  <p className="App-header-leftItem" onClick={()=>setMenu(true)}><span style={{backgroundImage:"url(./images/icons/left.svg)"}}></span>menu</p>}
            {resizeClick && (<form className='App-infoPositionForm' onSubmit={search} style={{display:"flex",position: 'absolute'}}> 
                <input 
                
                className='App-infoPositionsInputUp'
                    type="text" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="wyszukaj teren"
                />
            </form>)}
    
        </header>
        {menu? <InfoComponent resizeClick={resizeClick} setMenu={setMenu} searchInput={searchInput} setSearchInput={setSearchInput}/> : <BafCalculatorComponent resizeClick={resizeClick} /> }
       
        
        <div style={resizeClick ? {left:'20px', rotate:'180deg'} : {}} onClick={resize} className='App-resizeBackground'>
            <img src="./images/icons/left2.svg" alt="" />
        </div>
        
        <div className='App-parentMap' style={resizeClick ? {marginLeft:'0'} : {marginLeft:'50vw'} } >
       
            <div   className="App-map" id="iapi" >
                </div>
        </div>
    </div>)
    
}

export default MyMapComponent;
