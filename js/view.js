var V = {
// Properties
    canvas: null,
    context: null,
    assets: null,
    ASSETS_SOURCE: 'assets/assets.png',


// Methods
    init() {
        V.canvas = document.querySelector('#game');
        V.context = V.canvas.getContext('2d');

        V.canvas.width = C.getGameSize().WIDTH;
        V.canvas.height = C.getGameSize().HEIGHT;

        V.context.imageSmoothingEnabled = false;

        V.assets = new Image();
        V.assets.onload = function() {
            C.objectLoaded();
        };
        V.assets.src = V.ASSETS_SOURCE;
    },

    bindEvents() {
        window.addEventListener('keydown', C.handler_keydown);
        window.addEventListener('keyup', C.handler_keyup);
    },

    clearView() {
        V.context.clearRect(0, 0, V.canvas.width, V.canvas.height);
    },

    drawImage(obj) {
        V.context.drawImage(
            V.assets,
            obj.sX,
            obj.sY,
            obj.sWidth,
            obj.sHeight,
            obj.x,
            obj.y,
            obj.width,
            obj.height
        );
    },
};
