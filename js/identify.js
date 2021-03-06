dojo.declare('IdentifyTiles', null, {
    // summary:
    //      In charge of querying indices layers and returning download information

    // baseUrl: String
    //      The url to the map service containing the indices layers
    baseUrl: 'http://stage.mapserv.utah.gov/ArcGIS/rest/services/Raster/MapServer',

    // layersInd: {}
    //      The indices of the layers within the map service
    layersInd: {
        hro2012: '26',
        hro2009: '20',
        uao2003: '15',
        doq1990: '8'
    },

    // fields: {}
    //      fields names
    fields: {
        PATH: 'PATH',
        TILE: 'TILE',
        EXT: 'EXT'
    },

    // qTasks: {}
    //      The query tasks associated with each layer
    qTasks: {
        hro2012: null,
        hro2009: null,
        uao2003: null,
        doq1990: null
    },

    // query: esri.tasks.Query
    query: null,

    // currentLayer: String
    currentLayer: 'hro2012',

    // symbol: esri.symbol.SimpleFillSymbol
    symbol: null,

    // downloadLink: HTML a node
    downloadLink: null,

    constructor: function(map) {
        // summary:
        //      This is the first function to fire when the object is created
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        this.buildQueryTasks();

        this.map = map;

        dojo.connect(map, 'onClick', this, 'onMapClick');

        this.symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new dojo.Color('red'), 2),
            null);

        this.downloadLink = dojo.byId('download-link');
    },
    buildQueryTasks: function() {
        // summary:
        //      Builds each of the query tasks and the query parameters object
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        this.qTasks.hro2012 = new esri.tasks.QueryTask(this.baseUrl + '/' + this.layersInd.hro2012);
        this.qTasks.hro2009 = new esri.tasks.QueryTask(this.baseUrl + '/' + this.layersInd.hro2009);
        this.qTasks.uao2003 = new esri.tasks.QueryTask(this.baseUrl + '/' + this.layersInd.uao2003);
        this.qTasks.doq1990 = new esri.tasks.QueryTask(this.baseUrl + '/' + this.layersInd.doq1990);

        this.query = new esri.tasks.Query();
        this.query.returnGeometry = true;
        this.query.outFields = [this.fields.PATH, this.fields.TILE, this.fields.EXT];
    },
    switchCurrentLayer: function(layer) {
        // summary:
        //      Switches the current layer so that the correct query task is fired when
        //      the map is clicked
        // layer: String e.g. hro2012
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        this.currentLayer = layer;
    },
    onMapClick: function(evt) {
        // summary:
        //      Fires when the user clicks on the map. Sets the geometry and fires the query task
        // evt: Map Click Event
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        this.map.graphics.clear();
        this.setDownloadLink('');

        this.query.geometry = evt.mapPoint;

        this.qTasks[this.currentLayer].execute(this.query, 
            dojo.hitch(this, this.onQueryTaskComplete), 
            dojo.hitch(this, this.onQueryTaskError));
    },
    onQueryTaskComplete: function(fSet) {
        // summary:
        //      Fires when the query task is returned successful from the server
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        if (fSet.features.length > 0) {
            var g = fSet.features[0]; // get first graphic returned
            g.setSymbol(this.symbol);
            this.map.graphics.add(g);
            var url = g.attributes[this.fields.PATH] + g.attributes[this.fields.TILE] +
                g.attributes[this.fields.EXT];
            this.setDownloadLink(url);
        } else {
            console.warning('no feature found.');
        }
    },
    onQueryTaskError: function(er) {
        // summary:
        //      Fires when the query task returns an error from the server
        // er: Error
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        console.error('there was an error returned from the query task!', er);
    },
    setDownloadLink: function(url) {
        // summary:
        //      Sets the download link innerHTML and href
        // url: String
        console.info(this.declaredClass + "::" + arguments.callee.nom, arguments);

        this.downloadLink.href = url;
        this.downloadLink.innerHTML = url;
    }
});