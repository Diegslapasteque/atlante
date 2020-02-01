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
            'assets/tiles/MurDroite.png'
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
            'assets/tiles/PiedPlanche.png'
        ]
    },
    12: {
        haveCollision: true,
        sprites: [
            'assets/tiles/PlancheBas.png'
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
            'assets/tiles/PlancheHaut.png'
        ]
    },
    15: {
        haveCollision: true,

        interaction : preparePotion,

        sprites: [
            'assets/tiles/PlancheCauldron.png'
        ]
    },
    16: {
        haveCollision: true,
        sprites: [
            'assets/tiles/MurHaut02.png'
        ]
    },

    player: {
        width: 64,
        height: 96,
        sprites: {
            up: [
                'assets/player/up/1.svg'
            ],
            down: [
                'assets/player/down/1.svg'
            ],
            left: [
                'assets/player/left/1.svg'
            ],
            right: [
                'assets/player/right/1.svg'
            ]
        }
    },
    background: {
        sprites: [
            'assets/background.jpg'
        ]
    },
};
