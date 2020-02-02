class Asset {
    constructor(type, x, y, width, height, xColli, yColli, widthColli, heightColli) {
        this.type = type;
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.width = Math.round(width);
        this.height = Math.round(height);

        this.xColli = (xColli) ? xColli : this.x;
        this.yColli = (yColli) ? yColli : this.y;
        this.widthColli = (widthColli) ? widthColli : this.width;
        this.heightColli = (heightColli) ? heightColli : this.height;

        if(Array.isArray(ASSETS[type].sprites)) {
            this.sprites = [];
            ASSETS[type].sprites.forEach((sprite) => {
                let image = new Image();
                image.src = sprite;
                this.sprites.push(image);
            });
        }

        if(typeof ASSETS[type].haveCollision !== 'undefined') {
            this.haveCollision = ASSETS[type].haveCollision;
        }

        this.frameIndex = 0;
        this.frameSpeed = 0.125;
    }

    updateAnimation() {
        this.frameIndex += this.frameSpeed;
        if(this.frameIndex >= this.sprites.length) {
            this.frameIndex = 0;
        }
    }
}

class AssetInteraction extends Asset {
    constructor(type, x, y, width, height, xColli, yColli, widthColli, heightColli) {
        super(type, x, y, width, height, xColli, yColli, widthColli, heightColli);

        this.interaction = ASSETS[type].interaction;

        this.selected = false;
        var pointTop = {
            x: this.x+Math.round(this.width/2),
            y: this.y-Math.round(this.height/2),
        };
        var pointBottom = {
            x: this.x+Math.round(this.width/2),
            y: this.y+this.height+Math.round(this.height/2),
        };
        var pointLeft = {
            x: this.x-Math.round(this.width/2),
            y: this.y+Math.round(this.height/2),
        };
        var pointRight = {
            x: this.x+this.width+Math.round(this.width/2),
            y: this.y+Math.round(this.height/2),
        };
        this.points = [];
        this.points.push(pointTop, pointBottom, pointLeft, pointRight);
    }
}


class MoveAsset extends Asset {
    constructor(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli) {
        super(type, x, y, width, height, xColli, yColli, widthColli, heightColli);

        this.speed = speed;
    }

    move(moveX, moveY) {
        this.x += moveX*this.speed;
        this.y += moveY*this.speed;

        this.xColli = this.x;
        this.yColli = this.y+this.height/2;
    }
}

class Character extends MoveAsset {
    constructor(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli) {
        super(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli);

        this.sprites = {};
        for (let [look, sprites] of Object.entries(ASSETS[type].sprites)) {
            let images = [];
            sprites = sprites.forEach( (sprite) => {
                let image = new Image();
                image.src = sprite;
                images.push(image);
            });
            this.sprites[look] = images;
        }

        this.looks = {
            LOOK_DOWN: "down",
            LOOK_UP: "up",
            LOOK_LEFT: "left",
            LOOK_RIGHT: "right"
        };

        this.look = this.looks.LOOK_DOWN;
    }

    move(moveX, moveY) {
        this.x += moveX*this.speed;
        this.y += moveY*this.speed;

        this.xColli = this.x;
        this.yColli = this.y+this.height/2;

        if (moveX!==0 || moveY!==0) {
            this.frameIndex += this.frameSpeed;
            if (this.frameIndex >= this.sprites[this.looks.LOOK_DOWN].length) {
                this.frameIndex = 0;
            }
        }
        else {
            this.frameIndex = 0;
        }
    }
}

class Player extends Character {
    constructor(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli) {
        super(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli);
    }
}
