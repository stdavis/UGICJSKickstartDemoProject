console.log('hello');
// comments are lines of text that are not executed

var baseUrl = 'http://mapserv.utah.gov/arcgis/rest/services/';

var urls = {
    hro2012: baseUrl + 'AerialPhotography_Color/HRO2012Color6Inch_4Band/ImageServer',
    hro2009: baseUrl + 'AerialPhotography_Color/HRO2009_Color1Foot/ImageServer',
    uao2003: baseUrl + 'AerialPhotography_Color/UAO2003_Color1Foot/ImageServer',
    doq1990: baseUrl + 'AerialPhotography_BlackWhite/DOQ1990s_1Meter/ImageServer'
};

function init() {
    // sets up the app
    console.log('init fired');

    var map = esri.Map('map');

    var hro2012Lyr = new esri.layers.ArcGISImageServiceLayer(urls.hro2012);
    var hro2009Lyr = new esri.layers.ArcGISImageServiceLayer(urls.hro2009);
    var uao2003Lyr = new esri.layers.ArcGISImageServiceLayer(urls.uao2003);
    var doq1990Lyr = new esri.layers.ArcGISImageServiceLayer(urls.doq1990);

    map.addLayer(hro2012Lyr);
}

dojo.ready(init);