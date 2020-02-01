var M = {
// Properties
    // Configuration
    FPS: 30,
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

    // Game objects
    player: null,
    background: null,
    tiles: [],
    pnj: [],

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
        M.mapTileSize = Math.min( Math.round(M.GAME_HEIGHT / M.map.length), Math.round(M.GAME_WIDTH / M.map[0].length) ) - 1;
        M.mapWidth = M.map[0].length * M.mapTileSize;
        M.mapHeight = M.map.length * M.mapTileSize;

        for (let row=0; row<M.map.length; row++) {
            for (let col=0; col<M.map[0].length; col++) {
                let tile = new Asset(M.map[row][col], col*M.mapTileSize, row*M.mapTileSize, M.mapTileSize, M.mapTileSize);
                M.tiles.push(tile);
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

    handleCollision: function(staticObj, movingObj) {
        let dw, dh, vx, vy;

        // Calculate the distance between the 2 objects
        vx = (staticObj.xColli+staticObj.widthColli/2)-(movingObj.xColli+movingObj.widthColli/2);
        vy = (staticObj.yColli+staticObj.heightColli/2)-(movingObj.yColli+movingObj.heightColli/2);

        // Minimal distance before the collision
        dw = staticObj.widthColli/2 + movingObj.widthColli/2;
        dh = staticObj.heightColli/2 + movingObj.heightColli/2;

        if (Math.abs(vx) < dw) {
            if(Math.abs(vy) < dh){
                // Collision!
                let overlapX = dw - Math.abs(vx);
                let overlapY = dh - Math.abs(vy);

                if (overlapX >= overlapY) {
                    if (vy > 0) {
                        staticObj.y = staticObj.y + overlapY;
                        return M.COLLISION_TOP;
                    } else {
                        staticObj.y = staticObj.y - overlapY;
                        return M.COLLISION_BOTTOM;
                    }
                } else {
                    if (vx > 0) {
                        staticObj.x = staticObj.x + overlapX;
                        return M.COLLISION_LEFT;
                    } else {
                        staticObj.x = staticObj.x - overlapX;
                        return M.COLLISION_RIGHT;
                    }
                }
            }
        }

        return false;
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

    isPlayerCollision() {
        for (let i=0; i<M.tiles.length; i++) {


            if(M.tiles[i].haveCollision === true && M.handleCollision(M.player, M.tiles[i]) !== false) {
                return true;
            }
        }
    },

    update() {
        // Player
        M.updatePlayerPosition();
        M.isPlayerCollision();
    }
};
