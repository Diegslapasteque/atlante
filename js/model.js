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
    // background: null,
    // objects: [],

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
            M.PLAYER_X,
            M.PLAYER_Y,
            M.PLAYER_WIDTH,
            M.PLAYER_HEIGHT,
        );
    },

    initValues() {
        // player
        M.PLAYER_WIDTH = ASSETS[M.PLAYER_TYPE].width*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_HEIGHT = ASSETS[M.PLAYER_TYPE].height*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_X = M.GAME_WIDTH/2 - M.PLAYER_WIDTH / 2;
        M.PLAYER_Y = M.GAME_HEIGHT - M.GAME_HEIGHT*0.1;
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

    getCollisionSide: function(staticObj, movingObj) {
        let dw, dh, vx, vy;

        // Calculate the distance between the 2 objects
        vx = (staticObj.xColli+staticObj.width/2)-(movingObj.xColli+movingObj.widthColli/2);
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
                    return ((vy>0) ? M.COLLISION_TOP : M.COLLISION_BOTTOM);
                }
                else {
                    return ((vx>0) ? M.COLLISION_LEFT : M.COLLISION_RIGHT);
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
        if(!M.up && M.down){
            dirY = 1;
            M.player.look = M.player.looks.LOOK_DOWN;
        }
        // Left
        if(M.left && !M.right){
            dirX = -1;
            M.player.look = M.player.looks.LOOK_LEFT;
        }
        // Right
        if(!M.left && M.right){
            dirX = 1;
            M.player.look = M.player.looks.LOOK_RIGHT;
        }

        // Pas de déplacement axe horizontal
        if(!M.left && !M.right){
            dirX = 0;
        }
        // Pas de déplacement axe vertical
        if(!M.up && !M.down){
            dirY = 0;
        }

        // On applique le déplacement au player
        M.player.move(dirX, dirY);
    },

    update() {
        M.updatePlayerPosition();
    }
};
