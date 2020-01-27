var C = {
// Properties
    previousDelta: 0,


// Methods
    start() {
        C.gameLoop();
    },

    gameLoop(currentDelta) {
        // Manage the game animation frame
        M.gameAnimationFrame = window.requestAnimationFrame(C.gameLoop);
        let delta = currentDelta - C.previousDelta;
        if (M.FPS && delta < 1000 / M.FPS) { return; }


        switch (M.gameState) {
            case M.INIT:
                V.init();
                M.init();
                C.calcObjectsToLoad();
                V.bindEvents();
                M.gameState = M.LOADING;
                break;

            case M.LOADING:
                console.log('Loading...');
                break;

            case M.PLAYING:
                M.update();
                C.render();
                break;

            case M.OVER:
                alert('La partie est terminée');
                cancelAnimationFrame(M.gameAnimationFrame);
                break;
        }


        C.previousDelta = currentDelta;
    },

    render() {
        // On efface le canvas
        V.clearView();

        // Rendu de l'arrière-plan
        V.drawImage(M.background);

        // Rendu du joueur
        V.drawImage(M.player);

        // M.objects.forEach(V.drawImage);
    },

    calcObjectsToLoad() {
        // Equal to all the sounds (M.SOUNDS_SOURCES.length) + assets (1 board)
        M.objectsToLoad = Object.keys(M.SOUNDS_SOURCES).length + 1;
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
        }
    },

    // Getters
    getGameSize() {
        return {
            WIDTH: M.GAME_WIDTH,
            HEIGHT: M.GAME_HEIGHT
        };
    }
};
