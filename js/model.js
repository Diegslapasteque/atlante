var M = {
// Properties
    // Configuration
    FPS: 120,
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
    READING: 5,

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
    player_inventory : [],
    player_quests_objects : [],
    background: null,
    tiles: [],
    tilesInteraction: [],
    visiblePnjs: [],
    tile_selected: null,
    questObject:null,
    quests:null,
    pnjsInfos: null,
    endDay : true,
    pnjIndex: 0,
    cityInfluence:0,

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

    proba_pnj: 1,
    PNJ_SPEED: 2,
    alreadyTryingToGeneratePnj: false,
    maxBarNumber: 5,
    currentCity: 'Capricol',


// Methods
    init() {
        // Initialize base values for the game objects
        M.initValues();

        // Preload all the sounds
        M.initSounds();

        // Player generation
        M.player = new Player(
            M.PLAYER_TYPE,
            M.PLAYER_X,
            M.PLAYER_Y,
            M.PLAYER_WIDTH,
            M.PLAYER_HEIGHT,
            M.PLAYER_SPEED,
            M.PLAYER_X,
            M.PLAYER_Y+M.PLAYER_HEIGHT/2,
            M.PLAYER_WIDTH,
            M.PLAYER_HEIGHT/2,
        );

        M.generateMap();
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
        M.questObject = {
            "Potions" : {
                'Soin': new QuestObject('Potion de soin', 1, 'Une fiole vide, une herbe médicinale', 'Soigne d\'une blessure légère'),
                'Guerison': new QuestObject('Potion de guérison', 2, 'Une fiole vide, deux herbes médicinales , une racine de mandragore', 'Soigne d\'une maladie ou blessure grave'),
                'Force': new QuestObject('Potion de force', 3, 'Une fiole vide, deux racines de mandragore, une plume de,phoenix ', 'Décuple la force'),
                'Chance': new QuestObject('Potion de chance', 4, 'Une fiole vide, trois herbes médicinales, deux racines de mandragore', 'Confère une chance incroyable'),
                'Resurection': new QuestObject('Potion de resurection', 5, 'Une fiole vide, deux herbes médicinales, deux racines de mandragore, deux plumes de phoenix ', 'Ressucite un être mort '),
            },
            "Runes" : {
                'Affutage' : new QuestObject('Rune d\'affutage',1,'Une pierre , glyphe de réparation','Restaure un équipement pas encore cassé'),
                'Reparation' : new QuestObject('Rune de répatation',2,'Une ferrite, glyphe de réparation','Répare un équipement cassé'),
                'Bijoux' : new QuestObject('Rune de réparation des bijoux',3,'Un lingot d\'or, glyphe de réparation','Répare un cristal / bijoux cassé'),
                'Divine' : new QuestObject('Rune de protection divine',4,'Un Lingot d\'or, glyphe divine','Répare et protège un equipement de la casse'),
            },
            "Parchemins" : {
                'Sommeil' : new QuestObject('Parchemin de sommeil',1,'Un parchemin, incantation de sommeil','Permet à la cible de faire de beaux rêves'),
                'Amour' : new QuestObject('Parchemin d\'amour',2,'Un parchemin, incantation de manipulation','Permet de rendre la cible amoureuse du lanceur'),
                'Persuasion' : new QuestObject('Parchemin de persuasion',3,'Un parchemin, incantation de persuasion','La cible accepte TOUS provenant du lanceur'),
                'Oublie' : new QuestObject('Parchemin d\'oublie',4,'Un parchemin, incantation de mental','La cible oublie TOUS ce que le lanceur souhaite'),
                'Competence' : new QuestObject('Parchemin de compétence accrue',5,'Un parchemin, incantation de compétence','Augmente ou diminue un trait choisi de la cible'),
            }
        };
        M.quests ={
            //IMPORTANT QUESTS
            "VilMalendrin" : new Quest('Des projets de richesses','Bonjour, mage. Je suis à la recherche d\'une magie pour soulager les problèmes de sommeil sensible.',200,M.questObject.Parchemins.Sommeil,-15),
            "VilMalendrin_2" : new Quest('Des projets de vengeance','Bon alors !!! je sais que je ne suis pas apprécié dans ce village mais ce n\'est pas une raison pour fournir des sort qui me nuisent. Vous avez intéret à me donner Un parchemin de persuasion pour que je récupère ce que ce voleur m\'a dérobé !!',500,M.questObject.Potions.Soin,-30),
            "VilMalendrin_3" : new Quest('Des projets de fuite','Je vous remercie beaucoup !!!! maintenant je suis recherché dans tous le royaume, alors qu\'il le mérité !! Il faut que j\'efface mes traces auprès du commissaire, donnez moi ce qu\'il faut !' ,0,M.questObject.Parchemins.Oublie,50),

            //RANDOM QUESTS POTION
            "Chien" : new Quest('Chien blessé','Bonjour, monsieur le magicien, pendant que je jouais avec mon chien, un méchant noble lui à donné un coup. Il a la patte cassé, je sais pas quoi faire ?   ',10,M.questObject.Potions.Soin,5),
            "ProcheMalade" : new Quest('Chat malade','Bonjour, magicien, un de mes proche est gravement malade, et j\'aurai besoin d\'une potion pour la soigner !',30,M.questObject.Potions.Guerison,5),
            "Combattant" : new Quest('Un combattant aguéri','Mage ! j\'ai besoin de plus de force ! VITEEEEE !!!!',5,M.questObject.Potions.Soin,15),
            "Novice" : new Quest('Un combattant peu aguéri','Bon...Bonjour monsieur, j... je dois bientôt partir pour le champ de bataille, mais avec ma poisse, je vais surement prendre un flèche perdu et mourir. Vous avez quelque chose.',0,M.questObject.Potions.Soin,5),
            "Chasseur" : new Quest('Un chasseur ne sachant chasser','Excusez-moi, Auriez-vous quelque-chose de très puissant, qui pourrait... par exemple... redonner la vie à quelqu\'un ?',200,M.questObject.Potions.Soin,-10),

            //RANDOM QUESTS RUNES
            "VoleurAncien" : new Quest('Trésor ancien','Bonjour, grand sorcier respectable. Je suis à la recherche d\'une runes permettant d\'embellir et de rendre cette ancien relique réutilisable ? ',300,M.questObject.Runes.Affutage,-20),
            "CombattantPeuSoigneux" : new Quest('Un combattant peu soigneux','Mage !!! , Mon épée s\'est brisée !!! faites quelque chose !!!',5,M.questObject.Runes.Reparation,15),
            "NoblesseTriste" : new Quest('Une noblesse attristé','mage... le bijoux hérité de ma défunte mère, s\'est brisé en mille morceaux... Par pitié, aidez-moi...',15,M.questObject.Runes.Bijoux,5),
            "Heros" : new Quest('Futur Héro','Bonjour à toi grand mage, j\'ai récemment acquéri cette relique magique. Mais comme vous pouvez le voir, cette épée commence à ce briser. Je recherche donc une rune me permettant de la protéger.' ,500,M.questObject.Runes.Divine,20),

            //RANDOM QUESTS PARCHEMIN
            "Sommeil" : new Quest('Un sommeil reposant','Monsieur, on m\'a conseillé de venir vous voir pour mon probléme, la nuit mon esprit est torturé et je ne peux m\'endormir...',10,M.questObject.Parchemins.Sommeil,5),
            "ChevelierDeRose" : new Quest('Roméo et Juliette','Mage !! je suis amoureux de... d\'une agricultrice, mais sa mère ne m\'accorde pas leur consentement. Auriez-vous... quelque chose pour qu\'ils m\'aiment autant que j\'aime ma dulcinée',60,M.questObject.Parchemins.Amour,5),
            "Marchand" : new Quest('Rude négociation','Bonjour, je suis moi aussi un commerçant, et je recherche quelque chose pour m\aider durant des négociations',100,M.questObject.Parchemins.Persuasion,-10),
            "SoldatSuicidaire" : new Quest('Douloureux souvenir','Mage ... Je veux tout oublier... oublier mes erreurs, et cette guerre !!! ',50,M.questObject.Parchemins.Oublie,-5),
            "PaysanPeureux" : new Quest('Un agriculteur peu motivé','B\'jour Msieur. Tout les matins j\'la flemme de t\'vailler,Vous\'riez un t\'uc pour Moi',10,M.questObject.Parchemins.Competence,15),

        };
        M.pnjsInfos = {
            "Capricol": {
                'Roywulf': new PnjInfos('Roywulf', 'Voleur', null, M.quests.VoleurAncien, 'pnj4'),
                'Elfvid': new PnjInfos('Elfvid', 'Noble', null, M.quests.NoblesseTriste, 'pnj2'),

                //IMPORTANT PNJ
                'Rogwald': new PnjInfos('Rogwald', 'Voleur', [M.quests.VilMalendrin,M.quests.VilMalendrin_3], M.quests.VilMalendrin, 'pnj1'),
                'Fastpaul': new PnjInfos('Fastpaul', 'Noble', [M.quests.Marchand,M.quests.VilMalendrin_2], M.quests.Marchand, 'pnj2'),

                //RANDOM PNJ
                'Eallett': new PnjInfos('Eallett', 'Paysanne', null, M.quests.ProcheMalade, 'pnj3'),
                'Roneal': new PnjInfos('Roneal', 'Petite fille', null, M.quests.Chien, 'pnj2'),
                'Nasba': new PnjInfos('Nasba', 'Chasseur', null, M.quests.Chasseur),
                'Evermit': new PnjInfos('Evermit', 'Soldat', null, M.quests.Combattant),
                'Muelord': new PnjInfos('Muelord', 'Soldat', null, M.quests.Novice),
                'Nadon': new PnjInfos('Nadon', 'Soldat', null, M.quests.CombattantPeuSoigneux),
                'Venred': new PnjInfos('Venred', 'Héros', null, M.quests.Heros),
                'Roe': new PnjInfos('Roe', 'Veille dame', null, M.quests.Sommeil),
                'Retvise': new PnjInfos('Retvise', 'Chevalier', null, M.quests.ChevelierDeRose),
                'Brandbard': new PnjInfos('Brandbard', 'Soldat', null, M.quests.SoldatSuicidaire),
                'Rolla': new PnjInfos('Rolla', 'Agriculteur', null, M.quests.PaysanPeureux),
            },
        };
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
            if (M.handleInteractionCollision(M.player,M.tilesInteraction[k])){
                M.tile_selected = M.tilesInteraction[k];
                if (M.space){
                    M.space = false;
                    if(M.tile_selected.interaction.name === 'barInteraction') {
                        var barNumber = M.tile_selected.x/M.mapTileSize - 1;
                        M.tile_selected.interaction(barNumber);
                    }
                    else {
                        M.tile_selected.interaction(M.tile_selected.type);
                    }
                }
            }
            if(M.tilesInteraction[k].haveCollision === true && M.handleCollision(M.player, M.tilesInteraction[k]) !== false) {
                return true;
            }
        }
    },

    updatePnjs() {
        M.visiblePnjs.forEach( (pnj) => {
            if(pnj.waiting === false) {
                pnj.move(0, -1);

                M.tilesInteraction.forEach( (tile) => {
                    if(tile.haveCollision === true && M.handleCollision(pnj, tile) !== false) {
                        pnj.frameIndex = 0;
                        pnj.waiting = true;
                    }
                });
            }
        });
    },

    spawnPnj(barNumber) {
        var type = Object.entries(M.pnjsInfos[M.currentCity])[M.pnjIndex][1].type;
        var y = M.GAME_HEIGHT;
        var height = ASSETS[type].height;

        var pnj = new Pnj(
            type,
            M.mapTileSize+M.mapTileSize*barNumber,
            y,
            ASSETS[type].width,
            height,
            M.PNJ_SPEED,
            undefined,
            y+height/2,
            undefined,
            height/2,
            Object.entries(M.pnjsInfos[M.currentCity])[M.pnjIndex],
            barNumber
        );
        pnj.look = pnj.looks.LOOK_UP;
        M.visiblePnjs.push(pnj);

        M.pnjIndex++;
    },

    tryToGeneratePnj() {
        if(V.timer%10 === 0 && M.alreadyTryingToGeneratePnj === false) {
            M.alreadyTryingToGeneratePnj = true;
            if(Math.random() < M.proba_pnj) {
                var barNumber = 0;
                M.visiblePnjs.forEach( (pnj) => {
                    barNumber = Math.max(pnj.barNumber+1, barNumber);
                });
                if(barNumber >= M.maxBarNumber) {
                    return;
                }
                M.spawnPnj(barNumber);
                M.proba_pnj = 1;
            }
            else {
                M.proba_pnj+=0.1;
            }
        }
    },

    update() {
        // Player
        if(M.gameState !== M.READING) {
            M.updatePlayerPosition();
            M.playerCollision();
        }

        // PNJ
        M.tryToGeneratePnj();
        M.updatePnjs();
    }
};
