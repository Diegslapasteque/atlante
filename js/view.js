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

    drawBackground() {
        V.context.fillStyle = "blue";
        V.context.fillRect(0, 0, V.canvas.width, V.canvas.height);
    },

    renderEndOfTHeDay(pnjs) {
        var stats = document.querySelector('#end-of-the-day');
        document.querySelector("#quests").innerHTML = "";
        stats.classList.add('active');
        Object.entries(pnjs.Capricol).forEach(pnj => {
            console.log(pnj)
            var quest = document.createElement('li');
            if(pnj[1].actualQuests.isQuestAccomplished){
                quest.style.color = "green";
            }else{
                quest.style.color = "red";
            }
            quest.innerText = pnj[1].actualQuests.title;
            console.log(quest);
            document.querySelector("#quests").appendChild(quest)
        });
        document.querySelector('#next-day').addEventListener('click',function(event){
            stats.classList.remove('active');
            C.resetGameLoop();
        })
    },


};
