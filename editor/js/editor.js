const STATE = {
    gridX: 0,
    gridY: 0,
    // On peut changer ici certains paramètres
    columns: 10,
    rows: 6,
    current: "",
    currentId: -1,
    assets: [
        "../assets/tiles/blocfond.png", // 1
        "../assets/tiles/MurDroite.png", // 2
        "../assets/tiles/MurDroiteBottom01.png", // 3
        "../assets/tiles/MurDroiteBottom02.png", // 4
        "../assets/tiles/MurGauche.png", // 5
        "../assets/tiles/MurGaucheBottom01.png", // 6
        "../assets/tiles/MurGaucheBottom02.png", // 7
        "../assets/tiles/MurHaut01.png", // 8
        "../assets/tiles/MurHautCoinDroit.png", // 9
        "../assets/tiles/MurHautCoinGauche.png", // 10
        "../assets/tiles/MurHautMilieu.png", // 11
        "../assets/tiles/PiedPlanche.png", // 12
        "../assets/tiles/PlancheBas.png", // 13
        "../assets/tiles/PlancheBasTop.png", // 14
        "../assets/tiles/PlancheHaut.png", // 15
        "../assets/tiles/PlancheCauldron.png",// 17
        "../assets/tiles/MurHaut02.png",// 24
    ],

    hoverColor: "rgba(255, 165, 0, 0.5)",
    assetSelectedColor: "rgb(43, 113, 218)",
    columnsRowsChangedColor: "rgba(255, 165, 0, 0.5)"
};


class Plot {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }
};

class Map {
    constructor(width, height, size) {
        this.width = width;
        this.height = height;
        this.size = size;
        this.plots = [];
        this.layer = []; // Contient la carte finale à exporter
    }

    definePlots() {
        for(var y=0; y<this.height; y+=this.size) {
            var tmpPlots = [];
            var tmpLayer = [];
            for(var x=0; x<this.width; x+=this.size) {
                // On crée un plot
                var plot = new Plot(x, y, "");
                tmpPlots.push(plot);

                // On crée une case de la carte finale
                tmpLayer.push(-1);
            }
            this.plots.push(tmpPlots);
            this.layer.push(tmpLayer);
        }
    }

    import(newMap) {
        var assetsImg = Array.from(V.assetsContainer.childNodes);
        for(var i=0; i<assetsImg.length; i++) {
            if(assetsImg[i].tagName != "IMG") {
                assetsImg.splice(i, 1);
                i--;
            }
        }

        this.layer = newMap;
        this.plots = [];

        this.width = this.layer[0].length * this.size;
        this.height = this.layer.length * this.size;

        for(var y=0; y<this.height; y+=this.size) {
            var rowPlots = [];
            for(var x=0; x<this.width; x+=this.size) {
                var plot = new Plot(x, y, assetsImg[ this.layer[y/this.size][x/this.size] ]);
                rowPlots.push(plot);
            }
            this.plots.push(rowPlots);
        }
    }

    resize( newWidth, newHeight ) {
        var oldWidth = this.width;
        var oldHeight = this.height;
        this.width = newWidth;
        this.height = newHeight;

        // Si l'utilisateur réduit le nombre de lignes
        if(this.height < oldHeight) {
            var rowDestroyed = (oldHeight-this.height) / this.size;

            for(var destroy=rowDestroyed; destroy>0; destroy--) {
                this.plots.pop();
                this.layer.pop();
            }
        }
        // Sinon s'il augmente le nombre de lignes
        else if (this.height > oldHeight) {
            for(var y=oldHeight; y<this.height; y+=this.size) {
                var newRowPlots = [];
                var newRowLayer = [];
                for(var x=0; x<oldWidth; x+=this.size) {
                    // On crée un plot
                    var plot = new Plot(x, y, "");
                    newRowPlots.push(plot);

                    // On crée une case de la carte finale
                    newRowLayer.push(-1);
                }
                this.plots.push(newRowPlots);
                this.layer.push(newRowLayer);
            }
        }

        // Si l'utilisateur réduit le nombre de colonnes
        if(this.width < oldWidth) {
            var colDestroyed = (oldWidth-this.width) / this.size;
            for(var row=0; row<(this.height/this.size); row++) {
                for(var destroy=colDestroyed; destroy>0; destroy--) {
                    this.plots[row].pop();
                    this.layer[row].pop();
                }
            }
        }
        // Sinon s'il augmente le nombre de colonnes
        else if (this.width > oldWidth) {
            for(var y=0; y<this.height; y+=this.size) {
                for(var x=oldWidth; x<this.width-1; x+=this.size) {
                    // On crée un plot
                    var plot = new Plot(x, y, "");
                    this.plots[y/this.size].push(plot);

                    // On crée une case de la carte finale
                    this.layer[y/this.size].push(-1);
                }
            }
        }
    }

