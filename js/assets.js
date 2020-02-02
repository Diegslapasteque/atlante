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
            'assets/tiles/mur-b.png'
        ]
    },
    2: {
        haveCollision: true,
        sprites: [
            'assets/tiles/mur-t.png'
        ]
    },
    3: {
        haveCollision: true,
        sprites: [
            'assets/tiles/mur-l.png'
        ]
    },
    4: {
        haveCollision: true,
        sprites: [
            'assets/tiles/mur-r.png'
        ]
    },
    5: {
        haveCollision: true,
        sprites: [
            'assets/tiles/tableTrash.png'
        ]
    },
    6: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-scroll.png'
        ]
    },
    7: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-phoenix.png'
        ]
    },
    8: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-mandragor.png'
        ]
    },
    9: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-plant.png'
        ]
    },
    10: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-potion.png'
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
        haveCollision: true,
        interaction : preparePotion,
        sprites: [
            'assets/tiles/cauldronEmpty.png'
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
            'assets/tiles/table-ink1.png'
        ]
    },
    17: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-ink2.png'
        ]
    },
    18: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-ink3.png'
        ]
    },
    19: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-ink4.png'
        ]
    },
    20: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table-ink5.png'
        ]
    },
    21: {
        haveCollision: true,
        sprites: [
            'assets/tiles/table.png'
        ],
        interaction: barInteraction
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
    pnj1: {
        width: 50,
        height: 100,
        sprites: {
            up: [
                'assets/pnj1/up/2.png',
                'assets/pnj1/up/1.png',
                'assets/pnj1/up/2.png',
                'assets/pnj1/up/3.png'
            ],
            down: [
                'assets/pnj1/down/2.png',
                'assets/pnj1/down/1.png',
                'assets/pnj1/down/2.png',
                'assets/pnj1/down/3.png'
            ]
        }
    },
    pnj2: {
        width: 50,
        height: 100,
        sprites: {
            up: [
                'assets/pnj2/up/2.png',
                'assets/pnj2/up/1.png',
                'assets/pnj2/up/2.png',
                'assets/pnj2/up/3.png'
            ],
            down: [
                'assets/pnj2/down/2.png',
                'assets/pnj2/down/1.png',
                'assets/pnj2/down/2.png',
                'assets/pnj2/down/3.png'
            ]
        }
    },
    background: {
        sprites: [
            'assets/background.jpg'
        ]
    },
};
