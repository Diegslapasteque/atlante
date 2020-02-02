var C = {
// Properties
    previousDelta: 0,
    TIME_BEFORE_END_OF_DAY : 50,


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
                M.init();
                V.init();
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
            case M.READING:
                M.update();
                C.render();
                break;

            case M.OVER:
                V.renderEndOfTHeDay(M.pnjsInfos);
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

        // Rendu des tiles d'interaction
        M.tilesInteraction.forEach(V.drawObject);
        if (M.tile_selected != null){
            V.drawSelectedTile(M.tile_selected);
        }

        M.tiles.forEach(V.drawObject);

        // Rendu du joueur
        V.drawAnimatedObject(M.player);

        M.visiblePnjs.forEach(V.drawAnimatedObject);
    },

    calcObjectsToLoad() {
        // Equal to all the sounds (M.SOUNDS_SOURCES.length)
        M.objectsToLoad = Object.keys(M.SOUNDS_SOURCES).length;
    },


    refuseQuest(pnj, questTag) {
        M.gameState = M.PLAYING;
        questTag.querySelector('#quest-container').style.display = 'none';
        pnj.look = pnj.looks.LOOK_DOWN;
        pnj.waiting = false;
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
            case ' ':
                M.space = true;
                break;
            case 'Escape':
                document.querySelector('#inventory-container').classList.remove('active');
                document.querySelector('#book-container').classList.remove('active');
                Array.from(document.querySelector('#quest-container').children).forEach(child => {
                    child.style.display = 'none'
                });
                M.gameState = M.PLAYING;
                break;
            case 'i':
                V.renderInventory(M.player_inventory,M.player_quests_objects);
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
            case ' ':
                M.space = false;
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
