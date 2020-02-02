var V = {
// Properties
    canvas: null,
    context: null,

    seconds: 0,


// Methods
    init() {
        V.initTimer();
        V.canvas = document.querySelector('#game');
        V.context = V.canvas.getContext('2d');

        V.canvas.width = C.getGameSize().WIDTH;
        V.canvas.height = C.getGameSize().HEIGHT;

        V.context.imageSmoothingEnabled = false;
    },

    initTimer(){
        document.getElementById('timer').innerHTML =
            `3:0`;
        V.startTimer();
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
            obj.sprites[obj.look][Math.floor(obj.frameIndex)],
            obj.x,
            obj.y,
            obj.width,
            obj.height
        );
    },

    drawRect(obj) {
        V.context.fillStyle = "#130d08";
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
        V.context.fillStyle = "#3b2b3c";
        V.context.fillRect(0, 0, V.canvas.width, V.canvas.height);
    },

    renderEndOfTHeDay(pnjs) {
        var stats = document.querySelector('#end-of-the-day');
        document.querySelector("#quests").innerHTML = "";
        stats.classList.add('active');
        Object.entries(pnjs.Capricol).forEach(pnj => {
            var quest = document.createElement('li');
            if(pnj[1].actualQuests.isQuestAccomplished){
                quest.style.color = "green";
            }else{
                quest.style.color = "red";
            }
            quest.innerText = pnj[1].actualQuests.title;
            document.querySelector("#quests").appendChild(quest)
        });
        document.querySelector('#next-day').addEventListener('click',function(event){
            stats.classList.remove('active');
            V.initTimer();
            C.resetGameLoop();
        })
    },


    startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = V.checkSecond((timeArray[1] - 1));
        if(s===59){m=m-1}
        if(m<0){
            V.renderEndOfTHeDay(M.pnjs);
        }else{
            V.timer = s*m;
            M.alreadyTryingToGeneratePnj = false;
            document.getElementById('timer').innerHTML =
                m + ":" + s;
            setTimeout(V.startTimer, 1000);
        }


    },

     checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
        if (sec < 0) {sec = "59"};
        return sec;
    },
};