    getPlot( x, y ) {
        for(var i=0; i<this.plots.length; i++) {
            var plot = this.plots[i].find( (el) => {
                return el.x == x && el.y == y;
            });

            if(plot != undefined) {
                return plot;
                break;
            }
        }
    }

    changeLayerState( x, y, stateId ) {
        var cx = Math.round(x / this.size);
        var cy = Math.round(y / this.size);
        this.layer[cy][cx] = stateId;
    }

    changePlotAndLayerState(plot) {
        plot.img = STATE.current;

        this.changeLayerState( STATE.gridX, STATE.gridY, STATE.currentId );
    }
}













// ------------------- Model ---------------------------
var M = {
    GRID_SIZE: 64,
    mapWidth: null,
    mapHeight: null,
    map: null,

    defaultExportFolder: '../../js/map.js',

    init: function() {
        M.mapWidth = STATE.columns * M.GRID_SIZE;
        M.mapHeight = STATE.rows * M.GRID_SIZE;

        M.map = new Map( M.mapWidth, M.mapHeight, M.GRID_SIZE );
        M.map.definePlots();
    },

    resizeMap: function() {
        M.mapWidth = STATE.columns * M.GRID_SIZE;
        M.mapHeight = STATE.rows * M.GRID_SIZE;

        M.map.resize( M.mapWidth, M.mapHeight );
    },

    saveMousePosition: function( x, y ) {
        STATE.gridX = M.round(x);
        STATE.gridY = M.round(y);
    },

    round( number ) {
        return Math.ceil(number / M.GRID_SIZE) * M.GRID_SIZE - M.GRID_SIZE;
    },

    drawAsset: function() {
        var plot = M.map.getPlot( STATE.gridX, STATE.gridY );
        // Si l'utilisateur clique bien sur une case valide et si il a séléctionné un asset, alors on dessine
        if(plot && STATE.current != "") {
            M.map.changePlotAndLayerState(plot);
        }
    },

    eraseAsset: function() {
        var plot = M.map.getPlot( STATE.gridX, STATE.gridY );
        if (plot) {
            plot.img = "";
            M.map.changeLayerState( STATE.gridX, STATE.gridY, -1 );
        }
    },

    sendMapJSON: function( folder ) {
        if (folder == "") {
            folder = M.defaultExportFolder;
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                C.mapSended();
            }
        };
        xhr.open("POST", "php/createMapJSON.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send( "map=" + JSON.stringify(M.map.layer) + "&folder=" + folder );
    },

    importMap: function(newMap) {
        var map = JSON.parse(newMap);
        M.map.import( map );

        STATE.columns = map[0].length;
        STATE.rows = map.length;
        M.mapWidth = STATE.columns * M.GRID_SIZE;
        M.mapHeight = STATE.rows * M.GRID_SIZE;
    }
};



