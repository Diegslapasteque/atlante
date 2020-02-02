var V = {
// Properties
    canvas: null,
    context: null,


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
            `3:01`;
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
        V.context.fillStyle = "#232323";
        V.context.fillRect(0, 0, V.canvas.width, V.canvas.height);
    },

    renderCityInfluence(influence) {
        document.querySelector("#influence").style.width = influence+"%";
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

    renderErrorRecipe(msg){
        document.querySelector('#recipe-info').innerHTML = msg;
        setTimeout(function () {
            document.querySelector('#recipe-info').innerHTML = "";
        },2000)
    },

    renderBook(objects) {
        var recipies = document.querySelector('#book');
        var potionRecipies = document.querySelector("#Potions-recipes");
        var runesRecipies = document.querySelector("#Runes-recipes");
        var scrollsRecipies = document.querySelector("#Parchemins-recipes");
        potionRecipies.innerHTML = "";
        runesRecipies.innerHTML = "";
        scrollsRecipies.innerHTML = "";

        recipies.classList.add('active');
        Object.entries(objects).forEach(recipiestype => {
            var objectType = document.querySelector("#"+recipiestype[0]+"-recipes");
            Object.entries(recipiestype[1]).forEach(recipe => {
                var object = document.createElement('li')
                var objectTitle = document.createElement('p');
                objectTitle.innerText = recipe[0]+" => \n"
                var objectRecipe = document.createElement('p');
                objectRecipe.innerText = recipe[1].recipe;
                var objectEffect = document.createElement('p');
                objectEffect.innerText = recipe[1].effect;
                object.appendChild(objectTitle);
                object.appendChild(objectRecipe);
                object.appendChild(objectEffect);
                objectType.appendChild(object);
            });

        });
        document.querySelector('#quit-book').addEventListener('click',function(event){
            recipies.classList.remove('active');
        })
    },


    startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = V.checkSecond((timeArray[1] - 1));
        if(s==59){m=m-1}
        if(m<0){
            V.renderEndOfTHeDay(M.pnjs);
        }else{
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
