class Asset {
    constructor(type, x, y, width, height) {
        this._x = Math.round(x);
        this._y = Math.round(y);
        this._width = Math.round(width);
        this._height = Math.round(height);

        this._xColli = Math.round(x);
        this._yColli = Math.round(y);
        this._widthColli = Math.round(width);
        this._heightColli = Math.round(height);

        if(Array.isArray(ASSETS[type].sprites)) {
            this._sprites = [];
            ASSETS[type].sprites.forEach((sprite) => {
                let image = new Image();
                image.src = sprite;
                this._sprites.push(image);
            });
        }

        if(typeof ASSETS[type].haveCollision !== "undefined") {
            this._haveCollision = ASSETS[type].haveCollision;
        }

        this._frameIndex = 0;
        this._frameSpeed = 0.25;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get xColli() {
        return this._xColli;
    }

    get yColli() {
        return this._yColli;
    }

    get widthColli() {
        return this._widthColli;
    }

    get heightColli() {
        return this._heightColli;
    }

    set xColli(value) {
        this._xColli = value;
    }

    set yColli(value) {
        this._yColli = value;
    }

    get frameIndex() {
        return this._frameIndex;
    }

    set frameIndex(value) {
        this._frameIndex = value;
    }

    get frameSpeed() {
        return this._frameSpeed;
    }

    set frameSpeed(value) {
        this._frameSpeed = value;
    }

    get sprites() {
        return this._sprites;
    }

    set sprites(value) {
        this._sprites = value;
    }

    get haveCollision() {
        return this._haveCollision;
    }

    updateAnimation() {
        this.frameIndex += this.frameSpeed;
        if(this.frameIndex >= this.sprites.length) {
            this.frameIndex = 0;
        }
    }
}

class MoveAsset extends Asset {
    constructor(type, x, y, width, height, speed) {
        super(type, x, y, width, height);

        this._speed = speed;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    move(moveX, moveY) {
        this.x += moveX*this.speed;
        this.y += moveY*this.speed;

        this.xColli = this.x;
        this.yColli = this.y;
    }
}

class Player extends MoveAsset {
    constructor(type, x, y, width, height, speed) {
        super(type, x, y, width, height, speed);

        this._sprites = {};
        for (let [look, sprites] of Object.entries(ASSETS[type].sprites)) {
            let images = [];
            sprites = sprites.forEach( (sprite) => {
                let image = new Image();
                image.src = sprite;
                images.push(image);
            });
            this._sprites[look] = images;
        }

        this._looks = {
            LOOK_DOWN: "down",
            LOOK_UP: "up",
            LOOK_LEFT: "left",
            LOOK_RIGHT: "right"
        };

        this._look = this._looks.LOOK_DOWN;
    }

    get frameIndex() {
        return this._frameIndex;
    }

    set frameIndex(value) {
        this._frameIndex = value;
    }

    get frameSpeed() {
        return this._frameSpeed;
    }

    set frameSpeed(value) {
        this._frameSpeed = value;
    }

    get looks() {
        return this._looks;
    }

    get look() {
        return this._look;
    }

    set look(value) {
        this._look = value;
    }
}
