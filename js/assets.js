const ASSETS = {
    '-1': {
        haveCollision: false,
        sprites: [
            'assets/tiles/blocfond.png'
        ]
    },
    0: {
        haveCollision: false,
        sprites: [
            'assets/tiles/blocfond.png'
        ]
    },
    1: {
        haveCollision: true,
        sprites: [
            'assets/tiles/mur.png'
        ]
    },
    2: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurDroiteBottom01.png'
        ]
    },
    3: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurDroiteBottom02.png'
        ]
    },
    4: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurGauche.png'
        ]
    },
    5: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurGaucheBottom01.png'
        ]
    },
    6: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurGaucheBottom02.png'
        ]
    },
    7: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHaut01.png'
        ]
    },
    8: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHautCoinDroit.png'
        ]
    },
    9: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHautCoinGauche.png'
        ]
    },
    10: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHautMilieu.png'
        ]
    },
    11: {
        haveCollision: false,
        sprites: [
            'assets/tiles/piedTable.png'
        ]
    },
    12: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table.png'
        ]
    },
    13: {
        haveCollision: false,
        sprites: [
            'assets/tiles/PlancheBasTop.png'
        ]
    },
    14: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table.png'
        ]
    },
    15: {
        haveCollision: true,
        interaction : preparePotion,
        sprites: [
            'assets/tiles/cauldron.png'
        ]
    },
    16: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHaut02.png'
        ]
    },
    'fioleVide-potion': {
        haveCollision: true,

        interaction : addRessourceToInventory,

        sprites: [
            'assets/tiles/PlancheCauldron.png'
        ]
    },
    'ScrollWorkshop': {
        haveCollision: true,

        interaction : prepareScroll,

        sprites: [
            'assets/tiles/PlancheCauldron.png'
        ]
    },
    'RuneWorkshop': {
        haveCollision: true,

        interaction : prepareScroll,

        sprites: [
            'assets/tiles/PlancheCauldron.png'
        ]
    },
    17:{
        haveCollision: true,

        interaction : readBookOfRecipe,

        sprites: [
            'assets/tiles/cauldron.png'
        ]
    },
    "tp":{
        haveCollision: true,

        interaction : validateQuest,

        sprites: [
            'assets/tiles/cauldron.png'
        ]
    },

    player: {
        width: 50,
        height: 100,
        sprites: {
            up: [
                'assets/player/up/2.png',
                'assets/player/up/1.png',
                'assets/player/up/2.png',
                'assets/player/up/3.png'
            ],
            down: [
                'assets/player/down/2.png',
                'assets/player/down/1.png',
                'assets/player/down/2.png',
                'assets/player/down/3.png'
            ],
            left: [
                'assets/player/left/2.png',
                'assets/player/left/1.png',
                'assets/player/left/2.png',
                'assets/player/left/3.png'
            ],
            right: [
                'assets/player/right/2.png',
                'assets/player/right/1.png',
                'assets/player/right/2.png',
                'assets/player/right/3.png'
            ]
        }
    },
    background: {
        sprites: [
            'assets/background.jpg'
        ]
    },
};
