# BAF Calculator Documentation for Dąbrowa Górnicza
## 1. Technologies:
React, jQuery, geoPortal api, python
## 2. Usage:
GitHub URL: https://github.com/jXtlaga/stackOvergrows-BAF-Calculator
```
git clone https://github.com/jXtlaga/stackOvergrows-BAF-Calculator
cd [directory_name]
npm install
npm start
```
## 3. Home Page
Features:
- BAF news
- Map, area search & zoom button
- Transition to calculator
![Home Page](./docs/mainPage.png)
## 4. Calculator Page
Features:
- Selecting space
- Entering square meters or adding with a button
- Button with more detailed information
- Calculating the sum of m2
- Not allowing to proceed without selecting a space or surface.
docs/calculator.png
![Calculator](./docs/calculator.png)
## 5. Result Page
Features:
- BAF result calculation
- Display of previous choices
- Explanation of how BAF is calculated
- Information on whether the BAF value meets the criteria for a specific building
![Result](./docs/result.png)
## 6. Geoportal, API, Addresses, plot area
### 6.1 Query returning plot coordinates

https://www.punktyadresowe.pl/cgi-bin/emuia/246501?service=WFS&version=1.1.0&request=GetFeature&typename=punkty_adresowe&outputformat=GML2&count=3&ms:NAZWA_ULICY=Korzeniec

Sample response:

<?xml version='1.0' encoding="UTF-8" ?>
<wfs:FeatureCollection
  xmlns:ms="http://mapserver.gis.umn.edu/mapserver"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://mapserver.gis.umn.edu/mapserver https://geoportal-wms.dg.pl/iip/ows?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=ms:dzialki&amp;OUTPUTFORMAT=text/xml;%20subtype=gml/3.1.1  http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
   <gml:boundedBy>
       <gml:Envelope srsName="EPSG:2180">
           <gml:lowerCorner>276630.193309 521424.614850</gml:lowerCorner>
           <gml:upperCorner>276703.929858 521476.672999</gml:upperCorner>
       </gml:Envelope>
   </gml:boundedBy>
   <gml:featureMember>
       <ms:dzialki gml:id="dzialki.501848209">
           <gml:boundedBy>
               <gml:Envelope srsName="EPSG:2180">
                   <gml:lowerCorner>276630.193309 521424.614850</gml:lowerCorner>
                   <gml:upperCorner>276703.929858 521476.672999</gml:upperCorner>
               </gml:Envelope>
           </gml:boundedBy>
           <ms:msGeometry>
               <gml:Polygon srsName="EPSG:2180">
                   <gml:exterior>
                       <gml:LinearRing>
                           <gml:posList srsDimension="2">276695.986499 521476.672999 276703.929858 521464.897291 276637.913435 521424.614850 276630.193309 521436.883251 276695.986499 521476.672999 </gml:posList>
                       </gml:LinearRing>
                   </gml:exterior>
               </gml:Polygon>
           </ms:msGeometry>
           <ms:ID_DZIALKI>246501_1.0007.363</ms:ID_DZIALKI>
           <ms:NUMER_DZIALKI>363</ms:NUMER_DZIALKI>
           <ms:NAZWA_OBREBU>Łosień</ms:NAZWA_OBREBU>
           <ms:NUMER_OBREBU>0007</ms:NUMER_OBREBU>
           <ms:NUMER_JEDNOSTKI>01_1</ms:NUMER_JEDNOSTKI>
           <ms:NAZWA_GMINY>Dąbrowa Górnicza</ms:NAZWA_GMINY>
           <ms:POLE_EWIDENCYJNE></ms:POLE_EWIDENCYJNE>
           <ms:KLASOUZYTKI_EGIB></ms:KLASOUZYTKI_EGIB>
           <ms:GRUPA_REJESTROWA></ms:GRUPA_REJESTROWA>
           <ms:DATA>2023-06-17 23:18:29</ms:DATA>
       </ms:dzialki>
   </gml:featureMember>
</wfs:FeatureCollection>



### 6.2 Sample query returning address information