// ------------------- Controler ---------------------------
var C = {
    init: function() {
        M.init();
        V.init(); // Doit être initialisé après le Model
        V.resizeCanvas();
        V.createGrid(); // Création de la grille d'arrière-plan
        V.createAssets(); // Initialisation des assets à partir de leur src présentes dans le STATE

        V.bindEvents();

        C.loop();
    },

    loop: function() {
        requestAnimationFrame( C.loop );

        V.hoverMap();
        C.render();
    },

    mapSended: function() {
        V.export.button.value = "Map enregistré !";
        setTimeout(function() {
            V.export.button.value = "Exporter la map (format json)";
        }, 3000);
    },

    mouseMoveOnMap: function( ev ) {
        V.clearCanvas();

        var cx = ev.pageX - V.canvasMap.offsetLeft;
        var cy = ev.pageY - V.canvasMap.offsetTop;
        M.saveMousePosition( cx, cy );


        C.checkMouseButtons(ev.buttons);
        // C.render();
    },

    mouseDownOnMap: function(ev) {
        V.clearCanvas();

        C.checkMouseButtons(ev.buttons);
        // C.render();
    },

    checkMouseButtons: function( button ) {
        switch (button) {
            case 1: // Click gauche
                M.drawAsset();
                break;
            case 2: // Click droit
                M.eraseAsset();
                break;
        }
    },

    mouseDownOnAssets: function(ev) {
        if( ev.target.tagName == "IMG" ) {
            V.removeShadowsFromAssets();
            STATE.current = ev.target;
            STATE.currentId = parseInt( ev.target.classList[0] );
            ev.target.style.border = "4px solid " + STATE.assetSelectedColor;
        }
    },

    mouseDownOnChangeMapSize: function() {
        STATE.columns = V.add.columns.value;
        STATE.rows = V.add.rows.value;

        M.resizeMap();
        V.resizeCanvas();
        V.removeBackgrounds();
    },

    eventColumnsChanged: function(ev) {
        if(ev.target.value != STATE.columns) {
            ev.target.style.backgroundColor = STATE.columnsRowsChangedColor;
        }
        else {
            ev.target.style.backgroundColor = "white";
        }
    },

    eventRowsChanged: function(ev) {
        if(ev.target.value != STATE.rows) {
            ev.target.style.backgroundColor = STATE.columnsRowsChangedColor;
        }
        else {
            ev.target.style.backgroundColor = "white";
        }
    },

    mouseDownExportMap: function() {
        M.sendMapJSON( V.export.folder.value );
        V.export.button.value = "Chargement...";
    },

    mouseDownImportMap: function() {
        M.importMap(V.import.text.value);
        V.resizeCanvas();
    },

    changeImportMap: function() {
        var reader = new FileReader();
        reader.readAsText( V.import.file.files[0] );
        reader.addEventListener("load", function() {
            M.importMap(reader.result);
            V.resizeCanvas();
        });
    },

    render: function() {
        M.map.plots.forEach( (row) => {
            row.forEach( (plot) => {
                if(plot.img == "") { // S'il n'y a pas encore d'asset sur cet élement de la carte, on dessine un carré transparent
                    V.printNoAsset(plot);
                }
                else {
                    V.printCurrentAsset(plot);
                }
            });
        });
        V.createGrid();
    },





    // Getter
    getGridSize: function() {
        var gridSize = M.GRID_SIZE;
        return gridSize;
    },
    getMapWidth: function() {
        var width = M.mapWidth;
        return width;
    },
    getMapHeight: function() {
        var height = M.mapHeight;
        return height;
    },
    getGridSize: function() {
        var size = M.GRID_SIZE;
        return size;
    },
    getDefaultMapFolder: function() {
        var folder = M.defaultExportFolder;
        return folder;
    }
};




