var M = {
// Properties
    // Configuration
    FPS: 60,
    frameDuration: null, // milliseconds
    gameAnimationFrame: null,
    now: null,
    then: null,
    GAME_WIDTH: window.innerHeight-3,
    GAME_HEIGHT: window.innerHeight-3,

    // Loading
    objectsLoaded: 0,
    objectsToLoad: 0,

    // Game States
    gameState: 0,
    INIT: 0,
    LOADING: 1,
    MENU: 2,
    PLAYING: 3,
    OVER: 4,

    // Sons
    soundMuted: false,
    sounds: {},
    SOUNDS_SOURCES: {
        // playerJump: ['sounds/playerJump.wav', 'sounds/playerJump.mp3']
    },

    // Carte
    map: MAPS[0],
    mapWidth: 0,
    mapHeight: 0,
    mapTileSize: 0,

    // Collisions side
    COLLISION_TOP: 0,
    COLLISION_BOTTOM: 1,
    COLLISION_LEFT: 2,
    COLLISION_RIGHT: 3,

    // Controls
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,

    // Game objects
    player: null,
    background: null,
    tiles: [],
    tilesInteraction: [],
    pnj: [],
    tile_selected: null,

    // Objects base properties
    // Valeurs de base
    ASSET_SIZE_MULTIPLE: 1,
    // background
    BACKGROUND_TYPE: 'background',
    // player
    PLAYER_TYPE: 'player',
    PLAYER_X: null,
    PLAYER_Y: null,
    PLAYER_WIDTH: null,
    PLAYER_HEIGHT: null,
    PLAYER_SPEED: 3,


// Methods
    init() {
        // Initialize base values for the game objects
        M.initValues();

        // Preload all the sounds
        M.initSounds();

        // Background generation
        M.background = new Asset(M.BACKGROUND_TYPE, 0, 0, M.GAME_WIDTH, M.GAME_HEIGHT);

        // Player generation
        M.player = new Player(
            M.PLAYER_TYPE,
            M.PLAYER_X,
            M.PLAYER_Y,
            M.PLAYER_WIDTH,
            M.PLAYER_HEIGHT,
            M.PLAYER_SPEED,
        );

        M.generateMap();

        M.generatePnjs();
    },

    generatePnjs() {

    },

    generateMap() {
        M.mapTileSize = 64;
        M.GAME_WIDTH = M.map[0].length * M.mapTileSize;
        M.GAME_HEIGHT = M.map.length * M.mapTileSize;

        for (let row=0; row<M.map.length; row++) {
            for (let col=0; col<M.map[0].length; col++) {
                if(ASSETS[M.map[row][col]].interaction) {
                    M.tilesInteraction.push(new AssetInteraction(M.map[row][col], col * M.mapTileSize, row * M.mapTileSize, M.mapTileSize, M.mapTileSize));
                }
                else {
                    M.tiles.push(new Asset(M.map[row][col], col*M.mapTileSize, row*M.mapTileSize, M.mapTileSize, M.mapTileSize));
                }
            }
        }
    },

    initValues() {
        // player
        M.PLAYER_WIDTH = ASSETS[M.PLAYER_TYPE].width*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_HEIGHT = ASSETS[M.PLAYER_TYPE].height*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_X = M.GAME_WIDTH/2 - M.PLAYER_WIDTH / 2;
        M.PLAYER_Y = M.GAME_HEIGHT/2;
    },

    canPlayGameloop: function() {
        if(M.frameDuration === null) {
            M.frameDuration = 1000/M.FPS;
            M.then = Date.now();
        }

        M.now = Date.now();
        let delta = M.now - M.then;

        if(delta > M.frameDuration) {
            M.then = M.now - (delta % M.frameDuration);
            return true;
        }

        return false;
    },

    initSounds() {
        for (var [soundName, sources] of Object.entries(M.SOUNDS_SOURCES)) {
            M.sounds[soundName] = new Howl({
                src: sources,
                onload: function () {
                    C.objectLoaded();
                },
                onloaderror: function (id, message) {
                    console.log(`Error when loading ${soundName}. ${message}`)
                }
            });
        }
    },

    playSound: function(soundName) {
        if(M.soundMuted) { return; }

        var sound = M.sounds[soundName];

        if(typeof sound !== 'undefined') {
            sound.play();
        }
    },

    handleCollision: function(movingObj, staticObj) {
        let dw, dh, vx, vy;

        // Calculate the distance between the 2 objects
        vx = (movingObj.xColli+movingObj.widthColli/2)-(staticObj.xColli+staticObj.widthColli/2);
        vy = (movingObj.yColli+movingObj.heightColli/2)-(staticObj.yColli+staticObj.heightColli/2);

        // Minimal distance before the collision
        dw = movingObj.widthColli/2 + staticObj.widthColli/2;
        dh = movingObj.heightColli/2 + staticObj.heightColli/2;

        if (Math.abs(vx) < dw) {
            if(Math.abs(vy) < dh){
                // Collision!
                let overlapX = dw - Math.abs(vx);
                let overlapY = dh - Math.abs(vy);

                if (overlapX >= overlapY) {
                    if (vy > 0) {
                        movingObj.y = movingObj.y + overlapY;
                        return M.COLLISION_TOP;
                    } else {
                        movingObj.y = movingObj.y - overlapY;
                        return M.COLLISION_BOTTOM;
                    }
                } else {
                    if (vx > 0) {
                        movingObj.x = movingObj.x + overlapX;
                        return M.COLLISION_LEFT;
                    } else {
                        movingObj.x = movingObj.x - overlapX;
                        return M.COLLISION_RIGHT;
                    }
                }
            }
        }

        return false;
    },

    handleInteractionCollision(sprite, tile) {
        for(let i=0; i<tile.points.length; i++) {
            if ( (sprite.xColli + sprite.widthColli) > tile.points[i].x &&
                tile.points[i].x > sprite.xColli &&
                (sprite.yColli + sprite.heightColli) > tile.points[i].y &&
                tile.points[i].y > sprite.yColli){
                return true;
            }
        }
    },

    updatePlayerPosition() {
        // Direction
        var dirX = 0;
        var dirY = 0;

        // Up
        if(M.up && !M.down){
            dirY = -1;
            M.player.look = M.player.looks.LOOK_UP;
        }
        // Down
        else if(!M.up && M.down){
            dirY = 1;
            M.player.look = M.player.looks.LOOK_DOWN;
        }
        // Left
        else if(M.left && !M.right){
            dirX = -1;
            M.player.look = M.player.looks.LOOK_LEFT;
        }
        // Right
        else if(!M.left && M.right){
            dirX = 1;
            M.player.look = M.player.looks.LOOK_RIGHT;
        }


        // On applique le déplacement au player
        M.player.move(dirX, dirY);
    },

    playerCollision() {
        for (let i=0; i<M.tiles.length; i++) {
            if(M.tiles[i].haveCollision === true && M.handleCollision(M.player, M.tiles[i]) !== false) {
                return true;
            }
        }

        M.tile_selected = null;
        for (let k=0; k<M.tilesInteraction.length; k++){
            if(M.tilesInteraction[k].haveCollision === true) {
                M.handleCollision(M.player, M.tilesInteraction[k]);
            }
            if (M.handleInteractionCollision(M.player,M.tilesInteraction[k])){
                M.tile_selected = M.tilesInteraction[k];
                if (M.space){
                    M.space = false;
                    M.tile_selected.interaction();
                }
            }
        }
    },

    update() {
        // Player
        M.updatePlayerPosition();
        M.playerCollision();
    }
};
