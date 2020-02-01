var C = {
// Properties
    previousDelta: 0,


// Methods
    start() {
        C.gameLoop();
    },

    resetGameLoop() {
        M.gameState = M.PLAYING;
        M.gameTime =0;
        C.gameLoop();
    },

    gameLoop(currentDelta) {
        // Manage the game animation frame
        M.gameAnimationFrame = window.requestAnimationFrame(C.gameLoop);
        if(M.canPlayGameloop() === false) { return; }


        switch (M.gameState) {
            case M.INIT:
                V.init();
                M.init();
                C.calcObjectsToLoad();
                V.bindEvents();
                M.gameState = M.LOADING;
                break;

            case M.LOADING:
                if(M.objectsToLoad === 0) {
                    M.gameState = M.PLAYING;
                }
                console.log('Loading...');
                break;

            case M.PLAYING:
                M.update();
                C.render();
                if(M.gameTime > 50){M.gameState = M.OVER}
                else{M.gameTime+=1;}
                break;

            case M.OVER:
                V.renderEndOfTHeDay(M.pnjs);
                cancelAnimationFrame(M.gameAnimationFrame);
                break;
        }


        C.previousDelta = currentDelta;
    },

    render() {
        // On efface le canvas
        V.clearView();

        // Rendu de l'arrière-plan
        V.drawBackground();

        M.tiles.forEach(V.drawObject);

        // Rendu du joueur
        V.drawAnimatedObject(M.player);
    },

    calcObjectsToLoad() {
        // Equal to all the sounds (M.SOUNDS_SOURCES.length)
        M.objectsToLoad = Object.keys(M.SOUNDS_SOURCES).length;
    },

    objectLoaded() {
        M.objectsLoaded++;
        if(M.objectsLoaded === M.objectsToLoad) {
            M.gameState = M.PLAYING;
        }
    },

    // Events handler
    handler_keydown(event) {
        switch(event.key) {
            case "ArrowLeft":
                M.left = true;
                break;
            case 'ArrowRight':
                M.right = true;
                break;
            case 'ArrowUp':
                M.up = true;
                break;
            case 'ArrowDown':
                M.down = true;
                break;
        }
    },

    handler_keyup(event) {
        switch(event.key) {
            case "ArrowLeft":
                M.left = false;
                break;
            case 'ArrowRight':
                M.right = false;
                break;
            case 'ArrowUp':
                M.up = false;
                break;
            case 'ArrowDown':
                M.down = false;
                break;
        }
    },

    // Getters
    getGameSize() {
        return {
            WIDTH: M.GAME_WIDTH,
            HEIGHT: M.GAME_HEIGHT
        };
    },
};