<?xml version='1.0' encoding="UTF-8" ?>
<wfs:FeatureCollection
  xmlns:ms="http://mapserver.gis.umn.edu/mapserver"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-basic.xsd
                      http://mapserver.gis.umn.edu/mapserver https://www.punktyadresowe.pl/cgi-bin/emuia/246501?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=punkty_adresowe&amp;OUTPUTFORMAT=XMLSCHEMA">
   <gml:boundedBy>
       <gml:Box srsName="EPSG:2180">
           <gml:coordinates>270402.262648,513533.146094 274208.294687,520016.170300</gml:coordinates>
       </gml:Box>
   </gml:boundedBy>
   <gml:featureMember>
       <ms:punkty_adresowe>
           <gml:boundedBy>
               <gml:Box srsName="EPSG:2180">
                   <gml:coordinates>274208.294687,513533.146094 274208.294687,513533.146094</gml:coordinates>
               </gml:Box>
           </gml:boundedBy>
           <ms:msGeometry>
               <gml:Point srsName="EPSG:2180">
                   <gml:coordinates>274208.294687,513533.146094</gml:coordinates>
               </gml:Point>
           </ms:msGeometry>
           <ms:NAZWA_GMINY>mDąbrowa Górnicza</ms:NAZWA_GMINY>
           <ms:ID_GMINY>246501</ms:ID_GMINY>
           <ms:NAZWA_MIEJSCOWOSCI>Dąbrowa Górnicza</ms:NAZWA_MIEJSCOWOSCI>
           <ms:ID_MIEJSCOWOSCI>0939473</ms:ID_MIEJSCOWOSCI>
           <ms:NAZWA_ULICY> Korzeniec</ms:NAZWA_ULICY>
           <ms:ID_ULICY>09402</ms:ID_ULICY>
           <ms:NUMER_PORZADKOWY>34E</ms:NUMER_PORZADKOWY>
           <ms:KOD_POCZTOWY>41-300</ms:KOD_POCZTOWY>
           <ms:DATA>2021-08-24</ms:DATA>
           <ms:ID_IIP>PL.ZIPIN.4267.EMUiA.52b745ac-c599-400e-9dbb-bd4b6b53415e</ms:ID_IIP>
       </ms:punkty_adresowe>
   </gml:featureMember>
   <gml:featureMember>
       <ms:punkty_adresowe>
           <gml:boundedBy>
               <gml:Box srsName="EPSG:2180">
                   <gml:coordinates>270402.262648,520016.170300 270402.262648,520016.170300</gml:coordinates>
               </gml:Box>
           </gml:boundedBy>
           <ms:msGeometry>
               <gml:Point srsName="EPSG:2180">
                   <gml:coordinates>270402.262648,520016.170300</gml:coordinates>
               </gml:Point>
           </ms:msGeometry>
           <ms:NAZWA_GMINY>mDąbrowa Górnicza</ms:NAZWA_GMINY>
           <ms:ID_GMINY>246501</ms:ID_GMINY>
           <ms:NAZWA_MIEJSCOWOSCI>Dąbrowa Górnicza</ms:NAZWA_MIEJSCOWOSCI>
           <ms:ID_MIEJSCOWOSCI>0939473</ms:ID_MIEJSCOWOSCI>
           <ms:NAZWA_ULICY> Szałasowizna</ms:NAZWA_ULICY>
           <ms:ID_ULICY>21740</ms:ID_ULICY>
           <ms:NUMER_PORZADKOWY>33G</ms:NUMER_PORZADKOWY>
           <ms:KOD_POCZTOWY>41-300</ms:KOD_POCZTOWY>
           <ms:DATA>2022-07-26</ms:DATA>
           <ms:ID_IIP>PL.ZIPIN.4267.EMUiA.7edbc4bd-2521-407f-89d0-ad7adcfec91a</ms:ID_IIP>
       </ms:punkty_adresowe>
   </gml:featureMember>
   <gml:featureMember>
       <ms:punkty_adresowe>
           <gml:boundedBy>
               <gml:Box srsName="EPSG:2180">
                   <gml:coordinates>272184.929063,517149.064688 272184.929063,517149.064688</gml:coordinates>
               </gml:Box>
           </gml:boundedBy>
           <ms:msGeometry>
               <gml:Point srsName="EPSG:2180">
                   <gml:coordinates>272184.929063,517149.064688</gml:coordinates>
               </gml:Point>
           </ms:msGeometry>
           <ms:NAZWA_GMINY>mDąbrowa Górnicza</ms:NAZWA_GMINY>
           <ms:ID_GMINY>246501</ms:ID_GMINY>
           <ms:NAZWA_MIEJSCOWOSCI>Dąbrowa Górnicza</ms:NAZWA_MIEJSCOWOSCI>
           <ms:ID_MIEJSCOWOSCI>0939473</ms:ID_MIEJSCOWOSCI>
           <ms:NAZWA_ULICY> Oddziału AK Ordona</ms:NAZWA_ULICY>
           <ms:ID_ULICY>54110</ms:ID_ULICY>
           <ms:NUMER_PORZADKOWY>356</ms:NUMER_PORZADKOWY>
           <ms:KOD_POCZTOWY>42-530</ms:KOD_POCZTOWY>
           <ms:DATA>2022-06-29</ms:DATA>
           <ms:ID_IIP>PL.ZIPIN.4267.EMUiA.4ea92a15-7b96-44c9-b622-d79ff2d34f26</ms:ID_IIP>
       </ms:punkty_adresowe>
   </gml:featureMember>
</wfs:FeatureCollection>

