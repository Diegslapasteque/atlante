var M = {
// Properties
    // Configuration
    FPS: 60,
    gameAnimationFrame: null,
    GAME_WIDTH: window.innerWidth-3,
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
    PLAYER_SPEED: 10,


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
            M.PLAYER_SPEED
        );
    },

    initValues() {
        // player
        M.PLAYER_WIDTH = ASSETS[M.PLAYER_TYPE].sWidth*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_HEIGHT = ASSETS[M.PLAYER_TYPE].sHeight*M.ASSET_SIZE_MULTIPLE;
        M.PLAYER_X = M.GAME_WIDTH/2 - (ASSETS[M.PLAYER_TYPE].sWidth*M.ASSET_SIZE_MULTIPLE) / 2;
        M.PLAYER_Y = M.GAME_HEIGHT - M.GAME_HEIGHT*0.1;
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
        vx = (staticObj.x+staticObj.width/2)-(movingObj.x+movingObj.width/2);
        vy = (staticObj.y+staticObj.height/2)-(movingObj.y+movingObj.height/2);

        // Minimal distance before the collision
        dw = staticObj.width/2 + movingObj.width/2;
        dh = staticObj.height/2 + movingObj.height/2;

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

    update() {
        // TODO
    }
};
