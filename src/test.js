import $ from 'jquery';
/* global ILITEAPI */
const iMapLite = (function () {

    let iLA = window.ILITEAPI;
    var bindMsgEvts = false, iframe = null;
    if (!ILITEAPI) {
        console.error('ILITEAPI niezdefiniowane!');
        return;
    }

    /**
     * Główny moduł imapLiteApi który jest rozszerzony o dodatkowe funkcje po dodaniu do strony pliku imapLiteApi-coreEx.js oraz podpięciu plugina clusterLayer
     * @global
     * @namespace
     *  z imapLiteApi-coreEx
     */
   

    //#region public methods

    /**
     * Powiększa mapę w zależności od typu przekazanego parametru do obszaru lub wskazanych obiektów
     * @name zoomTo
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {Object} obj - można podać obiekt typy extent: {xmin, xmax, ymin, ymax, spatialReference:{wkid}}, lub słownik z identyfikatorami obiektów do ktorych będzie wykonane przybliżenie: {layerId:[id1,id2,id3], layerId2:[id1,id2]}
     * @tutorial zoomTo
     * @example <caption>Przykładowy obiekt z zasięgiem przekazywany do funkcji</caption>
     * { 
     *      "xmin": 638902.2299711781,  
     *      "ymin": 490423.72377461987,  
     *      "xmax": 640050.5239344328,  
     *      "ymax": 491019.0374652472,  
     *      "spatialReference": {    
     *          "wkid": 2180  
     *      }
     * }
     * @example <caption>Przykładowy obiekt z identyfikatorami obiektów przekazywany do fukcji</caption>
     * {
     *      "4028fb474d675639014d6c20cf4a000f":[
     *          123,
     *          234
     *      ],
     *      "4028fb474d675639014d6c20cf4a0000":[
     *          11
     *      ]
     * }
     */
    iLA.zoomTo = function (obj) {
        sendMessage(_createMessageObj("zoomTo", obj));
    };
    /**
     * Dla danego obiektu na wybranej warstwie wyświetla okno z dymkiem i informacja o obiekcie
     * @name showPopup
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator wastwy
     * @param {Int} id - identyfikator obiektu w warstwie layerId
     * @tutorial showPopup
     */
    iLA.showPopup = function (layerId, id) {
        sendMessage(_createMessageObj("showPopup", { layerId: layerId, id: id }));
    };

    /**
     * Podświetla obiekt na wybranej warstwie
     * @name flash
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String|Object} layerIdOrObj - identyfikator wastwy lub obiekt ze współrzędnymi
     * @param {Float} layerIdOrObj.x - współrzędna x 
     * @param {Float} layerIdOrObj.y - współrzędna x 
     * @param {Int} [id] - identyfikator obiektu w warstwie layerId, podajemy tylko jeśli podawaliśmy layerId w poprzednim parametrze
     * @param {int} delay - opóźnienie w ms podświetlenia
     * @tutorial flash
     */
    iLA.flash = function (layerIdOrObj, id, delay) {
        sendMessage(_createMessageObj("flash", { layerIdOrObj: layerIdOrObj, id: id, delay: delay }));
    };

    /**
     * Zwraca listę widocznych obiektów na ekranie nadaje sie do pobierania danych klastrowanych po stronie użytkownika
     * @name getVisibleIds
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {ILITEAPI~getVisibleIdsCallback} callback - funkcja która w 1 paramterze będzie miała słownik gdzie kluczem będzie identyfikator warstwy a wartością będzie lista identyfikatorów obiektów z tej warstwy
     * @tutorial getVisibleIds
     */
    iLA.getVisibleIds = function (callback) {
        _addCallbackHander(_createMessageObj("getVisibleIds", null), "onGetVisibleIds_callback", callback);
    };

    /**
     * Funkcja zwrotna z 1 parametrem wywoływana w funkcji getVisibleIds
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @callback ILITEAPI~getVisibleIdsCallback
     * @param {Object} result - słownik z obiektami widocznymi na ekranie, gdzie kluczem jest identyfikator warstwy a wartością jest lista identyfikatorów obiektów z tej warstwy
     */


	/**
     * Zwraca listę widocznych obiektów na ekranie oraz jesli dla warstwy było ustawione klastrowanie serwerowe zwraca również dane
     * @name getVisibleIds
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {bool} showClusters - określa czy w zwracanych danych maja być widoczne całe dane czy dane zklastrowane (tak jak widać je na mapie). Dla warstwy z klastrowaniem serwerowym zawsze zwracane są dane klastrowane
     * @param {ILITEAPI~getVisibleDataCallback} callback - funkcja która w 1 paramterze będzie miała obiekt ktory posiada klucz ids które jest słownikiem gdzie kluczem będzie identyfikator warstwy a wartością będzie lista identyfikatorów obiektów z tej warstwy, drugim kluczem zwracanego obiketu jest data, który jest słownikem z danymi - dla warstwy klastrowanej serwerowo
     */
    iLA.getVisibleData = function (showClusters, callback) {
    	_addCallbackHander(_createMessageObj("getVisibleData", showClusters), "onGetVisibleData_callback", callback);
    };

	
    /**
     * Funkcja do pobierania aktualnego zasięgu mapy podawanego w układzie współrzędnym mapy np: 2180
     * @name getExtent
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {ILITEAPI~getExtentCallback} callback - funkcja która w 1 parametrze będzie miała przekazany zasięg mapy
     * @tutorial getExtent
     */
    iLA.getExtent = function (callback) {
    	_addCallbackHander(_createMessageObj('getExtent', null), 'onGetExtent_callback', callback);
    };
	/**
	 * Fukcja do pobierania akutalnego środka mapy podawane w układzie w układzie współrzędnym mapy np: 2180
	 * @name getCenter
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {function} callback - funkcja która w 1 parametrze będzie miała przekazany środek mapy jako 2 elementową tablicę
	 */
    iLA.getCenter = function (callback) {
    	_addCallbackHander(_createMessageObj('getCenter', null), 'onGetCenter_callback', callback);
    };
	/**
	 * Fukcja do pobierania aktualnej skali mapy
	 * @name getScale
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {function} callback - funkcja która w 1 parametrze będzie miała przekazaną skalę mapy
	 */
    iLA.getScale = function (callback) {
    	_addCallbackHander(_createMessageObj('getScale', null), 'onGetScale_callback', callback);
    };
	/**
	 * Fukcja do pobierania akutalnego środka mapy podawane w układzie w układzie współrzędnym mapy np: 2180 oraz skali mapy
	 * @name getCenterAndScale
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {function} callback - funkcja która w 1 parametrze będzie miała przekazany obiekt ze środekiem mapy jako 2 elementową tablicę oraz skalę
	 */
    iLA.getCenterAndScale = function (callback) {
    	_addCallbackHander(_createMessageObj('getCenterAndScale', null), 'onGetCenterAndScale_callback', callback);
    };

    /**
     * Funkcja zwrotna z 1 parametrem zawierajacym aktualny zasięg mapy
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @callback ILITEAPI~getExtentCallback
     * @param {Object} extent - obiekt z zasięgiem mapy
     * @param {Float} extent.xmin - współrzędna x
     * @param {Float} extent.xmax - współrzędna x
     * @param {Float} extent.ymin - współrzędna y
     * @param {Float} extent.ymax - współrzędna y
     * @param {Object} extent.spatialReference - obiekt odzworowania
     * @param {Int} extent.spatialReference.wkid - identyfikator odwzorowania (Well Known ID)
     */

    /**
     * Funkcja włączajaca/wyłączająca generowanie zdarzenia onClick na warstwie. Pozwala na podpięcie własnej obsługi podpowiedzi.
     * @name setEnableCustomClick
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator warstwy
     * @param {Bool} state - stan wł/wył zdarzenia click na warstwie
     */
    iLA.setEnableCustomClick = function (layerId, state) {
        sendMessage(_createMessageObj("setEnableCustomClick", { layerId: layerId, state: state }));
    };

	/**
     * Funkcja ustawiająca filtrowanie dla danej warstwy
     * @name setFilterForLayer
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator warstwy
     * @param {Object} filter - obiekt z wartościami filtra typu {op:"eq", args:[10], field: "typ"}
     * dostępne operatory to:
     * eq - 'field == args',
     * neq - 'field != args',
     * lt - 'field < args',
     * lte - 'field <= args',
     * gt - 'field > args',
     * gte - 'field >= args',
     * in - 'field in (args)',
     * nin - 'field not in (args),
     * startsWith - 'field startsWith (args)',
     * endsWith - 'field endsWith (args)',
     * constains - 'field contains (args)',
     * bAnd - 'field & (args)' - binary operator,
     * bOr - 'field | (args)' - binary operator,
     */
    iLA.setFilterForLayer = function (layerId, filter, redraw) {
    	sendMessage(_createMessageObj("setFilterForLayer", { layerId: layerId, filter: filter, redraw: redraw }));
    }

    /**
     * Funkcja pobierająca filtrowanie dla warstw
     * @name getFilters
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     */
    iLA.getFilters = function (callback) {
        _addCallbackHander(_createMessageObj('getFilters', null), 'onGetFilters_callback', callback);
    }

    /**
     * Dodaje do warstwy nowy obiekt
     * @name add
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function 
     * @param {String} layerId - identyfikator warstwy
     * @param {Object} obj - obiekt do dodania
     * @param {Object} obj.geometry - geometria obiektu {x,y}
     * @param {Object} obj.attributes - atrybuty obiektu {nazwa:wartość, nazwa:wartość}
     */
    iLA.add = function (layerId, obj) {
        sendMessage(_createMessageObj("add", { layerId: layerId, obj: obj }));
    };

    /**
     * Usuwa obiekt o podanym identyfikatorze z podenej warstwy
     * @name remove
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator warstwy
     * @param {Int} id - identyfikator obiektu
     */
    iLA.remove = function (layerId, id) {
        sendMessage(_createMessageObj("remove", { layerId: layerId, id: id }));
    };

    /**
     * Aktualizuje obiekt o podanym identyfikatorze z podenej warstwy
     * @name update
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator warstwy
     * @param {Int} id - identyfikator obiektu
     * @param {Object} newObject - nowy obiekt
     * @param {Object} newObject.geometry - geometria obiektu
     * @param {Float} newObject.geometry.x - współrzędna x
     * @param {Float} newObject.geometry.y - współrzędna y
     * @param {Object} newObject.attributes - atrybuty obiektu w postaci słownika {nazwa:wartość, nazwa:wartość}
     */
    iLA.update = function (layerId, id, newObject) {
        sendMessage(_createMessageObj("update", { layerId: layerId, id: id, newObject: newObject }));
    };

    /**
     * Wymusza przerysowanie podanej warstwy
     * @name redraw
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - identyfikator warstwy
     */
    iLA.redraw = function (layerId) {
        sendMessage(_createMessageObj("redraw", layerId));
    };

    /**
     * Dodaje warstwę do mapy
     * @name addLayer
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {Object} cfg - obiekt zawierający wszystie dane potrzebne do wyświetlenia warstwy
     * @param {String} cfg.id - identyfikator warstwy do dodania
     * @param {String} cfg.name - nazwa warstwy (np: na legendzie czy na liście)
     * @param {Object} cfg.data - dane warswy 
     * @param {Object} cfg.data.geometry - geometria obiektu
     * @param {Float} cfg.data.geometry.x - współrzędna x
     * @param {Float} cfg.data.geometry.y - współrzędna y
     * @param {Object} cfg.data.attributes - atrybuty obiektu w postaci słownika {nazwa:wartość, nazwa:wartość}
     * @param {String} cfg.idField - nazwa pola które będzie służyc jako identyfiaktor obiektów
     * @param {JSON} cfg.renderer - renderer służący do rysowania danych na mapie
     * @param {JSON} cfg.clusterRenderer - renderer służący do rysowania danych klastrowanych na mapie
     * @param {Int} [cfg.groupDistance=100] - maksymalna odległość pomiędzy obiektami na ekranie w pikselach która skutkuje grupowaniem tych obiektów
     * @param {Int} [cfg.maxClusterScale=100000] - maksymalna skala do której będzie działało klastrowanie
     * @param {String} [cfg.groupAttribute] - Nazwa pola po którym dodatkowo przy klastrowaniu bedzie odbywało się grupowanie (np: nazwa województwa, wtedy przy dostatecznie małej skali na mapie bedzie po 1 klastrze dla każdego województwa)
     * @param {Int} [cfg.popupTemplate] - szablon okna pokazwyanego po kliknięciu na obiekt
     * @tutorial addLayer
     */
    iLA.addLayer = function (cfg) {
        sendMessage(_createMessageObj("addLayer", cfg));
    };

    /**
     * Usuwa warstwę z mapy
     * @name removeLayer
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} layerId - guid warstwy do usunięcia
     */
    iLA.removeLayer = function(layerId) {
        sendMessage(_createMessageObj("removeLayer", layerId));
    };

    /**
     * Pozwala na zmanę wczejśniej dodanego renderera
     * @name changeRenderer
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {Object} cfg - obiekt z danymi
     * @param {String} cfg.layerId - identyfikator warstwy
     * @param {JSON} cfg.renderer - renderer służący do rysowania danych na mapie
     * @param {JSON} cfg.clusterRenderer - renderer służący do rysowania danych klastrowanych na mapie
     */
    iLA.changeRenderer = function (cfg) {
        sendMessage(_createMessageObj("changeRenderer", cfg));
    };

    /**
     * Funkcja do przeszukwania pełnotekstowego danych dodanych do mapy
     * @name searchUserData
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} searchStr - szukany tekst
     * @param {ILITEAPI~searchUserDataCallback} callback - funkcja z wynikami wyszukania
     * @tutorial searchUserData
     */
    
    /**
     * Funkcja zwrotna z 1 parametrem zawierajacym aktualny zasięg mapy
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @callback ILITEAPI~searchUserDataCallback
     * @param {Object} result - słownik ze znalezionymi obiektami w formacie {layerId:[objectId, objectId], layerId:[objectId,objectId]}
     * @param {String} result.key - identyfikator warstwy
     * @param {Array} result.value - lista identyfikatorów obiektów z danej warstwy
     */

    /**
     * Pozwala na podpięcie nowego modułu do mapy
     * Wymaga podpięcia pluginu addService
     * @name addMapModule
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {Object} cfg - konfiguracja nowego modułu
     * @param {String} cfg.id - identyfikator nowego modułu
     * @param {String} cfg.label - nazwa nowego modułu widoczna na liście
     * @param {Array} cfg.mapservices - lista serwisów do dodania do mapy (zobacz funkcję addMapService)
     * @param {callback} callback - funkcja wywoływana po dodaniu modułu do mapy z 1 parametrem
     * @tutorial addMapModule
     */
    iLA.addMapModule = function (cfg, callback) {
        //sendMessage(_createMessageObj('addService', cfg));
        _addCallbackHander(_createMessageObj('addMapModule', cfg), 'onAddMapModule_callback', callback);
    };

    /**
     * Pozwala na dodanie do istniejącego modułu nowego serwisu mapowego
     * Wymaga podpięcia pluginu addService
     * @name addMapService
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {Object} cfg - konfiguracja nowego serwisu
     * @param {String} cfg.id - identyfikator modułu do którego dodany bedzie serwis
     * @param {Object} cfg.mapService - konfiguracja serwisu do dodania
     * @param {String} cfg.mapService.mapId - identyfiaktor serwisu
     * @param {Int} cfg.mapService.index - indeks serwisu w module
     * @param {Bool} [cfg.mapService.visible] - czy serwis ma być widoczny
     * @param {Float} [cfg.mapService.alpha] - przezroczystość serwisu
     * @param {String} cfg.mapService.type - typ serwisu: [titled, dynamic, WMS]
     * @param {String} cfg.mapService.serviceUrl - adres serwisu
     * @param {Int} [cfg.mapService.minScale] - minimalna skala przy której wyświetla się serwis
     * @param {Int} [cfg.mapService.maxScale] - maksymalna skala przy której wyświetla się skala
     * @param {callback} callback - funkcja wywoływana po dodaniu modułu do mapy z 1 parametrem
     */
    iLA.addMapService = function (cfg, callback) {
        _addCallbackHander(_createMessageObj('addMapService', cfg), 'onAddMapService_callback', callback);
    };

	/**
     * Pozwala na pobranie listy aktulanych modułów mapowych
     * Wymaga podpięcia pluginu addService
     * @name getMapModules
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {callback} callback - funkcja z wynikową listą dostępnych modułów w formacie [{id, name}, ...]
	 */
    iLA.getMapModules = function (callback) {
    	_addCallbackHander(_createMessageObj('getMapModules', null), 'onGetMapModules_callback', callback);
    }

	/**
	 * Usuwa wybrany moduł z listy dostępnych modułów i odświeża mapę 
	 * Wymaga podpięcia pluginu addService
	 * @name removeMapModule
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
     * @param {String} id - identyfikator modułu do usunięcia
	 * @param {callback} callback - funkcja z wynikową listą dostępnych modułów w formacie [{id, name}, ...]
	 */
    iLA.removeMapModule = function (id, callback) {
    	_addCallbackHander(_createMessageObj('removeMapModule', id), 'onRemoveMapModule_callback', callback);
    }

	/**
	 * Ustawia przekazany moduł jako aktywny i odświeża mapę 
	 * Wymaga podpięcia pluginu addService
	 * @name setMapModule
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
     * @param {String} id - identyfikator modułu
	 * @param {callback} callback - funkcja z wynikiem operacji
	 */
    iLA.setMapModule = function (id, callback) {
    	_addCallbackHander(_createMessageObj('setMapModule', id), 'onSetMapModule_callback', callback);
    }


	/**
	 * Wyświetla okno z zakładkami przestrzennymi
	 * Wymaga podpięcia pluginu bookmarks
	 * @name showBookmarksWindow
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 */
    iLA.showBookmarksWindow = function () {
    	sendMessage(_createMessageObj("showBookmarks"));
    }


    /**
     * Wyświetla na mapie kompozycję o danym id
     * @name loadComposition
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} id - identyfikator kompozycji do załadowania
     * @param {Object} options - dodatkowe parametry
     * @param {bool} [options.ignoreExtent=false] - czy po wyczytaniu danych pomijać parametr extent ustawiony w metadanych 
     * @param {Object} [options.filter] - domyślny filtr ustawiony na starcie
     * @param {Array} [options.filter.layerId] - format zapisu wartości - [{op:string, field:string, args:[]}]
     * @param {Number} [options.refreshInterval] - częstotliwość odświeżania danych w sekundach
     */
    iLA.loadComposition = function (id, options) {
    	var o = options || {};
    	o.compositionId = id;
    	sendMessage(_createMessageObj("loadComposition", o));
    };

    /**
     * Wyświetla na mapie kompozycję o danym id oraz wraca dane tej kompozycji
     * @name loadCompositionWithCallback
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} id - identyfikator kompozycji do załadowania
     * @param {callback} callback - funkcja wywoływana po załadowniu kompozycji z 1 parametrem z danymi kompozycji
     * @param {Object} options - dodatkowe parametry
     * @param {Object} [options.initialExtent] -  początkowy extent mapy
     * @param {Number} options.initialExtent.xmin 
     * @param {Number} options.initialExtent.ymin
     * @param {Number} options.initialExtent.xmax
     * @param {Number} options.initialExtent.xmax
     * @param {Object} options.initialExtent.spatialReference
     * @param {Number} options.initialExtent.spatialReference.wkid - well-known ID
     * @param {bool} [options.ignoreExtent=false] - czy po wyczytaniu danych pomijać parametr extent ustawiony w metadanych 
     * @param {Object} [options.filter] - domyślny filtr ustawiony na starcie
     * @param {Array} [options.filter.layerId] - format zapisu wartości - [{op:string, field:string, args:[]}]
     * @param {Number} [options.refreshInterval] - częstotliwość odświeżania danych w sekundach
     * @param {Object} [options.layers] - słownik gdzie kluczem jest identyfikator warstwy a wartością obiekt {popupTemplate: '...', listTemplate: '...', editTemplate: '...'} - pozwala na nadpisywanie szablonów zdefiniowanych w edytorze kompozycji
     */
    iLA.loadCompositionWithCallback = function(id, callback, options) {
    	var o = options || {};
    	o.compositionId = id;
        _addCallbackHander(_createMessageObj('loadCompositionWithCallback', o), 'onLoadCompositionWithCallback_callback', callback);
    };

    /**
     * pobiera typ dostępu dla kompozycji
     * @name getShareType
     * @function
     * @param {String} id - identyfikator kompozycji
     * @param {callback} callback - funkcja zwracająca typ dostępu [NONE, READ, WRITE, OWNER]
    */
    iLA.getShareType = function (id, callback) {
        _addCallbackHander(_createMessageObj('getShareType', id), 'onGetShareType_callback', callback);
    }

	/**
	 * pobiera dane uzytkownika przypisane w sekcji Udostępnianie -> dane użytkownika
	 * @name getUserData
     * @function
     * @param {String} id - identyfikator kompozycji dla której chcemy pobrac dane użytkownika
     * @param {callback} callback - funkcja zwracająca dane w 1 parametrze
	 */
    iLA.getUserData = function (id, callback) {
    	_addCallbackHander(_createMessageObj('getUserData', id), 'onGetUserData_callback', callback);
    };

    /**
     * Pobiera konfigurację oraz dane dla zadanej kompozycji
     * @name getComposition
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} id - identyfikator kompozycji do pobrania
     * @param {ILITEAPI~getCompositionCallback} callback - funkcja zwrotna z danymi kompozycji
     */
    iLA.getComposition = function (id, callback) {
        _addCallbackHander(_createMessageObj('getComposition', id), 'onGetComposition_callback', callback);
    };
    /**
     * Funkcja zwrotna z 1 parametrem zawierajacym konfigurację oraz dane kompozycji
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @callback ILITEAPI~getCompositionCallback
     * @param {Object} result
     * @param {String} result.meta - konfiguracja kompozycji
     * @param {Bool} result.meta.sharePublic - czy kompozycja jest publiczna czy nie
     * @param {JSON} result.meta.initialExtent - początkowy zasięg dla kompozycji
     * @param {Array} result.meta.layers - tablica z konfuguracją warstw (zobacz funkcję addLayer)
     * @param {Array} result.data.data - słownik z danymi kompozycji
     */

    /**
     * Zwraca listę dostępnych kompozycji dla aktualnie zalogowanego użytkownika
     * @name getCompositionList
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {ILITEAPI~getCompositionListCallback} callback - funkcja zwrotna zawierająca listę kompozycji
     */
    iLA.getCompositionList = function (callback) {
        _addCallbackHander(_createMessageObj('getCompositionList'), 'onGetCompositionList_callback', callback);
    };

    /**
     * Funckja zwrotna z 1 parametrem zawierająca listę dostępnych kompozycji
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @callback ILITEAPI~getCompositionListCallback
     * @param {Array} result - lista obiektów z danymi kompozycji
     */


    /**
     * Dodaje nowy obiekt do warstwy, włacznie z zapisaniem go do bazy
     * @name addObject
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} compositionId - identyfikator kompozycji
     * @param {String} layerId - identyfikator warstwy
     * @param {Object} newObject - obiekt do zapisania
     * @param {callback} callback - funkcja zwrotna wywoływana po zapisaniu obiektu do bazy z wynikami
     */
    iLA.addObject = function (compositionId, layerId, newObject, callback) {
        console.log('addObject', compositionId, layerId, newObject);
        _addCallbackHander(_createMessageObj('addObject', { compositionId: compositionId, layerId: layerId, newObject: newObject }), 'onAddObject_callback', callback);
    };

	/**
	 * Dodaje nowe obiekty do warstwy, włacznie z zapisaniem ich do bazy
	 * @name addObjects
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {String} compositionId - identyfikator kompozycji
	 * @param {String} layerId - identyfikator warstwy
	 * @param {Array} newObjects - tablica obiektów do zapisania
	 * @param {callback} callback - funkcja zwrotna wywoływana po zapisaniu obiektów do bazy z wynikami
	 */
    iLA.addObjects = function (compositionId, layerId, newObjects, callback) {
        _addCallbackHander(_createMessageObj('addObjects', { compositionId: compositionId, layerId: layerId, newObjects: newObjects }), 'onAddObjects_callback', callback);
    };

	/**
	 * Dodaje nowy obiekt do warstwy, włacznie z zapisaniem go do bazy, funkcja może być wykonana tylko jeśli w kompozycji jest zaznaczona funkcja "publiczne dodawanie" 
	 * wtedy uzytkownik bez żadnych uprawnień może dodawać obiekty
	 * @name publicAddObject
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {String} compositionId - identyfikator kompozycji
	 * @param {String} layerId - identyfikator warstwy
	 * @param {Object} newObject - obiekt do zapisania
	 * @param {callback} callback - funkcja zwrotna wywoływana po zapisaniu obiektu do bazy z wynikami
	 */
	iLA.publicAddObject = function (compositionId, layerId, newObject, callback) {
    	_addCallbackHander(_createMessageObj('publicAddObject', { compositionId: compositionId, layerId: layerId, newObject: newObject }), 'onPublicAddObject_callback', callback);
	}

	/**
	 * Zwraca czas ostatniego dodania obiektu dla wybranej kompozycji z IP użytkownika (pobranego z request)
	 * @name lastAdd
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {String} compositionId - identyfikator kompozycji
	 * @param {callback} callback - funkcja zwrotna w której zwracany jest czas ostatniego dodania obiektu dla IP użytkownika (pobranego z request)
	 */
    iLA.lastAdd = function (compositionId, callback) {
    	_addCallbackHander(_createMessageObj('lastAdd', { compositionId: compositionId }), 'onLastAdd_callback', callback);
    }
    /**
     * Aktualizuje obiekt w warswie, włacznie z zapisaniem go do bazy
     * @name updateObject
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} compositionId - identyfikator kompozycji
     * @param {String} layerId - identyfikator warstwy
     * @param {Object} updatedObject - obiekt do zaktualizowania
     * @param {callback} callback - funkcja zwrotna wywoływana po zaktualizowaniu obiektu do bazy z wynikami
     */
    iLA.updateObject = function (compositionId, layerId, updatedObject, callback) {
        _addCallbackHander(_createMessageObj('updateObject', { compositionId: compositionId, layerId: layerId, updatedObject: updatedObject }), 'onUpdateObject_callback', callback);
    };
    iLA.updateObjects = function (compositionId, layerId, updatedObjects, callback) {
        _addCallbackHander(_createMessageObj('updateObjects', { compositionId: compositionId, layerId: layerId, updatedObjects: updatedObjects }), 'onUpdateObjects_callback', callback);
    };

    iLA.createLayerInComposition = function (compositionId, layerDefinition, callback) {
        _addCallbackHander(_createMessageObj('createLayerInComposition', { compositionId: compositionId, layerDefinition: layerDefinition }), 'onCreateLayerInComposition_callback', callback);
    };
    iLA.updateComposition = function (composition, callback) {
        _addCallbackHander(_createMessageObj('updateComposition', composition), 'onUpdateComposition_callback', callback);
    };

    iLA.updateCompositionAddLayersAndData = function (compositionId, data, callback) {
        _addCallbackHander(_createMessageObj('updateCompositionAddLayersAndData', { compositionId: compositionId, data: data }), 'onUpdateCompositionAddLayersAndData_callback', callback);
    };


    /**
     * Usuwa obiekt z warswy, włacznie z usunięciem go do bazy
     * @name deleteObject
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} compositionId - identyfikator kompozycji
     * @param {String} layerId - identyfikator warstwy
     * @param {Object} objectId - identyfikator obiekt do usunięcia
     * @param {callback} callback - funkcja zwrotna wywoływana po usunięciu obiektu z bazy z wynikami
     */
    iLA.deleteObject = function (compositionId, layerId, objectId, callback) {
        _addCallbackHander(_createMessageObj('deleteObject', { compositionId: compositionId, layerId: layerId, objectId: objectId }), 'onDeleteObject_callback', callback);
    };

    iLA.getDataServiceURL = function (callback) {
        _addCallbackHander(_createMessageObj('getDataServiceURL'), 'onGetDataServiceURL_callback', callback);
    };

    iLA.getAttachmentsList = function (compositionId, layerId, objectId, callback) {
        _addCallbackHander(_createMessageObj('getAttachmentsList', { compositionId: compositionId, layerId: layerId, objectId: objectId }), 'onGetAttachmentsList_callback', callback);
    };

    iLA.getAttachmentURL = function (id, callback) {
        _addCallbackHander(_createMessageObj('getAttachmentURL', id), 'onGetAttachmentURL_callback', callback);
    };

    iLA.getAttachmentPreviewURL = function (id, callback) {
        _addCallbackHander(_createMessageObj('getAttachmentPreviewURL', id), 'onGetAttachmentPreviewURL_callback', callback);
    };

    iLA.storeAttachments = function(files, callback){
        var onURLCallback = function(url){
            var formData = new FormData();
			files.forEach(function (file) {
                formData.append('files', file);
			});
            $.ajax({type: 'POST', url: url, data: formData, cache: false, contentType: false, processData: false} )
                .done(function(result){
                    if(callback)
                        callback(result)
                })
                .fail(function(result){
                    if(callback)
                        callback(null);
                });
        };
        _addCallbackHander(_createMessageObj('getStoreAttachmentsURL', files), 'onGetStoreAttachmentsURL_callback', onURLCallback);
    };

    iLA.addAttachments = function(compositionId, layerId, objectId, attachments, callback){
        if(attachments instanceof Array && attachments.length > 0){
            _addCallbackHander(_createMessageObj('addAttachments', { compositionId: compositionId, layerId: layerId, objectId: objectId, attachments: attachments }), 'onAddAttachments_callback', callback);
        }else{
            callback();
        }
    };


	/**
     * Pobiera rozmiar mapy (w iFrame)
     * @name getMapSize
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {callback} callback - funkcja zwrotna z rozmiarem mapy w 1 parametrze
	 */
    iLA.getMapSize = function (callback) {
    	_addCallbackHander(_createMessageObj('getMapSize'), 'onGetMapSize_callback', callback);
    }


    /**
     * Ustawia kursor myszy dla mapy
     * @name setMapCursor
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     */
    iLA.setMapCursor = function (cursor) {
        sendMessage(_createMessageObj("setMapCursor", cursor || 'default'));
    }

    /**
     * Funkcja pozwalająca na pobranie wartości parametru pobranego z aktualnego adresu URL
     * @name getParameterByName 
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} name - nazwa parametru
     * @returns {String} wartość parametru
     */
    iLA.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

	/**
	 * Funkcja zwracająca parametr 'e' - extent przekazany w parametrach queryString
	 * @name getQueryExtent 
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru e
	 */
    iLA.getQueryExtent = function () {
    	var queryExtent = iLA.getParameterByName('e');
    	if (queryExtent) {
    		try {
    			queryExtent = JSON.parse(queryExtent);
    		} catch (err) {
    			queryExtent = null;
    		}
    	}
    	return queryExtent;
    }
	/**
	 * Funkcja zwracająca parametr 'ce' - center przekazany w parametrach queryString
	 * @name getQueryCenter
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru ce
	 */
    iLA.getQueryCenter = function () {
    	var center = iLA.getParameterByName('ce');
    	if (center)
    		return JSON.parse(center);
    	return null;

    }
	/**
	 * Funkcja zwracająca parametr 'sc' - scale przekazany w parametrach queryString
	 * @name getQueryScale
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru sc
	 */
    iLA.getQueryScale = function () {
    	var scale = iLA.getParameterByName('sc');
    	if (scale)
    		return JSON.parse(scale);
    	return null;
    }
	/**
	 * Funkcja zwracająca parametr 'cesc' - center i scale przekazany w parametrach queryString
	 * @name getQueryCenterAndScale
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru cesc
	 */
    iLA.getQueryCenterAndScale = function () {
    	return iLA.getParameterByName('cesc');
    }
	/**
	 * Funkcja zwracająca parametr 'actMap' - activeMapId przekazany w parametrach queryString
	 * @name getQueryActiveMapModule 
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru actMap
	 */
    iLA.getQueryActiveMapModule = function () {
    	var activeGPMapId = iLA.getParameterByName('actMap');
    	var activeGPMaps = iLA.getQueryMapModules();
    	if (activeGPMaps.indexOf(activeGPMapId) === -1)
    		activeGPMapId = activeGPMaps[0];
    	return activeGPMapId;
    }

	/**
	 * Funkcja zwracająca parametr 'maps' - activeMaps przekazany w parametrach queryString
	 * @name getQueryMapModules 
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @returns {String} wartość parametru maps
	 */
    iLA.getQueryMapModules = function () {
    	var activeGPMaps = iLA.getParameterByName('maps')
    	if (activeGPMaps) {
    		try {
    			activeGPMaps = JSON.parse(activeGPMaps);
    		} catch (err) {
    			activeGPMaps = null;
    		}
    	}
    	return activeGPMaps || ["gp0", "gp1", "gp2", "gp3", "gp4", "gp5"];
    }

    /**
     * Funkcja pozwalająca na dodanie do strony mapy własnych styli CSS bezpośrednio z adresu url
     * @name addCustomCss
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} url - link do pliku css
     */
    iLA.addCustomCss = function (url) {
        sendMessage(_createMessageObj("addCustomCss", url));
    };

    /**
     * Funkcja pozwalająca na dodanie do strony mapy własnych styli CSS bezpośrednio poprzez paramter
     * @name addCustomStyle
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @function
     * @param {String} styleString - string zawierający style
     * @tutorial addCustomStyle
     */
    iLA.addCustomStyle = function (styleString) {
        sendMessage(_createMessageObj("addCustomStyle", styleString));
    };

	///metody z pluginu addGraphics

	/**
	 * Dodaje do mapy grafikę użytownika
	 * Wymaga podpięcia pluginu addGraphic
	 * @name addGraphic
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {Object} g - obiekt z grafiką do dodania do mapy w formacie JSON. Przykłady formatów: http://help.arcgis.com/en/arcgisserver/10.0/apis/rest/geometry.html
	 */
    iLA.addGraphic = function (g) {
        sendMessage(_createMessageObj("addGraphic", g));
    };

	/**
	 * Usuwa z mapy grafikę użytownika
	 * Wymaga podpięcia pluginu addGraphic
	 * @name clearGraphics
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 */
    iLA.clearGraphics = function(){
        sendMessage(_createMessageObj("clearGraphics"));
    }

	/**
	 * Wyświetla na mapie "spinner" z tekstem
	 * Wymaga podpięcia pluginu addGraphic
	 * @name showLoader
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 * @param {String} msg - tekst pod ikoną
	 */
    iLA.showLoader = function (msg) {
        sendMessage(_createMessageObj("showLoader", msg));
    };

	/**
	 * Ukrywa na mapie "spinner" z tekstem
	 * Wymaga podpięcia pluginu addGraphic
	 * @name hideLoader
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
	 */
    iLA.hideLoader = function () {
        sendMessage(_createMessageObj("hideLoader"));
    };

    /**
     * Jesli po usunięciu mapy z DOM i dodaniu jej ponownie nie działają zdarzenia,
     * to należy wywołać tą metodę
     * @name reinitEx
	 * @memberOf ILITEAPI z imapLiteApi-coreEx
	 * @function
     */
    iLA.reinitEx = function () {
        initEventCallbacks();
    };



    //#endregion public methods

    //#region EVENTS
    /**
     * Zdarzenie wywoływane po zmianie parametru zoom mapy
     * @name onZoom
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @event
     * @type {Object}
     */
    var zoomEvent = new Event('onZoom');

    /**
     * Zdarzenie wywoływane po zmianie zasięgu mapy
     * @name onExtentChange
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @event
    */
    var extentChangeEvent = new Event('onExtentChange');
    
    /**
     * Zdarzenie wywoływane po naciśnięciu na obiekt dodany przez użytkownika, wywoływane jeśli na danej warstwie ustawione jest setEnableCustomClick
     * @name onClick
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @event
     * @property {Object} selectedObject - kliknięty obiekt na mapie ze wszystkimi atrybitami tego obiektu
     * @property {String} selectedObject.layerId - identyfikator warstwy
    */
    var clickEvent = new Event('onClick', { selectedObject: null });

    /**
     * Zdarzenie kliknięcie na mapie (nie na obiektach dodanych do mapy)
     * @name onMapClick
     * @memberOf ILITEAPI z imapLiteApi-coreEx
     * @event
     * @property {Object} evt - parametr dodawany do 1 argumentu przekazywanego w zdarzeniu
     * @property {Object} evt.mapPoint - punkt kliknięcia na mapie (we współrzędnych mapowych)
     * @property {Object} evt.mapPoint.x - współrzędna x
     * @property {Object} evt.mapPoint.y - współrzędna y
     */
    var mapClickEvent = new Event('onMapClick', { evt: null });
    //var clickEvent = document.createEvent('Event');
	//clickEvent.initEvent('onClick', true, true);

    var mapResizeEvent = new Event('onResizeEvent', {evt: null});

    //var mouseOverEvent = new Event('onMouseOver', { evt: null });
    //var mouseOutEvent = new Event('onMouseOut', { evt: null });
    
    var initEventCallbacks = function () {
        var eventsInterval = setInterval(function () {
            if (iLA && iLA.icfg && iLA.icfg.callbacks) {
                clearInterval(eventsInterval);
                iLA.icfg.callbacks['onSelected_callback'] = onSelected;
                iLA.icfg.callbacks['onZoom_callback'] = function () { $(iLA).trigger(zoomEvent) };
                iLA.icfg.callbacks['onExtentChange_callback'] = function () { $(iLA).trigger(extentChangeEvent) };
                iLA.icfg.callbacks['onMapClick_callback'] = function (evt) {mapClickEvent.evt = evt; $(iLA).trigger(mapClickEvent)};
                //iLA.icfg.callbacks['onMouseOver_callback'] = function (evt) { mouseOverEvent.evt = evt; $(iLA).trigger(mouseOverEvent) };
                //iLA.icfg.callbacks['onMouseOut_callback'] = function (evt) { mouseOutEvent.evt = evt; $(iLA).trigger(mouseOutEvent) };
                iLA.icfg.callbacks['onMapResizeEvent_callback'] = function (evt) { mapResizeEvent.evt = evt; $(iLA).trigger(mapResizeEvent) };
            }
        }, 250);
    };

    initEventCallbacks();

    function onSelected(selObject) {
        clickEvent.selectedObject = selObject;
        $(iLA).trigger(clickEvent);
        //iLA.dispatchEvent(clickEvent);
    };

    //#endregion EVENTS

    //#region private methods
    function _createMessageObj(name, args) {
        return {
            "fname": name,
            "arguments": args
        }
    }

    function _addCallbackHander(initMessageObj, callbackName, callback) {
        bindMessageEvents();
        var interval = setInterval(function () {
            if (iLA && iLA.icfg && iLA.icfg.callbacks) {
                clearInterval(interval);
                iLA.icfg.callbacks[callbackName] = callback;
                if (initMessageObj)
                    sendMessage(initMessageObj);
            }
        }, 250);
    };

    //#endregion private methods

    /**
     * wysyła zapytanie do iframe json - to json z opcjami zapytanie, jednak
     * jest wysylany jako string
     */
    function sendMessage(json) {
        iframe = document.getElementById('ifrm');
        console.log(iframe);
        var wnd = iframe.contentWindow;
        var msg = JSON.stringify(json, function (key, val) {
            if (typeof val === 'function') {
                return val + '';
            }
            return val;
        });
        var host = getImapLiteHost();
        console.log("imap_lite_api -> postMessage", msg, host);
        return wnd.postMessage(msg, host);
    }

    function receiveMessage(event) {
    };
    /**
     * podpiecie sie pod zdarzenie wysłania wiadomości na poczatku sprawdza czy
     * podpiecie sie juz odbylo
     */
    function bindMessageEvents() {
        if (!bindMsgEvts) {
            //console.log("imap_lite_api_EX -> bindMessageEvents");
            if (window.addEventListener) {
                window.addEventListener('message', receiveMessage, false);
            } else if (window.attachEvent) {
                window.attachEvent('onmessage', receiveMessage);
            }
            bindMsgEvts = true;
        } else {
            //console.log("imap_lite_api_EX -> zabindowano już zdarzenia!");
        }
    };

    /**
     * podpiecie sie pod zdarzenie wysłania wiadomości
     */
    function unbindMessageEvents() {
        bindMsgEvts = false;

        try {
            if (window.addEventListener) {
                window.removeEventListener('message', receiveMessage, false);
            } else if (window.attachEvent) {
                window.detachEvent('message', receiveMessage);
            }
        } catch (err) {

        }
    };

    /**
     * zwraca host aplikacji imapLite z iframe
    */
    function getImapLiteHost() {
        try {
            var local = iframe.src.split("/");
            local.pop();
            local = local.join("/");
            return local;
        } catch (err) {

        }
        return "";
    }

    function getSourceWndHost(wnd, host) {
        try {
            var local = wnd.location.protocol + "//";
            var local2 = wnd.location.host;
            local2 += wnd.location.pathname;
            var pops = local2.split("/");
            pops.pop();
            return local + pops.join("/");
        } catch (err) {

        }
        // jeśli uruchamiamylokalnie, to wnd.sorurce może byc pusty wtedy
        // umozliwiamy komunikacje
        return "";
    }
    return iLA;
})()
export default iMapLite;