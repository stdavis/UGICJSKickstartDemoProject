console.log('hello');
// comments provide helpful information to make your code easier
// for others (including your future self) to understand

// this is a variable set to point at a string
var baseUrl = 'http://mapserv.utah.gov/ArcGIS/rest/services/Imagery/';

// this is a variable set to point at an object
var urls = {
	naip2011: baseUrl + 'UtahImagery-NAIP2011-4Band/ImageServer',
	naip2009: baseUrl + 'UtahImagery-NAIP2009/ImageServer',
	naip2006: baseUrl + 'UtahImagery-NAIP2006/ImageServer',
	hro2006: baseUrl + 'UtahImagery-NAIP2006/ImageServer'
};

var layers = {
	naip2011: null,
	naip2009: null,
	naip2006: null,
	hro2006: null
};

var map;
var currentLayer;
var identify;

function init() {
	// sets up the app
	console.log('init fired');

	map = new esri.Map('map');

	var iParams = new esri.layers.ImageServiceParameters();
	iParams.bandIds = [0, 1, 2];

	layers.naip2011 = new esri.layers.ArcGISImageServiceLayer(urls.naip2011, {
		imageServiceParameters: iParams
	});
	map.addLayer(layers.naip2011);
	currentLayer = layers.naip2011;

	layers.naip2009 = new esri.layers.ArcGISImageServiceLayer(urls.naip2009, {
		imageServiceParameters: iParams,
		visible: false
	});
	map.addLayer(layers.naip2009);

	layers.naip2006 = new esri.layers.ArcGISImageServiceLayer(urls.naip2006, {
		imageServiceParameters: iParams,
		visible: false
	});
	map.addLayer(layers.naip2006);

	layers.hro2006 = new esri.layers.ArcGISImageServiceLayer(urls.hro2006, {
		imageServiceParameters: iParams,
		visible: false
	});
	map.addLayer(layers.hro2006);

	wireEvents();

	identify = new IdentifyTiles();
}

function wireEvents() {
	console.log('wireEvents fired');

	dojo.query("input[type='radio']").onclick(onRadioClicked);
}

function onRadioClicked(evt) {
	console.log('onRadioClicked fired', arguments);

	currentLayer.hide();

	currentLayer = layers[evt.target.value];

	currentLayer.show();

	identify.switchCurrentLayer(evt.target.value);
}

dojo.addOnLoad(init);