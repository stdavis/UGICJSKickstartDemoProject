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

function init() {
    // sets up the app
    console.log('init fired');

    var map = esri.Map('map');

    layers.hro2012 = new esri.layers.ArcGISImageServiceLayer(urls.hro2012);
    layers.hro2009 = new esri.layers.ArcGISImageServiceLayer(urls.hro2009, {
        visible: false
    });
    layers.uao2003 = new esri.layers.ArcGISImageServiceLayer(urls.uao2003, {
        visible: false
    });
    layers.doq1990 = new esri.layers.ArcGISImageServiceLayer(urls.doq1990, {
        visible: false
    });

    map.addLayer(layers.hro2012);
    map.addLayer(layers.hro2009);
    map.addLayer(layers.uao2003);
    map.addLayer(layers.doq1990);

    currentLayer = layers.hro2012;

    wireEvents();
}

function wireEvents() {
    console.log('wireEvents fired');

    dojo.query("input[type='radio']").onclick(onRadioClicked);
}

function onRadioClicked(evt) {
    console.log('onRadioClicked fired');

    currentLayer.hide();

    currentLayer = layers[evt.target.value];

    currentLayer.show();
}

dojo.ready(init);