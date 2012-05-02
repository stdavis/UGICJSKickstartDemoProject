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

function init() {
	// sets up the app
	console.log('init fired');
}