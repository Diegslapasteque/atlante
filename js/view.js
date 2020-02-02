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
            `3:03`;
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

    renderCityInfluence(influence) {
        document.querySelector("#influence").style.width = influence+"%";
    },

    renderEndOfTHeDay(pnjs) {
        var stats = document.querySelector('#end-of-the-day');
        document.querySelector("#quests").innerHTML = "";
        stats.classList.add('active');
        Object.entries(pnjs[M.currentCity]).forEach(pnj => {
            var quest = document.createElement('li');
            if(pnj[1].actualQuests.isQuestAccomplished){
                quest.style.color = "green";
            }else{
                quest.style.color = "red";
            }
            quest.innerText = pnj[1].actualQuests.title;
            document.querySelector("#quests").appendChild(quest)
        });

        document.querySelector('#next-day').style.cursor = "pointer";
        document.querySelector('#next-day').addEventListener('click',function(event){
            stats.classList.remove('active');
            V.initTimer();
            C.resetGameLoop();
        })
    },

    renderErrorRecipe(msg){
        var message = document.querySelector('#recipe-info');
        message.innerHTML = msg;
        message.classList.add('active');
        setTimeout(function () {
            message.classList.remove('active');
        },4000)
    },


    renderInventory(playerInventory, playerQuestsObjects) {
        var inventory = document.querySelector('#inventory');
        var invRess = document.querySelector("#inv-ress");
        var invObj = document.querySelector("#inv-obj");
        var allRessources ={};
        invRess.innerHTML = "";
        invObj.innerHTML = "";



        document.querySelector('#inventory-container').classList.add('active');
        Object.entries(playerInventory).forEach(ressources => {
            if(document.querySelector("#"+ressources[1].name) === null){
                var nb = playerInventory.filter(playerInventory => playerInventory.name == ressources[1].name).length;
                var object = document.createElement('li')
                var objectName = document.createElement('p');
                objectName.setAttribute("id",ressources[1].name);
                objectName.innerText = ressources[1].name + " x"+nb;
                object.appendChild(objectName);
                invRess.appendChild(object);
            }
        });

        Object.entries(playerQuestsObjects).forEach(questObject => {
            var object = document.createElement('li')
            var objectName = document.createElement('p');
            objectName.setAttribute("id",questObject[1].name);
            objectName.innerText = questObject[1].name;
            object.appendChild(objectName);
            invObj.appendChild(object);

        });

        document.querySelector('#quit-inventory').style.cursor = "pointer";
        document.querySelector('#quit-inventory').addEventListener('click',function(event){
            document.querySelector('#inventory-container').classList.remove('active');
        })
    },

    renderBook(objects) {
        var bookContainer = document.querySelector('#book-container');
        var recipies = document.querySelector('#book');
        var potionRecipies = document.querySelector("#Potions-recipes");
        var runesRecipies = document.querySelector("#Runes-recipes");
        var scrollsRecipies = document.querySelector("#Parchemins-recipes");
        potionRecipies.innerHTML = "";
        runesRecipies.innerHTML = "";
        scrollsRecipies.innerHTML = "";

        bookContainer.classList.add('active');
        Object.entries(objects).forEach(recipiestype => {
            var objectType = document.querySelector("#"+recipiestype[0]+"-recipes");
            Object.entries(recipiestype[1]).forEach(recipe => {
                var object = document.createElement('li')
                var objectTitle = document.createElement('p');
                objectTitle.innerText = recipe[0]+" => \n"
                objectTitle.style.color = "yellow";
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
        document.querySelector('#quit-book').style.cursor = "pointer";
        document.querySelector('#quit-book').addEventListener('click',function(event){
            console.log('hello')
            bookContainer.classList.remove('active');
            M.gameState = M.PLAYING;
        })
    },

    renderQuest(pnj, pnjQuest, pnjName, questTitle, questContent, objectRequested, isQuestAccepted) {
        document.querySelector('#quest-pnj').textContent = pnjName;
        document.querySelector('#quest-title').textContent = questTitle;
        document.querySelector('#quest-content').textContent = questContent;
        document.querySelector('#quest-accepted').style.display = (isQuestAccepted) ? 'block' : 'none';
        if(M.haveObjectRequestedInInventory(objectRequested)) {
            document.querySelector('#quest-button-give').style.display = 'block'
        }
        else {
            document.querySelector('#quest-button-give').style.display = 'none';
        }

        if(isQuestAccepted === true) {
            document.querySelector('#quest-buttons').style.display = 'none';
        }
        else {
            document.querySelector('#quest-buttons').style.display = 'block';
        }
        document.querySelector('#quest-container').style.display = 'block';
        document.querySelector('#quest-button-accept').addEventListener('mousedown', function (ev) {
            pnjQuest.isQuestAccepted = true;
            document.querySelector('#quest-accepted').style.display = 'block';
            M.gameState = M.PLAYING;
            document.querySelector('#quest-container').style.display = 'none';
            document.querySelector('#quest-button-give').style.display = 'block';
        });
        document.querySelector('#quest-button-give').addEventListener('mousedown', function (ev) {
            M.gameState = M.PLAYING;
            document.querySelector('#quest-container').style.display = 'none';
            pnj.look = pnj.looks.LOOK_DOWN;
            pnj.waiting = false;
            pnjQuest.isQuestAccomplished = true;
        });
        document.querySelector('#quest-button-refuse').addEventListener('mousedown', function (ev) {
            M.gameState = M.PLAYING;
            document.querySelector('#quest-container').style.display = 'none';
            pnj.look = pnj.looks.LOOK_DOWN;
            pnj.waiting = false;
        });
        document.querySelector('#quit-quest').addEventListener('mousedown', function (ev) {
            M.gameState = M.PLAYING;
            document.querySelector('#quest-container').style.display = 'none';
        });
    },

    startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = V.checkSecond((timeArray[1] - 1));
        if(s==59){m=m-1}
        if(m<0){
            V.renderEndOfTHeDay(M.pnjsInfos);
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
