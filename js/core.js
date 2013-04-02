console.log('hello');
// comments are lines of text that are not executed

var baseUrl = 'http://mapserv.utah.gov/arcgis/rest/services/';

var urls = {
    hro2012: baseUrl + 'AerialPhotography_Color/HRO2012Color6Inch_4Band/ImageServer',
    hro2009: baseUrl + 'AerialPhotography_Color/HRO2009_Color1Foot/ImageServer',
    uao2003: baseUrl + 'AerialPhotography_Color/UAO2003_Color1Foot/ImageServer',
    doq1990: baseUrl + 'AerialPhotography_BlackWhite/DOQ1990s_1Meter/ImageServer'
};
var layers = {
    hro2012: null,
    hro2009: null,
    uao2003: null,
    doq1990: null
};
var currentLayer;
var identify;

dojo.require('dijit.form.Slider');

function init() {
    // sets up the app
    console.log('init fired');

    var map = esri.Map('map');

    layers.hro2012 = new esri.layers.ArcGISImageServiceLayer(urls.hro2012);
    layers.hro2009 = new esri.layers.ArcGISImageServiceLayer(urls.hro2009, {
        // visible: false
    });
    layers.uao2003 = new esri.layers.ArcGISImageServiceLayer(urls.uao2003, {
        // visible: false
    });
    layers.doq1990 = new esri.layers.ArcGISImageServiceLayer(urls.doq1990, {
        // visible: false
    });

    map.addLayer(layers.doq1990);
    map.addLayer(layers.uao2003);
    map.addLayer(layers.hro2009);
    map.addLayer(layers.hro2012);

    currentLayer = layers.hro2012;

    wireEvents();

    identify = new IdentifyTiles(map);
}

function wireEvents() {
    console.log('wireEvents fired');

    dojo.connect(dijit.byId('slider'), 'onChange', onSliderChange);
}

function onSliderChange(value) {
    console.log('onSliderChange fired', arguments);

    function updateLayers(bottomLayer, topLayer, opacity) {
        bottomLayer.setOpacity(1 - opacity);
        
        topLayer.setOpacity(opacity);
    }

    if (value <= 1) {
        updateLayers(layers.hro2012, layers.hro2009, value);
    } else if (value > 1 && value <= 2) {
        updateLayers(layers.hro2009, layers.uao2003, value - 1);
    } else if (value >= 2) {
        updateLayers(layers.uao2003, layers.doq1990, value - 2);
    }
}

dojo.ready(init);