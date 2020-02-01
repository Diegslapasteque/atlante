var V = {
// Properties
    canvas: null,
    context: null,


// Methods
    init() {
        V.canvas = document.querySelector('#game');
        V.context = V.canvas.getContext('2d');

        V.canvas.width = C.getGameSize().WIDTH;
        V.canvas.height = C.getGameSize().HEIGHT;

        V.context.imageSmoothingEnabled = false;
    },

    bindEvents() {
        window.addEventListener('keydown', C.handler_keydown);
        window.addEventListener('keyup', C.handler_keyup);
    },

    clearView() {
        V.context.clearRect(0, 0, V.canvas.width, V.canvas.height);
    },

    drawObject(obj) {
        V.context.drawImage(
            obj.sprites[Math.round(obj.frameIndex)],
            obj.x,
            obj.y,
            obj.width,
            obj.height
        );
    },

    drawAnimatedObject(obj) {
        V.context.drawImage(
            obj.sprites[obj.look][Math.round(obj.frameIndex)],
            obj.x,
            obj.y,
            obj.width,
            obj.height
        );
    },

    drawRect(obj) {
        V.context.fillStyle = "red";
        V.context.fillRect(
            obj.x,
            obj.y,
            obj.width,
            obj.height
        );
    },

    drawSelectedTile(obj){
        V.context.fillStyle = "rgba(255, 255, 255, 0.2)";
        V.context.fillRect(obj.x, obj.y, obj.width, obj.height);
    },

    drawBackground() {
        V.context.fillStyle = "blue";
        V.context.fillRect(0, 0, V.canvas.width, V.canvas.height);
    },

    recapWorkOfTheDay(pnjs) {
        console.log(pnjs)
    }
};