// ------------------- View ---------------------------
var V = {
    mapContainer: null,
    canvasMap: null,
    ctxMap: null,
    assetsContainer: null,
    add: {
        rows: null,
        columns: null,
        apply: null,
    },
    import: {
        file: null,
        text: null,
        button: null
    },
    export: {
        folder: null,
        button: null
    },

    printNoAsset: function(plot) {
        var size = C.getGridSize();
        V.ctxMap.fillStyle = "transparent";
        V.ctxMap.fillRect(plot.x, plot.y, size, size);
    },

    printCurrentAsset: function(plot) {
        var size = C.getGridSize();
        V.ctxMap.drawImage(plot.img, plot.x, plot.y, size, size);
    },

    removeShadowsFromAssets: function() {
        for(var i=0; i<V.assetsContainer.childNodes.length; i++) {
            if(V.assetsContainer.childNodes[i].tagName == "IMG") {
                V.assetsContainer.childNodes[i].style.border = "4px solid rgba(0,0,0,0)";
            }
        }
    },

    removeBackgrounds: function() {
        V.add.rows.style.backgroundColor = "white";
        V.add.columns.style.backgroundColor = "white";
    },

    clearCanvas: function() {
        V.ctxMap.clearRect(0, 0, V.canvasMap.width, V.canvasMap.height);
    },

    hoverMap: function() {
        V.ctxMap.fillStyle = STATE.hoverColor;
        V.ctxMap.fillRect( STATE.gridX, STATE.gridY, C.getGridSize(), C.getGridSize() );
    },

    bindEvents: function() {
        V.canvasMap.addEventListener("mousemove", C.mouseMoveOnMap);
        V.canvasMap.addEventListener("mousedown", C.mouseDownOnMap);
        V.assetsContainer.addEventListener("mousedown", C.mouseDownOnAssets);
        V.add.columns.addEventListener("input", C.eventColumnsChanged);
        V.add.rows.addEventListener("input", C.eventRowsChanged);
        V.add.apply.addEventListener("mousedown", C.mouseDownOnChangeMapSize);

        V.import.file.addEventListener("change", C.changeImportMap);
        V.import.button.addEventListener("mousedown", C.mouseDownImportMap)
        V.export.button.addEventListener("mousedown", C.mouseDownExportMap);

        // Désactiver le clic droit
        V.canvasMap.addEventListener("contextmenu", function(ev) {
            ev.preventDefault();
        });
    },

    createGrid: function() {
        var cols = STATE.columns;
        var rows = STATE.rows;
        var width = C.getMapWidth();
        var height = C.getMapHeight();
        var size = C.getGridSize();

        V.ctxMap.beginPath();
        for(var i=0; i<cols; i++) {
            V.ctxMap.moveTo( i*size, 0);
            V.ctxMap.lineTo( i*size, height );
            V.ctxMap.stroke();
        }

        for(var i=0; i<rows; i++) {
            V.ctxMap.moveTo( 0, i*size );
            V.ctxMap.lineTo( width, i*size );
            V.ctxMap.stroke();
        }
    },

    createAssets: function() {
        for(var i=0; i<STATE.assets.length; i++) {
            var img = document.createElement("img");
            img.classList.add(i);
            img.classList.add("assets__elements");
            img.width = 64;
            img.height = 64;
            img.src = STATE.assets[i];
            V.assetsContainer.appendChild(img);
        }
    },

    resizeCanvas: function() {
        V.canvasMap.width = C.getMapWidth();
        V.canvasMap.height = C.getMapHeight();

        V.add.rows.value = STATE.rows;
        V.add.columns.value = STATE.columns;
    },

    init: function() {
        V.canvasMap = document.querySelector('.canvasMap');
        V.ctxMap = V.canvasMap.getContext('2d');

        V.assetsContainer = document.querySelector(".assets");

        V.add.rows = document.querySelector(".addRows");
        V.add.rows.value = STATE.rows;
        V.add.columns = document.querySelector(".addColumns");
        V.add.columns.value = STATE.columns;
        V.add.apply = document.querySelector(".button__add");

        V.import.file = document.querySelector(".file__importMap");
        V.import.text = document.querySelector(".text__importMap");
        V.import.button = document.querySelector(".button__importMap");

        V.export.folder = document.querySelector(".folder__exportMap");
        V.export.folder.value = C.getDefaultMapFolder();
        V.export.button = document.querySelector(".button__exportMap");
    }
};

C.init();