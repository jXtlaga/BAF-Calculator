
window.ILITEAPI.addMapModule({
    "id": "mygp",
    "active": true,
    "label": "moja mapa",
    "mapservices": [
        {
            "mapId": "msMINI",
            "index": 1,
            "visible": true,
            "alpha": 1,
            "type": "tiled",
            "serviceUrl": "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution",
            "minScale" : 8000000,
            "maxScale" : 0
        }
    ]
}, function (e) {
    alert('Odpowiedz po dodaniu modułu: ' + e.status);
});
        
window.ILITEAPI.showMarkers([
    {
    "x":591920.9699999997, 
    "y":259048.22000000067,
    "sr":2180,
    "opts":{
        "id" : "marker1",
        "title" : "marker nr 1",
        "content" : "marker nr 1 - tresc",
        "show":true,
        "center":false
        }
    },
    {
    "x":521920.9699999997, 
    "y":239048.22000000067,
    "sr":2180,
    "opts":{
        "id" : "marker2",
        "title" : "marker nr 2",
        "content" : "marker nr 2 - tresc"
        }
    }
   ])
